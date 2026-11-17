import type {
  DialogueLog,
  Effect,
  EndingId,
  GameState,
  ProgressView,
  Settings,
  SuspectId,
  ToastNotice,
} from './types';
import { EVIDENCE_BY_ID, ESSENTIAL_EVIDENCE } from './evidence';
import { SUSPECT_ORDER } from './characters';
import { NOTES_PREAMBLE } from './timeline';

export const SAVE_KEY = 'tlw.save.v1';
export const SAVE_VERSION = 1;

export const DEFAULT_SETTINGS: Settings = {
  musicVolume: 38,
  sfxVolume: 45,
  textSpeed: 45,
  reducedMotion: false,
  subtitles: true,
  muted: false,
};

export function baseTrust(): Record<SuspectId, number> {
  return SUSPECT_ORDER.reduce(
    (acc, id) => ({ ...acc, [id]: 50 }),
    {} as Record<SuspectId, number>,
  );
}

export function createInitialState(): GameState {
  return {
    version: SAVE_VERSION,
    phase: 'menu',
    chapter: 1,
    sceneId: null,
    sceneKey: 0,
    sceneReturn: 'hub',
    overlay: null,
    appliedLines: [],
    roomsVisited: [],
    evidence: [],
    deductions: [],
    deductionAttempts: {},
    flags: {},
    trust: baseTrust(),
    accused: SUSPECT_ORDER.reduce(
      (acc, id) => ({ ...acc, [id]: 0 }),
      {} as Record<SuspectId, number>,
    ),
    interviewLocked: [],
    topicsAsked: [],
    notes: [...NOTES_PREAMBLE],
    decisions: [],
    dialogueLog: [],
    examined: [],
    unlockedEndings: [],
    settings: { ...DEFAULT_SETTINGS },
    ending: null,
    finalChoice: null,
    activeRoom: null,
    activeSuspect: null,
    chapterSnapshot: null,
    startedAt: Date.now(),
    updatedAt: Date.now(),
  };
}

export function progressView(state: GameState): ProgressView {
  return {
    evidence: state.evidence,
    deductions: state.deductions,
    flags: state.flags,
    trust: state.trust,
    topicsAsked: state.topicsAsked,
    roomsVisited: state.roomsVisited,
    examined: state.examined,
    chapter: state.chapter,
    accused: state.accused,
    notes: state.notes,
    decisions: state.decisions,
  };
}

export function hasFlag(state: GameState, flag: string): boolean {
  return Boolean(state.flags[flag]);
}

export function trustOf(state: GameState, id: SuspectId): number {
  return state.trust[id] ?? 50;
}

export function essentialFound(state: GameState): number {
  return ESSENTIAL_EVIDENCE.filter((id) => state.evidence.includes(id)).length;
}

export function caseStrength(state: GameState): number {
  const evidenceScore = essentialFound(state) / ESSENTIAL_EVIDENCE.length;
  const deductionScore = Math.min(state.deductions.length / 10, 1);
  const trustValues = SUSPECT_ORDER.map((id) => state.trust[id] ?? 50);
  const trustScore =
    trustValues.reduce((a, b) => a + b, 0) / (trustValues.length * 100);
  return Math.round(evidenceScore * 55 + deductionScore * 30 + trustScore * 15);
}

export function determineEnding(state: GameState): EndingId {
  const choice = String(state.flags.final_decision ?? 'silence');
  const strong =
    essentialFound(state) >= 16 && state.deductions.length >= 10;
  if (choice === 'expose') return strong ? 'truth' : 'ashes';
  if (choice === 'burn') return 'ashes';
  if (choice === 'walk') return 'witness';
  return 'silence';
}

export const ENDING_META: Record<
  EndingId,
  { title: string; subtitle: string; blurb: string }
> = {
  truth: {
    title: 'The Truth',
    subtitle: 'Ending One',
    blurb:
      'Mara exposes the fire, the false certificates and the invented name — and chooses to be both of the women she is.',
  },
  ashes: {
    title: 'Ashes',
    subtitle: 'Ending Two',
    blurb:
      'The evidence burns with the east wing. The family scatters. The house keeps its lie, and the story dies with the proof.',
  },
  silence: {
    title: 'The Silence',
    subtitle: 'Ending Three',
    blurb:
      'Mara learns who she is and leaves without telling the world. The family keeps its name; she keeps the girl.',
  },
  witness: {
    title: 'The Last Witness',
    subtitle: 'Ending Four',
    blurb:
      'The moment passes. Arthur disappears with the truth, and the only witness left chooses not to be heard.',
  },
};

export const ENDING_ORDER: EndingId[] = ['truth', 'ashes', 'silence', 'witness'];

function clampTrust(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export interface EffectResult {
  state: GameState;
  notices: ToastNotice[];
}

/**
 * Applies an authored effect to the game state. Pure: returns a new state and
 * a list of notifications for the UI. Used by scenes, topics, evidence
 * reactions and accusations alike.
 */
export function applyEffect(state: GameState, effect?: Effect): EffectResult {
  if (!effect) return { state, notices: [] };
  const notices: ToastNotice[] = [];
  const next: GameState = {
    ...state,
    evidence: [...state.evidence],
    flags: { ...state.flags },
    trust: { ...state.trust },
    notes: [...state.notes],
    decisions: [...state.decisions],
    updatedAt: Date.now(),
  };

  if (effect.evidence) {
    for (const id of effect.evidence) {
      const item = EVIDENCE_BY_ID[id];
      if (!item || next.evidence.includes(id)) continue;
      next.evidence.push(id);
      notices.push({
        id: `ev-${id}-${Date.now()}-${Math.random()}`,
        kind: 'evidence',
        title: 'Evidence recorded',
        text: item.title,
      });
    }
  }

  if (effect.notes) {
    for (const note of effect.notes) {
      if (next.notes.some((n) => n.id === note.id)) continue;
      next.notes.push(note);
      notices.push({
        id: `note-${note.id}-${Date.now()}-${Math.random()}`,
        kind: 'note',
        title: 'Journal note added',
        text: note.title,
      });
    }
  }

  if (effect.flags) {
    for (const [key, value] of Object.entries(effect.flags)) {
      next.flags[key] = value;
      if (key === 'sealed_key') {
        notices.push({
          id: `flag-sealed-${Date.now()}`,
          kind: 'info',
          title: 'A key accepted',
          text: 'The east corridor door can now be opened.',
        });
      }
      if (key === 'safe_open') {
        notices.push({
          id: `flag-safe-${Date.now()}`,
          kind: 'info',
          title: 'The safe is open',
          text: 'Study files are available to examine.',
        });
      }
    }
  }

  if (effect.trust) {
    for (const [id, delta] of Object.entries(effect.trust)) {
      const suspect = id as SuspectId;
      if (delta === undefined) continue;
      const before = next.trust[suspect] ?? 50;
      next.trust[suspect] = clampTrust(before + delta);
      if (Math.abs(delta) >= 6) {
        notices.push({
          id: `trust-${suspect}-${Date.now()}-${Math.random()}`,
          kind: 'trust',
          title: delta > 0 ? 'Trust deepened' : 'Trust strained',
          text: `${suspect.charAt(0).toUpperCase()}${suspect.slice(1)} ${
            delta > 0 ? 'is more willing to talk' : 'will remember that'
          }.`,
        });
      }
    }
  }

  if (effect.decision) {
    const exists = next.decisions.some((d) => d.id === effect.decision!.id);
    if (!exists) next.decisions.push(effect.decision);
    notices.push({
      id: `decision-${effect.decision.id}`,
      kind: 'info',
      title: 'Decision recorded',
      text: effect.decision.answer,
    });
  }

  return { state: next, notices };
}

export function addLog(state: GameState, log: DialogueLog): GameState {
  const existing = state.dialogueLog.filter((l) => l.id !== log.id);
  const dialogueLog = [log, ...existing].slice(0, 40);
  return { ...state, dialogueLog };
}

export function loadState(): GameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GameState;
    if (!parsed || parsed.version !== SAVE_VERSION) return null;
    const base = createInitialState();
    const merged: GameState = {
      ...base,
      ...parsed,
      settings: { ...base.settings, ...parsed.settings },
      trust: { ...base.trust, ...parsed.trust },
      accused: { ...base.accused, ...parsed.accused },
      flags: { ...parsed.flags },
      evidence: parsed.evidence ?? [],
      deductions: parsed.deductions ?? [],
      notes: parsed.notes ?? base.notes,
      appliedLines: parsed.appliedLines ?? [],
      dialogueLog: parsed.dialogueLog ?? [],
      decisions: parsed.decisions ?? [],
      topicsAsked: parsed.topicsAsked ?? [],
      examined: parsed.examined ?? [],
      roomsVisited: parsed.roomsVisited ?? [],
    };
    // Never resume mid-scene at a dangling position: rewind to a safe phase.
    if (merged.phase === 'story' && !merged.sceneId) merged.phase = 'menu';
    if (merged.phase === 'ending' && !merged.ending) merged.phase = 'menu';
    return merged;
  } catch {
    return null;
  }
}

export function saveState(state: GameState): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch {
    /* storage full or unavailable — the game continues in memory */
  }
}

export function clearSave(): void {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    /* ignore */
  }
}

export function isSavedGame(state: GameState | null): boolean {
  return Boolean(state && state.phase !== 'menu');
}
