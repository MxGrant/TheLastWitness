export type SuspectId =
  | 'eleanor'
  | 'charlotte'
  | 'henry'
  | 'arthur'
  | 'richard'
  | 'vivian';

export type SpeakerId = SuspectId | 'mara' | 'narrator' | 'alexander' | 'evelyn' | 'voice';

export type Mood = 'calm' | 'cold' | 'warm' | 'angry' | 'sad' | 'fear' | 'smirk' | 'broken';

export type MusicKey =
  | 'menu'
  | 'manor'
  | 'tension'
  | 'revelation'
  | 'melancholy'
  | 'memory'
  | 'finale';

export type SfxKey =
  | 'rain'
  | 'thunder'
  | 'door'
  | 'clock'
  | 'footsteps'
  | 'paper'
  | 'glass'
  | 'heart'
  | 'click'
  | 'fire'
  | 'musicbox'
  | 'tape';

export type Phase =
  | 'boot'
  | 'menu'
  | 'chapters'
  | 'settings'
  | 'credits'
  | 'story'
  | 'hub'
  | 'ending';

export interface PortraitSpec {
  skin: string;
  hair: string;
  hairStyle: 'updo' | 'loose' | 'bob' | 'short' | 'slick' | 'bald' | 'braid';
  clothing: string;
  accent: string;
  accessory: 'glasses' | 'pearls' | 'cigarette' | 'cane' | 'camera' | 'watch' | 'none';
  age: number;
  aura: string;
  /** vertical framing offset for the bust, in svg units */
  height?: number;
}

export interface Character {
  id: SpeakerId;
  name: string;
  shortName: string;
  role: string;
  age?: number;
  quote: string;
  bio: string;
  motive: string;
  alibi: string;
  secret: string;
  /** flag that must be set before the secret is written into the journal */
  secretFlag?: string;
  portrait: PortraitSpec;
  isSuspect: boolean;
}

export type EvidenceCategory =
  | 'Document'
  | 'Photograph'
  | 'Object'
  | 'Forensic'
  | 'Testimony'
  | 'Record'
  | 'Letter'
  | 'Certificate';

export interface Evidence {
  id: string;
  title: string;
  category: EvidenceCategory;
  short: string;
  description: string;
  detail?: string;
  location: string;
  related: string[];
  essential: boolean;
  chapter: number;
  art: EvidenceArtKind;
  /** render a spoiler-safe journal detail only after this flag is set */
  revealFlag?: string;
}

export type EvidenceArtKind =
  | 'invitation'
  | 'photo'
  | 'document'
  | 'letter'
  | 'certificate'
  | 'weapon'
  | 'key'
  | 'tape'
  | 'locket'
  | 'diary'
  | 'glass'
  | 'ledger'
  | 'watch'
  | 'musicbox'
  | 'doll'
  | 'newspaper'
  | 'ring'
  | 'note';

export interface NoteEntry {
  id: string;
  title: string;
  text: string;
  chapter: number;
}

export interface Deduction {
  id: string;
  chapter: number;
  a: string;
  b: string;
  title: string;
  result: string;
  /** extra journal note written when solved */
  note?: string;
  flag?: string;
  grants?: string[];
  essential?: boolean;
}

export interface Effect {
  evidence?: string[];
  notes?: NoteEntry[];
  flags?: Record<string, boolean | number | string>;
  trust?: Partial<Record<SuspectId, number>>;
  decision?: { id: string; chapter: number; question: string; answer: string };
}

export interface Choice {
  id: string;
  text: string;
  hint?: string;
  reply?: Line[];
  effect?: Effect;
  requiresFlag?: string;
  hideIfFlag?: string;
}

export interface Line {
  speaker: SpeakerId;
  text: string;
  mood?: Mood;
  cast?: SpeakerId[];
  bg?: string;
  music?: MusicKey;
  sfx?: SfxKey;
  effect?: Effect;
  choices?: Choice[];
  ifFlag?: string;
  ifNotFlag?: string;
  ifEvidence?: string;
  ifNotEvidence?: string;
  ifAllEvidence?: string[];
  emphasis?: boolean;
}

export interface Scene {
  id: string;
  chapter: number;
  title: string;
  bg: string;
  cast?: SpeakerId[];
  music?: MusicKey;
  ambience?: SfxKey;
  lines: Line[];
}

export interface Hotspot {
  id: string;
  room: string;
  label: string;
  name: string;
  /** approximate position in the room, percentages */
  x: number;
  y: number;
  art: EvidenceArtKind;
  description: string;
  found?: string;
  evidence?: string;
  note?: NoteEntry;
  flag?: string;
  requiresFlag?: string;
  requiresEvidence?: string;
  /** shown when the player examines it without the prerequisite */
  lockedText?: string;
  chapter: number;
}

export interface Room {
  id: string;
  name: string;
  subtitle: string;
  ambience: SfxKey;
  chapter: number;
  description: string;
}

export interface Topic {
  id: string;
  suspect: SuspectId;
  label: string;
  chapter: number;
  requiresFlag?: string;
  requiresEvidence?: string[];
  minTrust?: number;
  hideIfFlag?: string;
  lines: Line[];
  effect?: Effect;
}

export interface EvidenceReaction {
  suspect: SuspectId;
  evidence: string;
  lines: Line[];
  effect?: Effect;
}

export interface Objective {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  done: (progress: ProgressView) => boolean;
}

export interface ProgressView {
  evidence: string[];
  deductions: string[];
  flags: Record<string, string | number | boolean>;
  trust: Record<SuspectId, number>;
  topicsAsked: string[];
  roomsVisited: string[];
  examined: string[];
  chapter: number;
  accused: Record<SuspectId, number>;
  notes: NoteEntry[];
  decisions: { id: string; chapter: number; question: string; answer: string }[];
}

export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  era: string;
  synopsis: string;
  introScene: string;
  closingScene: string;
  rooms: string[];
  suspects: SuspectId[];
  objectives: Objective[];
  /** what the chapter needs before the player may close it */
  gate?: string;
}

export type EndingId = 'truth' | 'ashes' | 'silence' | 'witness';

export interface Settings {
  musicVolume: number;
  sfxVolume: number;
  textSpeed: number;
  reducedMotion: boolean;
  subtitles: boolean;
  muted: boolean;
}

export interface DialogueLogEntry {
  speaker: SpeakerId;
  speakerName: string;
  text: string;
}

export interface DialogueLog {
  id: string;
  chapter: number;
  title: string;
  entries: DialogueLogEntry[];
}

export interface DecisionRecord {
  id: string;
  chapter: number;
  question: string;
  answer: string;
}

export interface GameState {
  version: number;
  phase: Phase;
  chapter: number;
  sceneId: string | null;
  sceneKey: number;
  sceneReturn: 'hub' | 'ending';
  overlay: 'journal' | 'board' | 'settings' | null;
  appliedLines: string[];
  roomsVisited: string[];
  evidence: string[];
  deductions: string[];
  deductionAttempts: Record<string, number>;
  flags: Record<string, string | number | boolean>;
  trust: Record<SuspectId, number>;
  accused: Record<SuspectId, number>;
  interviewLocked: SuspectId[];
  topicsAsked: string[];
  notes: NoteEntry[];
  decisions: DecisionRecord[];
  dialogueLog: DialogueLog[];
  examined: string[];
  unlockedEndings: EndingId[];
  settings: Settings;
  ending: EndingId | null;
  finalChoice: string | null;
  activeRoom: string | null;
  activeSuspect: SuspectId | null;
  chapterSnapshot: string | null;
  startedAt: number;
  updatedAt: number;
}

export interface ToastNotice {
  id: string;
  kind: 'evidence' | 'deduction' | 'note' | 'trust' | 'info' | 'chapter';
  title: string;
  text?: string;
}
