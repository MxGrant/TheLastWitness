import type { NoteEntry } from './types';

export interface TimelineEntry {
  id: string;
  date: string;
  year: string;
  title: string;
  text: string;
  requiresEvidence?: string[];
  requiresFlag?: string;
  chapter: number;
}

export const TIMELINE: TimelineEntry[] = [
  {
    id: 't1',
    date: '14 October 1993',
    year: '1993',
    title: 'A name is purchased',
    text: 'A man calling himself Alexander Blackwood marries Eleanor Wren, sole heiress of the Blackwood estate. There is no birth record for the groom. The marriage certificate is the first document in the world to carry his name.',
    requiresEvidence: ['birth_missing'],
    chapter: 4,
  },
  {
    id: 't2',
    date: '2 April 1996',
    year: '1996',
    title: 'Charlotte is born',
    text: 'Charlotte Blackwood is born at the manor, delivered by Dr Henry Ashford. The household ledger records a payment to the doctor and a case of champagne.',
    requiresEvidence: ['medical_letter'],
    chapter: 2,
  },
  {
    id: 't3',
    date: '9 June 1999',
    year: '1999',
    title: 'Evelyn is born',
    text: 'A second daughter, Evelyn, is born at the manor. The birth is registered quietly, in the mother\'s name only. Arthur Finch plants yellow roses along the east wall that summer.',
    requiresEvidence: ['garden_photo'],
    chapter: 3,
  },
  {
    id: 't4',
    date: 'Autumn 2005',
    year: '2005',
    title: 'The policy',
    text: 'A life policy is taken out on Alexander Blackwood with double indemnity for accidental death. Richard Graves witnesses it. No medical examination is recorded.',
    requiresEvidence: ['insurance'],
    chapter: 5,
  },
  {
    id: 't5',
    date: '14 October 2006, 23:47',
    year: '2006',
    title: 'The fire',
    text: 'The east wing burns. Fire crews recover one adult male, identified by his ring and watch. A child is reported missing, then declared dead by her family. The foyer clock stops at 11:47 and is never restarted.',
    requiresEvidence: ['fire_report', 'stopped_clock'],
    chapter: 5,
  },
  {
    id: 't6',
    date: '15 October 2006',
    year: '2006',
    title: 'Two certificates',
    text: 'Dr Ashford signs consecutive death certificates for Alexander and Evelyn Blackwood. Neither records a post-mortem. Eleanor Blackwood witnesses both. No funeral is held.',
    requiresEvidence: ['death_cert'],
    chapter: 4,
  },
  {
    id: 't7',
    date: '25 October 2006',
    year: '2006',
    title: 'The clinic in Carrow Street',
    text: 'A girl of about seven is brought to a clinic with a healed burn to her left palm. She does not speak. Her guardian gives the name Ruth Vale, and the child\'s name as Mara.',
    requiresEvidence: ['burn_note'],
    chapter: 3,
  },
  {
    id: 't8',
    date: '3 November 2006',
    year: '2006',
    title: 'The story is killed',
    text: 'Vivian Cross files a feature on the fire. It is spiked before print. A payment is recorded in Richard Graves\'s hand. In the margin of the draft: "KILL. £. V.C."',
    requiresEvidence: ['article_draft'],
    chapter: 2,
  },
  {
    id: 't9',
    date: 'Winter 2006–2007',
    year: '2007',
    title: 'The east wing is sealed',
    text: 'The east wing is bricked off. Evelyn\'s bedroom is sealed with its furniture inside. The household ledger begins quarterly payments to "R. Vale — maintenance", signed by Eleanor.',
    requiresEvidence: ['ledger', 'sealed_letter'],
    chapter: 3,
  },
  {
    id: 't10',
    date: '2007',
    year: '2007',
    title: 'The insurance pays',
    text: 'The estate receives a payout for fire damage and a life policy. The company keeps filing accounts in Alexander\'s name. The signature is never the same twice.',
    requiresEvidence: ['insurance', 'shell_company'],
    chapter: 5,
  },
  {
    id: 't11',
    date: '2011',
    year: '2011',
    title: 'The genealogist',
    text: 'Richard Graves commissions a search for Alexander\'s birth record. The search returns nothing. Richard files the report in the study safe and tells no one.',
    requiresEvidence: ['birth_missing'],
    chapter: 4,
  },
  {
    id: 't12',
    date: '14 October 2016',
    year: '2016',
    title: 'A grave is tended',
    text: 'Yellow roses appear on an unused grave in the family plot. The gardener\'s shed is swept, the typewriter oiled, a child\'s toy rabbit dusted. Arthur Finch has been keeping a room ready for twenty years.',
    requiresFlag: 'evelyn_survived',
    chapter: 3,
  },
  {
    id: 't13',
    date: '3 weeks ago',
    year: '2026',
    title: 'The final payment',
    text: 'The last quarterly payment to R. Vale leaves the estate. Ruth Vale died three years earlier. Arthur continues to pay a dead woman\'s account so the ledger will look undisturbed.',
    requiresEvidence: ['ledger'],
    chapter: 2,
  },
  {
    id: 't14',
    date: '14 November 2026',
    year: '2026',
    title: 'The invitation',
    text: 'A cream card sealed in black wax is delivered by hand to an investigator on Carrow Street. Six people are summoned back to Blackwood Manor. A murder is staged in the study with blood from the kitchen, wax from the shed and a note from Arthur\'s typewriter.',
    requiresEvidence: ['invitation', 'typewriter'],
    chapter: 4,
  },
  {
    id: 't15',
    date: '16 November 2026',
    year: '2026',
    title: 'The last witness returns',
    text: 'Mara Vale walks up the drive of Blackwood Manor in the rain. She has been here before. The house has been waiting for her for twenty years, and so has the man at the door.',
    requiresFlag: 'mara_is_evelyn',
    chapter: 6,
  },
];

export const NOTES_PREAMBLE: NoteEntry[] = [
  {
    id: 'note_case',
    title: 'The Case as It Stands',
    text: 'Alexander Blackwood is said to have been murdered in his study on the night of the fourteenth. No body has been found. Six people were in the house. The household staff, Arthur Finch, telephoned for me — though he will not say who gave him my number. The rain has not stopped since I arrived.',
    chapter: 1,
  },
];
