/**
 * Content & progression validator. Bundled and run with esbuild in CI-ish fashion.
 * It does not touch the DOM or localStorage; it exercises the authored data and
 * the same objective predicates the game uses.
 */
import { CHAPTERS, chapterProgress, getChapter } from '../src/game/chapters';
import {
  applyEffect,
  createInitialState,
  determineEnding,
  essentialFound,
  progressView,
} from '../src/game/gameState';
import { ESSENTIAL_EVIDENCE, EVIDENCE_BY_ID } from '../src/game/evidence';
import { HOTSPOTS, ROOM_BY_ID } from '../src/game/rooms';
import { TOPICS } from '../src/game/interrogations';
import { DEDUCTIONS } from '../src/game/deductions';
import { SCENES, SCENE_BY_ID } from '../src/game/scenes';
import type { Effect, GameState, Line } from '../src/game/types';

let failures = 0;
function check(condition: boolean, message: string): void {
  if (!condition) {
    failures += 1;
    console.error(`FAIL: ${message}`);
  }
}

function lineEffects(lines: Line[]): Effect[] {
  return lines.flatMap((line) => [
    ...(line.effect ? [line.effect] : []),
    ...(line.choices ?? []).flatMap((choice) => (choice.effect ? [choice.effect] : [])),
  ]);
}

function apply(state: GameState, effects: Effect[]): GameState {
  let next = state;
  for (const effect of effects) next = applyEffect(next, effect).state;
  return next;
}

/* ---------------------------------------------------------------- */
/* 1. Referential integrity                                         */
/* ---------------------------------------------------------------- */
const sceneIds = new Set<string>();
for (const scene of SCENES) {
  check(!sceneIds.has(scene.id), `duplicate scene id ${scene.id}`);
  sceneIds.add(scene.id);
  check(scene.chapter >= 1 && scene.chapter <= 6, `scene ${scene.id} chapter invalid`);
}

for (const chapter of CHAPTERS) {
  check(SCENE_BY_ID[chapter.introScene] !== undefined, `missing intro scene ${chapter.introScene}`);
  check(
    SCENE_BY_ID[chapter.closingScene] !== undefined,
    `missing closing scene ${chapter.closingScene}`,
  );
  for (const room of chapter.rooms) {
    check(ROOM_BY_ID[room] !== undefined, `chapter ${chapter.id} references missing room ${room}`);
  }
}

for (const hotspot of HOTSPOTS) {
  check(ROOM_BY_ID[hotspot.room] !== undefined, `hotspot ${hotspot.id} has unknown room`);
  if (hotspot.evidence) {
    check(
      EVIDENCE_BY_ID[hotspot.evidence] !== undefined,
      `hotspot ${hotspot.id} references missing evidence ${hotspot.evidence}`,
    );
  }
  check(
    hotspot.x >= 0 && hotspot.x <= 100 && hotspot.y >= 0 && hotspot.y <= 100,
    `hotspot ${hotspot.id} position out of range`,
  );
}

for (const deduction of DEDUCTIONS) {
  check(
    EVIDENCE_BY_ID[deduction.a] !== undefined && EVIDENCE_BY_ID[deduction.b] !== undefined,
    `deduction ${deduction.id} references missing evidence`,
  );
  check(deduction.a !== deduction.b, `deduction ${deduction.id} uses the same evidence twice`);
  check(deduction.chapter >= 1 && deduction.chapter <= 6, `deduction ${deduction.id} bad chapter`);
}
check(new Set(DEDUCTIONS.map((d) => d.id)).size === DEDUCTIONS.length, 'duplicate deduction ids');

// Every essential evidence must be obtainable somewhere.
const sources = new Set<string>();
for (const hotspot of HOTSPOTS) if (hotspot.evidence) sources.add(hotspot.evidence);
for (const scene of SCENES) {
  for (const effect of lineEffects(scene.lines)) {
    for (const id of effect.evidence ?? []) sources.add(id);
  }
}
for (const topic of TOPICS) {
  for (const effect of [topic.effect, ...lineEffects(topic.lines)]) {
    if (!effect) continue;
    for (const id of effect.evidence ?? []) sources.add(id);
  }
}
for (const deduction of DEDUCTIONS) for (const id of deduction.grants ?? []) sources.add(id);
for (const id of ESSENTIAL_EVIDENCE) {
  check(sources.has(id), `essential evidence ${id} has no source`);
}

/* ---------------------------------------------------------------- */
/* 2. Simulated playthrough                                         */
/* ---------------------------------------------------------------- */
function collect(state: GameState, chapter: number): GameState {
  let s = { ...state, chapter };
  let changed = true;
  let guard = 0;

  while (changed && guard < 40) {
    changed = false;
    guard += 1;
    const availableRooms = CHAPTERS.filter((c) => c.id <= chapter).flatMap((c) => c.rooms);

    for (const hotspot of HOTSPOTS) {
      if (!availableRooms.includes(hotspot.room)) continue;
      if (hotspot.chapter > chapter) continue;
      const locked =
        (hotspot.requiresFlag && !s.flags[hotspot.requiresFlag]) ||
        (hotspot.requiresEvidence && !s.evidence.includes(hotspot.requiresEvidence));
      if (locked) continue;
      if (hotspot.evidence && !s.evidence.includes(hotspot.evidence)) {
        s = applyEffect(s, { evidence: [hotspot.evidence] }).state;
        changed = true;
      }
      if (hotspot.note && !s.notes.some((n) => n.id === hotspot.note!.id)) {
        s = applyEffect(s, { notes: [hotspot.note] }).state;
        changed = true;
      }
      if (hotspot.flag && !s.flags[hotspot.flag]) {
        s = applyEffect(s, { flags: { [hotspot.flag]: true } }).state;
        changed = true;
      }
      if (hotspot.id === 'corridor_door' && !s.flags.sealed_unlocked) {
        s = applyEffect(s, { flags: { sealed_unlocked: true } }).state;
        changed = true;
      }
    }

    for (const topic of TOPICS) {
      if (topic.chapter > chapter) continue;
      if (s.topicsAsked.includes(topic.id)) continue;
      if (topic.requiresFlag && !s.flags[topic.requiresFlag]) continue;
      if (topic.requiresEvidence && !topic.requiresEvidence.every((id) => s.evidence.includes(id)))
        continue;
      if (topic.minTrust && (s.trust[topic.suspect] ?? 50) < topic.minTrust) continue;
      const before = JSON.stringify({ e: s.evidence, f: s.flags });
      s = applyEffect(s, topic.effect).state;
      for (const line of topic.lines) s = applyEffect(s, line.effect).state;
      s = { ...s, topicsAsked: [...s.topicsAsked, topic.id] };
      if (JSON.stringify({ e: s.evidence, f: s.flags }) !== before) changed = true;
    }

    for (const deduction of DEDUCTIONS) {
      if (deduction.chapter > chapter) continue;
      if (s.deductions.includes(deduction.id)) continue;
      if (!s.evidence.includes(deduction.a) || !s.evidence.includes(deduction.b)) continue;
      s = applyEffect(s, {
        flags: deduction.flag ? { [deduction.flag]: true } : undefined,
        notes: deduction.note
          ? [{ id: `deduction_note_${deduction.id}`, title: deduction.title, text: deduction.note, chapter }]
          : undefined,
        evidence: deduction.grants,
      }).state;
      s = { ...s, deductions: [...s.deductions, deduction.id] };
      changed = true;
    }
  }
  return s;
}

let state = createInitialState();
const truthRequired = ['invitation'];

for (const chapter of CHAPTERS) {
  state = collect(state, chapter.id);

  // Apply intro scene effects (e.g. the invitation in chapter one).
  const intro = getChapter(chapter.id);
  const introScene = SCENE_BY_ID[intro.introScene];
  if (introScene) state = apply(state, lineEffects(introScene.lines));

  // Re-collect in case scene effects opened something.
  state = collect(state, chapter.id);

  const progress = chapterProgress(progressView(state));
  const missing = progress.pending.map((p) => p.label);
  check(
    progress.complete,
    `chapter ${chapter.id} gate cannot be completed by collecting available content. Missing: ${missing.join(' | ')}`,
  );

  // Apply closing scene effects, as the game would.
  const closingScene = SCENE_BY_ID[intro.closingScene];
  if (closingScene) state = apply(state, lineEffects(closingScene.lines));

  if (chapter.id === 6) {
    state = applyEffect(state, { flags: { final_decision: 'expose' } }).state;
  }
  console.log(
    `Chapter ${chapter.id} ${chapter.title}: ${progress.done}/${progress.required} required, ` +
      `${state.evidence.length} evidence, ${state.deductions.length} deductions, ` +
      `${state.topicsAsked.length} topics, ${state.interviewLocked.length} locked`,
  );
}

const missingEvidence = Object.keys(EVIDENCE_BY_ID).filter((id) => !state.evidence.includes(id));
const missingDeductions = DEDUCTIONS.filter((d) => !state.deductions.includes(d.id));
if (missingEvidence.length) console.log('Uncollected evidence:', missingEvidence.join(', '));
if (missingDeductions.length) console.log('Unsolved deductions:', missingDeductions.map((d) => d.id).join(', '));
console.log('Essential evidence reachable:', essentialFound(state), 'of', ESSENTIAL_EVIDENCE.length);
check(
  truthRequired.every((id) => state.evidence.includes(id)),
  'invitation is not granted by the opening chapter',
);
check(missingEvidence.length === 0, `unreachable evidence: ${missingEvidence.join(', ')}`);
check(missingDeductions.length === 0, `unsolvable deductions: ${missingDeductions.map((d) => d.id).join(', ')}`);
check(essentialFound(state) >= 16, `only ${essentialFound(state)} essential evidence reachable`);
check(state.deductions.length >= 10, `only ${state.deductions.length} deductions reachable`);
check(
  state.decisions.some((d) => d.id === 'ending_choice'),
  'final ending decision is never recorded',
);

/* ---------------------------------------------------------------- */
/* 3. Ending logic                                                  */
/* ---------------------------------------------------------------- */
function withChoice(choice: string, base: GameState = state): GameState {
  return { ...base, flags: { ...base.flags, final_decision: choice } };
}
check(determineEnding(withChoice('expose')) === 'truth', 'strong expose path does not reach truth');
check(determineEnding(withChoice('burn')) === 'ashes', 'burn path does not reach ashes');
check(determineEnding(withChoice('silence')) === 'silence', 'silence path does not reach silence');
check(determineEnding(withChoice('walk')) === 'witness', 'walk path does not reach witness');

const weak = {
  ...withChoice('expose'),
  evidence: [],
  deductions: [],
};
check(determineEnding(weak) === 'ashes', 'weak expose path should fall to ashes');

/* ---------------------------------------------------------------- */
/* 4. Interrogation coverage                                        */
/* ---------------------------------------------------------------- */
for (const id of ['eleanor', 'charlotte', 'henry', 'richard', 'vivian', 'arthur'] as const) {
  const topics = TOPICS.filter((t) => t.suspect === id);
  check(topics.length >= 5, `${id} has only ${topics.length} topics`);
  check(
    topics.some((t) => t.id === `${id}_intro`),
    `${id} is missing the chapter-one intro topic`,
  );
}
for (const id of ['eleanor', 'charlotte', 'henry', 'richard', 'vivian'] as const) {
  check(
    TOPICS.some((t) => t.id === `${id}_final`),
    `${id} is missing a chapter-six final topic`,
  );
}
check(TOPICS.some((t) => t.id === 'arthur_confront'), 'arthur confrontation topic missing');
check(
  SCENE_BY_ID['ch6_final']?.lines.some((line) => (line.choices?.length ?? 0) === 4),
  'chapter six does not offer four final choices',
);

/* ---------------------------------------------------------------- */
/* 5. Hotspot coverage per room                                     */
/* ---------------------------------------------------------------- */
for (const room of ['foyer', 'study', 'drawing', 'dining', 'library', 'corridor', 'sealed', 'cellar', 'garden']) {
  const spots = HOTSPOTS.filter((h) => h.room === room);
  check(spots.length >= 3, `room ${room} has only ${spots.length} hotspots`);
}

if (failures > 0) {
  console.error(`\n${failures} validation failure(s).`);
  process.exitCode = 1;
} else {
  console.log('\nAll content and progression checks passed.');
}
