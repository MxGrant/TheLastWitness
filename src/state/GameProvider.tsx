import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  DialogueLog,
  Deduction,
  Effect,
  GameState,
  Hotspot,
  Line,
  Phase,
  Settings,
  SuspectId,
  ToastNotice,
  Topic,
} from '../game/types';
import {
  applyEffect,
  addLog,
  caseStrength,
  clearSave,
  createInitialState,
  determineEnding,
  loadState,
  progressView,
  saveState,
  trustOf,
} from '../game/gameState';
import { CHARACTERS, speakerName } from '../game/characters';
import { chapterProgress, getChapter } from '../game/chapters';
import { matchDeduction, DEDUCTIONS } from '../game/deductions';
import { getEvidence } from '../game/evidence';
import { getHotspot } from '../game/rooms';
import { ENDING_SCENES, getScene } from '../game/scenes';
import {
  ACCUSATION_LINES,
  EVIDENCE_REACTIONS,
  REACTION_MAP,
  TOPIC_BY_ID,
  genericEvidenceLine,
} from '../game/interrogations';
import { lineVisible } from '../game/storyEngine';

export type TopicResult =
  | { ok: true; lines: Line[]; topic: Topic }
  | { ok: false; reason: string };

export type ExamineResult = {
  ok: boolean;
  locked: boolean;
  hotspot: Hotspot;
};

export type DeductionResult =
  | { status: 'solved'; deduction: Deduction }
  | { status: 'already'; deduction: Deduction }
  | { status: 'early' }
  | { status: 'wrong' }
  | { status: 'invalid' };

interface GameContextValue {
  state: GameState;
  progress: ReturnType<typeof progressView>;
  toasts: ToastNotice[];
  hasSave: boolean;
  dismissToast: (id: string) => void;
  notify: (notice: ToastNotice) => void;
  startNewGame: () => void;
  continueGame: () => void;
  returnToMenu: () => void;
  openChapterSelect: () => void;
  openSettings: () => void;
  openCredits: () => void;
  backFromScreen: () => void;
  startChapter: (n: number) => void;
  playClosingScene: () => boolean;
  completeScene: () => void;
  goToHub: () => void;
  openRoom: (id: string) => void;
  closeRoom: () => void;
  openSuspect: (id: SuspectId) => void;
  closeSuspect: () => void;
  openOverlay: (overlay: 'journal' | 'board' | 'settings') => void;
  closeOverlay: () => void;
  examine: (hotspotId: string) => ExamineResult;
  fileHotspot: (hotspotId: string) => boolean;
  askTopic: (topicId: string) => TopicResult;
  presentEvidence: (suspect: SuspectId, evidenceId: string) => Line[];
  accuse: (suspect: SuspectId) => Line[];
  submitDeduction: (a: string, b: string) => DeductionResult;
  requestHint: () => { aTitle: string; bTitle: string } | null;
  applyLineEffect: (key: string, effect?: Effect) => void;
  logConversation: (id: string, title: string, lines: Line[]) => void;
  updateSettings: (patch: Partial<Settings>) => void;
  saveNow: () => void;
  restartChapter: () => void;
  resetAllProgress: () => void;
  finishEnding: () => void;
  currentScene: ReturnType<typeof getScene>;
  strength: number;
}

const GameContext = createContext<GameContextValue | null>(null);

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside GameProvider');
  return ctx;
}

function beginChapterState(from: GameState, n: number): GameState {
  const chapter = getChapter(n);
  const base: GameState = {
    ...from,
    chapter: n,
    phase: 'story',
    sceneId: chapter.introScene,
    sceneKey: (from.sceneKey ?? 0) + 1,
    sceneReturn: 'hub',
    overlay: null,
    ending: null,
    finalChoice: null,
    activeRoom: null,
    activeSuspect: null,
    // Refusals last for the chapter in which they were earned. Doors reopen
    // when the case moves on, so no investigation can become unwinnable.
    interviewLocked: [],
    updatedAt: Date.now(),
  };
  const snapshot = JSON.stringify({ ...base, chapterSnapshot: null });
  return { ...base, chapterSnapshot: snapshot };
}

function dialogueEntries(lines: Line[]) {
  return lines.map((line) => ({
    speaker: line.speaker,
    speakerName: speakerName(line.speaker),
    text: line.text,
  }));
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(() => createInitialState());
  const stateRef = useRef(state);
  stateRef.current = state;
  const [toasts, setToasts] = useState<ToastNotice[]>([]);
  const [hasSave, setHasSave] = useState<boolean>(() => {
    const loaded = loadState();
    return Boolean(
      loaded && (loaded.chapterSnapshot || loaded.sceneId || loaded.evidence.length > 0),
    );
  });

  const commit = useCallback((next: GameState) => {
    stateRef.current = { ...next, updatedAt: Date.now() };
    setState(stateRef.current);
  }, []);

  const notify = useCallback((notice: ToastNotice) => {
    setToasts((prev) => [...prev.slice(-3), notice]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Automatic save on every meaningful state change. A pristine main menu is
  // not a save: it would otherwise enable Continue on the next visit.
  useEffect(() => {
    if (!state.chapterSnapshot && !state.sceneId && state.evidence.length === 0) return;
    saveState(state);
    setHasSave(true);
  }, [state]);

  const applyEffects = useCallback(
    (base: GameState, items: { key: string; effect?: Effect }[]) => {
      let next = base;
      const notices: ToastNotice[] = [];
      for (const item of items) {
        if (!item.effect) continue;
        if (next.appliedLines.includes(item.key)) continue;
        const res = applyEffect(next, item.effect);
        next = res.state;
        notices.push(...res.notices);
        next = { ...next, appliedLines: [...next.appliedLines, item.key] };
      }
      return { state: next, notices };
    },
    [],
  );

  /* ---------------------------------------------------------------- */
  /* Navigation & lifecycle                                           */
  /* ---------------------------------------------------------------- */
  const startNewGame = useCallback(() => {
    const fresh = {
      ...createInitialState(),
      settings: stateRef.current.settings,
      unlockedEndings: stateRef.current.unlockedEndings,
      startedAt: Date.now(),
    };
    const started = beginChapterState(fresh, 1);
    commit(started);
    setHasSave(true);
    notify({
      id: `chapter-1-${Date.now()}`,
      kind: 'chapter',
      title: 'Chapter One',
      text: 'The Invitation',
    });
  }, [commit, notify]);

  const continueGame = useCallback(() => {
    const saved = loadState();
    if (!saved || (!saved.chapterSnapshot && !saved.sceneId && !saved.evidence.length)) {
      setHasSave(false);
      notify({
        id: `no-save-${Date.now()}`,
        kind: 'info',
        title: 'No saved case',
        text: 'Start a new game to begin the investigation.',
      });
      return;
    }
    let phase: Phase = saved.phase;
    if (saved.phase === 'menu') {
      phase = saved.sceneId ? 'story' : saved.chapterSnapshot ? 'hub' : 'menu';
    }
    const resume: GameState = { ...saved, phase, overlay: null, sceneKey: (saved.sceneKey ?? 0) + 1 };
    commit(resume);
    notify({
      id: `resume-${Date.now()}`,
      kind: 'info',
      title: 'Case resumed',
      text: `Chapter ${saved.chapter} — ${getChapter(saved.chapter).title}`,
    });
  }, [commit, notify]);

  const returnToMenu = useCallback(() => {
    commit({ ...stateRef.current, phase: 'menu', overlay: null, activeRoom: null, activeSuspect: null });
  }, [commit]);

  const openChapterSelect = useCallback(() => {
    commit({ ...stateRef.current, phase: 'chapters', overlay: null });
  }, [commit]);

  const openSettings = useCallback(() => {
    commit({ ...stateRef.current, phase: 'settings', overlay: null });
  }, [commit]);

  const openCredits = useCallback(() => {
    commit({ ...stateRef.current, phase: 'credits', overlay: null });
  }, [commit]);

  const backFromScreen = useCallback(() => {
    const s = stateRef.current;
    const phase: Phase = s.chapterSnapshot ? (s.sceneId ? 'story' : 'hub') : 'menu';
    commit({ ...s, phase });
  }, [commit]);

  const startChapter = useCallback(
    (n: number) => {
      commit(beginChapterState(stateRef.current, n));
      notify({
        id: `chapter-${n}-${Date.now()}`,
        kind: 'chapter',
        title: `Chapter ${n}`,
        text: getChapter(n).title,
      });
    },
    [commit, notify],
  );

  const playClosingScene = useCallback(() => {
    const s = stateRef.current;
    const chapter = getChapter(s.chapter);
    const progress = chapterProgress(progressView(s));
    if (!progress.complete) {
      notify({
        id: `blocked-${Date.now()}`,
        kind: 'info',
        title: 'The case is not ready',
        text: progress.pending[0]?.label ?? 'Complete the remaining objectives.',
      });
      return false;
    }
    commit({
      ...s,
      phase: 'story',
      sceneId: chapter.closingScene,
      sceneKey: s.sceneKey + 1,
      sceneReturn: 'hub',
      overlay: null,
      activeRoom: null,
      activeSuspect: null,
    });
    return true;
  }, [commit, notify]);

  const goToHub = useCallback(() => {
    commit({ ...stateRef.current, phase: 'hub', sceneId: null, overlay: null });
  }, [commit]);

  const finishEnding = useCallback(() => {
    const s = stateRef.current;
    const ending = s.ending;
    commit({
      ...s,
      phase: 'ending',
      overlay: null,
      sceneId: null,
      sceneReturn: 'hub',
      unlockedEndings:
        ending && !s.unlockedEndings.includes(ending)
          ? [...s.unlockedEndings, ending]
          : s.unlockedEndings,
    });
  }, [commit]);

  const completeScene = useCallback(() => {
    const s = stateRef.current;
    if (!s.sceneId) {
      goToHub();
      return;
    }
    const scene = getScene(s.sceneId);
    if (!scene) {
      goToHub();
      return;
    }

    if (s.sceneReturn === 'ending') {
      finishEnding();
      return;
    }

    const chapter = getChapter(s.chapter);
    if (scene.id === chapter.introScene) {
      commit({ ...s, phase: 'hub', sceneId: null, overlay: null });
      return;
    }

    if (scene.id === chapter.closingScene) {
      if (s.chapter >= 6) {
        const ending = determineEnding(s);
        commit({
          ...s,
          ending,
          finalChoice: String(s.flags.final_decision ?? 'silence'),
          phase: 'story',
          sceneId: ENDING_SCENES[ending],
          sceneKey: s.sceneKey + 1,
          sceneReturn: 'ending',
          overlay: null,
          appliedLines: s.appliedLines,
        });
      } else {
        const next = beginChapterState(s, s.chapter + 1);
        commit(next);
        notify({
          id: `chapter-${next.chapter}-${Date.now()}`,
          kind: 'chapter',
          title: `Chapter ${next.chapter}`,
          text: getChapter(next.chapter).title,
        });
      }
      return;
    }

    goToHub();
  }, [commit, finishEnding, goToHub, notify]);

  /* ---------------------------------------------------------------- */
  /* Investigation                                                    */
  /* ---------------------------------------------------------------- */
  const examine = useCallback(
    (hotspotId: string): ExamineResult => {
      const hotspot = getHotspot(hotspotId);
      const s = stateRef.current;
      if (!hotspot) {
        return {
          ok: false,
          locked: false,
          hotspot:
            hotspot ??
            ({
              id: hotspotId,
              room: '',
              label: 'Nothing',
              name: 'Nothing',
              x: 0,
              y: 0,
              art: 'note',
              description: 'There is nothing here.',
              chapter: 1,
            } as Hotspot),
        };
      }
      const locked =
        Boolean(hotspot.requiresFlag && !s.flags[hotspot.requiresFlag]) ||
        Boolean(hotspot.requiresEvidence && !s.evidence.includes(hotspot.requiresEvidence));

      let next: GameState = {
        ...s,
        examined: s.examined.includes(hotspot.id) ? s.examined : [...s.examined, hotspot.id],
        roomsVisited: s.roomsVisited.includes(hotspot.room)
          ? s.roomsVisited
          : [...s.roomsVisited, hotspot.room],
      };

      if (!locked) {
        const items: { key: string; effect?: Effect }[] = [];
        if (hotspot.flag) items.push({ key: `hs:${hotspot.id}:flag`, effect: { flags: { [hotspot.flag]: true } } });
        if (hotspot.id === 'corridor_door')
          items.push({ key: 'hs:corridor_door:unlock', effect: { flags: { sealed_unlocked: true } } });
        const res = applyEffects(next, items);
        next = res.state;
        for (const notice of res.notices) notify(notice);
      }

      commit(next);
      return { ok: !locked, locked, hotspot };
    },
    [applyEffects, commit, notify],
  );

  const fileHotspot = useCallback(
    (hotspotId: string): boolean => {
      const hotspot = getHotspot(hotspotId);
      if (!hotspot) return false;
      const s = stateRef.current;
      const locked =
        Boolean(hotspot.requiresFlag && !s.flags[hotspot.requiresFlag]) ||
        Boolean(hotspot.requiresEvidence && !s.evidence.includes(hotspot.requiresEvidence));
      if (locked) return false;
      const items: { key: string; effect?: Effect }[] = [];
      if (hotspot.evidence)
        items.push({ key: `hs:${hotspot.id}:ev`, effect: { evidence: [hotspot.evidence] } });
      if (hotspot.note)
        items.push({ key: `hs:${hotspot.id}:note`, effect: { notes: [hotspot.note] } });
      const res = applyEffects(s, items);
      commit({
        ...res.state,
        examined: res.state.examined.includes(hotspot.id)
          ? res.state.examined
          : [...res.state.examined, hotspot.id],
        roomsVisited: res.state.roomsVisited.includes(hotspot.room)
          ? res.state.roomsVisited
          : [...res.state.roomsVisited, hotspot.room],
      });
      for (const notice of res.notices) notify(notice);
      return Boolean(hotspot.evidence || hotspot.note);
    },
    [applyEffects, commit, notify],
  );

  const logConversation = useCallback(
    (id: string, title: string, lines: Line[]) => {
      const log: DialogueLog = {
        id,
        chapter: stateRef.current.chapter,
        title,
        entries: dialogueEntries(lines),
      };
      commit(addLog(stateRef.current, log));
    },
    [commit],
  );

  const askTopic = useCallback(
    (topicId: string): TopicResult => {
      const topic = TOPIC_BY_ID[topicId];
      const s = stateRef.current;
      if (!topic) return { ok: false, reason: 'That topic does not exist.' };
      if (topic.chapter > s.chapter)
        return { ok: false, reason: 'You do not have enough of the case to ask that yet.' };
      if (s.interviewLocked.includes(topic.suspect))
        return {
          ok: false,
          reason: `${CHARACTERS[topic.suspect].shortName} will not speak with you again.`,
        };
      if (topic.hideIfFlag && s.flags[topic.hideIfFlag])
        return { ok: false, reason: 'That has already been said.' };
      if (topic.requiresFlag && !s.flags[topic.requiresFlag])
        return { ok: false, reason: 'You need to know more before asking that.' };
      if (
        topic.requiresEvidence &&
        !topic.requiresEvidence.every((id) => s.evidence.includes(id))
      ) {
        const first = getEvidence(topic.requiresEvidence[0]);
        return {
          ok: false,
          reason: first ? `You would need to have found: ${first.title}.` : 'Not yet.',
        };
      }
      if (topic.minTrust && trustOf(s, topic.suspect) < topic.minTrust)
        return { ok: false, reason: 'They do not trust you enough to answer that.' };

      const lines = topic.lines.filter((line) => lineVisible(line, s));
      const items = [
        { key: `topic:${topic.id}:effect`, effect: topic.effect },
        ...topic.lines.map((line, i) => ({ key: `topic:${topic.id}:${i}`, effect: line.effect })),
      ];
      const res = applyEffects(s, items);
      const next: GameState = {
        ...res.state,
        topicsAsked: res.state.topicsAsked.includes(topic.id)
          ? res.state.topicsAsked
          : [...res.state.topicsAsked, topic.id],
      };
      const log = addLog(next, {
        id: `topic:${topic.id}`,
        chapter: next.chapter,
        title: `${CHARACTERS[topic.suspect].name} — ${topic.label}`,
        entries: dialogueEntries(lines),
      });
      commit(log);
      for (const notice of res.notices) notify(notice);
      return { ok: true, lines, topic };
    },
    [applyEffects, commit, notify],
  );

  const presentEvidence = useCallback(
    (suspect: SuspectId, evidenceId: string): Line[] => {
      const s = stateRef.current;
      const reaction = REACTION_MAP[suspect]?.[evidenceId];
      const item = getEvidence(evidenceId);
      if (!item) return [];
      const lines = reaction
        ? reaction.lines.filter((line) => lineVisible(line, s))
        : genericEvidenceLine(suspect, trustOf(s, suspect));
      const dudEffect: Effect = { trust: { [suspect]: -1 } };
      const items: { key: string; effect?: Effect }[] = reaction
        ? [
            { key: `evidence:${suspect}:${evidenceId}:effect`, effect: reaction.effect },
            ...reaction.lines.map((line, i) => ({
              key: `evidence:${suspect}:${evidenceId}:${i}`,
              effect: line.effect,
            })),
          ]
        : [{ key: `evidence:${suspect}:${evidenceId}:dud`, effect: dudEffect }];
      const res = applyEffects(s, items);
      const log = addLog(res.state, {
        id: `present:${suspect}:${evidenceId}`,
        chapter: res.state.chapter,
        title: `${CHARACTERS[suspect].name} — presented: ${item.title}`,
        entries: dialogueEntries(lines),
      });
      commit(log);
      for (const notice of res.notices) notify(notice);
      return lines;
    },
    [applyEffects, commit, notify],
  );

  const accuse = useCallback(
    (suspect: SuspectId): Line[] => {
      const s = stateRef.current;
      const count = (s.accused[suspect] ?? 0) + 1;
      const early = s.chapter < 4;
      const lines = ACCUSATION_LINES[suspect];
      const note = {
        id: `accusation_${suspect}_${count}`,
        title: `Accusation: ${CHARACTERS[suspect].name}`,
        text: early
          ? `You accused ${CHARACTERS[suspect].name} before the case was ready. They have closed the door on further interviews for the rest of this chapter.`
          : `You laid the accusation at ${CHARACTERS[suspect].name}'s feet. The house has not forgotten.`,
        chapter: s.chapter,
      };
      const accusationEffect: Effect = {
        trust: { [suspect]: -22 },
        flags: { [`accused_${suspect}`]: count },
      };
      const res = applyEffect(s, accusationEffect);
      const next: GameState = {
        ...res.state,
        accused: { ...res.state.accused, [suspect]: count },
        interviewLocked: early
          ? Array.from(new Set([...res.state.interviewLocked, suspect]))
          : res.state.interviewLocked,
        notes: res.state.notes.some((n) => n.id === note.id)
          ? res.state.notes
          : [...res.state.notes, note],
        decisions: [
          ...res.state.decisions,
          {
            id: `accusation_${suspect}_${count}`,
            chapter: s.chapter,
            question: 'Who did you accuse?',
            answer: CHARACTERS[suspect].name,
          },
        ],
      };
      commit(addLog(next, {
        id: `accuse:${suspect}:${count}`,
        chapter: next.chapter,
        title: `Accusation — ${CHARACTERS[suspect].name}`,
        entries: dialogueEntries(lines),
      }));
      notify({
        id: `accuse-toast-${suspect}-${count}`,
        kind: 'trust',
        title: early ? 'Interviews closed' : 'Accusation recorded',
        text: early
          ? `${CHARACTERS[suspect].shortName} will refuse further questions for the rest of this chapter.`
          : `${CHARACTERS[suspect].shortName} will not forget this.`,
      });
      return lines;
    },
    [commit, notify],
  );

  const submitDeduction = useCallback(
    (a: string, b: string): DeductionResult => {
      if (!a || !b || a === b) return { status: 'invalid' };
      const s = stateRef.current;
      const found = matchDeduction(a, b);
      if (!found) {
        const key = [a, b].sort().join('+');
        commit({
          ...s,
          deductionAttempts: {
            ...s.deductionAttempts,
            [key]: (s.deductionAttempts[key] ?? 0) + 1,
            __total: Number(s.deductionAttempts.__total ?? 0) + 1,
          },
        });
        return { status: 'wrong' };
      }
      if (s.deductions.includes(found.id)) return { status: 'already', deduction: found };
      if (found.chapter > s.chapter) return { status: 'early' };

      const res = applyEffect(s, {
        flags: found.flag ? { [found.flag]: true } : undefined,
        notes: found.note
          ? [
              {
                id: `deduction_note_${found.id}`,
                title: found.title,
                text: found.note,
                chapter: s.chapter,
              },
            ]
          : undefined,
        evidence: found.grants,
      });
      const next: GameState = {
        ...res.state,
        deductions: [...res.state.deductions, found.id],
      };
      commit(next);
      notify({
        id: `deduction-${found.id}`,
        kind: 'deduction',
        title: 'Deduction confirmed',
        text: found.title,
      });
      return { status: 'solved', deduction: found };
    },
    [commit, notify],
  );

  const requestHint = useCallback(() => {
    const s = stateRef.current;
    const available = DEDUCTIONS.filter(
      (d) => d.chapter <= s.chapter && !s.deductions.includes(d.id),
    );
    if (!available.length) return null;
    const first = available[0];
    const a = getEvidence(first.a);
    const b = getEvidence(first.b);
    if (!a || !b) return null;
    const pair = [a, b].filter((item) => s.evidence.includes(item.id));
    if (pair.length < 2) {
      // Hint towards evidence they have not found yet.
      const missing = [a, b].filter((item) => !s.evidence.includes(item.id));
      return {
        aTitle: missing[0]?.title ?? a.title,
        bTitle: missing[1]?.title ?? b.title,
      };
    }
    return { aTitle: a.title, bTitle: b.title };
  }, []);

  /* ---------------------------------------------------------------- */
  /* Rooms, overlays, settings                                        */
  /* ---------------------------------------------------------------- */
  const openRoom = useCallback(
    (id: string) => {
      const s = stateRef.current;
      commit({
        ...s,
        activeRoom: id,
        roomsVisited: s.roomsVisited.includes(id) ? s.roomsVisited : [...s.roomsVisited, id],
      });
    },
    [commit],
  );

  const closeRoom = useCallback(() => {
    commit({ ...stateRef.current, activeRoom: null });
  }, [commit]);

  const openSuspect = useCallback(
    (id: SuspectId) => {
      commit({ ...stateRef.current, activeSuspect: id });
    },
    [commit],
  );

  const closeSuspect = useCallback(() => {
    commit({ ...stateRef.current, activeSuspect: null });
  }, [commit]);

  const openOverlay = useCallback(
    (overlay: 'journal' | 'board' | 'settings') => {
      commit({ ...stateRef.current, overlay });
    },
    [commit],
  );

  const closeOverlay = useCallback(() => {
    commit({ ...stateRef.current, overlay: null });
  }, [commit]);

  const updateSettings = useCallback(
    (patch: Partial<Settings>) => {
      commit({
        ...stateRef.current,
        settings: { ...stateRef.current.settings, ...patch },
      });
    },
    [commit],
  );

  const saveNow = useCallback(() => {
    saveState(stateRef.current);
    setHasSave(true);
    notify({
      id: `save-${Date.now()}`,
      kind: 'info',
      title: 'Progress saved',
      text: `Chapter ${stateRef.current.chapter} is safe.`,
    });
  }, [notify]);

  const applyLineEffect = useCallback(
    (key: string, effect?: Effect) => {
      if (!effect) return;
      const s = stateRef.current;
      if (s.appliedLines.includes(key)) return;
      const res = applyEffect(s, effect);
      const next = { ...res.state, appliedLines: [...res.state.appliedLines, key] };
      commit(next);
      for (const notice of res.notices) notify(notice);
    },
    [commit, notify],
  );

  const restartChapter = useCallback(() => {
    const s = stateRef.current;
    if (s.chapterSnapshot) {
      try {
        const parsed = JSON.parse(s.chapterSnapshot) as GameState;
        commit({
          ...parsed,
          settings: s.settings,
          phase: 'story',
          sceneKey: s.sceneKey + 1,
          overlay: null,
        });
        notify({
          id: `restart-${Date.now()}`,
          kind: 'info',
          title: 'Chapter restarted',
          text: getChapter(s.chapter).title,
        });
        return;
      } catch {
        /* fall through */
      }
    }
    commit(beginChapterState(s, s.chapter));
  }, [commit, notify]);

  const resetAllProgress = useCallback(() => {
    const settings = stateRef.current.settings;
    clearSave();
    const fresh = { ...createInitialState(), settings };
    commit(fresh);
    setHasSave(false);
    notify({
      id: `reset-${Date.now()}`,
      kind: 'info',
      title: 'Case erased',
      text: 'All progress has been reset.',
    });
  }, [commit, notify]);

  const currentScene = useMemo(() => (state.sceneId ? getScene(state.sceneId) : undefined), [
    state.sceneId,
  ]);

  const strength = useMemo(() => caseStrength(state), [state]);

  const progress = useMemo(() => progressView(state), [state]);

  const value: GameContextValue = {
    state,
    progress,
    toasts,
    hasSave,
    dismissToast,
    notify,
    startNewGame,
    continueGame,
    returnToMenu,
    openChapterSelect,
    openSettings,
    openCredits,
    backFromScreen,
    startChapter,
    playClosingScene,
    completeScene,
    goToHub,
    openRoom,
    closeRoom,
    openSuspect,
    closeSuspect,
    openOverlay,
    closeOverlay,
    examine,
    fileHotspot,
    askTopic,
    presentEvidence,
    accuse,
    submitDeduction,
    requestHint,
    applyLineEffect,
    logConversation,
    updateSettings,
    saveNow,
    restartChapter,
    resetAllProgress,
    finishEnding,
    currentScene,
    strength,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

/** Exposed for the interrogation UI, which needs the authored reaction list. */
export const REACTIONS = EVIDENCE_REACTIONS;
