import type { Line, SuspectId, Topic, EvidenceReaction } from './types';

/**
 * All interrogation content lives here, in structured data.
 * Topics unlock by chapter, trust, flags or evidence; evidence reactions
 * are keyed by suspect and evidence id.
 */
export const TOPICS: Topic[] = [
  /* ------------------------------------------------------------------ */
  /* ELEANOR                                                             */
  /* ------------------------------------------------------------------ */
  {
    id: 'eleanor_intro',
    suspect: 'eleanor',
    label: 'Where were you when he disappeared?',
    chapter: 1,
    lines: [
      {
        speaker: 'eleanor',
        text: 'In the drawing room, with my daughter. We were not speaking. It is a family talent.',
        mood: 'cold',
      },
      {
        speaker: 'eleanor',
        text: 'At eleven I went up. Arthur found the study at five to. He telephoned you before he telephoned the police. I have wondered about that.',
      },
      {
        speaker: 'mara',
        text: 'You said "he was". Not "he is".',
        mood: 'calm',
      },
      {
        speaker: 'eleanor',
        text: 'My husband has been gone for twenty years, Miss Vale. The only thing that changed last night is that someone finally put a stain on the carpet.',
        mood: 'cold',
        effect: { trust: { eleanor: 2 } },
      },
    ],
  },
  {
    id: 'eleanor_marriage',
    suspect: 'eleanor',
    label: 'What was your marriage like?',
    chapter: 2,
    lines: [
      {
        speaker: 'eleanor',
        text: 'It was an arrangement that produced two daughters, a house that leaks, and a great deal of paper. I did not marry for conversation.',
        mood: 'cold',
      },
      {
        speaker: 'mara',
        text: 'Did you love him?',
      },
      {
        speaker: 'eleanor',
        text: 'I loved the idea of being someone who was not afraid. He was very good at supplying that idea. He was less good at the rest.',
        mood: 'sad',
      },
      {
        speaker: 'eleanor',
        text: 'When he was in a certain mood I took the girls to the east wing and we played at being furniture. That is what a marriage is, sometimes. Learning which rooms are safe.',
        mood: 'cold',
      },
    ],
    effect: { trust: { eleanor: 3 } },
  },
  {
    id: 'eleanor_past',
    suspect: 'eleanor',
    label: 'What happened twenty years ago?',
    chapter: 2,
    lines: [
      {
        speaker: 'eleanor',
        text: 'There was a fire in the east wing. My husband was in it. My youngest daughter was not.',
        mood: 'cold',
      },
      {
        speaker: 'mara',
        text: 'Not in the fire?',
      },
      {
        speaker: 'eleanor',
        text: 'Not in the house. She was... it was decided that she had died. There is a certificate. I do not propose to discuss it with a stranger in a wet coat.',
        mood: 'cold',
      },
      { speaker: 'mara', text: 'Who decided?' },
      {
        speaker: 'eleanor',
        text: 'People who understood what a scandal does to a estate. People who were tired. People who had a doctor in the room at midnight.',
        mood: 'sad',
        effect: {
          trust: { eleanor: -4 },
          notes: [
            {
              id: 'note_eleanor_past',
              title: 'Eleanor\'s Slip',
              text: 'Eleanor says Evelyn was not in the house during the fire — then corrects herself to "it was decided that she had died". Someone decided. A doctor was in the room at midnight.',
              chapter: 2,
            },
          ],
        },
      },
    ],
  },
  {
    id: 'eleanor_invited',
    suspect: 'eleanor',
    label: 'Why were you invited back?',
    chapter: 2,
    lines: [
      {
        speaker: 'eleanor',
        text: 'A card. Black seal. "Come home, Eleanor. The house is being exhumed."',
        mood: 'cold',
      },
      { speaker: 'mara', text: 'And you came.' },
      {
        speaker: 'eleanor',
        text: 'I have spent twenty years keeping this house standing. I am not going to stand in London and read about it falling down in the newspapers.',
        mood: 'cold',
      },
      {
        speaker: 'mara',
        text: 'And your daughters?',
      },
      {
        speaker: 'eleanor',
        text: 'Charlotte came because she wanted to see me afraid. I came because I am.',
        mood: 'sad',
      },
    ],
  },
  {
    id: 'eleanor_ledger',
    suspect: 'eleanor',
    label: 'Who is R. Vale?',
    chapter: 2,
    requiresEvidence: ['ledger'],
    lines: [
      {
        speaker: 'eleanor',
        text: 'A former housekeeper. She left in 2006. The payments are a pension, nothing more.',
        mood: 'cold',
      },
      {
        speaker: 'mara',
        text: 'A pension that rises every year, for a housekeeper who left before your daughter was born? And the surname is on a clinic record for a child with a burned hand.',
      },
      {
        speaker: 'eleanor',
        text: 'You are inventing a narrative out of housekeeping, Miss Vale. It is what people do when they cannot bear the ordinary explanation.',
        mood: 'angry',
      },
      {
        speaker: 'mara',
        text: 'The ordinary explanation is a lie, Mrs Blackwood. I have seen the ledger. You sign it four times a year.',
      },
      {
        speaker: 'eleanor',
        text: '...Then you know that some bills are paid for the rest of one\'s life. Do not ask me to name what they are for. Not yet.',
        mood: 'broken',
        effect: {
          trust: { eleanor: -6 },
          flags: { eleanor_cornered: true },
        },
      },
    ],
  },
  {
    id: 'eleanor_hiding',
    suspect: 'eleanor',
    label: 'What are you hiding?',
    chapter: 3,
    lines: [
      {
        speaker: 'eleanor',
        text: 'I am hiding the fact that this house has no money, that my husband was a liar, and that my daughter draws burning houses on napkins. None of it is a crime.',
        mood: 'cold',
      },
      { speaker: 'mara', text: 'You are hiding a grave that has nobody in it.' },
      {
        speaker: 'eleanor',
        text: 'You went into the garden.',
        mood: 'fear',
      },
      {
        speaker: 'eleanor',
        text: 'There is a word for a woman who opens her house to an investigator and then complains when the investigator opens a door. I will not say it. Ask your next question.',
        mood: 'cold',
        effect: { trust: { eleanor: -8 } },
      },
    ],
  },
  {
    id: 'eleanor_letter',
    suspect: 'eleanor',
    label: 'You ordered her name struck from the register.',
    chapter: 3,
    minTrust: 25,
    requiresEvidence: ['sealed_letter'],
    lines: [
      {
        speaker: 'eleanor',
        text: 'I ordered a great many things in that year. I was burying a husband and a child in the same week, and the only person who offered to help was a solicitor with a pen.',
        mood: 'cold',
      },
      {
        speaker: 'mara',
        text: '"The grave is to be marked but not used." You knew there was no body.',
      },
      {
        speaker: 'eleanor',
        text: 'I knew there was no body because I had seen the garden. I saw a man carrying my daughter across the lawn in the rain at midnight, and I saw her face over his shoulder, and I chose to say that she had died in the east wing.',
        mood: 'broken',
      },
      { speaker: 'mara', text: 'Why?' },
      {
        speaker: 'eleanor',
        text: 'Because if she was alive, there would have to be an inquiry. And if there was an inquiry, the world would know what my husband was. I chose the house. I have been living in it ever since.',
        mood: 'broken',
        effect: {
          trust: { eleanor: -5 },
          flags: { eleanor_confessed: true },
          notes: [
            {
              id: 'note_eleanor_letter',
              title: 'Eleanor\'s Confession',
              text: 'Eleanor saw Arthur carry Evelyn across the lawn during the fire. She let the world believe the child burned, to protect the family from an inquiry into Alexander. She has known Evelyn lived for twenty years.',
              chapter: 3,
            },
          ],
        },
      },
    ],
  },
  {
    id: 'eleanor_tape',
    suspect: 'eleanor',
    label: 'I have your voice on a tape.',
    chapter: 5,
    requiresEvidence: ['vivian_tape'],
    lines: [
      {
        speaker: 'eleanor',
        text: 'That woman has been carrying that recording for twenty years like a knife she was never brave enough to use.',
        mood: 'angry',
      },
      {
        speaker: 'mara',
        text: '"The child is a closed door. I will pay for the door to stay closed." You paid to keep a seven-year-old buried.',
      },
      {
        speaker: 'eleanor',
        text: 'I paid to keep her out of the papers. There is a difference, and it is smaller than I would like.',
        mood: 'sad',
      },
      {
        speaker: 'mara',
        text: 'Did you ever look for her?',
      },
      {
        speaker: 'eleanor',
        text: 'Once. In 2011, when the payments were audited, I asked Arthur where she was. He said: "Somewhere the rain does not get in." I did not ask again. I told myself that was mercy.',
        mood: 'broken',
        effect: {
          flags: { confronted_with_tape: true, eleanor_confessed: true },
          trust: { eleanor: -10 },
        },
      },
    ],
  },
  {
    id: 'eleanor_final',
    suspect: 'eleanor',
    label: 'Tell me what you see in me.',
    chapter: 6,
    requiresFlag: 'mara_is_evelyn',
    lines: [
      {
        speaker: 'eleanor',
        text: 'Since you came into this house, I have been unable to look at you directly. I told myself it was dislike.',
        mood: 'broken',
      },
      {
        speaker: 'mara',
        text: 'It was not dislike.',
      },
      {
        speaker: 'eleanor',
        text: 'No. You hold your head the way my husband did when he was about to lose his temper. And you have a scar on your left hand that you keep touching when you think I am not looking.',
        mood: 'sad',
      },
      {
        speaker: 'eleanor',
        text: 'I have imagined this conversation a thousand times, and in every version I was braver. I am sorry. That is the entire content of twenty years, Miss Vale, and it is not enough.',
        mood: 'broken',
        effect: { trust: { eleanor: 15 }, flags: { eleanor_saw_mara: true } },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* CHARLOTTE                                                           */
  /* ------------------------------------------------------------------ */
  {
    id: 'charlotte_intro',
    suspect: 'charlotte',
    label: 'Where were you when he disappeared?',
    chapter: 1,
    lines: [
      {
        speaker: 'charlotte',
        text: 'On the terrace, ruining my lungs, until the rain won. Then I came in, had a drink, and went to bed like a good girl.',
        mood: 'smirk',
      },
      {
        speaker: 'charlotte',
        text: 'If he is dead, I inherit everything. So you will forgive me if I do not look sufficiently devastated. He was not a father. He was a man who happened to be in the house.',
      },
      { speaker: 'mara', text: 'You do not believe he is dead.' },
      {
        speaker: 'charlotte',
        text: 'It is raining, there is a woman with a notebook in my house, and nobody has shown me a body. I have believed stranger things. But not many.',
        mood: 'cold',
        effect: { trust: { charlotte: 4 } },
      },
    ],
  },
  {
    id: 'charlotte_terrace',
    suspect: 'charlotte',
    label: 'What did you see from the terrace?',
    chapter: 2,
    lines: [
      {
        speaker: 'charlotte',
        text: 'Rain. A hedge. June\'s roses going over. And Arthur, around half eleven, crossing the lawn from the east wing with his coat off and something wrapped in it.',
        mood: 'cold',
      },
      { speaker: 'mara', text: 'Something wrapped in it.' },
      {
        speaker: 'charlotte',
        text: 'It was dark and I was drunk. That is the honest answer. But I have thought about it every night for twenty years, and it is the same shape in my head every time: a man carrying a child.',
        mood: 'fear',
        effect: {
          trust: { charlotte: 8 },
          flags: { charlotte_saw_child: true },
          notes: [
            {
              id: 'note_charlotte_terrace',
              title: 'Charlotte on the Terrace',
              text: 'Charlotte saw Arthur crossing the lawn on the night of the fire, coat off, something the shape of a child in his arms. Twenty years later she named the shape without hesitating.',
              chapter: 2,
            },
          ],
        },
      },
    ],
  },
  {
    id: 'charlotte_father',
    suspect: 'charlotte',
    label: 'What kind of man was Alexander?',
    chapter: 2,
    lines: [
      {
        speaker: 'charlotte',
        text: 'The kind who bought a name and then discovered that a name does not come with a history. He invented being a Blackwood the way one invents a signature.',
        mood: 'cold',
      },
      { speaker: 'mara', text: 'Did he hurt you?' },
      {
        speaker: 'charlotte',
        text: 'He hurt the furniture. He hurt the walls. Once he hurt my mother so badly that Henry spent the night. He never laid a finger on us, because Arthur made sure we were in the east wing when he was in a mood.',
        mood: 'sad',
      },
      {
        speaker: 'charlotte',
        text: 'That is a difficult sort of person to mourn. I have not managed it.',
        mood: 'cold',
        effect: { trust: { charlotte: 5 } },
      },
    ],
  },
  {
    id: 'charlotte_past',
    suspect: 'charlotte',
    label: 'What happened twenty years ago?',
    chapter: 2,
    lines: [
      {
        speaker: 'charlotte',
        text: 'I was nine. My mother woke me at midnight and put me in a coat, and we stood in the garden while the east wing burned, and then a doctor came and gave me something to make me sleep.',
        mood: 'cold',
      },
      {
        speaker: 'charlotte',
        text: 'In the morning they said my sister was dead, and they said it in the past tense so many times that I began to believe I had made her up.',
        mood: 'sad',
      },
      { speaker: 'mara', text: 'Did you see her?' },
      {
        speaker: 'charlotte',
        text: 'I saw a shape in the garden. Then I saw the fire. Whatever memory I had of my sister after that, my mother said was the sedative talking. I have never entirely trusted my own eyes since.',
        mood: 'fear',
        effect: { trust: { charlotte: 6 } },
      },
    ],
  },
  {
    id: 'charlotte_doll',
    suspect: 'charlotte',
    label: 'Why do you carry a child\'s doll?',
    chapter: 2,
    requiresEvidence: ['doll'],
    lines: [
      {
        speaker: 'charlotte',
        text: 'That is not a doll. That is my sister. Or it is the only part of her that anyone in this house has been allowed to keep.',
        mood: 'sad',
      },
      {
        speaker: 'mara',
        text: 'The name on the hem was stitched by a child. Someone has since added an M in gold thread.',
      },
      {
        speaker: 'charlotte',
        text: 'I added it. She used to sign her drawings M by mistake, before she learned the E. I thought if she ever came back, she might see it and remember that someone kept her things.',
        mood: 'broken',
      },
      { speaker: 'mara', text: 'You believe she came back.' },
      {
        speaker: 'charlotte',
        text: 'I have been paying for a grave that nobody is in for nineteen years, Miss Vale. I have been waiting for my sister to come back for longer than she was alive. So yes. When a woman walks into this house with her shoulders and her frown, I look twice.',
        mood: 'fear',
        effect: {
          trust: { charlotte: 12 },
          flags: { charlotte_knows: true },
          notes: [
            {
              id: 'note_charlotte_doll',
              title: 'Charlotte\'s Waiting',
              text: 'Charlotte kept Evelyn\'s doll and has paid for the empty grave for nineteen years. She added an M to the doll\'s hem in gold thread in case her sister ever came home and remembered her own handwriting.',
              chapter: 2,
            },
          ],
        },
      },
    ],
  },
  {
    id: 'charlotte_melody',
    suspect: 'charlotte',
    label: 'Where did that waltz come from?',
    chapter: 3,
    requiresEvidence: ['music_box'],
    lines: [
      {
        speaker: 'charlotte',
        text: 'Where did you learn that? Do not tell me you heard it somewhere. Nobody plays it. I have not heard it since I was nine years old.',
        mood: 'fear',
      },
      {
        speaker: 'mara',
        text: 'I have hummed it my whole life. I thought it was a tune I invented.',
      },
      {
        speaker: 'charlotte',
        text: 'It was hers. She wound that box until the key came off in her hand. Arthur gave it to her for her seventh birthday, and she played it at the window every night it rained, and it stopped on that note — the broken one — every single time.',
        mood: 'sad',
      },
      {
        speaker: 'charlotte',
        text: 'You are humming my sister\'s music in my mother\'s drawing room and you look like you are waiting for a train. How are you so calm?',
        mood: 'broken',
      },
      {
        speaker: 'mara',
        text: 'Because if I am not calm, I will not be able to finish this.',
      },
      {
        speaker: 'charlotte',
        text: 'Then finish it. And when you are done, whatever you find out — do not leave without telling me.',
        mood: 'sad',
        effect: { trust: { charlotte: 14 }, flags: { charlotte_heard_melody: true } },
      },
    ],
  },
  {
    id: 'charlotte_hiding',
    suspect: 'charlotte',
    label: 'What are you hiding?',
    chapter: 3,
    lines: [
      {
        speaker: 'charlotte',
        text: 'A pack of cigarettes in a house where my mother searches drawers. An unpaid gallery invoice. The fact that I paint the same burning wing every month and cannot stop.',
        mood: 'smirk',
      },
      { speaker: 'mara', text: 'And?' },
      {
        speaker: 'charlotte',
        text: 'And the doll. And the grave. And twenty years of wondering whether the shape in the garden was real. Take your pick. I am not the one in this house who is hiding well.',
        mood: 'sad',
        effect: { trust: { charlotte: 3 } },
      },
    ],
  },
  {
    id: 'charlotte_truth',
    suspect: 'charlotte',
    label: 'Tell me about your sister.',
    chapter: 5,
    requiresFlag: 'evelyn_survived',
    lines: [
      {
        speaker: 'charlotte',
        text: 'She was small and serious and she followed Arthur everywhere like a dog. She was afraid of the dark and she liked the rain because it meant the house was loud enough that nobody could hear Father shout.',
        mood: 'sad',
      },
      {
        speaker: 'charlotte',
        text: 'She had a locket with a curl of my mother\'s hair in it. She said it was a secret, because Father did not like her having anything that was only hers.',
        mood: 'warm',
      },
      { speaker: 'mara', text: 'What would you say to her, if she were here?' },
      {
        speaker: 'charlotte',
        text: 'I would say: I was nine. I am sorry I stopped saying your name. I am sorry I let them make you a grave.',
        mood: 'broken',
        effect: { trust: { charlotte: 10 }, flags: { charlotte_said_sorry: true } },
      },
    ],
  },
  {
    id: 'charlotte_final',
    suspect: 'charlotte',
    label: 'I think your sister survived.',
    chapter: 6,
    lines: [
      {
        speaker: 'charlotte',
        text: 'You say it like it is evidence. You should hear how you say it. You do that thing with your jaw when you are certain, like a child holding her breath.',
        mood: 'fear',
      },
      {
        speaker: 'charlotte',
        text: 'I have spent my whole life in this house being the unreliable one. The hysterical one. The one who was nine.',
        mood: 'sad',
      },
      {
        speaker: 'charlotte',
        text: 'So I will say this once, plainly. Whatever you decide to do with this family, I will stand beside you. Even if you decide against it.',
        mood: 'warm',
        effect: { trust: { charlotte: 10 }, flags: { charlotte_ally: true } },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* ARTHUR                                                              */
  /* ------------------------------------------------------------------ */
  {
    id: 'arthur_intro',
    suspect: 'arthur',
    label: 'Where were you when he disappeared?',
    chapter: 1,
    lines: [
      {
        speaker: 'arthur',
        text: 'In the greenhouse, locking up. I came in at five to eleven and found the study as you saw it.',
        mood: 'calm',
      },
      { speaker: 'mara', text: 'And you telephoned me before the police.' },
      {
        speaker: 'arthur',
        text: 'I had your card in my pocket, madam. Someone who found a scene like that might reasonably think of an investigator before an inspector.',
        mood: 'calm',
      },
      { speaker: 'mara', text: 'Who gave you my card?' },
      {
        speaker: 'arthur',
        text: 'It came with the post. As did your invitation, I imagine.',
        mood: 'calm',
        effect: { trust: { arthur: 4 }, flags: { arthur_evasive: true } },
      },
    ],
  },
  {
    id: 'arthur_house',
    suspect: 'arthur',
    label: 'What is this house to you?',
    chapter: 1,
    lines: [
      {
        speaker: 'arthur',
        text: 'I came here in 1985, to turn the beds and hear the servants\' grievances. There are no servants now. There is only me and the grievances.',
        mood: 'calm',
      },
      {
        speaker: 'arthur',
        text: 'A house remembers what its people agree to forget. This one has been very well kept. You may take that as a compliment or a warning.',
        mood: 'cold',
      },
      { speaker: 'mara', text: 'Which is it?' },
      {
        speaker: 'arthur',
        text: 'Both, madam. It is usually both.',
        mood: 'calm',
        effect: { trust: { arthur: 3 } },
      },
    ],
  },
  {
    id: 'arthur_past',
    suspect: 'arthur',
    label: 'What happened twenty years ago?',
    chapter: 2,
    lines: [
      {
        speaker: 'arthur',
        text: 'A lamp was knocked over in the east wing. The wind took it. The master was inside. The child was not.',
        mood: 'calm',
      },
      { speaker: 'mara', text: 'That is a very tidy account.' },
      {
        speaker: 'arthur',
        text: 'I have had twenty years to tidy it, madam.',
        mood: 'cold',
      },
      {
        speaker: 'mara',
        text: 'You were a gardener then, not a butler. You were in the garden that night.',
      },
      {
        speaker: 'arthur',
        text: 'I was where I was needed. If you will excuse me, there is a house to keep.',
        mood: 'calm',
        effect: { trust: { arthur: -5 }, notes: [
          {
            id: 'note_arthur_past',
            title: 'Arthur\'s Tidy Account',
            text: 'Arthur answers questions about the fire as though he has answered them many times before, always in the same order and with the same words. In the ledger of this house, Arthur Finch was a gardener. So why was he the first to find the study?',
            chapter: 2,
          },
        ] },
      },
    ],
  },
  {
    id: 'arthur_keys',
    suspect: 'arthur',
    label: 'What is the key that fits no lock?',
    chapter: 3,
    lines: [
      {
        speaker: 'arthur',
        text: 'There are eleven keys on this ring and eleven locks in this house. The twelfth key belongs to a door that has nothing behind it.',
        mood: 'calm',
      },
      { speaker: 'mara', text: 'You oiled it recently.' },
      {
        speaker: 'arthur',
        text: 'A lock that is never turned will seize. I keep it in working order. That is what a housekeeper does.',
        mood: 'cold',
      },
      {
        speaker: 'mara',
        text: 'Arthur. There is a bedroom behind that door with a child\'s bed in it. I need to open it.',
      },
      {
        speaker: 'arthur',
        text: '...Then you had better have the key, madam. And I had better not be in the room when you use it. I have not been able to go in for a very long time.',
        mood: 'broken',
        effect: {
          flags: { sealed_key: true },
          trust: { arthur: 8 },
          notes: [
            {
              id: 'note_sealed_key',
              title: 'The Twelfth Key',
              text: 'Arthur carries a key to the east corridor\'s sealed door and oils it. He could not bring himself to come inside. He has been maintaining a room for someone who was never supposed to return.',
              chapter: 3,
            },
          ],
        },
      },
    ],
  },
  {
    id: 'arthur_hiding',
    suspect: 'arthur',
    label: 'What are you hiding?',
    chapter: 3,
    lines: [
      {
        speaker: 'arthur',
        text: 'I am keeping this house, madam. There is a difference between hiding a thing and holding it together with both hands.',
        mood: 'calm',
      },
      { speaker: 'mara', text: 'You know what is behind that door.' },
      {
        speaker: 'arthur',
        text: 'I know what I put there. That is not the same as knowing what it means.',
        mood: 'sad',
        effect: { trust: { arthur: 2 } },
      },
    ],
  },
  {
    id: 'arthur_shed',
    suspect: 'arthur',
    label: 'The note in the study came from your typewriter.',
    chapter: 4,
    requiresEvidence: ['typewriter'],
    lines: [
      {
        speaker: 'arthur',
        text: 'Yes.',
        mood: 'calm',
      },
      { speaker: 'mara', text: 'You staged the murder.' },
      {
        speaker: 'arthur',
        text: 'I made a scene that would bring six guilty people back into one house, and I invited someone with the patience to read the room. I did not imagine you would be quite so thorough.',
        mood: 'calm',
      },
      { speaker: 'mara', text: 'Where is Alexander Blackwood?' },
      {
        speaker: 'arthur',
        text: 'Where he has been since 2006. In the east wing, madam. In a box with an unconfirmed identification. The blood is from the kitchen. The revolver was fired in 1994 and kept for the purpose.',
        mood: 'broken',
        effect: { trust: { arthur: 6 }, flags: { arthur_admitted_staging: true } },
      },
    ],
  },
  {
    id: 'arthur_tape',
    suspect: 'arthur',
    label: 'I have heard your voice on the tape.',
    chapter: 5,
    requiresEvidence: ['vivian_tape'],
    lines: [
      {
        speaker: 'arthur',
        text: 'Then you have heard the whole of it. "She asked me to leave her in the garden. I did not."',
        mood: 'sad',
      },
      { speaker: 'mara', text: 'You went back into a burning wing for a child you were not related to.' },
      {
        speaker: 'arthur',
        text: 'I went back for her because I had put her there. When the master was in a temper I took the girls into the east wing. That night I put her under the bed in the nursery and told her to stay, and then I went to my own room because I was afraid of him.',
        mood: 'broken',
      },
      {
        speaker: 'arthur',
        text: 'The lamp fell. I heard it. I could have run for the master first. I did not. I took the child, and I let the house burn the way it wanted to.',
        mood: 'broken',
      },
      { speaker: 'mara', text: 'You killed him.' },
      {
        speaker: 'arthur',
        text: 'I stood in the garden and I chose. That is near enough to killing for a man to carry to the grave.',
        mood: 'broken',
        effect: {
          trust: { arthur: 10 },
          flags: { arthur_confessed_fire: true },
          notes: [
            {
              id: 'note_arthur_fire',
              title: 'Arthur and the Fire',
              text: 'Arthur put Evelyn under the bed in the nursery that night to keep her away from Alexander. When the lamp fell, he chose to carry the child out and let Alexander burn. He has called it a choice for twenty years.',
              chapter: 5,
            },
          ],
        },
      },
    ],
  },
  {
    id: 'arthur_confront',
    suspect: 'arthur',
    label: 'Tell me who I am.',
    chapter: 6,
    lines: [
      {
        speaker: 'arthur',
        text: 'You are the woman I have been expecting since the day I wrote a stranger\'s name on an invitation, madam.',
        mood: 'calm',
      },
      { speaker: 'mara', text: 'Say it plainly.' },
      {
        speaker: 'arthur',
        text: 'You had a rabbit with one ear. You would not sleep unless the window was open and the rain could be heard. When you were small you burned your left hand on the door of the stove, and you did not cry, because I told you to be brave and you believed me.',
        mood: 'broken',
      },
      {
        speaker: 'mara',
        text: 'Evelyn.',
      },
      {
        speaker: 'arthur',
        text: 'Evelyn Blackwood, of the east wing. I put you in my sister\'s arms at three in the morning and told her to give you a name that was not this one. She called you Mara. She gave you her own surname. I sent money, and I never came.',
        mood: 'broken',
      },
      {
        speaker: 'arthur',
        text: 'I could not bring myself to visit. I told myself it was safer for you. It was safer for me.',
        mood: 'sad',
        effect: {
          trust: { arthur: 10 },
          flags: { arthur_confessed: true, arthur_confession: true },
          notes: [
            {
              id: 'note_arthur_confession',
              title: 'Arthur\'s Confession',
              text: 'Arthur carried me out of the east wing and gave me to his sister Ruth Vale. He arranged the payments, the new name, and the silence. He never came to see me. He staged this murder to bring me back, and to make the six people in this house tell me the truth themselves.',
              chapter: 6,
            },
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* DR ASHFORD                                                          */
  /* ------------------------------------------------------------------ */
  {
    id: 'henry_intro',
    suspect: 'henry',
    label: 'Where were you when he disappeared?',
    chapter: 1,
    lines: [
      {
        speaker: 'henry',
        text: 'In the library, in the wing chair. I had a brandy and a medical journal and I did not read a word of it.',
        mood: 'calm',
      },
      {
        speaker: 'henry',
        text: 'Then Arthur knocked and said there had been an incident, and I went to the study and I saw the blood and I thought: not again.',
        mood: 'fear',
      },
      { speaker: 'mara', text: 'Not again?' },
      {
        speaker: 'henry',
        text: 'I am a doctor of sixty-one with a bad liver and a worse memory. I misspeak. Take it down if you like, I have signed worse.',
        mood: 'sad',
        effect: { trust: { henry: 3 }, flags: { henry_slip: true } },
      },
    ],
  },
  {
    id: 'henry_practice',
    suspect: 'henry',
    label: 'How long have you served this family?',
    chapter: 2,
    lines: [
      {
        speaker: 'henry',
        text: 'Since Charlotte was born. I delivered her in the east wing on a night very like this one, except that the rain was warmer.',
        mood: 'sad',
      },
      {
        speaker: 'henry',
        text: 'I have signed the family into the world and out of it. Mostly in. That is the job: to be present at the two moments when everyone pretends the body is not the point.',
        mood: 'cold',
      },
      { speaker: 'mara', text: 'And out of it?' },
      {
        speaker: 'henry',
        text: 'I have signed two certificates in my life that I did not believe. I told myself it was a kindness. That is what men like me always say.',
        mood: 'sad',
        effect: { trust: { henry: 4 } },
      },
    ],
  },
  {
    id: 'henry_past',
    suspect: 'henry',
    label: 'What happened twenty years ago?',
    chapter: 2,
    lines: [
      {
        speaker: 'henry',
        text: 'I was telephoned at midnight. By the time I arrived the east wing was gone. They had a man on the lawn under a blanket and they would not let me look at his face.',
        mood: 'fear',
      },
      {
        speaker: 'henry',
        text: 'Eleanor said the child was dead. I asked where the body was. She said there had been a great deal of fire, and that it would be easier for everyone if I wrote it down.',
        mood: 'sad',
      },
      { speaker: 'mara', text: 'And you wrote it down.' },
      {
        speaker: 'henry',
        text: 'I wrote it down. I was younger and poorer and the Blackwood fee had been keeping my practice alive for a decade. I have been drinking to that signature ever since.',
        mood: 'broken',
        effect: {
          trust: { henry: 6 },
          notes: [
            {
              id: 'note_henry_past',
              title: 'Ashford at Midnight',
              text: 'Henry Ashford was called to the manor at midnight in 2006. He never saw the body, was told the child was dead, and signed both certificates because the family paid his practice\'s debts.',
              chapter: 2,
            },
          ],
        },
      },
    ],
  },
  {
    id: 'henry_cert',
    suspect: 'henry',
    label: 'You signed two certificates in one night.',
    chapter: 2,
    requiresEvidence: ['medical_letter'],
    lines: [
      {
        speaker: 'henry',
        text: 'Put that away. Put it away, please.',
        mood: 'fear',
      },
      { speaker: 'mara', text: 'The letter says the certificate is dated a day late.' },
      {
        speaker: 'henry',
        text: 'Because I wrote it the next morning! Do you understand what a house like this does to a man at midnight? There was a woman in a dressing gown with my coat over her shoulders, and a body under a blanket, and a child\'s bedroom burning, and she said: "Henry, make it tidy." So I made it tidy.',
        mood: 'broken',
      },
      {
        speaker: 'henry',
        text: 'I have kept the originals for twenty years. In my bag. Like a man carrying a stone in his chest because he is afraid of what happens if he puts it down.',
        mood: 'sad',
        effect: { trust: { henry: -4 }, flags: { henry_cornered: true } },
      },
    ],
  },
  {
    id: 'henry_records',
    suspect: 'henry',
    label: 'You treated a child eleven days after she died.',
    chapter: 3,
    minTrust: 25,
    requiresEvidence: ['burn_note'],
    lines: [
      {
        speaker: 'henry',
        text: 'Where did you get that? That is a clinic carbon. That should be in Carrow Street.',
        mood: 'fear',
      },
      {
        speaker: 'mara',
        text: 'It is in your bag. Along with a second record, twenty years later, for a woman with the same scar.',
      },
      {
        speaker: 'henry',
        text: 'Let me see your hand.',
        mood: 'fear',
      },
      {
        speaker: 'henry',
        text: '...The scar tissue is the same. The pattern of healing. Whoever treated that child did a bad job in a hurry, and you have carried it ever since.',
        mood: 'broken',
      },
      { speaker: 'mara', text: 'You know who I am.' },
      {
        speaker: 'henry',
        text: 'I know that a little girl was brought to a clinic by a woman called Ruth Vale, and that the child did not speak for a year. I know I could not write her real name on the form, because her real name was on a certificate I had signed.',
        mood: 'broken',
        effect: {
          trust: { henry: 12 },
          flags: { henry_recognised_mara: true },
          notes: [
            {
              id: 'note_henry_scar',
              title: 'The Doctor\'s Hands',
              text: 'Henry Ashford treated me in Carrow Street when I was seven, under the name Mara Vale. He recognised the scar before he recognised me. He has known I was alive for twenty years and said nothing.',
              chapter: 3,
            },
          ],
        },
      },
    ],
  },
  {
    id: 'henry_hiding',
    suspect: 'henry',
    label: 'What are you hiding?',
    chapter: 3,
    lines: [
      {
        speaker: 'henry',
        text: 'The originals. The real notes, the second certificate, the letter I never sent. I told myself I was keeping them in case I ever needed to prove my innocence.',
        mood: 'sad',
      },
      {
        speaker: 'henry',
        text: 'There is no such document. There is only proof of what I did. I have been carrying my own indictment around a house for twenty years, waiting for someone to ask.',
        mood: 'broken',
        effect: { trust: { henry: 8 }, flags: { henry_originals: true } },
      },
    ],
  },
  {
    id: 'henry_truth',
    suspect: 'henry',
    label: 'What really killed Alexander Blackwood?',
    chapter: 5,
    requiresFlag: 'no_murder',
    lines: [
      {
        speaker: 'henry',
        text: 'Smoke. Burns. A man of forty-five in a burning wing with a bottle in him. I could not identify him by face. I identified him by his ring and his watch, because that was what Richard put in front of me.',
        mood: 'sad',
      },
      {
        speaker: 'mara',
        text: 'And Evelyn?',
      },
      {
        speaker: 'henry',
        text: 'I never saw a child\'s body. Not that night, not ever. I wrote that she died because Eleanor asked me to, and because a scandal would have taken the house, and because — God forgive me — I genuinely believed she was better off dead than in this family.',
        mood: 'broken',
      },
      {
        speaker: 'henry',
        text: 'Then I met you in a clinic eleven days later, and I understood that I had helped a woman bury a living child. I have never recovered from it. I do not expect to.',
        mood: 'broken',
        effect: { trust: { henry: 10 }, flags: { henry_truth: true } },
      },
    ],
  },
  {
    id: 'henry_final',
    suspect: 'henry',
    label: 'Will you sign a new statement?',
    chapter: 6,
    lines: [
      {
        speaker: 'henry',
        text: 'I have written it already. Two pages. I have been writing it for twenty years in my head, and it took an embarrassing forty minutes to put on paper.',
        mood: 'sad',
      },
      {
        speaker: 'henry',
        text: 'I do not ask you to forgive me. I ask you to let me be a witness. It is the last useful thing I know how to be.',
        mood: 'broken',
        effect: { trust: { henry: 10 }, flags: { henry_witness: true } },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* RICHARD                                                             */
  /* ------------------------------------------------------------------ */
  {
    id: 'richard_intro',
    suspect: 'richard',
    label: 'Where were you when he disappeared?',
    chapter: 1,
    lines: [
      {
        speaker: 'richard',
        text: 'In this study, on the telephone to Singapore, until about ten. Then the dining room, alone, with a glass I did not finish.',
        mood: 'calm',
      },
      { speaker: 'mara', text: 'You were in the room where the murder happened, alone, at the time it happened.' },
      {
        speaker: 'richard',
        text: 'I was in the room where a stain was later discovered. There is no body, Miss Vale. In my experience, a body is the first requirement of a murder.',
        mood: 'smirk',
      },
      { speaker: 'mara', text: 'You do not think he is dead.' },
      {
        speaker: 'richard',
        text: 'I think Alexander Blackwood is a name that has been late for twenty years. Dead would be an improvement.',
        mood: 'cold',
        effect: { trust: { richard: 2 } },
      },
    ],
  },
  {
    id: 'richard_business',
    suspect: 'richard',
    label: 'What is your business with Blackwood?',
    chapter: 2,
    lines: [
      {
        speaker: 'richard',
        text: 'I keep the estate solvent. The house, the land, the name. I am the reason the lights are on and the reason they will stay on when this tedious weekend is over.',
        mood: 'calm',
      },
      {
        speaker: 'mara',
        text: 'By signing Alexander\'s name.',
      },
      {
        speaker: 'richard',
        text: 'By exercising a power of attorney he granted me in 2004. If a man chooses to become a recluse, someone has to keep signing.',
        mood: 'cold',
      },
      { speaker: 'mara', text: 'A power of attorney survives death, Mr Graves. It does not survive being forged.' },
      {
        speaker: 'richard',
        text: 'Careful. You are in a house with no telephone signal and a great deal of my paper in it.',
        mood: 'angry',
        effect: { trust: { richard: -8 }, flags: { richard_threat: true } },
      },
    ],
  },
  {
    id: 'richard_past',
    suspect: 'richard',
    label: 'Where were you the night of the fire?',
    chapter: 2,
    lines: [
      {
        speaker: 'richard',
        text: 'In London. I arrived the following afternoon, and found the house in mourning and the east wing still smoking.',
        mood: 'calm',
      },
      { speaker: 'mara', text: 'You witnessed the insurance claim eleven weeks later.' },
      {
        speaker: 'richard',
        text: 'I witnessed a great many things that year. Grief is an administrative process, Miss Vale. Somebody has to file it.',
        mood: 'cold',
        effect: { trust: { richard: -3 } },
      },
    ],
  },
  {
    id: 'richard_signature',
    suspect: 'richard',
    label: 'This signature is not Alexander\'s.',
    chapter: 2,
    requiresEvidence: ['share_contract'],
    lines: [
      {
        speaker: 'richard',
        text: 'It is his signature as it appears on a share transfer. Signatures are not fingerprints. They are performances. A man signs differently for a bank than for his wife.',
        mood: 'calm',
      },
      {
        speaker: 'mara',
        text: 'He signed his marriage certificate in 1993 and this in 2006. The slant changes. The B is a different letter.',
      },
      {
        speaker: 'richard',
        text: 'Then perhaps you should arrest the hand. Oh — I forgot. There is no body, no crime, and no jurisdiction for a woman with a notebook and a wet coat.',
        mood: 'angry',
      },
      {
        speaker: 'mara',
        text: 'There is a genealogist\'s report in that safe, Mr Graves. I have not read it yet. But you commissioned it in 2011, and you have never shown it to anyone.',
        mood: 'cold',
      },
      {
        speaker: 'richard',
        text: '...The safe is four turns right, two left, nine right, three left. Read it, then. It will not make you happier.',
        mood: 'cold',
        effect: {
          trust: { richard: -6 },
          flags: { safe_open: true, richard_gave_safe: true },
        },
      },
    ],
  },
  {
    id: 'richard_safe',
    suspect: 'richard',
    label: 'Open the study safe for me.',
    chapter: 4,
    lines: [
      {
        speaker: 'richard',
        text: 'You want the safe. Of course you do. It is the only thing in this house with a lock that still works.',
        mood: 'cold',
      },
      {
        speaker: 'mara',
        text: 'I can have the constable break it open when the telephone is repaired. I would rather you opened it now, while there is still a version of this where you cooperated.',
      },
      {
        speaker: 'richard',
        text: 'Four right, two left, nine right, three left. There. Now you can read twenty years of my best work.',
        mood: 'smirk',
      },
      {
        speaker: 'richard',
        text: 'Do try not to bleed on the files. They are the only thing keeping the roof on.',
        mood: 'cold',
        effect: { flags: { safe_open: true, richard_gave_safe: true } },
      },
    ],
  },
  {
    id: 'richard_hiding',
    suspect: 'richard',
    label: 'What are you hiding?',
    chapter: 3,
    lines: [
      {
        speaker: 'richard',
        text: 'Debt. The kind that would frighten a bank and delight a journalist. The estate has been spending a dead man\'s money for twenty years.',
        mood: 'cold',
      },
      { speaker: 'mara', text: 'You knew he was dead.' },
      {
        speaker: 'richard',
        text: 'I knew the name needed to keep working. Whether the man did is a philosophical question, and I am not paid for philosophy.',
        mood: 'smirk',
        effect: { trust: { richard: -4 } },
      },
    ],
  },
  {
    id: 'richard_money',
    suspect: 'richard',
    label: 'You paid Vivian Cross to bury the story.',
    chapter: 5,
    requiresEvidence: ['article_draft'],
    lines: [
      {
        speaker: 'richard',
        text: 'I paid her not to print an article that was ninety per cent speculation and one hundred per cent bad for the estate. That is not a crime. That is public relations.',
        mood: 'calm',
      },
      { speaker: 'mara', text: 'The estate is a shell company registered in St Helier. The director has been dead for twenty years.' },
      {
        speaker: 'richard',
        text: 'And yet the roof is on, the roses are cut, and the family eats dinner. You are welcome.',
        mood: 'angry',
      },
      {
        speaker: 'richard',
        text: 'Do you imagine I enjoyed it? Signing a dead man\'s name at two in the morning while his widow counts the silver? I did it because the alternative was a scandal that would have put six people in the street. Including a child.',
        mood: 'sad',
      },
      {
        speaker: 'mara',
        text: 'Including a child.',
      },
      {
        speaker: 'richard',
        text: '...I have said too much. Or not enough, which is worse. Ask Arthur. He is the one with the keys.',
        mood: 'fear',
        effect: { trust: { richard: 4 }, flags: { richard_slipped: true } },
      },
    ],
  },
  {
    id: 'richard_final',
    suspect: 'richard',
    label: 'The estate ends tonight. What do you want?',
    chapter: 6,
    lines: [
      {
        speaker: 'richard',
        text: 'I want it on record that I have kept this house alive for twenty years. Not out of sentiment. Out of the belief that a thing worth building is worth lying for.',
        mood: 'cold',
      },
      {
        speaker: 'mara',
        text: 'And now?',
      },
      {
        speaker: 'richard',
        text: 'Now I would like to be a man who tells the truth once, before he dies, and finds out whether there is anything left of him underneath the paperwork.',
        mood: 'sad',
        effect: { trust: { richard: 8 }, flags: { richard_witness: true } },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* VIVIAN                                                              */
  /* ------------------------------------------------------------------ */
  {
    id: 'vivian_intro',
    suspect: 'vivian',
    label: 'Where were you when he disappeared?',
    chapter: 1,
    lines: [
      {
        speaker: 'vivian',
        text: 'In the east corridor, photographing the family portraits. Terrible light, wonderful faces. I heard nothing until Arthur started shouting for a doctor.',
        mood: 'warm',
      },
      { speaker: 'mara', text: 'You were here before. You know this house.' },
      {
        speaker: 'vivian',
        text: 'I have been coming to this house for twenty years with a notebook and a bad conscience. You are the first interesting thing that has happened in it.',
        mood: 'smirk',
      },
      {
        speaker: 'vivian',
        text: 'I am going to be frank with you, Miss Vale, because I have been waiting for someone competent to walk up that drive. I know what this family did. I have known since 2006. I was paid not to print it.',
        mood: 'cold',
        effect: { trust: { vivian: 8 }, flags: { vivian_candid: true } },
      },
    ],
  },
  {
    id: 'vivian_story',
    suspect: 'vivian',
    label: 'Why did you never publish the story?',
    chapter: 2,
    lines: [
      {
        speaker: 'vivian',
        text: 'Because I was twenty-four and the cheque was large and the editor did not want a story about a rich family burning a child. Editors rarely do.',
        mood: 'cold',
      },
      { speaker: 'mara', text: 'And since?' },
      {
        speaker: 'vivian',
        text: 'Since, I have kept the file. I tell myself it is an archive. Really it is a penance with a paperclip. If I ever publish it, I lose my sources and my reputation. If I never publish it, I am what they paid me to be.',
        mood: 'sad',
      },
      {
        speaker: 'mara',
        text: 'Why come back now?',
      },
      {
        speaker: 'vivian',
        text: 'Because I received a card with a black seal, and because I am tired of being the woman who did not print the truth. I would like to be the woman who did, once, before I die of caution.',
        mood: 'warm',
        effect: { trust: { vivian: 8 } },
      },
    ],
  },
  {
    id: 'vivian_past',
    suspect: 'vivian',
    label: 'What did you see in 2006?',
    chapter: 2,
    lines: [
      {
        speaker: 'vivian',
        text: 'A fire that a two-inch newspaper article called a kitchen fire. A family that would not answer the door. A doctor who drank at the pub and cried into his glass.',
        mood: 'cold',
      },
      {
        speaker: 'vivian',
        text: 'And a gardener with a child\'s raincoat over his arm, standing at the gate at two in the morning, watching the house burn. He told me there was nothing to see. He was holding a rabbit.',
        mood: 'sad',
      },
      { speaker: 'mara', text: 'A rabbit.' },
      {
        speaker: 'vivian',
        text: 'A stuffed one. One ear missing. He was holding it like a man holding a baby.',
        mood: 'cold',
        effect: {
          trust: { vivian: 6 },
          notes: [
            {
              id: 'note_vivian_rabbit',
              title: 'Vivian at the Gate',
              text: 'Vivian saw Arthur at the gate at two in the morning with a child\'s raincoat and a one-eared rabbit. He told her there was nothing to see. She has been carrying that image for twenty years.',
              chapter: 2,
            },
          ],
        },
      },
    ],
  },
  {
    id: 'vivian_article',
    suspect: 'vivian',
    label: 'I found your draft. It was killed before print.',
    chapter: 2,
    requiresEvidence: ['article_draft'],
    lines: [
      {
        speaker: 'vivian',
        text: 'There it is. Twenty years in a portfolio and it still smells of the editor\'s cigarettes.',
        mood: 'sad',
      },
      {
        speaker: 'mara',
        text: 'Richard Graves wrote "KILL" in the margin and a figure.',
      },
      {
        speaker: 'vivian',
        text: 'Richard wrote the number. Eleanor wrote the cheque. I wrote nothing at all, which is the part I cannot forgive.',
        mood: 'broken',
      },
      {
        speaker: 'vivian',
        text: 'I have the originals, you know. The fire report. A tape of Eleanor at her worst. If you are going to do this properly, you will need them. I am not going to hand them over to be polite — I am going to hand them over to be useful.',
        mood: 'warm',
        effect: { trust: { vivian: 10 }, flags: { vivian_ally: true } },
      },
    ],
  },
  {
    id: 'vivian_hiding',
    suspect: 'vivian',
    label: 'What are you hiding?',
    chapter: 3,
    lines: [
      {
        speaker: 'vivian',
        text: 'A tape. A fire report. Twenty years of notes I have never shown anyone, because the moment I show them I stop being a journalist and become a witness.',
        mood: 'cold',
      },
      {
        speaker: 'vivian',
        text: 'There is a difference, and it costs a great deal. Ask me again when you have something worth the cost.',
        mood: 'sad',
        effect: { trust: { vivian: 4 } },
      },
    ],
  },
  {
    id: 'vivian_tape_topic',
    suspect: 'vivian',
    label: 'Tell me what is on the tape.',
    chapter: 5,
    requiresEvidence: ['vivian_tape'],
    lines: [
      {
        speaker: 'vivian',
        text: 'Eleanor buying my silence. And afterwards, when she had gone, Arthur came back into the room. He did not know I was still recording. He said: "She asked me to leave her in the garden. I did not. That is the whole of it."',
        mood: 'cold',
      },
      {
        speaker: 'mara',
        text: 'You have had that for twenty years and never used it.',
      },
      {
        speaker: 'vivian',
        text: 'I have used it every night to keep myself awake. That is not the same as publishing it. But it is yours now, and I would like to see what a better person does with it.',
        mood: 'warm',
        effect: { trust: { vivian: 8 }, flags: { vivian_gave_tape: true } },
      },
    ],
  },
  {
    id: 'vivian_final',
    suspect: 'vivian',
    label: 'Will you publish it?',
    chapter: 6,
    lines: [
      {
        speaker: 'vivian',
        text: 'If you say the word, I will file it tonight from the telephone in the village. If you say nothing, I will put it back in the portfolio and we will both pretend I am still a coward.',
        mood: 'calm',
      },
      {
        speaker: 'vivian',
        text: 'But before you decide — I have been chasing this story for twenty years, and it was never about a dead businessman. It was always about a girl nobody remembered to look for. Whatever you choose, do not let them make her a headline and forget the girl.',
        mood: 'sad',
        effect: { trust: { vivian: 10 }, flags: { vivian_offers_publish: true } },
      },
    ],
  },
];

export const TOPIC_BY_ID: Record<string, Topic> = Object.fromEntries(
  TOPICS.map((t) => [t.id, t]),
);

export function topicsFor(suspect: SuspectId): Topic[] {
  return TOPICS.filter((t) => t.suspect === suspect).sort((a, b) => a.chapter - b.chapter);
}

/* ------------------------------------------------------------------ */
/* EVIDENCE REACTIONS                                                  */
/* ------------------------------------------------------------------ */

export const EVIDENCE_REACTIONS: EvidenceReaction[] = [
  {
    suspect: 'eleanor',
    evidence: 'ledger',
    lines: [
      {
        speaker: 'eleanor',
        text: 'You have been through my accounts. I see. The amounts are not a pension, and you know it.',
        mood: 'cold',
      },
      {
        speaker: 'eleanor',
        text: 'Very well. The money goes to the woman who has my daughter. Now ask me the question you actually came to ask, and I will decide whether to answer it.',
        mood: 'broken',
      },
    ],
    effect: { trust: { eleanor: -3 } },
  },
  {
    suspect: 'eleanor',
    evidence: 'sealed_letter',
    lines: [
      {
        speaker: 'eleanor',
        text: 'I wrote that. In this room, at that desk, with a pen I still own. Do not read it aloud to me. I know it by heart.',
        mood: 'sad',
      },
    ],
    effect: { flags: { eleanor_cornered: true } },
  },
  {
    suspect: 'eleanor',
    evidence: 'vivian_tape',
    lines: [
      {
        speaker: 'eleanor',
        text: 'That is my voice. I was younger, and I thought a cheque was the same as a decision. It is not. I have had twenty years to learn that.',
        mood: 'broken',
      },
    ],
  },
  {
    suspect: 'eleanor',
    evidence: 'locket',
    lines: [
      {
        speaker: 'eleanor',
        text: 'Where did you — give me that.',
        mood: 'fear',
      },
      {
        speaker: 'eleanor',
        text: 'There is a curl of hair in this. Mine. I cut it in 1999, the night she was born. I have not seen this locket since the fire.',
        mood: 'broken',
      },
      {
        speaker: 'eleanor',
        text: '...Look at me. Look at me properly, and tell me you do not know who you are.',
        mood: 'broken',
      },
    ],
    effect: { trust: { eleanor: 10 }, flags: { eleanor_saw_locket: true } },
  },
  {
    suspect: 'eleanor',
    evidence: 'doll',
    lines: [
      {
        speaker: 'eleanor',
        text: 'Charlotte kept that. She used to sleep with it when she was small, and I let her, because a mother who removes a child\'s comfort twice deserves what she becomes.',
        mood: 'sad',
      },
    ],
  },
  {
    suspect: 'charlotte',
    evidence: 'doll',
    lines: [
      {
        speaker: 'charlotte',
        text: 'You found her. You found the doll, I mean. She had a name for it. She called it Rabbit, even though it was a doll. She was not a very clever child.',
        mood: 'sad',
      },
      {
        speaker: 'charlotte',
        text: 'I am joking. She was clever. She was the only one of us who noticed things.',
        mood: 'broken',
      },
    ],
    effect: { trust: { charlotte: 8 } },
  },
  {
    suspect: 'charlotte',
    evidence: 'music_box',
    lines: [
      {
        speaker: 'charlotte',
        text: 'Don\'t wind it. Please.',
        mood: 'fear',
      },
      {
        speaker: 'charlotte',
        text: '...All right. Wind it. But sit down. I do not trust my legs when it plays.',
        mood: 'sad',
      },
    ],
  },
  {
    suspect: 'charlotte',
    evidence: 'sealed_letter',
    lines: [
      {
        speaker: 'charlotte',
        text: '"The child\'s name is to be struck from the register." My mother\'s hand. She struck out my sister\'s name and then set the table for my father for twenty years.',
        mood: 'angry',
      },
    ],
  },
  {
    suspect: 'charlotte',
    evidence: 'locket',
    lines: [
      {
        speaker: 'charlotte',
        text: 'That is hers. That is hers, and it is around your neck, and you have been standing here asking me questions about a murder as though the two things had nothing to do with one another.',
        mood: 'fear',
      },
      {
        speaker: 'charlotte',
        text: 'Say it. Please say it, because I have been saying it in my head for twenty years and I will not survive saying it first.',
        mood: 'broken',
      },
    ],
    effect: { trust: { charlotte: 12 }, flags: { charlotte_knows: true } },
  },
  {
    suspect: 'charlotte',
    evidence: 'gravestone',
    lines: [
      {
        speaker: 'charlotte',
        text: 'I pay a man in the village to cut the grass and leave roses. He thinks I am mad. Perhaps I am. It is the only grave I have ever visited where I knew the person was not in it.',
        mood: 'sad',
      },
    ],
  },
  {
    suspect: 'arthur',
    evidence: 'staged_note',
    lines: [
      {
        speaker: 'arthur',
        text: 'You found the note, then. I had hoped it would be found. That was rather the point of writing it.',
        mood: 'calm',
      },
      {
        speaker: 'arthur',
        text: 'The blood is from the kitchen. A butcher\'s delivery, if you were wondering. I am sorry to disappoint the drama of it.',
        mood: 'cold',
      },
    ],
    effect: { flags: { arthur_staged_admitted: true } },
  },
  {
    suspect: 'arthur',
    evidence: 'old_photo',
    lines: [
      {
        speaker: 'arthur',
        text: 'The photograph on the desk. I put it there on the first night, where a good investigator would find it. I was not subtle. Subtlety is wasted on grief.',
        mood: 'sad',
      },
      {
        speaker: 'arthur',
        text: 'The girl was seven. She was holding a paper boat because the rain had stopped for an afternoon and she wanted to sail it in the fountain.',
        mood: 'warm',
      },
    ],
    effect: { trust: { arthur: 4 } },
  },
  {
    suspect: 'arthur',
    evidence: 'typewriter',
    lines: [
      {
        speaker: 'arthur',
        text: 'Ah. The machine. I should have oiled it. I did not expect to be investigated by a woman who reads the letterforms.',
        mood: 'calm',
      },
      {
        speaker: 'arthur',
        text: 'Do you want to know what I typed in the end? "I did what had to be done." It is the truest sentence I have written in twenty years.',
        mood: 'broken',
      },
    ],
    effect: { flags: { arthur_staged_admitted: true } },
  },
  {
    suspect: 'arthur',
    evidence: 'ruth_letter',
    lines: [
      {
        speaker: 'arthur',
        text: 'Ruth wrote that in a temper because she was tired of being the only person in this story who was honest with you.',
        mood: 'sad',
      },
      {
        speaker: 'arthur',
        text: 'She was a good woman. She raised you in a house with a garden and no locked doors, and she never once asked me to come and see you. She knew what I would bring with me.',
        mood: 'broken',
      },
    ],
    effect: { trust: { arthur: 8 } },
  },
  {
    suspect: 'arthur',
    evidence: 'locket',
    lines: [
      {
        speaker: 'arthur',
        text: 'The chain broke on the train to Carrow Street. I mended it with garden wire. You cried because you thought it was ruined. I told you that a thing mended is stronger than a thing that was never broken.',
        mood: 'broken',
      },
      {
        speaker: 'arthur',
        text: 'I was not sure you would remember. It is a relief to be in a room where someone does.',
        mood: 'sad',
      },
    ],
    effect: { trust: { arthur: 10 } },
  },
  {
    suspect: 'henry',
    evidence: 'death_cert',
    lines: [
      {
        speaker: 'henry',
        text: 'Two certificates. I remember the pen. I remember the registrar\'s stamp was out of ink and I had to press twice.',
        mood: 'broken',
      },
      {
        speaker: 'henry',
        text: 'You will want to know why a doctor signs something he knows to be a lie. The answer is that doctors are not priests. We are people with debts and mothers and a terror of the fogey of a staircase.',
        mood: 'sad',
      },
    ],
    effect: { flags: { henry_cornered: true } },
  },
  {
    suspect: 'henry',
    evidence: 'burn_note',
    lines: [
      {
        speaker: 'henry',
        text: 'I remember the child in that record. She would not speak, and she would not let anyone hold her left hand. I dressed the burn and she watched me the whole time, as though I were the one who might hurt her.',
        mood: 'broken',
      },
      {
        speaker: 'henry',
        text: 'I have thought about her every time I have written a prescription for twenty years. Show me your hand. Please.',
        mood: 'sad',
      },
    ],
    effect: { trust: { henry: 10 } },
  },
  {
    suspect: 'henry',
    evidence: 'medical_letter',
    lines: [
      {
        speaker: 'henry',
        text: 'I wrote that letter and then I could not send it. I have carried it in the bag so that I would be reminded every morning of what I am. That is not courage. It is theatre.',
        mood: 'sad',
      },
    ],
  },
  {
    suspect: 'richard',
    evidence: 'share_contract',
    lines: [
      {
        speaker: 'richard',
        text: 'Yes. I signed his name. I have signed his name four hundred times. Do you know how many people depend on that name continuing? Charlotte\'s allowance. Henry\'s practice. Arthur\'s wages. The woman who cleans the silver.',
        mood: 'angry',
      },
      {
        speaker: 'richard',
        text: 'You are looking for a murderer. I have been running a household. One of those requires more lying.',
        mood: 'cold',
      },
    ],
  },
  {
    suspect: 'richard',
    evidence: 'birth_missing',
    lines: [
      {
        speaker: 'richard',
        text: 'The genealogist. I hired him because I needed to know whether the name could be defended in court. It could not. Alexander Blackwood does not exist and never did.',
        mood: 'cold',
      },
      {
        speaker: 'richard',
        text: 'Imagine my position. I had a dead business partner, an estate with no legal owner, and a widow who wanted the lights on. I did what any honest man would do in an impossible position. I became a criminal.',
        mood: 'sad',
      },
    ],
    effect: { flags: { richard_admitted: true } },
  },
  {
    suspect: 'richard',
    evidence: 'insurance',
    lines: [
      {
        speaker: 'richard',
        text: 'The policy was Eleanor\'s idea. The double indemnity was mine. Neither of us expected to use it so soon, and both of us were relieved when it paid.',
        mood: 'cold',
      },
    ],
  },
  {
    suspect: 'richard',
    evidence: 'article_draft',
    lines: [
      {
        speaker: 'richard',
        text: 'I bought a journalist for the price of a car. The cheapest thing I have ever purchased, and the one that has cost me the most.',
        mood: 'sad',
      },
    ],
  },
  {
    suspect: 'vivian',
    evidence: 'article_draft',
    lines: [
      {
        speaker: 'vivian',
        text: 'My best work, and I killed it for money. I would like to say I was young. I was young, and I was bought, and those are two different facts.',
        mood: 'sad',
      },
      {
        speaker: 'vivian',
        text: 'Use it. Please. If it goes out under your name with mine underneath, that will have to be enough.',
        mood: 'warm',
      },
    ],
    effect: { trust: { vivian: 6 } },
  },
  {
    suspect: 'vivian',
    evidence: 'fire_report',
    lines: [
      {
        speaker: 'vivian',
        text: 'The original. I bribed a clerk for it and then never used it. Look at the addendum — "occupant stated the child was in the garden with the gardener". That is Eleanor saying the child was not in the house, twenty minutes after telling the fire officer she was.',
        mood: 'cold',
      },
      {
        speaker: 'vivian',
        text: 'That sentence is the whole story. The house could not decide whether the girl was dead or gone, so it chose the version that was tidier.',
        mood: 'sad',
      },
    ],
    effect: { trust: { vivian: 6 } },
  },
  {
    suspect: 'vivian',
    evidence: 'locket',
    lines: [
      {
        speaker: 'vivian',
        text: 'That is the locket from the nursery photograph. The girl in the garden photograph is wearing it. You are wearing it now.',
        mood: 'fear',
      },
      {
        speaker: 'vivian',
        text: 'I have been looking for a survivor for twenty years and she has been standing in front of me asking about a murder. I am going to need a moment. Then I am going to need a very large drink.',
        mood: 'sad',
      },
    ],
    effect: { trust: { vivian: 10 }, flags: { vivian_knows: true } },
  },
  {
    suspect: 'vivian',
    evidence: 'ruth_letter',
    lines: [
      {
        speaker: 'vivian',
        text: 'Ruth Vale. I tried to find her in 2007. She had moved, changed her name, taken in a child. I found the child\'s clinic record and I stopped looking, because that was the one thread I could not pull without burning a little girl to protect a story.',
        mood: 'sad',
      },
    ],
  },
];

export const REACTION_MAP: Record<string, Record<string, EvidenceReaction>> = EVIDENCE_REACTIONS.reduce(
  (acc, reaction) => {
    acc[reaction.suspect] = { ...(acc[reaction.suspect] ?? {}), [reaction.evidence]: reaction };
    return acc;
  },
  {} as Record<string, Record<string, EvidenceReaction>>,
);

/* ------------------------------------------------------------------ */
/* ACCUSATIONS & GENERIC REACTIONS                                     */
/* ------------------------------------------------------------------ */

export const ACCUSATION_LINES: Record<SuspectId, Line[]> = {
  eleanor: [
    {
      speaker: 'eleanor',
      text: 'You accuse me? In my house, at my table, in front of my daughters?',
      mood: 'angry',
    },
    {
      speaker: 'eleanor',
      text: 'I have done a great many things to keep this family standing. If you believe one of them was murder, then produce a body. I have been waiting twenty years for someone to produce a body.',
      mood: 'cold',
    },
    {
      speaker: 'eleanor',
      text: 'Until you can, I would prefer not to be spoken to again.',
      mood: 'cold',
    },
  ],
  charlotte: [
    {
      speaker: 'charlotte',
      text: 'Me? You think I came back here to kill a man who has been dead since I was nine?',
      mood: 'angry',
    },
    {
      speaker: 'charlotte',
      text: 'God. You are just like them. You walk into a room, you look at the person who is easiest to blame, and you write it down.',
      mood: 'sad',
    },
    {
      speaker: 'charlotte',
      text: 'Do not speak to me for a while. I need to be angry somewhere that does not have a witness.',
      mood: 'broken',
    },
  ],
  arthur: [
    {
      speaker: 'arthur',
      text: 'You believe I killed him.',
      mood: 'calm',
    },
    {
      speaker: 'arthur',
      text: 'Perhaps I did. I have thought about it every day for twenty years, and I have never entirely persuaded myself that I did not. But if you are going to accuse a man, madam, you should first decide which crime you mean.',
      mood: 'sad',
    },
    {
      speaker: 'arthur',
      text: 'I will be in the garden. I am always in the garden.',
      mood: 'broken',
    },
  ],
  henry: [
    {
      speaker: 'henry',
      text: 'You are accusing a doctor of murder on the strength of a stain and a glass of brandy.',
      mood: 'angry',
    },
    {
      speaker: 'henry',
      text: 'I have signed lies. I have not killed anyone. There is a difference, though I grant you it is not a flattering one.',
      mood: 'sad',
    },
    {
      speaker: 'henry',
      text: 'Now if you will excuse me, I am going to find something to drink that will make this conversation more bearable.',
      mood: 'broken',
    },
  ],
  richard: [
    {
      speaker: 'richard',
      text: 'Accusing me? Good. Now we are speaking the same language.',
      mood: 'smirk',
    },
    {
      speaker: 'richard',
      text: 'I have stolen, forged and lied for this estate. I have not killed anyone. If I had, there would be no stain on the carpet and no body missing — there would be nothing at all, which is how you can tell a professional was involved.',
      mood: 'cold',
    },
    {
      speaker: 'richard',
      text: 'Come back when you have a document with my signature on it that says something worse than fraud.',
      mood: 'angry',
    },
  ],
  vivian: [
    {
      speaker: 'vivian',
      text: 'Me? I have been trying to get this story printed for twenty years. Killing the subject is a spectacularly bad career move.',
      mood: 'smirk',
    },
    {
      speaker: 'vivian',
      text: 'But I understand. You have six suspects and one of them has to be lying better than the rest. Ask me again when you have something.',
      mood: 'cold',
    },
  ],
};

export const ACCUSATION_CLOSE_LINE: Record<SuspectId, string> = {
  eleanor: 'Eleanor turns her back and does not speak again.',
  charlotte: 'Charlotte leaves the room without looking at you.',
  arthur: 'Arthur bows, very slightly, and goes out into the rain.',
  henry: 'Dr Ashford pours himself a drink and does not offer you one.',
  richard: 'Richard picks up his briefcase and does not look up again.',
  vivian: 'Vivian closes her notebook, which is somehow worse than shouting.',
};

export function genericEvidenceLine(suspect: SuspectId, trust: number): Line[] {
  const cold = trust < 30;
  const lines: Record<SuspectId, Line[]> = {
    eleanor: [
      {
        speaker: 'eleanor',
        text: cold
          ? 'I have no idea what you expect me to say to that. Put it away.'
          : 'That is curious, but it is not mine. I have spent my life not touching things that were not mine.',
        mood: cold ? 'cold' : 'calm',
      },
    ],
    charlotte: [
      {
        speaker: 'charlotte',
        text: cold
          ? 'And what am I supposed to do with that? Frame it?'
          : 'Huh. That is strange. Not strange enough for a murder, but strange.',
        mood: cold ? 'angry' : 'smirk',
      },
    ],
    arthur: [
      {
        speaker: 'arthur',
        text: cold
          ? 'I am sure you have your reasons for showing me this, madam. I will not ask what they are.'
          : 'May I? ...Yes. That is from the east wing. Or it was. Forgive me, it is a little close to the bone.',
        mood: cold ? 'cold' : 'sad',
      },
    ],
    henry: [
      {
        speaker: 'henry',
        text: cold
          ? 'I am a doctor, not a antiquarian. I cannot help you with that.'
          : 'I have seen a great deal of paper in this house. That one I do not recognise, but it makes my hands shake, which is usually a sign.',
        mood: cold ? 'angry' : 'fear',
      },
    ],
    richard: [
      {
        speaker: 'richard',
        text: cold
          ? 'Is that relevant, or are we simply showing each other things now?'
          : 'Interesting. Not evidence of anything, mind you. But interesting.',
        mood: cold ? 'angry' : 'cold',
      },
    ],
    vivian: [
      {
        speaker: 'vivian',
        text: cold
          ? 'I have seen worse. Bring me something that goes somewhere.'
          : 'That is not nothing. Where did you find it? No — do not tell me. Let me guess. It was somewhere it should not have been.',
        mood: cold ? 'cold' : 'warm',
      },
    ],
  };
  return lines[suspect];
}
