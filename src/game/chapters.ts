import type { Chapter, ProgressView } from './types';

const has = (p: ProgressView, id: string) => p.evidence.includes(id);
const deduced = (p: ProgressView, id: string) => p.deductions.includes(id);
const flag = (p: ProgressView, id: string) => Boolean(p.flags[id]);
const asked = (p: ProgressView, id: string) => p.topicsAsked.includes(id);
const askedAny = (p: ProgressView, prefix: string) =>
  p.topicsAsked.some((t) => t.startsWith(prefix));

export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: 'The Invitation',
    subtitle: 'Rain on the drive',
    era: 'Night One',
    synopsis:
      'A card with no sender. A house with six guests and a murder with no body. Mara Vale arrives at Blackwood Manor and is shown the room where a man is said to have died.',
    introScene: 'ch1_intro',
    closingScene: 'ch1_close',
    rooms: ['foyer', 'study'],
    suspects: ['eleanor', 'charlotte', 'arthur', 'henry', 'richard', 'vivian'],
    objectives: [
      {
        id: 'c1_read',
        label: 'Read the black-sealed invitation',
        hint: 'It is in Mara\'s coat pocket, and in the journal.',
        required: true,
        done: (p) => has(p, 'invitation'),
      },
      {
        id: 'c1_scene',
        label: 'Examine the study: the blood and the revolver',
        hint: 'Two objects in the study contradict each other.',
        required: true,
        done: (p) => has(p, 'bloodstain') && has(p, 'revolver'),
      },
      {
        id: 'c1_photo',
        label: 'Find the old photograph',
        required: true,
        done: (p) => has(p, 'old_photo'),
      },
      {
        id: 'c1_meet',
        label: 'Speak with all six guests',
        hint: 'Ask each of them where they were on the night of the disappearance.',
        required: true,
        done: (p) =>
          ['eleanor', 'charlotte', 'arthur', 'henry', 'richard', 'vivian'].every((s) =>
            asked(p, `${s}_intro`),
          ),
      },
      {
        id: 'c1_foyer',
        label: 'Search the foyer for anything out of place',
        done: (p) => flag(p, 'window_checked') || flag(p, 'ash_found'),
      },
    ],
  },
  {
    id: 2,
    title: 'Six Stories',
    subtitle: 'Everyone remembers it differently',
    era: 'Night Two',
    synopsis:
      'Six alibis, six versions of a night that has no body. The dining room has been laid for seven. The library holds a story someone was paid to bury.',
    introScene: 'ch2_intro',
    closingScene: 'ch2_close',
    rooms: ['dining', 'drawing', 'library', 'study'],
    suspects: ['eleanor', 'charlotte', 'arthur', 'henry', 'richard', 'vivian'],
    objectives: [
      {
        id: 'c2_seating',
        label: 'Find the seating plan in the dining room',
        required: true,
        done: (p) => has(p, 'seating'),
      },
      {
        id: 'c2_ledger',
        label: 'Find the household ledger',
        required: true,
        done: (p) => has(p, 'ledger'),
      },
      {
        id: 'c2_draft',
        label: 'Read Vivian\'s unpublished article',
        required: true,
        done: (p) => has(p, 'article_draft'),
      },
      {
        id: 'c2_board',
        label: 'Make a connection on the evidence board',
        hint: 'Some evidence only means something beside another piece.',
        required: true,
        done: (p) => p.deductions.length >= 1,
      },
      {
        id: 'c2_past',
        label: 'Ask the household about twenty years ago',
        required: true,
        done: (p) => askedAny(p, 'eleanor_past') || askedAny(p, 'charlotte_past') || askedAny(p, 'henry_past'),
      },
      {
        id: 'c2_ash',
        label: 'Search the drawing room and library',
        done: (p) => p.examined.some((e) => e.startsWith('drawing_') || e.startsWith('library_')),
      },
    ],
  },
  {
    id: 3,
    title: 'The Locked Room',
    subtitle: 'A child\'s room, kept ready',
    era: 'Night Three',
    synopsis:
      'Behind a door no one discusses, a bedroom has been waiting for twenty years. The house has been paying to keep a girl alive and calling her dead.',
    introScene: 'ch3_intro',
    closingScene: 'ch3_close',
    rooms: ['corridor', 'sealed', 'library', 'drawing', 'garden'],
    suspects: ['eleanor', 'charlotte', 'arthur', 'henry', 'richard', 'vivian'],
    objectives: [
      {
        id: 'c3_key',
        label: 'Get the key to the sealed door',
        hint: 'Arthur carries a ring of keys. Ask him what the one without a lock is for.',
        required: true,
        done: (p) => flag(p, 'sealed_key'),
      },
      {
        id: 'c3_open',
        label: 'Open the sealed bedroom',
        required: true,
        done: (p) => flag(p, 'sealed_unlocked'),
      },
      {
        id: 'c3_diary',
        label: 'Read the childhood diary',
        required: true,
        done: (p) => has(p, 'diary'),
      },
      {
        id: 'c3_music',
        label: 'Find the music box',
        required: true,
        done: (p) => has(p, 'music_box'),
      },
      {
        id: 'c3_proof',
        label: 'Prove the child was hidden, not killed',
        hint: 'Connect the letter in the trunk to the diary.',
        required: true,
        done: (p) => deduced(p, 'evelyn_alive'),
      },
      {
        id: 'c3_photo',
        label: 'Find the garden photograph',
        done: (p) => has(p, 'garden_photo'),
      },
    ],
  },
  {
    id: 4,
    title: 'The Missing Name',
    subtitle: 'No birth, no school, no body',
    era: 'Night Four',
    synopsis:
      'Alexander Blackwood left no paper trail before 1994 and no footprints after 2006. The murder was staged — and the man it was staged for never existed.',
    introScene: 'ch4_intro',
    closingScene: 'ch4_close',
    rooms: ['study', 'cellar', 'library', 'garden'],
    suspects: ['eleanor', 'charlotte', 'arthur', 'henry', 'richard', 'vivian'],
    objectives: [
      {
        id: 'c4_safe',
        label: 'Open the study safe',
        hint: 'Richard Graves has been signing documents at that desk for twenty years.',
        required: true,
        done: (p) => flag(p, 'safe_open'),
      },
      {
        id: 'c4_birth',
        label: 'Recover the genealogist\'s report',
        required: true,
        done: (p) => has(p, 'birth_missing'),
      },
      {
        id: 'c4_passport',
        label: 'Find Alexander\'s passport',
        required: true,
        done: (p) => has(p, 'passport'),
      },
      {
        id: 'c4_typewriter',
        label: 'Find the machine that typed the murder note',
        required: true,
        done: (p) => has(p, 'typewriter'),
      },
      {
        id: 'c4_fiction',
        label: 'Prove Alexander Blackwood never legally existed',
        required: true,
        done: (p) => deduced(p, 'alexander_fiction'),
      },
      {
        id: 'c4_note',
        label: 'Identify who wrote the murder note',
        required: true,
        done: (p) => deduced(p, 'arthur_typed_it'),
      },
    ],
  },
  {
    id: 5,
    title: 'The Seventh Person',
    subtitle: 'The night the house burned',
    era: 'Night Five',
    synopsis:
      'One adult male, identity unconfirmed. One child, declared dead by her family. The fire brigade\'s report has been in a journalist\'s file for twenty years. There was never a murder — only a fire, and a lie built over it.',
    introScene: 'ch5_intro',
    closingScene: 'ch5_close',
    rooms: ['garden', 'cellar', 'library', 'corridor', 'study', 'sealed'],
    suspects: ['eleanor', 'charlotte', 'arthur', 'henry', 'richard', 'vivian'],
    objectives: [
      {
        id: 'c5_report',
        label: 'Recover the original fire brigade report',
        required: true,
        done: (p) => has(p, 'fire_report'),
      },
      {
        id: 'c5_tape',
        label: 'Listen to the Vivian tape',
        required: true,
        done: (p) => has(p, 'vivian_tape'),
      },
      {
        id: 'c5_nomurder',
        label: 'Establish that no murder took place',
        hint: 'The fire report and the tape belong together.',
        required: true,
        done: (p) => deduced(p, 'no_murder'),
      },
      {
        id: 'c5_locket',
        label: 'Connect the locket to the photograph',
        required: true,
        done: (p) => deduced(p, 'locket_evidence'),
      },
      {
        id: 'c5_ruth',
        label: 'Find Ruth Vale\'s letter',
        done: (p) => has(p, 'ruth_letter'),
      },
      {
        id: 'c5_recording',
        label: 'Confront the household with the recording',
        done: (p) => p.flags['confronted_with_tape'] === true,
      },
    ],
  },
  {
    id: 6,
    title: 'Home',
    subtitle: 'The last witness',
    era: 'Dawn',
    synopsis:
      'The house has been opened, the name has been undone, and the man at the door has been waiting longer than anyone. There is one question left, and only Mara can answer it.',
    introScene: 'ch6_intro',
    closingScene: 'ch6_final',
    rooms: ['drawing', 'sealed', 'library'],
    suspects: ['arthur', 'eleanor', 'charlotte', 'henry', 'richard', 'vivian'],
    objectives: [
      {
        id: 'c6_confront',
        label: 'Confront Arthur Finch',
        required: true,
        done: (p) => asked(p, 'arthur_confront'),
      },
      {
        id: 'c6_identity',
        label: 'Prove who the last witness is',
        hint: 'The burn record and the locket are the whole of it.',
        required: true,
        done: (p) => deduced(p, 'the_last_witness'),
      },
      {
        id: 'c6_others',
        label: 'Hear what the others have to say',
        done: (p) =>
          ['eleanor', 'charlotte', 'henry', 'richard', 'vivian'].every((s) =>
            asked(p, `${s}_final`),
          ),
      },
    ],
  },
];

export const CHAPTER_BY_ID: Record<number, Chapter> = Object.fromEntries(
  CHAPTERS.map((c) => [c.id, c]),
);

export function getChapter(id: number): Chapter {
  return CHAPTER_BY_ID[id] ?? CHAPTERS[0];
}

/** Required objectives completed for the current chapter. */
export function chapterProgress(progress: ProgressView) {
  const chapter = getChapter(progress.chapter);
  const required = chapter.objectives.filter((o) => o.required);
  const done = required.filter((o) => o.done(progress));
  return {
    required: required.length,
    done: done.length,
    complete: done.length === required.length,
    pending: required.filter((o) => !o.done(progress)),
  };
}

export const TOTAL_CHAPTERS = CHAPTERS.length;
