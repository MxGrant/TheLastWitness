import type { Deduction } from './types';

/**
 * Thirteen connections the player can make on the evidence board.
 * `a` and `b` are unordered — the board accepts either order.
 */
export const DEDUCTIONS: Deduction[] = [
  {
    id: 'seventh_place',
    chapter: 1,
    a: 'old_photo',
    b: 'guestlist',
    title: 'The Seventh Place',
    result:
      'Six names on the list, six guests in the house — and a seventh line erased from the paper. The girl in the photograph is not one of them. Someone has been counted out of this house.',
    note: 'The guest list has a missing line. The photograph has a child in it. Six suspects, seven places — the house is expecting someone else.',
    flag: 'seventh_chair',
  },
  {
    id: 'staged_blood',
    chapter: 2,
    a: 'bloodstain',
    b: 'revolver',
    title: 'Blood Without a Body',
    result:
      'One round fired from the revolver, long ago, and a stain poured into a carpet with no spatter, no drag marks and no body. This is not a crime scene. It is a set.',
    note: 'The murder was staged: poured blood, an old bullet, a note left to be found. Someone wants us to investigate a death that has not happened.',
    flag: 'staged_scene',
    essential: true,
  },
  {
    id: 'hush_money',
    chapter: 2,
    a: 'ledger',
    b: 'article_draft',
    title: 'The Price of Silence',
    result:
      'The estate pays a "R. Vale" every quarter. A journalist was paid in the same period to kill a story about a fire. Two sets of payments, one purpose: keep the house quiet.',
    note: 'Richard\'s red pen is on Vivian\'s article. Eleanor\'s signature is on the Vale payments. The silence was purchased, and it is still being paid for.',
    flag: 'hush_money',
    essential: true,
  },
  {
    id: 'certificate_clock',
    chapter: 2,
    a: 'medical_letter',
    b: 'ledger',
    title: 'The Wrong Date',
    result:
      'The doctor\'s unsent letter speaks of a certificate dated the fifteenth for a child who died on the fourteenth. The ledger shows the payments began that same autumn. The house buried a child and then paid to keep her buried.',
    note: 'Certificates dated a day late, payments starting a week later. Whatever happened in the east wing, the paperwork was written afterwards — to cover it.',
    flag: 'paid_after_fire',
  },
  {
    id: 'evelyn_alive',
    chapter: 3,
    a: 'sealed_letter',
    b: 'diary',
    title: 'The Child Who Was Hidden',
    result:
      'Eleanor ordered a name struck from a register and a grave marked but never used. The diary ends with Arthur calling a child out of a burning house. Evelyn Blackwood did not die in that fire. She was taken.',
    note: 'The grave in the garden is empty. The certificate is a lie. Arthur carried a seven-year-old girl out of the east wing and told the family she was dead.',
    flag: 'evelyn_survived',
    essential: true,
  },
  {
    id: 'borrowed_melody',
    chapter: 3,
    a: 'music_box',
    b: 'garden_photo',
    title: 'A Borrowed Melody',
    result:
      'The music box plays eight bars Mara has hummed her whole life. The photograph shows the girl who owned it, laughing with the man who gave it to her. Memory does not need a witness. It only needs a key.',
    note: 'The melody is not mine. It was given to me, before I could remember being given anything. Arthur is in the photograph. Arthur is in the shed.',
    flag: 'memory_link',
  },
  {
    id: 'the_scar',
    chapter: 3,
    a: 'burn_note',
    b: 'diary',
    title: 'The Same Left Hand',
    result:
      'A child pulled out of a fire with a burned left palm. A clinic record for a girl called Mara Vale with the same scar, eleven days later. The diary says the child did not want to leave her rabbit. The record says the patient did not speak.',
    note: 'The clinic is four streets from my office. The scar on my hand is not an accident I cannot remember. It is the last thing that house did to me.',
    flag: 'scar_match',
  },
  {
    id: 'alexander_fiction',
    chapter: 4,
    a: 'birth_missing',
    b: 'passport',
    title: 'The Man Who Never Was',
    result:
      'No birth record, no school, no papers before 1994 — then a marriage certificate and twelve years of signatures. Alexander Blackwood was not born. He was assumed. And after 2006, even the signature was being written by other hands.',
    note: 'Alexander Blackwood is a name bought with a marriage. The estate has been run for twenty years on a dead man\'s signature. The victim of this murder does not exist.',
    flag: 'alexander_fiction',
    essential: true,
  },
  {
    id: 'same_hand',
    chapter: 4,
    a: 'death_cert',
    b: 'medical_record',
    title: 'Two Deaths, One Pen',
    result:
      'Two certificates, consecutive numbers, one doctor, one night. The medical notes underneath tell a different story: a man identified by his ring and watch, and no child\'s body at all. The doctor wrote what the house needed him to write.',
    note: 'Henry Ashford certified a man he could not identify and a child whose body was never found. He has been drinking about it for twenty years.',
    flag: 'forged_records',
    essential: true,
  },
  {
    id: 'arthur_typed_it',
    chapter: 4,
    a: 'staged_note',
    b: 'typewriter',
    title: 'The Butler\'s Machine',
    result:
      'A dropped e and a crooked t on the note in the study. The same dropped e and crooked t on the machine in the garden shed, still warm, with the wax and the seal stand beside it. Arthur Finch wrote the murder.',
    note: 'Arthur staged the crime scene — the blood, the bullet, the note. He is not covering a murder. He is manufacturing one.',
    flag: 'arthur_staged',
    essential: true,
  },
  {
    id: 'no_murder',
    chapter: 5,
    a: 'fire_report',
    b: 'vivian_tape',
    title: 'There Was Never a Murder',
    result:
      'The fire brigade found one adult male, identity unconfirmed, and a child the family said was already dead. Eleanor paid a journalist to keep the door closed. Arthur\'s voice on the tape: "She asked me to leave her in the garden. I did not." Alexander Blackwood died twenty years ago. There is no body in the study because there is no murder to have a body.',
    note: 'The murder I was invited to solve never happened. The death that did happen was buried twenty years ago by everyone in this house, and the only innocent person in it was a child.',
    flag: 'no_murder',
    essential: true,
  },
  {
    id: 'locket_evidence',
    chapter: 5,
    a: 'locket',
    b: 'garden_photo',
    title: 'The Girl in the Photograph',
    result:
      'A locket worn since childhood, scratched with E.B. A photograph of a girl wearing the same locket, held by the same man who has spent twenty years paying for her upkeep. The girl in the garden grew up. She came back with an invitation in her pocket.',
    note: 'I am not investigating Evelyn Blackwood. I have been investigating myself, and every door in this house has been opened for me by the man who took me out of it.',
    flag: 'locket_match',
  },
  {
    id: 'the_last_witness',
    chapter: 6,
    a: 'burn_note',
    b: 'locket',
    title: 'The Last Witness',
    result:
      'A burn on a child\'s left palm. A locket with three letters scratched inside it. A clinic record eleven days after a funeral that never happened. Mara Vale is Evelyn Blackwood — the seventh place at the table, the name struck from the register, the girl Arthur carried out of the fire.',
    note: 'Everyone remembers the murder. Nobody remembers the victim. I was the victim, and I have been standing in this house for three days, asking questions about a man who never existed.',
    flag: 'mara_is_evelyn',
    essential: true,
  },
];

export const DEDUCTION_BY_ID: Record<string, Deduction> = Object.fromEntries(
  DEDUCTIONS.map((d) => [d.id, d]),
);

export function matchDeduction(a: string, b: string): Deduction | undefined {
  return DEDUCTIONS.find(
    (d) => (d.a === a && d.b === b) || (d.a === b && d.b === a),
  );
}

export function deductionPairKey(a: string, b: string): string {
  return [a, b].sort().join('+');
}
