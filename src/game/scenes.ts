import type { Scene } from './types';

const RAIN = [0, 1, 2, 3, 4, 5];

export const SCENES: Scene[] = [
  /* ------------------------------------------------------------------ */
  /* CHAPTER 1                                                           */
  /* ------------------------------------------------------------------ */
  {
    id: 'ch1_intro',
    chapter: 1,
    title: 'The Invitation',
    bg: 'manor_night',
    music: 'manor',
    ambience: 'rain',
    cast: ['mara'],
    lines: [
      {
        speaker: 'narrator',
        text: 'The last train to Blackwood stops at a station with no roof. Rain comes down through the gap where it used to be, and the porter hands you a lamp without being asked.',
      },
      {
        speaker: 'mara',
        text: 'How far to the manor?',
      },
      {
        speaker: 'narrator',
        text: '"A mile, if you take the drive. Less, if you take the path and do not mind the graves." He says it the way a man says a joke he has told too often.',
      },
      {
        speaker: 'narrator',
        text: 'The card in your pocket has been read so many times the fold has gone soft. Cream stock. Black wax. Ten words and a time.',
        effect: { evidence: ['invitation'] },
      },
      {
        speaker: 'mara',
        text: '"Alexander Blackwood has been murdered. Six were present. Come alone."',
      },
      {
        speaker: 'mara',
        text: 'People write anonymous letters for two reasons. To frighten someone, or to be caught. The interesting ones want both.',
      },
      {
        speaker: 'narrator',
        bg: 'manor_rain',
        text: 'Blackwood Manor arrives out of the rain all at once: a great black shape with two towers, one wing boarded and one lit. The windows of the east wing are dark in a way the rest of the house is not.',
      },
      {
        speaker: 'narrator',
        text: 'The door opens before you knock. A man in a butler\'s coat holds the light low, and your reflection steps into the brass of the doorplate beside him.',
      },
      {
        speaker: 'arthur',
        text: 'Miss Vale. You came alone.',
        mood: 'calm',
        cast: ['arthur', 'mara'],
      },
      {
        speaker: 'mara',
        text: 'You sound disappointed.',
      },
      {
        speaker: 'arthur',
        text: 'Relieved, madam. There is a difference, though I grant you it is difficult to see in this light. Arthur Finch. I keep the house.',
        mood: 'calm',
        sfx: 'door',
      },
      {
        speaker: 'narrator',
        bg: 'foyer',
        text: 'The foyer smells of wet stone and candle smoke. Six coats are hanging in a row. The seventh hook is empty, and polished.',
      },
      {
        speaker: 'arthur',
        text: 'The study is this way. I should warn you — there is blood. There is no body. I have telephoned the constable twice and the line is down.',
        cast: ['arthur', 'mara'],
      },
      {
        speaker: 'mara',
        text: 'A murder with no body and no telephone. That is either bad luck or good planning.',
      },
      {
        speaker: 'narrator',
        bg: 'study',
        music: 'tension',
        text: 'The study is oak and leather and cold ash. A lamp burns on the desk. On the carpet, a stain the colour of old ink has dried into a careful circle.',
      },
      {
        speaker: 'mara',
        text: 'Who found him?',
      },
      {
        speaker: 'arthur',
        text: 'I did. At five to eleven. The door was shut. The light was on. I have not moved anything except the telephone.',
      },
      {
        speaker: 'mara',
        text: 'There is no body, Mr Finch. What exactly did you find?',
      },
      {
        speaker: 'arthur',
        text: 'The room, madam. I found the room.',
        mood: 'cold',
      },
      {
        speaker: 'narrator',
        bg: 'drawing',
        music: 'manor',
        text: 'They are waiting in the drawing room, arranged around a fire that has been allowed to die. Six people, six chairs, one space by the hearth where nobody is sitting.',
      },
      {
        speaker: 'eleanor',
        text: 'Miss Vale. I am Eleanor Blackwood. I assume you have been told that my husband has been murdered. I would like to establish, before we begin, that I do not believe it.',
        mood: 'cold',
        cast: ['eleanor', 'mara'],
      },
      {
        speaker: 'charlotte',
        text: 'Mother. Let the woman breathe.',
        mood: 'smirk',
        cast: ['charlotte', 'eleanor', 'mara'],
      },
      {
        speaker: 'charlotte',
        text: 'Charlotte. The daughter. The disappointing one. If you need a suspect with a motive, I inherit everything and I have never liked him.',
      },
      {
        speaker: 'henry',
        text: 'Henry Ashford. The family doctor. I was here when it happened. I have been here for everything, one way or another.',
        mood: 'sad',
        cast: ['henry', 'mara'],
      },
      {
        speaker: 'richard',
        text: 'Richard Graves. Business. I would say I am the only person here with nothing to hide, but you would write that down.',
        mood: 'cold',
        cast: ['richard', 'mara'],
      },
      {
        speaker: 'vivian',
        text: 'Vivian Cross. Journalist, unfortunately for everyone. I have been photographing the portraits. The house has a great many faces and not one of them is honest.',
        mood: 'warm',
        cast: ['vivian', 'mara'],
      },
      {
        speaker: 'narrator',
        text: 'Six stories. One room with blood in it and no body. And in the corner, a silver frame on a desk that nobody has thought to turn face down.',
      },
      {
        speaker: 'mara',
        text: 'I should begin.',
        choices: [
          {
            id: 'ch1_choice_scene',
            text: 'Examine the study first. The room is the only witness that cannot lie.',
            reply: [
              {
                speaker: 'mara',
                text: 'A room cannot lie, but it can be arranged. I will start where the blood is.',
              },
              {
                speaker: 'eleanor',
                text: 'How reassuring. Do try not to rearrange the furniture.',
                mood: 'cold',
              },
            ],
            effect: {
              trust: { eleanor: -2, arthur: 3 },
              decision: {
                id: 'ch1_first_move',
                chapter: 1,
                question: 'Where did you begin?',
                answer: 'The study, before speaking to anyone at length.',
              },
            },
          },
          {
            id: 'ch1_choice_people',
            text: 'Question the six while their stories are still fresh.',
            reply: [
              {
                speaker: 'mara',
                text: 'Six people in a house with one locked room. I would rather hear what they say before they have time to agree on it.',
              },
              {
                speaker: 'vivian',
                text: 'A woman after my own heart. Start with me. I am the only one who will enjoy it.',
                mood: 'smirk',
              },
            ],
            effect: {
              trust: { vivian: 4, charlotte: 2 },
              decision: {
                id: 'ch1_first_move',
                chapter: 1,
                question: 'Where did you begin?',
                answer: 'The guests — before they could agree on a story.',
              },
            },
          },
          {
            id: 'ch1_choice_invitation',
            text: 'Ask Arthur who sent the invitation.',
            reply: [
              {
                speaker: 'mara',
                text: 'Before the blood, Mr Finch — who sent for me?',
              },
              {
                speaker: 'arthur',
                text: 'It came with the post, madam. As did yours, I imagine.',
                mood: 'calm',
              },
              {
                speaker: 'mara',
                text: 'You have not asked me for my card. You knew my name before I gave it.',
              },
              {
                speaker: 'arthur',
                text: '...I have been expecting you for some time.',
                mood: 'sad',
              },
            ],
            effect: {
              trust: { arthur: 5 },
              flags: { arthur_knew_her: true },
              decision: {
                id: 'ch1_first_move',
                chapter: 1,
                question: 'Where did you begin?',
                answer: 'With Arthur, and the question of who sent for me.',
              },
            },
          },
        ],
      },
      {
        speaker: 'narrator',
        text: 'Outside, the rain settles in for the night. Somewhere above you, in the part of the house nobody has mentioned, a floorboard takes the weight of a foot and then thinks better of it.',
        sfx: 'thunder',
      },
    ],
  },
  {
    id: 'ch1_close',
    chapter: 1,
    title: 'The Seventh Place',
    bg: 'corridor',
    music: 'tension',
    ambience: 'rain',
    cast: ['mara'],
    lines: [
      {
        speaker: 'narrator',
        text: 'The house goes dark at a quarter past one. Not the lamps — the whole house, all at once, as though a hand had been laid over it.',
        sfx: 'glass',
      },
      {
        speaker: 'mara',
        text: 'Nobody move. Nobody go upstairs.',
      },
      {
        speaker: 'narrator',
        text: 'In the dark, a sound: a thin, cracked music, eight bars of a slow waltz, stopping on the same unfinished note. It comes from the east corridor, where there is no door.',
      },
      {
        speaker: 'narrator',
        text: 'When the lights return, the corridor is empty. The wet footprints on the runner lead to the wall and stop.',
        sfx: 'footsteps',
      },
      {
        speaker: 'arthur',
        text: 'The east wing is sealed, madam. There is nothing down there but rain.',
        mood: 'calm',
        cast: ['arthur', 'mara'],
      },
      {
        speaker: 'mara',
        text: 'Then the rain has learned to wind a music box.',
      },
      {
        speaker: 'narrator',
        text: 'In your room, a folded card has been pushed under the door. The same cream stock. The same black wax. One line, in the same block capitals as the first.',
      },
      {
        speaker: 'voice',
        text: 'YOU WERE HERE.',
        mood: 'cold',
      },
      {
        speaker: 'mara',
        text: 'Six people were present. That is what the invitation said.',
      },
      {
        speaker: 'mara',
        text: 'It did not say six people were the only ones here.',
        emphasis: true,
      },
      {
        speaker: 'narrator',
        text: 'Below, in the foyer, the long-case clock begins to tick. It has been stopped at 11:47 for twenty years. It is two minutes past one in the morning, and somebody has wound it.',
        sfx: 'clock',
        effect: {
          notes: [
            {
              id: 'note_ch1_end',
              title: 'Two in the Morning',
              text: 'The house went dark, a music box played from behind a wall that has no door, and the clock in the foyer began to tick for the first time in twenty years. Somebody is awake in this house who should not be.',
              chapter: 1,
            },
          ],
          flags: { ch1_closed: true },
        },
      },
      { speaker: 'narrator', text: 'Night One ends with the rain, and the ticking, and the certainty that you have been expected.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* CHAPTER 2                                                           */
  /* ------------------------------------------------------------------ */
  {
    id: 'ch2_intro',
    chapter: 2,
    title: 'Six Stories',
    bg: 'dining',
    music: 'manor',
    ambience: 'rain',
    cast: ['mara'],
    lines: [
      {
        speaker: 'narrator',
        text: 'Morning does not arrive at Blackwood so much as fail to get dark again. Rain on every window. Coffee nobody drinks. Six people in the same house pretending to be in different ones.',
      },
      {
        speaker: 'mara',
        text: 'Six alibis. A dinner laid for seven. A guest list with a name cut out of it. I have three days of rain and a house full of people who agree on nothing except that nothing happened.',
      },
      {
        speaker: 'narrator',
        bg: 'dining',
        text: 'The dining table has been set for breakfast. Seven places. Six people. The seventh chair is pulled out, as though its occupant has just stepped away.',
      },
      {
        speaker: 'eleanor',
        text: 'It is always set. It has been set every day since 2006. If you find that macabre, Miss Vale, you are welcome to say so.',
        mood: 'cold',
        cast: ['eleanor', 'mara'],
      },
      {
        speaker: 'mara',
        text: 'Why keep setting it?',
      },
      {
        speaker: 'eleanor',
        text: 'Because a table is easier to keep than a marriage.',
        mood: 'sad',
      },
      {
        speaker: 'narrator',
        text: 'Charlotte has not come down. Henry has already been at the decanter. Richard is on the telephone to a number that does not answer, saying the same sentence in different ways. Vivian is watching all of them with the patience of a woman who has been paid to wait.',
      },
      {
        speaker: 'mara',
        text: 'Everyone in this house remembers the night of the fire. Not one of them tells it the same way.',
      },
      {
        speaker: 'mara',
        text: 'I need the paper. The ledger, the guest list, the letters. People lie in conversation and then forget to lie in their own handwriting.',
        emphasis: true,
      },
      {
        speaker: 'narrator',
        text: 'Two rooms are unlocked that were not unlocked last night: the dining room and the library. The study has been left exactly as it was. Arthur has put a fresh log on the drawing room fire, and a fresh glass beside Henry\'s chair.',
        effect: {
          notes: [
            {
              id: 'note_ch2_start',
              title: 'The Shape of the Lie',
              text: 'Every account of the fire differs. Eleanor calls it an accident with a lamp. Arthur calls it a tidy account. Henry says he was never shown the body. Richard says he was in London. Somebody is lying, and more than one somebody is repeating a lie they were taught.',
              chapter: 2,
            },
          ],
        },
      },
      {
        speaker: 'arthur',
        text: 'The library is at your disposal, Miss Vale. I have left the fire in the drawing room low. It is easier to hear a house when it is not making a performance of itself.',
        mood: 'calm',
        cast: ['arthur', 'mara'],
      },
      {
        speaker: 'mara',
        text: 'Arthur. Was there ever a body?',
      },
      {
        speaker: 'arthur',
        text: 'There is always a body, madam. The question is whether it is the right one.',
        mood: 'sad',
      },
    ],
  },
  {
    id: 'ch2_close',
    chapter: 2,
    title: 'The Piece That Does Not Fit',
    bg: 'library',
    music: 'tension',
    ambience: 'clock',
    cast: ['mara', 'arthur'],
    lines: [
      {
        speaker: 'narrator',
        text: 'By evening you have three ledgers, a killed article, a doctor\'s unsent letter, and a notebook full of inconsistencies. None of them proves a murder. All of them prove a lie.',
      },
      {
        speaker: 'mara',
        text: 'The blood was poured. The revolver was fired years ago. The note was typed to be found. Whoever staged that room wanted an investigation, not a funeral.',
      },
      {
        speaker: 'arthur',
        text: 'You sound as though you are accusing the house itself.',
        mood: 'calm',
      },
      {
        speaker: 'mara',
        text: 'I am accusing whoever has been keeping a dead man\'s chair at the table for twenty years.',
      },
      {
        speaker: 'narrator',
        text: 'Arthur sets down the tray very carefully, the way a man sets down something he is afraid of dropping.',
      },
      {
        speaker: 'arthur',
        text: 'There is a room in the east corridor, madam. It has been sealed since the year of the fire. I am asked, from time to time, to open it. I have never found a good reason.',
        mood: 'sad',
      },
      {
        speaker: 'mara',
        text: 'And now?',
      },
      {
        speaker: 'arthur',
        text: 'Now you are standing in my library asking a great many questions about children. I find that the room has begun to suggest itself.',
        mood: 'broken',
      },
      {
        speaker: 'narrator',
        text: 'Far above, something falls — a small, wooden sound, like a toy dropped on a floorboard. Then the long-case clock in the foyer strikes the hour, and the house holds its breath.',
        sfx: 'thunder',
      },
      {
        speaker: 'mara',
        text: 'Mr Finch. Who else is in this house?',
      },
      {
        speaker: 'arthur',
        text: 'Six guests, madam. And the house.',
        mood: 'cold',
        effect: {
          notes: [
            {
              id: 'note_ch2_end',
              title: 'The Room in the East Corridor',
              text: 'Arthur has admitted there is a sealed room in the east corridor, and that he has been asked to open it more than once. The murder was staged. The house has been waiting for someone to ask the right question.',
              chapter: 2,
            },
          ],
          flags: { ch2_closed: true },
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* CHAPTER 3                                                           */
  /* ------------------------------------------------------------------ */
  {
    id: 'ch3_intro',
    chapter: 3,
    title: 'The Locked Room',
    bg: 'corridor',
    music: 'tension',
    ambience: 'clock',
    cast: ['mara'],
    lines: [
      {
        speaker: 'narrator',
        text: 'The east corridor is colder than the rest of the house by several degrees. Six portraits in a row, all facing away from the far end, where a narrow door sits under twenty years of paint.',
      },
      {
        speaker: 'mara',
        text: 'Arthur oiled this lock. He knew I would come.',
      },
      {
        speaker: 'narrator',
        text: 'The key turns without resistance. The door swings inward on a room that has been waiting: a child\'s bed, made. Curtains drawn. Dust on everything except the handle, the sill, and the little music box.',
        bg: 'sealed',
        sfx: 'door',
        music: 'memory',
      },
      {
        speaker: 'mara',
        text: 'Oh.',
      },
      {
        speaker: 'narrator',
        text: 'The air tastes of cedar and old rain. On the wall, pencil marks measure a childhood. On the bed, a rabbit missing an ear. In the corner, a trunk painted with roses that has never been anywhere.',
      },
      {
        speaker: 'mara',
        text: 'They kept it. They sealed a child\'s room and kept it exactly as it was. That is not grief. Grief lets a room go.',
      },
      {
        speaker: 'narrator',
        text: 'You cross to the window and find the latch painted shut, screwed from the inside, soot still on the glass at the height of a small hand. And beside it, a rosewood box with a cracked lid.',
      },
      {
        speaker: 'mara',
        text: 'I know this.',
      },
      {
        speaker: 'narrator',
        text: 'You turn the key before you have decided to. Eight bars of a slow waltz. A missing note where a tooth has snapped. You have hummed this your whole life and never once known where it came from.',
        sfx: 'musicbox',
      },
      {
        speaker: 'mara',
        text: 'Stop. Stop, please.',
      },
      {
        speaker: 'narrator',
        text: 'The music stops on the broken note. In the mirror above the washstand, a woman in a wet coat stands in a child\'s bedroom with her hand at her throat, and behind her, for a moment that does not survive the next breath, there is a girl of seven in a raincoat two sizes too big.',
      },
      {
        speaker: 'mara',
        text: 'I am not here to remember. I am here to investigate.',
      },
      {
        speaker: 'mara',
        text: 'That is what I keep telling myself, and it is getting harder to say out loud.',
        emphasis: true,
      },
    ],
  },
  {
    id: 'ch3_close',
    chapter: 3,
    title: 'The Name on the Grave',
    bg: 'garden',
    music: 'melancholy',
    ambience: 'rain',
    cast: ['mara', 'charlotte'],
    lines: [
      {
        speaker: 'narrator',
        text: 'The rain stops for an hour at dusk, the way it sometimes does at Blackwood, as though the house has decided to listen.',
      },
      {
        speaker: 'narrator',
        text: 'Beyond the yew hedge, the small stone stands in wet grass with yellow roses at its base. The earth in front of it is level. There is nobody underneath.',
      },
      {
        speaker: 'charlotte',
        text: 'You found her grave.',
        mood: 'sad',
        cast: ['charlotte', 'mara'],
      },
      {
        speaker: 'mara',
        text: 'It is not a grave. There is no one in it.',
      },
      {
        speaker: 'charlotte',
        text: 'I know. I have known since I was fourteen. I used to come out here and talk to her anyway. It seemed rude not to.',
        mood: 'sad',
      },
      {
        speaker: 'narrator',
        text: 'She looks at the roses, then at you, and something in her face changes — not recognition exactly. The decision to stop pretending not to recognise.',
      },
      {
        speaker: 'charlotte',
        text: 'If you were going to ask me whether my sister died in that fire, I would like to say, for the record, that I never believed it. Not for one day.',
        mood: 'broken',
      },
      {
        speaker: 'mara',
        text: 'Then where did she go?',
      },
      {
        speaker: 'charlotte',
        text: 'Arthur carried her out. I saw them from the terrace. He put her in a car and he came back with his coat off and his shirt burned through at the shoulder, and he told my mother the child was dead.',
        mood: 'sad',
      },
      {
        speaker: 'narrator',
        text: 'The wind moves through the roses. Somewhere behind you, in the sealed room, a music box is not playing.',
        effect: {
          notes: [
            {
              id: 'note_ch3_end',
              title: 'What Charlotte Saw',
              text: 'Charlotte saw Arthur carry Evelyn out of the house and put her in a car. He came back with his shirt burned through and told Eleanor the child was dead. Charlotte has never believed it. The grave in the garden is empty by design.',
              chapter: 3,
            },
          ],
          flags: { ch3_closed: true, charlotte_allied: true },
          trust: { charlotte: 8 },
        },
      },
      {
        speaker: 'charlotte',
        text: 'Whoever she is now, she grew up somewhere. She is twenty-seven. She would be —',
        mood: 'fear',
      },
      {
        speaker: 'charlotte',
        text: '...How old are you, Miss Vale?',
        mood: 'fear',
      },
      {
        speaker: 'mara',
        text: 'Twenty-seven.',
      },
      {
        speaker: 'narrator',
        text: 'Charlotte does not say anything. She reaches out and takes your left hand, turns it over, and looks at the scar across the palm for a long time. Then she lets go, and walks back to the house without a word.',
        emphasis: true,
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* CHAPTER 4                                                           */
  /* ------------------------------------------------------------------ */
  {
    id: 'ch4_intro',
    chapter: 4,
    title: 'The Missing Name',
    bg: 'study',
    music: 'tension',
    ambience: 'clock',
    cast: ['mara', 'richard'],
    lines: [
      {
        speaker: 'narrator',
        text: 'The study in daylight is a room of small dishonesties. Ink on the blotter. A chair angled for a man who has not sat in it for twenty years. A safe behind a hunting print.',
      },
      {
        speaker: 'mara',
        text: 'Four right, two left, nine right, three left. Richard gave that up too easily. Men like Richard give you a door when they are frightened of what is behind a different one.',
      },
      {
        speaker: 'narrator',
        text: 'The safe opens on files that have been opened recently: company accounts, a genealogist\'s report, a life policy. Every signature on every page says Alexander Blackwood, and no two of them were written by the same hand.',
        sfx: 'click',
      },
      {
        speaker: 'mara',
        text: 'No birth record. No school. No army file. No passport before 1994. He did not exist until he married her.',
      },
      {
        speaker: 'richard',
        text: 'You found it, then. I wondered how long it would take.',
        mood: 'cold',
        cast: ['richard', 'mara'],
      },
      {
        speaker: 'mara',
        text: 'Alexander Blackwood is a name you have been signing for twenty years. There is no man behind it.',
      },
      {
        speaker: 'richard',
        text: 'There was a man. He was a liar, a bully and a fraud, but he was a man. He simply was not Alexander Blackwood. He bought the name the way one buys a coat. Then he died in it.',
        mood: 'cold',
      },
      {
        speaker: 'mara',
        text: 'And the murder I was invited to investigate?',
      },
      {
        speaker: 'richard',
        text: 'There is no body, no will, no funeral and no death certificate for last night. You have been investigating a rumour with a bloodstain and a good tailor.',
        mood: 'smirk',
      },
      {
        speaker: 'narrator',
        text: 'Behind him, in the corridor, someone has begun to play the piano — the same eight bars, the same unfinished note. It stops the moment you notice it.',
        music: 'memory',
      },
      {
        speaker: 'richard',
        text: 'You should ask the butler what he was doing in the garden shed at two in the morning. He has been very busy for a man with nothing to hide.',
        mood: 'cold',
      },
      {
        speaker: 'mara',
        text: 'And you should ask yourself why the estate needed a murdered man more than a living one.',
      },
      {
        speaker: 'narrator',
        text: 'There is a typewriter in the garden shed. There is a note in the study with a crooked t and a dropped e. The rain has stopped, and the whole house is suddenly very quiet.',
        emphasis: true,
      },
    ],
  },
  {
    id: 'ch4_close',
    chapter: 4,
    title: 'A Murder of Convenience',
    bg: 'drawing',
    music: 'tension',
    ambience: 'rain',
    cast: ['mara', 'eleanor', 'charlotte', 'henry', 'richard', 'vivian', 'arthur'],
    lines: [
      {
        speaker: 'narrator',
        text: 'You bring them into the drawing room and lay it out on the table: the typed note, the spent revolver, the wax, the stationery, the machine from the shed.',
      },
      {
        speaker: 'mara',
        text: 'There was no murder. There is no body. The blood came from the kitchen. The note came from the shed. The revolver was fired in 1994 and kept for the occasion.',
      },
      {
        speaker: 'eleanor',
        text: 'Then who brought us here?',
        mood: 'cold',
      },
      {
        speaker: 'mara',
        text: 'The same person who has been keeping this house, this ledger, and that empty grave. The same person who telephoned me before the police.',
      },
      {
        speaker: 'narrator',
        text: 'Arthur stands by the window with his hands folded. He does not look surprised. He looks like a man listening to a clock he has been winding for twenty years.',
      },
      {
        speaker: 'arthur',
        text: 'I did not stage a murder to hurt anyone, madam. I staged a murder because a funeral was the only way to get six people into one room without a lawyer present.',
        mood: 'calm',
      },
      {
        speaker: 'charlotte',
        text: 'You absolute bastard. You could have written a letter.',
        mood: 'angry',
      },
      {
        speaker: 'arthur',
        text: 'I have written a great many letters, Miss Charlotte. None of them were answered.',
        mood: 'sad',
      },
      {
        speaker: 'henry',
        text: 'What is this actually about, Arthur? Because I have been drinking since Tuesday and I would like to know what I am drinking about.',
        mood: 'angry',
      },
      {
        speaker: 'arthur',
        text: 'It is about the seventh person at the table, doctor. It has always been about her. Tomorrow, I will show Miss Vale the last of it, and then she will decide what this house is worth.',
        mood: 'broken',
      },
      {
        speaker: 'vivian',
        text: 'You cannot say a thing like that and then hand round the sherry.',
        mood: 'cold',
      },
      {
        speaker: 'narrator',
        text: 'The rain starts again, harder than before, and the lights in the east corridor go out one by one, from the sealed door toward the stairs, as though someone were walking away from it.',
        sfx: 'thunder',
        effect: {
          notes: [
            {
              id: 'note_ch4_end',
              title: 'The Seventh Person',
              text: 'Arthur staged the murder to bring everyone home. He says it has always been about the seventh person at the table. The estate is built on a name that never existed, and the man who supposedly died last night died in 2006.',
              chapter: 4,
            },
          ],
          flags: { ch4_closed: true, arthur_staged_confessed: true },
        },
      },
      {
        speaker: 'mara',
        text: 'Seven places. Six guests. And one person nobody in this room will name.',
        emphasis: true,
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* CHAPTER 5                                                           */
  /* ------------------------------------------------------------------ */
  {
    id: 'ch5_intro',
    chapter: 5,
    title: 'The Seventh Person',
    bg: 'garden',
    music: 'melancholy',
    ambience: 'rain',
    cast: ['mara'],
    lines: [
      {
        speaker: 'narrator',
        text: 'The east wing at dawn is a broken tooth against the sky. Twenty years of ivy, a roofless nursery, and yellow roses trained along the blackened wall by a man who never stopped gardening.',
      },
      {
        speaker: 'mara',
        text: 'One adult male. Identity unconfirmed. One child reported missing, later confirmed deceased per the family.',
      },
      {
        speaker: 'mara',
        text: 'The fire report says the occupant told the officer the child was in the garden with the gardener. The same child was declared dead twenty minutes later. The house could not keep its story straight for a single night.',
      },
      {
        speaker: 'narrator',
        text: 'In the shed, the typewriter is cold now. Under the seed tins, a bundle of letters tied with twine. The top one is addressed to Arthur in a hand you know: your mother\'s. Ruth\'s.',
      },
      {
        speaker: 'mara',
        text: '"She is asking about the fire again. She has the dreams still."',
      },
      {
        speaker: 'mara',
        text: 'Ruth Vale. The woman who raised me. The woman who told me my parents died in a car accident in a country I could not pronounce.',
      },
      {
        speaker: 'narrator',
        text: 'The photograph inside is three days old in it: a thin, tired woman holding a newborn. On the back, in a hand you have never seen and a name you have never had: "Evelyn, three days old, 1999."',
      },
      {
        speaker: 'mara',
        text: 'No. I am not doing this in a shed. I am going to do this in the house, with all of them watching, because they have had twenty years of doing it in the dark.',
        emphasis: true,
      },
      {
        speaker: 'narrator',
        text: 'You walk back through the wet garden with the letter in your hand, and for the first time the house does not look like a building. It looks like a thing that has been waiting to be asked.',
        music: 'revelation',
      },
    ],
  },
  {
    id: 'ch5_close',
    chapter: 5,
    title: 'The House Answers',
    bg: 'sealed',
    music: 'revelation',
    ambience: 'clock',
    cast: ['mara', 'eleanor', 'charlotte', 'henry', 'richard', 'vivian', 'arthur'],
    lines: [
      {
        speaker: 'narrator',
        text: 'You play the tape in the sealed bedroom, on the little machine from Vivian\'s bag, with the door open so the corridor can hear it.',
      },
      {
        speaker: 'voice',
        text: '"The child is not your story. The child is a closed door. I have paid for this house to stay standing, and I will pay for the door to stay closed."',
        mood: 'cold',
      },
      {
        speaker: 'narrator',
        text: 'Then Arthur\'s voice, twenty years younger, close to the microphone: "She asked me to leave her in the garden. I did not. That is the whole of it."',
        sfx: 'tape',
      },
      {
        speaker: 'eleanor',
        text: 'Turn it off.',
        mood: 'broken',
      },
      {
        speaker: 'mara',
        text: 'No. For twenty years you have told this house a version of the night that kept you comfortable. Tonight it hears the version you were paid to bury.',
      },
      {
        speaker: 'mara',
        text: 'Alexander Blackwood did not die last night. He died in the east wing in 2006. The lamp fell during a row. Arthur put a seven-year-old girl under the bed in this room and then carried her out through the garden and gave her to his sister. You told the fire brigade she was dead. You signed a certificate for a body that was never found. You marked a grave and left it empty.',
      },
      {
        speaker: 'henry',
        text: 'I signed it. I signed both of them. She asked me to make it tidy.',
        mood: 'broken',
      },
      {
        speaker: 'richard',
        text: 'And I kept the name alive. Badly. Expensively. For twenty years.',
        mood: 'sad',
      },
      {
        speaker: 'eleanor',
        text: 'I saw her in the garden. I saw Arthur carrying her. I said she was inside, and I said she was dead, because the alternative was an inquiry into what my husband was.',
        mood: 'broken',
      },
      {
        speaker: 'narrator',
        text: 'Charlotte is not looking at her mother. She is looking at you, and she has been looking at you for some time.',
        mood: 'sad',
      },
      {
        speaker: 'charlotte',
        text: 'Say it. Somebody in this room has to say it out loud, and it is not going to be them.',
        mood: 'broken',
      },
      {
        speaker: 'mara',
        text: 'The girl in the garden. The one in the photograph. The one whose grave is empty.',
      },
      {
        speaker: 'mara',
        text: 'She is standing in her own bedroom.',
        emphasis: true,
      },
      {
        speaker: 'narrator',
        text: 'The music box is still in your hand. It has been wound. It has not been playing. Under your fingers, the cracked lid is warm.',
        sfx: 'musicbox',
        music: 'memory',
      },
      {
        speaker: 'arthur',
        text: 'Evelyn.',
        mood: 'broken',
      },
      {
        speaker: 'mara',
        text: 'My name is Mara Vale. It is the name my mother gave me when she took me out of this house.',
      },
      {
        speaker: 'mara',
        text: 'But before that — before the fire, before the grave, before all of it — my name was Evelyn Blackwood.',
        emphasis: true,
      },
      {
        speaker: 'narrator',
        text: 'Nobody speaks. The rain fills the silence the way it has filled every silence in this house for twenty years. And then Charlotte crosses the room and puts her arms around you, and something in the house gives way, very quietly, like a floor taking weight it was built to carry.',
        effect: {
          notes: [
            {
              id: 'note_ch5_end',
              title: 'The Seventh Person',
              text: 'Eleanor admitted she saw Arthur carry Evelyn out and chose to call the child dead. Henry signed the certificates. Richard kept the name alive. Arthur took the child and let the father burn. I am Evelyn Blackwood. The house has known since the moment I walked in.',
              chapter: 5,
            },
          ],
          flags: { ch5_closed: true, identity_revealed_to_family: true, evelyn_confronted: true },
          trust: { charlotte: 10, eleanor: 5, henry: 5, arthur: 5, vivian: 5 },
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* CHAPTER 6                                                           */
  /* ------------------------------------------------------------------ */
  {
    id: 'ch6_intro',
    chapter: 6,
    title: 'Home',
    bg: 'drawing',
    music: 'memory',
    ambience: 'rain',
    cast: ['mara', 'eleanor', 'charlotte', 'henry', 'richard', 'vivian', 'arthur'],
    lines: [
      {
        speaker: 'narrator',
        text: 'Dawn at Blackwood is a grey permission to stop pretending it is still night. The rain has thinned to a mist. The fire has burned down to one red eye.',
      },
      {
        speaker: 'narrator',
        text: 'They are all in the drawing room. Nobody has slept. Charlotte is sitting on the arm of your chair. Henry has not touched the decanter, which is somehow worse than if he had.',
      },
      {
        speaker: 'eleanor',
        text: 'I have telephoned the solicitor. He is coming at nine. I do not know what one says to a solicitor in these circumstances. I have never had to explain myself before.',
        mood: 'broken',
      },
      {
        speaker: 'richard',
        text: 'You will want to decide what happens to the estate before he arrives. There is no legal owner. There is a dead man\'s name, a great deal of debt, and a house that will fall down if someone stops paying for it.',
        mood: 'cold',
      },
      {
        speaker: 'vivian',
        text: 'There is also a story. I have a telephone in the village and a editor who owes me a favour. Say the word and it is on the front page by Sunday.',
        mood: 'warm',
      },
      {
        speaker: 'henry',
        text: 'I have written a statement. Two pages. It says what I did and why, and it does not make pleasant reading. I will sign it in front of whoever you like.',
        mood: 'sad',
      },
      {
        speaker: 'narrator',
        text: 'Arthur is not with them. He is standing in the hall with his coat on and a small suitcase at his feet, looking at the front door as though it were a person he has not been introduced to.',
      },
      {
        speaker: 'mara',
        text: 'You are leaving.',
      },
      {
        speaker: 'arthur',
        text: 'I have been leaving this house for twenty years, madam. I thought it was time to be polite about it.',
        mood: 'sad',
        cast: ['arthur', 'mara'],
      },
      {
        speaker: 'arthur',
        text: 'Everything else in this house will tell you what it wants from you. I would like to tell you what I did, and then I would like to hear what you decide. That is the whole of my defence.',
        mood: 'broken',
      },
      {
        speaker: 'narrator',
        text: 'Outside, the mist lifts off the drive. In an hour the village will be awake, and the world will begin asking what happened at Blackwood Manor. The answer is in your hands, and it is heavier than it looks.',
      },
    ],
  },
  {
    id: 'ch6_final',
    chapter: 6,
    title: 'What the House Is Worth',
    bg: 'drawing',
    music: 'finale',
    ambience: 'rain',
    cast: ['mara', 'arthur'],
    lines: [
      {
        speaker: 'arthur',
        text: 'You want the whole of it. You have earned the whole of it.',
        mood: 'calm',
      },
      {
        speaker: 'arthur',
        text: 'I was thirty-eight when I came to this house. The master was a bully with a bought name and a talent for making everyone around him smaller. I was his gardener, and then his valet, and then the only person in the house he could not quite look in the eye.',
        mood: 'sad',
      },
      {
        speaker: 'arthur',
        text: 'When the girls were small I used to take them into the east wing when he was in a mood. Evelyn liked the nursery because the window looked at the roses. I told her the rain could not get in. It was the only lie I told her that I believed.',
      },
      {
        speaker: 'arthur',
        text: 'That night he came home drunk and found Eleanor in the study with the accounts. He threw the lamp. It went into the curtains. I heard Evelyn scream and I went up the back stairs, and I put her under the bed and told her to stay, and then I went to find him.',
        mood: 'broken',
      },
      {
        speaker: 'mara',
        text: 'And you found him.',
      },
      {
        speaker: 'arthur',
        text: 'I found him in the corridor with his coat on fire, shouting for someone to help him. And I stood there. I stood there for the length of three breaths, and I thought about the burn on your hand and the way he spoke to your sister, and then I went back for you instead.',
        mood: 'broken',
      },
      {
        speaker: 'arthur',
        text: 'He died in a house I could have carried him out of. I have not told a living soul that until now. The fire report calls it an accident, and it is easier to let it, because the alternative is a man standing in a corridor deciding.',
        mood: 'broken',
      },
      {
        speaker: 'mara',
        text: 'You let him burn.',
      },
      {
        speaker: 'arthur',
        text: 'Yes. And then I carried you out, and put you in the car, and drove you to my sister\'s house in the rain with your hand wrapped in my shirt. You asked me where we were going. I said home. I have never forgiven myself for that either.',
        mood: 'broken',
      },
      {
        speaker: 'narrator',
        text: 'He takes an envelope from his coat and sets it on the hall table. Inside: the original fire report, a page of Arthur\'s handwriting, and a photograph of a girl in a raincoat holding a paper boat.',
      },
      {
        speaker: 'arthur',
        text: 'I staged a murder to bring you home. I put blood on a carpet and a note in a basket and I telephoned a woman whose card I have carried for four years, waiting for a reason. I am not innocent, Evelyn. I am simply the only one here who is willing to say so.',
        mood: 'broken',
      },
      {
        speaker: 'mara',
        text: 'Why now?',
      },
      {
        speaker: 'arthur',
        text: 'Because I am sixty-eight years old, and the roses are the only thing in this house that has ever grown, and I would like to see you stand in the garden knowing whose garden it is.',
        mood: 'sad',
      },
      {
        speaker: 'narrator',
        text: 'You are standing in the hall of the house you were taken out of. Behind you, six people are waiting to find out what your life is worth to them. In front of you, the door is open on a wet drive and the rest of the world.',
        emphasis: true,
      },
      {
        speaker: 'mara',
        text: 'I have one question left. And it is not mine to ask them. It is mine to ask myself.',
      },
      {
        speaker: 'mara',
        text: 'What do I do with the truth?',
        emphasis: true,
        choices: [
          {
            id: 'final_expose',
            text: 'Expose everything. The statements, the tape, the certificates, the name. All of it.',
            hint: 'The family will not survive it. Neither will the silence.',
            effect: {
              flags: { final_decision: 'expose' },
              decision: {
                id: 'ending_choice',
                chapter: 6,
                question: 'What did you do with the truth?',
                answer: 'Exposed the whole of it — the fire, the certificates, the name, the cover-up.',
              },
            },
            reply: [
              {
                speaker: 'mara',
                text: 'Vivian. Telephone your editor. Henry, your statement. Arthur — you will tell them what you told me, in front of the solicitor, in your own words.',
              },
              {
                speaker: 'arthur',
                text: 'And the house?',
                mood: 'sad',
              },
              {
                speaker: 'mara',
                text: 'The house has had twenty years of being more important than a child. It can have a turn at being less important.',
                mood: 'cold',
              },
            ],
          },
          {
            id: 'final_burn',
            text: 'Burn it. The files, the certificates, the ledgers. Let the house keep its lie.',
            hint: 'No one will be punished. Nothing will be repaired.',
            effect: {
              flags: { final_decision: 'burn' },
              decision: {
                id: 'ending_choice',
                chapter: 6,
                question: 'What did you do with the truth?',
                answer: 'Burned the evidence and let the house keep its lie.',
              },
            },
            reply: [
              {
                speaker: 'mara',
                text: 'The boiler in the cellar has been eating this family\'s paper for twenty years. It can finish the job.',
              },
              {
                speaker: 'arthur',
                text: 'And the truth?',
                mood: 'fear',
              },
              {
                speaker: 'mara',
                text: 'The truth was never in the paper, Arthur. That is the one thing this house has never understood.',
                mood: 'cold',
              },
            ],
          },
          {
            id: 'final_silence',
            text: 'Close the door. Tell no one outside this house. Let them live with knowing.',
            hint: 'They will keep their reputations. You will keep the memory.',
            effect: {
              flags: { final_decision: 'silence' },
              decision: {
                id: 'ending_choice',
                chapter: 6,
                question: 'What did you do with the truth?',
                answer: 'Kept the truth inside the house and let the world keep its version.',
              },
            },
            reply: [
              {
                speaker: 'mara',
                text: 'No statements. No article. No solicitor. You will all know what you did, and you will know that I know, and that will have to be the whole of the punishment.',
              },
              {
                speaker: 'eleanor',
                text: 'That is not justice.',
                mood: 'broken',
              },
              {
                speaker: 'mara',
                text: 'No. It is what is left when six people choose a house over a child. I am not going to make it prettier than it is.',
                mood: 'cold',
              },
            ],
          },
          {
            id: 'final_walk',
            text: 'Walk away. Leave Arthur standing in the hall with the truth and the roses.',
            hint: 'Some questions are answered by refusing to ask them.',
            effect: {
              flags: { final_decision: 'walk' },
              decision: {
                id: 'ending_choice',
                chapter: 6,
                question: 'What did you do with the truth?',
                answer: 'Walked away before Arthur finished, and let the house close over it.',
              },
            },
            reply: [
              {
                speaker: 'mara',
                text: 'I came here to investigate a murder. There was no murder. There was a girl, and a house, and twenty years of people deciding that the story was more comfortable than the child.',
              },
              {
                speaker: 'arthur',
                text: 'Evelyn —',
                mood: 'fear',
              },
              {
                speaker: 'mara',
                text: 'Do not. I have been Evelyn for one night. I would like to be Mara for a little longer.',
                mood: 'sad',
              },
            ],
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* ENDINGS                                                             */
  /* ------------------------------------------------------------------ */
  {
    id: 'ending_truth',
    chapter: 6,
    title: 'The Truth',
    bg: 'dawn',
    music: 'revelation',
    ambience: 'rain',
    cast: ['mara', 'arthur', 'eleanor', 'charlotte', 'henry', 'richard', 'vivian'],
    lines: [
      {
        speaker: 'narrator',
        text: 'It takes four hours to put it all on paper. Henry signs his statement at the dining table with the black-handled knife still laid at the head of it. Richard signs the company records. Eleanor signs the deed of the east wing over to an inquiry she will not live to see finished.',
      },
      {
        speaker: 'narrator',
        text: 'Vivian files the story from the village telephone at nine in the morning. By Sunday it is on the front page of a newspaper that once printed two inches below the fold. THE HOUSE THAT BURIED A LIVING CHILD.',
      },
      {
        speaker: 'narrator',
        text: 'There is no murder charge. There was never a murder. There is a fire, a false certificate, an insurance fraud, a conspiracy to conceal, and a woman called Ruth Vale who took a child home and gave her a life.',
      },
      {
        speaker: 'vivian',
        text: 'They will call you a survivor. They will put your face in the paper and get the colour of your eyes wrong. I am sorry for that part.',
        mood: 'sad',
      },
      {
        speaker: 'mara',
        text: 'Let them. It is better than being a grave with nobody in it.',
      },
      {
        speaker: 'eleanor',
        text: 'I am not going to ask you to forgive me. I am going to ask whether you will come back to the house, once, when the solicitors have finished. There is a garden you have not seen in twenty years.',
        mood: 'broken',
      },
      {
        speaker: 'charlotte',
        text: 'I will be there. With the doll. I am not letting you do this alone.',
        mood: 'warm',
      },
      {
        speaker: 'henry',
        text: 'For what it is worth — and it is worth less than nothing — I am glad you did not die, Evelyn. I have been glad for twenty years and unable to say so.',
        mood: 'sad',
      },
      {
        speaker: 'narrator',
        text: 'Arthur does not sign anything. He stands in the garden with his roses while the house is photographed from the drive, and when the last of the police cars has gone he takes off his coat and begins to tie back the yellow roses along the blackened wall.',
      },
      {
        speaker: 'arthur',
        text: 'I will not ask to be forgiven either. I would not know what to do with it.',
        mood: 'broken',
      },
      {
        speaker: 'mara',
        text: 'I know what you did. Both things. The fire, and the twenty years of letters you never sent.',
      },
      {
        speaker: 'arthur',
        text: 'Yes.',
        mood: 'sad',
      },
      {
        speaker: 'mara',
        text: 'And I know that a man who wanted to be innocent would have burned the room and the letters and the locket and me. You kept everything. You kept it so long that it became a house with a girl coming up the drive.',
      },
      {
        speaker: 'narrator',
        text: 'You take the locket out and hold it in the light. E.B. The rain has stopped. Somewhere behind the house, a train is leaving the station with no roof, and you are not on it.',
      },
      {
        speaker: 'mara',
        text: 'My name is Evelyn Blackwood. My name is Mara Vale. I am not going to choose between them. I am going to be the woman who was both, and survived both.',
        emphasis: true,
      },
      {
        speaker: 'narrator',
        text: 'You kneel in the wet grass and put your hands in the earth beside the yellow roses, and for the first time in twenty years the house does not have anything to hide.',
        music: 'memory',
      },
    ],
  },
  {
    id: 'ending_ashes',
    chapter: 6,
    title: 'Ashes',
    bg: 'eastwing',
    music: 'finale',
    ambience: 'fire',
    cast: ['mara', 'arthur'],
    lines: [
      {
        speaker: 'narrator',
        text: 'It begins with a boiler and a box of paper, and it ends with the east wing burning for the second time in twenty years.',
      },
      {
        speaker: 'narrator',
        text: 'You meant to burn the files. The fire finds the dry timber in the corridor and the twenty years of paint on the sealed door and the curtains in a room that has been waiting with its windows shut.',
      },
      {
        speaker: 'arthur',
        text: 'Get out. Evelyn — get out of the house.',
        mood: 'fear',
        sfx: 'fire',
      },
      {
        speaker: 'narrator',
        text: 'The fire brigade comes from the village in eleven minutes. It takes the roof. It takes the nursery. It takes the trunk with the letter in it and the bed with the rabbit and the curtains that were drawn on a child who was never coming back.',
      },
      {
        speaker: 'narrator',
        text: 'Nobody dies. That is the one mercy. But the certificates, the ledger, the tape, the photographs, the typewriter and the written statement all go up the chimney into the rain, and the truth goes with them.',
      },
      {
        speaker: 'vivian',
        text: 'Without the originals, it is a story about a family and a fire. A good story. Not a provable one. They will deny it, and the denial will be the only thing that lasts.',
        mood: 'cold',
      },
      {
        speaker: 'eleanor',
        text: 'Then we have burned the only evidence that could have hurt us. I suppose I should thank you.',
        mood: 'cold',
      },
      {
        speaker: 'mara',
        text: 'Do not.',
      },
      {
        speaker: 'charlotte',
        text: 'You had it. You had all of it, and now we are standing in a wet field with nothing.',
        mood: 'angry',
      },
      {
        speaker: 'narrator',
        text: 'The family scatters by noon. Richard is gone before the fire is out. Henry goes with the ambulance crew, and does not come back. Charlotte drives away without saying goodbye, and the look she gives you through the rain on the windscreen is the worst thing in the whole of this house.',
      },
      {
        speaker: 'arthur',
        text: 'I will stay until the last of it is down. Somebody should.',
        mood: 'broken',
      },
      {
        speaker: 'mara',
        text: 'There was a girl in that room, Arthur. You carried her out once. You could not do it twice.',
      },
      {
        speaker: 'arthur',
        text: 'No. But I could stand in the garden and watch the house burn, and this time I knew her name.',
        mood: 'broken',
      },
      {
        speaker: 'narrator',
        text: 'You leave Blackwood Manor with a locket, a scar and the smell of smoke in your coat. In the village, the newspaper is already setting type. By the time it prints, there will be nothing left to prove but the shape of a burned wing against the sky.',
        emphasis: true,
      },
    ],
  },
  {
    id: 'ending_silence',
    chapter: 6,
    title: 'The Silence',
    bg: 'manor_rain',
    music: 'melancholy',
    ambience: 'rain',
    cast: ['mara', 'charlotte'],
    lines: [
      {
        speaker: 'narrator',
        text: 'You leave at first light, before the solicitor arrives, before the village wakes, before the story has a chance to become a thing that other people own.',
      },
      {
        speaker: 'narrator',
        text: 'Behind you, the house stands exactly as it has stood for two hundred years: a black shape with two towers, one wing boarded, one wing broken. Nobody is burning anything. Nobody is signing anything. Nobody is being punished.',
      },
      {
        speaker: 'charlotte',
        text: 'You are really going.',
        mood: 'sad',
      },
      {
        speaker: 'mara',
        text: 'I have a flat above a locksmith and a case file with no crime in it. Somebody has to go back and be ordinary.',
      },
      {
        speaker: 'charlotte',
        text: 'They will not change. My mother will set the seventh place tonight and Richard will sign something with a dead man\'s name and Henry will drink until he can sleep. That is what silence buys you.',
        mood: 'angry',
      },
      {
        speaker: 'mara',
        text: 'I know. But they will do it knowing that I know. And I will know where I come from. That is more than I had on Tuesday.',
      },
      {
        speaker: 'narrator',
        text: 'Charlotte takes the doll out of her bag and holds it for a moment, then puts it into your hands. The stitching is coming loose at the hem. The gold M catches the grey light.',
      },
      {
        speaker: 'charlotte',
        text: 'Take her. I have been looking after her for twenty years and I would like to stop.',
        mood: 'broken',
      },
      {
        speaker: 'narrator',
        text: 'At the end of the drive you turn back. Arthur is standing in the porch with the light behind him, one hand raised, not quite a wave. He does not come down the steps. He never did.',
      },
      {
        speaker: 'mara',
        text: 'The house will keep its silence. But I am taking the girl with me.',
      },
      {
        speaker: 'narrator',
        text: 'The rain comes in over the fields as the car turns onto the road. In your pocket, the locket is warm. Somewhere behind you, a clock is ticking in an empty hall, counting the years it has left.',
        music: 'memory',
      },
    ],
  },
  {
    id: 'ending_witness',
    chapter: 6,
    title: 'The Last Witness',
    bg: 'manor_rain',
    music: 'melancholy',
    ambience: 'rain',
    cast: ['mara'],
    lines: [
      {
        speaker: 'narrator',
        text: 'You do not wait for the solicitor. You do not wait for the statements, or the article, or the sound of Arthur\'s voice finishing the sentence he has been carrying for twenty years.',
      },
      {
        speaker: 'narrator',
        text: 'You walk out of the drawing room with the locket in your hand and the rain on the drive, and you do not look back at the house because you already know what it looks like.',
      },
      {
        speaker: 'narrator',
        text: 'By the time the village wakes, Arthur Finch is gone. The suitcase is gone from the hall. The shed is swept. The typewriter has been oiled and left on the bench with a sheet over it, and the yellow roses have been cut back for winter.',
      },
      {
        speaker: 'eleanor',
        text: 'He left a letter. It says only: "Tell her the garden is hers." I do not know what he meant. I do not think I am supposed to.',
        mood: 'broken',
      },
      {
        speaker: 'narrator',
        text: 'The solicitor arrives at nine to a house with no client, no evidence and no witness. The estate goes into receivership before Christmas. The sealed room is opened by strangers, emptied, and painted white.',
      },
      {
        speaker: 'narrator',
        text: 'Vivian does not publish. There is nothing to publish that can be proved, and she has spent twenty years learning the difference between a story and a fact. Charlotte writes to you twice. You do not answer.',
      },
      {
        speaker: 'mara',
        text: 'I had it. I had all of it in my hands, and I let the moment go by because I was afraid of what it would make me.',
      },
      {
        speaker: 'narrator',
        text: 'Back in Carrow Street, above the locksmith, you sit in the office with the rain on the window and a case file that contains one photograph, one locket and a scar you can finally explain.',
      },
      {
        speaker: 'narrator',
        text: 'The melody comes back to you sometimes — eight bars, slow, stopping on the note that is not there. You have stopped humming it. You are afraid that if you do, you will hear the rest of the house behind it.',
      },
      {
        speaker: 'mara',
        text: 'Everyone remembers the murder. Nobody remembers the victim.',
        emphasis: true,
      },
      {
        speaker: 'mara',
        text: 'I was the only witness left. And I did not stay to be heard.',
        emphasis: true,
      },
      {
        speaker: 'narrator',
        text: 'The rain goes on. Somewhere north of the city, a man with a suitcase and a garden trowel is standing on a station platform with no roof, waiting for a train. He does not look at the newspaper. There is nothing in it about a girl.',
        music: 'melancholy',
      },
    ],
  },
];

export const SCENE_BY_ID: Record<string, Scene> = Object.fromEntries(
  SCENES.map((s) => [s.id, s]),
);

export function getScene(id: string): Scene | undefined {
  return SCENE_BY_ID[id];
}

export const ENDING_SCENES: Record<string, string> = {
  truth: 'ending_truth',
  ashes: 'ending_ashes',
  silence: 'ending_silence',
  witness: 'ending_witness',
};

/** Unused helper kept for the ambient rain loop timing. */
export const RAIN_BARS = RAIN.length;
