import type { Hotspot, Room } from './types';

export const ROOMS: Room[] = [
  {
    id: 'foyer',
    name: 'The Foyer',
    subtitle: 'Where the house counts its visitors',
    ambience: 'rain',
    chapter: 1,
    description:
      'Black and white marble, worn into a path down the centre. A staircase climbs into darkness. Somewhere above, a door closes on a room nobody uses.',
  },
  {
    id: 'study',
    name: 'The Study',
    subtitle: 'The alleged scene of the crime',
    ambience: 'clock',
    chapter: 1,
    description:
      'Oak, leather, and the smell of cold ash. A single lamp burns on the desk. The carpet has been ruined by something dark, and the rain writes on the window.',
  },
  {
    id: 'drawing',
    name: 'The Drawing Room',
    subtitle: 'Where the family waits',
    ambience: 'rain',
    chapter: 2,
    description:
      'Silk wallpaper the colour of old blood. A fire that has been allowed to die. Six chairs arranged around a hearth built for twenty people.',
  },
  {
    id: 'dining',
    name: 'The Dining Room',
    subtitle: 'Seven places, six guests',
    ambience: 'clock',
    chapter: 2,
    description:
      'Candles in silver. A table long enough to make conversation a walk. The chairs have been pulled out and not put back.',
  },
  {
    id: 'library',
    name: 'The Library',
    subtitle: 'Where the house keeps its version of things',
    ambience: 'rain',
    chapter: 2,
    description:
      'Twelve thousand books and not one of them read in the last decade. A ladder on a rail, a dead fire, and a smell of tobacco and wet paper.',
  },
  {
    id: 'corridor',
    name: 'The East Corridor',
    subtitle: 'The part of the house that is not discussed',
    ambience: 'clock',
    chapter: 3,
    description:
      'Portraits in a row, all facing the same way. At the far end, a door with a strip of new paint around the frame — as though the wall were still deciding whether to keep it.',
  },
  {
    id: 'sealed',
    name: 'The Sealed Bedroom',
    subtitle: 'A room kept exactly as it was left',
    ambience: 'musicbox',
    chapter: 3,
    description:
      'A child\'s room under a sheet of dust. The bed is made. The curtains are drawn. Nothing has been moved in twenty years, and everything has been visited.',
  },
  {
    id: 'cellar',
    name: 'The Cellar',
    subtitle: 'Deeds, dust and boiler heat',
    ambience: 'clock',
    chapter: 4,
    description:
      'Stone steps going down into warmth. Wine racks, packing crates, and a wall of deed boxes with a century of the family\'s paper in them.',
  },
  {
    id: 'garden',
    name: 'The Gardens',
    subtitle: 'Roses, rain and the east wing ruins',
    ambience: 'rain',
    chapter: 4,
    description:
      'Yellow roses along a blackened wall. The east wing stands roofless against the sky, its windows empty. Beyond the yew hedge, a small stone waits in the wet grass.',
  },
];

export const ROOM_BY_ID: Record<string, Room> = Object.fromEntries(
  ROOMS.map((r) => [r.id, r]),
);

export const HOTSPOTS: Hotspot[] = [
  // FOYER
  {
    id: 'foyer_clock',
    room: 'foyer',
    label: 'The long-case clock',
    name: 'A Clock Stopped at 11:47',
    x: 18,
    y: 40,
    art: 'watch',
    chapter: 1,
    description:
      'Mahogany, older than the electric lights. Its pendulum hangs still. The hands are at 11:47, and the brass key in the door is bright — recently turned.',
    found:
      'The dust on the pendulum has been disturbed. Someone stopped this clock on purpose, and stopped it long after it broke.',
    evidence: 'stopped_clock',
  },
  {
    id: 'foyer_guestbook',
    room: 'foyer',
    label: 'The guest book',
    name: 'A Book of Arrivals',
    x: 72,
    y: 60,
    art: 'ledger',
    chapter: 1,
    description:
      'A leather guest book on the hall table. The last page is wet at the corner where someone set down a glass.',
    found:
      'Six names, six inks, all within an hour. Arthur\'s own entry has been struck out. A seventh line has been ruled through so hard the nib tore the page.',
    evidence: 'guest_book',
  },
  {
    id: 'foyer_erased_line',
    room: 'foyer',
    label: 'A line ruled through',
    name: 'The Erased Entry',
    x: 78,
    y: 52,
    art: 'document',
    chapter: 1,
    description:
      'The guest book is open at tonight\'s page. Below Arthur\'s struck-out name, a seventh line has been ruled through so hard the nib tore the paper.',
    found:
      'The indentation of a name remains under the ink — short, upward, unfinished. Six guests, six names, and a seventh entry someone did not want counted.',
    evidence: 'guestlist',
  },
  {
    id: 'foyer_mirror',
    room: 'foyer',
    label: 'The hall mirror',
    name: 'A Mirror Too Old to Flatter',
    x: 45,
    y: 26,
    art: 'glass',
    chapter: 1,
    description:
      'A gilt mirror, foxed with age. Your reflection arrives a half-second late, rain still on its shoulders.',
    found:
      'For a moment you do not recognise the woman in the glass. Not because she is a stranger — because she looks like she belongs in this house.',
    flag: 'foyer_mirror',
  },
  {
    id: 'foyer_crest',
    room: 'foyer',
    label: 'The house crest',
    name: 'A Crest with Two Dates',
    x: 88,
    y: 30,
    art: 'document',
    chapter: 1,
    description:
      'Carved above the door: two swans, a tower, and the Blackwood motto — "What is kept, remains."',
    found:
      'Beneath the motto, a small brass plate has been screwed on later: "A.B. 1993." The house dates itself from the marriage, not from its building. As though the family began when the name did.',
  },
  // STUDY
  {
    id: 'study_blood',
    room: 'study',
    label: 'The stain on the carpet',
    name: 'A Pool of Something Dark',
    x: 50,
    y: 78,
    art: 'glass',
    chapter: 1,
    description:
      'A dark stain sunk into the carpet, wider than your two hands together. It has dried to the colour of old ink.',
    found:
      'No spray on the furniture. No drag marks. No footprint leading out. Blood does not behave like this unless it is poured.',
    evidence: 'bloodstain',
  },
  {
    id: 'study_revolver',
    room: 'study',
    label: 'The revolver',
    name: 'A Webley with One Empty Chamber',
    x: 69,
    y: 62,
    art: 'weapon',
    chapter: 1,
    description:
      'An old service revolver on the rug, laid parallel to the desk. The cylinder is open. The grip is clean.',
    found:
      'One chamber empty. No bullet in the room. No fresh powder smell — only soot, old and dry. Whoever last fired this did it years ago.',
    evidence: 'revolver',
  },
  {
    id: 'study_photo',
    room: 'study',
    label: 'The framed photograph',
    name: 'A Girl with a Paper Boat',
    x: 30,
    y: 50,
    art: 'photo',
    chapter: 1,
    description:
      'A silver frame on the desk, angled toward the chair. A sepia child on the front steps, holding a paper boat up to the rain.',
    found:
      'The glass has been wiped clean, while everything around it is dusty. On the back: "E. — the last good day." The left edge of the photograph is folded back, hiding whoever stood beside her.',
    evidence: 'old_photo',
  },
  {
    id: 'study_waste',
    room: 'study',
    label: 'The wastepaper basket',
    name: 'A Page Torn Down the Middle',
    x: 84,
    y: 70,
    art: 'note',
    chapter: 1,
    description:
      'A wicker basket beside the desk, mostly full of ash. One page has been left on top, deliberately visible.',
    found:
      'Typewritten: "I did what had to be done. He would have destroyed all of us. Burn the rest." Torn cleanly through the middle of a word. Written to be found, not read.',
    evidence: 'staged_note',
  },
  {
    id: 'study_window',
    room: 'study',
    label: 'The window',
    name: 'Rain, and a Latch That Was Never Forced',
    x: 88,
    y: 34,
    art: 'glass',
    chapter: 1,
    description:
      'A tall sash window, running with rain. The curtains are half drawn.',
    found:
      'The window is shut and latched from the inside. There is no broken glass on the carpet, no wet footprints. Whatever happened in this room, no one came in through the window.',
    note: {
      id: 'note_window',
      title: 'The Window',
      text: 'The study window is latched from the inside, and the rain has been falling for hours. No one entered this room from the garden. The scene has been arranged from within.',
      chapter: 1,
    },
    flag: 'window_checked',
  },
  {
    id: 'study_passport',
    room: 'study',
    label: 'The desk drawer',
    name: 'A Passport in a Dead Man\'s Desk',
    x: 64,
    y: 52,
    art: 'document',
    chapter: 4,
    description:
      'The middle drawer has been unlocked for a long time. Inside: pens, a letter opener, and a burgundy passport.',
    found:
      'Issued 1996. The photograph shows a man in profile, as though he did not care to be looked at straight on. Stamps run to September 2006 and then stop — not one border crossed in twenty years.',
    evidence: 'passport',
  },
  {
    id: 'study_safe',
    room: 'study',
    label: 'The wall safe',
    name: 'A Safe Behind the Hunting Print',
    x: 12,
    y: 42,
    art: 'key',
    chapter: 4,
    requiresFlag: 'safe_open',
    lockedText:
      'A wall safe behind the hunting print. The dial is a four-number combination. Richard Graves has been using this study for twenty years; he would know it.',
    description:
      'The safe hangs open. Files, a ledger, and a letter from a genealogist, folded with the care of something read many times.',
    found:
      'No birth record for Alexander Blackwood in any register, for any year. No school, no army file, no papers before 1994. A man with no childhood, filing himself into a name.',
    evidence: 'birth_missing',
  },
  {
    id: 'study_filings',
    room: 'study',
    label: 'The company filings',
    name: 'An Estate Breathing on a Dead Man\'s Name',
    x: 16,
    y: 58,
    art: 'ledger',
    chapter: 4,
    requiresFlag: 'safe_open',
    description:
      'A folder of company filings for Barrow Holdings, registered in St Helier. Each annual return carries the signature of A. Blackwood.',
    found:
      'No two signatures are the same. Every return since 2006 has been signed by a different hand. The company name in 1993 was "A. Barrow, trading as Blackwood". The man bought the name, then had to keep being it.',
    evidence: 'shell_company',
  },
  {
    id: 'study_insurance',
    room: 'study',
    label: 'The policy schedule',
    name: 'A Payout Twenty Years Overdue',
    x: 20,
    y: 70,
    art: 'document',
    chapter: 5,
    requiresFlag: 'safe_open',
    description:
      'A fold of insurance paper under the company filings, soft at the creases.',
    found:
      'Fire damage, content loss, and a life policy on Alexander Blackwood with double indemnity for accidental death. Paid eleven weeks after the fire. Signed by Eleanor, witnessed by Richard. The policy was taken out one year before the house burned.',
    evidence: 'insurance',
  },
  // DRAWING ROOM
  {
    id: 'drawing_portrait',
    room: 'drawing',
    label: 'The family portrait',
    name: 'A Family with a Face Scratched Out',
    x: 50,
    y: 26,
    art: 'photo',
    chapter: 2,
    description:
      'A large oil portrait over the fireplace: Eleanor, Charlotte as a girl, a man standing behind them with his hands on the chair back. There is a fourth figure, smaller, at the edge.',
    found:
      'The child at the edge of the portrait has been painted out — not cut, not covered, painted over with the wallpaper pattern. Someone paid a restorer to erase her. The man\'s face has been scratched at with something sharp, over and over, at a height a standing woman could reach.',
    note: {
      id: 'note_portrait',
      title: 'The Painted-Out Child',
      text: 'The family portrait originally had four figures. The smallest has been painted over; the father\'s face has been scratched by hand. The house has been editing its own memory for twenty years.',
      chapter: 2,
    },
    flag: 'saw_family_portrait',
  },
  {
    id: 'drawing_suitcase',
    room: 'drawing',
    label: 'Charlotte\'s suitcase',
    name: 'A Suitcase Full of Things She Kept',
    x: 12,
    y: 78,
    art: 'doll',
    chapter: 2,
    description:
      'A leather suitcase by the armchair, latched but not locked, with three days of clothes and twenty years of guilt in it.',
    found:
      'Under the cigarettes and paintbrushes: a rag doll in a child\'s dress, its face repaired many times in many threads. On the hem, a child\'s uneven stitching: E. Underneath, a later adult hand has added an M in gold thread.',
    evidence: 'doll',
  },
  {
    id: 'drawing_fire',
    room: 'drawing',
    label: 'The fireplace',
    name: 'Ash and a Corner of Paper',
    x: 22,
    y: 62,
    art: 'note',
    chapter: 2,
    description:
      'The fire has been let die. In the grate, among the ash, something white has not quite burned.',
    found:
      'A corner of a typed letter: "...the child is not to be mentioned in..." The rest is ash. The fire was lit recently, and fed paper.',
    flag: 'ash_found',
  },
  {
    id: 'drawing_piano',
    room: 'drawing',
    label: 'The piano',
    name: 'A Waltz with a Missing Note',
    x: 76,
    y: 58,
    art: 'musicbox',
    chapter: 2,
    description:
      'A grand piano with the lid closed. One key, middle G, is worn pale by a single finger.',
    found:
      'You play the phrase without meaning to — eight bars, slow, in three-four time. It stops where it always stops, on the note that is not there. Charlotte, in the doorway, goes very still. "Where did you learn that?"',
    flag: 'heard_melody',
    note: {
      id: 'note_melody',
      title: 'The Unfinished Waltz',
      text: 'I played a melody I have hummed since childhood on a piano I have never touched. Charlotte recognised it. She looked at me as though I had spoken her sister\'s name.',
      chapter: 2,
    },
  },
  {
    id: 'drawing_decanter',
    room: 'drawing',
    label: 'The decanter',
    name: 'A Glass Poured and Abandoned',
    x: 87,
    y: 68,
    art: 'glass',
    chapter: 2,
    description:
      'A crystal decanter, three-quarters full. One glass has been poured and not drunk.',
    found:
      'The glass is warm to the touch and the level has not gone down. Richard poured it, then forgot it. Men do not forget whisky unless they have been interrupted by something they would rather not remember.',
  },
  // DINING ROOM
  {
    id: 'dining_seating',
    room: 'dining',
    label: 'The seating plan',
    name: 'Seven Places, Six Names',
    x: 52,
    y: 34,
    art: 'document',
    chapter: 2,
    description:
      'A pencil plan pinned to the sideboard, in Eleanor\'s small, exact hand. Seven settings; six names.',
    found:
      'The seventh place is at the head of the table, where Alexander used to sit — laid with a black-handled knife, a glass, and a place for a watch. One name has been erased and rewritten and erased again in the same position.',
    evidence: 'seating',
  },
  {
    id: 'dining_ledger',
    room: 'dining',
    label: 'The sideboard drawer',
    name: 'The Household Ledger',
    x: 20,
    y: 66,
    art: 'ledger',
    chapter: 2,
    description:
      'The top drawer of the sideboard is stiff with age. Inside, a bound ledger and a tin of pencils.',
    found:
      'Every quarter since 2006, a payment: "R. VALE — maintenance." Rising with each year, as though keeping pace with a growing child. The most recent is three weeks old. All of them countersigned by Eleanor.',
    evidence: 'ledger',
  },
  {
    id: 'dining_desk',
    room: 'dining',
    label: 'The writing desk',
    name: 'A Share Transfer in the Wrong Hand',
    x: 82,
    y: 56,
    art: 'document',
    chapter: 2,
    description:
      'A small writing desk in the corner, its blotter stained. A document lies face up as though left mid-thought.',
    found:
      'Shares transferred out of Alexander\'s name four days after he vanished. His signature is confident. It does not match the marriage certificate. Richard has witnessed it in his own hand.',
    evidence: 'share_contract',
  },
  {
    id: 'dining_glasses',
    room: 'dining',
    label: 'The glasses on the table',
    name: 'Seven Glasses, One Untouched',
    x: 66,
    y: 56,
    art: 'glass',
    chapter: 2,
    description:
      'Seven wine glasses have been set at the table. Six carry fingerprints and the dregs of wine.',
    found:
      'The seventh glass is clean and dry. It has been set, and set again, every night for twenty years — and nobody has ever drunk from it.',
    flag: 'seven_glasses',
    note: {
      id: 'note_glasses',
      title: 'The Seventh Glass',
      text: 'Seven glasses are set every night. Six are used. The seventh is washed and replaced. The house sets a place for Alexander Blackwood as though he might come down for dinner.',
      chapter: 2,
    },
  },
  {
    id: 'dining_napkin',
    room: 'dining',
    label: 'A folded napkin',
    name: 'Charlotte\'s Sketch',
    x: 40,
    y: 60,
    art: 'note',
    chapter: 2,
    description:
      'A linen napkin folded into a square, drawn on in charcoal.',
    found:
      'A sketch of a child running from a burning wing. In the corner: "E. 2006." Charlotte has been drawing this for twenty years, on napkins, on walls, on the backs of unpaid bills.',
    flag: 'saw_sketch',
  },
  // LIBRARY
  {
    id: 'library_bag',
    room: 'library',
    label: 'The doctor\'s bag',
    name: 'A Letter Never Sent',
    x: 26,
    y: 64,
    art: 'letter',
    chapter: 2,
    description:
      'A leather medical bag by the wing chair, latched but not locked. Prescription bottles rattle when you lift the flap.',
    found:
      'A folded letter, unsent: "I have done what you asked, but I will not do it twice. The certificate is dated the fifteenth. The child died on the fourteenth. If anyone compares the documents, we are finished." Dated three weeks after the fire.',
    evidence: 'medical_letter',
  },
  {
    id: 'library_archive',
    room: 'library',
    label: 'The bound newspapers',
    name: 'A Two-Inch Obituary That Isn\'t One',
    x: 70,
    y: 40,
    art: 'newspaper',
    chapter: 2,
    description:
      'Bound volumes of the county paper on the lower shelf, the 2006 volume still holding a ribbon.',
    found:
      '"BLACKWOOD MANOR: SMALL FIRE CONTAINED. No injuries reported." Two inches, below the fold. No child, no death. The byline has been cut out with a razor.',
    evidence: 'newspaper',
  },
  {
    id: 'library_portfolio',
    room: 'library',
    label: 'Vivian\'s portfolio',
    name: 'A Story Killed Before Print',
    x: 84,
    y: 70,
    art: 'newspaper',
    chapter: 2,
    description:
      'A black leather portfolio under the reading chair, rain-spotted, with a journalist\'s initials pressed into the corner.',
    found:
      '"THE HOUSE THAT BURNED A CHILD AND CALLED IT AN ACCIDENT." Names the fire, the sealed wing, the certificate signed without a body. In the margin, in red: "KILL. £. V.C."',
    evidence: 'article_draft',
  },
  {
    id: 'library_case_notes',
    room: 'library',
    label: 'The doctor\'s case notes',
    name: 'A Clinic Record for a Dead Child',
    x: 34,
    y: 44,
    art: 'document',
    chapter: 3,
    description:
      'A carbon-copy clinic record in the doctor\'s bag, stapled to a second page. Ashford has been carrying it around the house.',
    found:
      'A girl of about seven, full-thickness burn to the left palm, eleven days after Evelyn Blackwood was declared dead. Guardian: R. Vale. Patient does not speak. Stapled to it: a woman called Mara Vale, twenty years later, with the same scar.',
    evidence: 'burn_note',
  },
  {
    id: 'library_original_notes',
    room: 'library',
    label: 'The original case notes',
    name: 'A Cause of Death, Rewritten',
    x: 30,
    y: 54,
    art: 'document',
    chapter: 4,
    description:
      'Beneath the clinic copies, the original notes for October 2006, in three different inks.',
    found:
      '"Smoke inhalation" struck through. "Cardiac failure" written over it. "Exposure" added in a third ink. The date changed from the fourteenth to the fifteenth. Underneath: "Male, approx 45, extensive burns, identified by ring and watch only. No dental record. Body removed by R. Graves." No mention of a child.',
    evidence: 'medical_record',
  },
  {
    id: 'library_recorder',
    room: 'library',
    label: 'The recorder',
    name: 'A Tape Marked NOT FOR PRINT',
    x: 68,
    y: 62,
    art: 'tape',
    chapter: 5,
    description:
      'A microcassette recorder in Vivian\'s portfolio, half under a cushion. The tape is wound to the middle.',
    found:
      'Eleanor\'s voice, twenty years younger: "The child is not your story. The child is a closed door. I have paid for this house to stay standing, and I will pay for the door to stay closed. Name your figure." Then, after the negotiation, a man\'s voice, close to the microphone: "She asked me to leave her in the garden. I did not. That is the whole of it."',
    evidence: 'vivian_tape',
  },
  {
    id: 'library_hollow',
    room: 'library',
    label: 'A book out of place',
    name: 'A Book of Poems, Inscribed',
    x: 14,
    y: 46,
    art: 'letter',
    chapter: 2,
    description:
      'One book sits proud of the others, as though recently returned. A slim volume of poetry, the spine cracked.',
    found:
      'The inscription, in Arthur\'s copperplate: "For Evelyn — so you know the rain is not always a warning. A." Under it, a child has drawn a boat in blue crayon. The book is a first edition. It has been read to pieces.',
    flag: 'found_poems',
  },
  // CORRIDOR
  {
    id: 'corridor_door',
    room: 'corridor',
    label: 'The sealed door',
    name: 'A Door with New Paint Around It',
    x: 66,
    y: 44,
    art: 'key',
    chapter: 3,
    description:
      'A narrow door at the end of the corridor, its frame painted over so many times the moulding has softened. No handle — only a keyhole with a brass escutcheon.',
    found:
      'The keyhole is oiled. Someone has been opening this door. Fresh paint has been scraped from the strike plate within the last few days.',
    requiresFlag: 'sealed_key',
    lockedText:
      'The door is locked, and the keyhole has been oiled recently. Arthur carries a ring of keys with one that fits nothing in this house. He would know what this door is.',
    flag: 'sealed_door_found',
  },
  {
    id: 'corridor_bells',
    room: 'corridor',
    label: 'The servant bell board',
    name: 'A Bell That Still Rings',
    x: 20,
    y: 34,
    art: 'watch',
    chapter: 3,
    description:
      'A board of brass bells, each labelled with a room. Most are dead. One still has a wire attached.',
    found:
      'The bell for the nursery has been disconnected. The wire has been cut, not worn through. But the little brass flap is polished — someone has been polishing a bell that cannot ring.',
    flag: 'saw_bells',
  },
  {
    id: 'corridor_portraits',
    room: 'corridor',
    label: 'The portraits',
    name: 'A Row of Blackwoods, Facing Away',
    x: 42,
    y: 30,
    art: 'photo',
    chapter: 3,
    description:
      'Six portraits in a row: ancestors, a wedding, a christening. All of them hung to face the same direction — away from the sealed door.',
    found:
      'The wedding portrait has been reframed. Beneath the frame, a strip of the original photograph is visible: a small girl in a white dress at the edge of the group, her hand held by someone in livery. The frame was cut down to hide her.',
    flag: 'saw_portrait',
    note: {
      id: 'note_portraits',
      title: 'The Cut-Down Wedding',
      text: 'Every photograph in this house has been cut, folded or painted to remove the same person. The family did not simply lose a child. They edited her out, one frame at a time.',
      chapter: 3,
    },
  },
  {
    id: 'corridor_damp',
    room: 'corridor',
    label: 'The damp patch',
    name: 'Water Where There Is No Pipe',
    x: 86,
    y: 70,
    art: 'glass',
    chapter: 3,
    description:
      'A dark bloom of damp on the wallpaper, roughly the shape of a door.',
    found:
      'The plaster behind the wallpaper is new. There was a doorway here once, bricked up from the corridor side. This corridor used to lead somewhere else.',
    flag: 'saw_damp',
  },
  // SEALED BEDROOM
  {
    id: 'sealed_trunk',
    room: 'sealed',
    label: 'The trunk',
    name: 'A Letter Still Sealed',
    x: 24,
    y: 66,
    art: 'letter',
    chapter: 3,
    description:
      'A child\'s travel trunk at the foot of the bed, painted with roses. It has never been to anywhere.',
    found:
      'A sealed letter from Eleanor to her solicitor: "The child\'s name is to be struck from the register. The grave is to be marked but not used. No announcement. If my husband\'s affairs require a daughter, we will say she is abroad." In the margin, in a child\'s hand, one word: "Here."',
    evidence: 'sealed_letter',
  },
  {
    id: 'sealed_mattress',
    room: 'sealed',
    label: 'Beneath the mattress',
    name: 'A Diary in the Bedframe',
    x: 52,
    y: 62,
    art: 'diary',
    chapter: 3,
    description:
      'The mattress has been lifted and replaced many times; the tick is slack. Something rectangular is wedged between the frame and the wall.',
    found:
      'A child\'s diary, clasp broken. "Father is shouting again. He has the lamp. Mother says go to bed. The lamp is on the curtains. It is bright like a birthday. I am under the bed. Someone is calling my name in the garden. It is Arthur. He says put your hand in mine. I do not want to leave the rabbit."',
    evidence: 'diary',
  },
  {
    id: 'sealed_musicbox',
    room: 'sealed',
    label: 'The music box',
    name: 'Eight Bars You Already Know',
    x: 78,
    y: 54,
    art: 'musicbox',
    chapter: 3,
    description:
      'A rosewood music box on the windowsill, wound. The lid is cracked. You turn the key before you decide to.',
    found:
      'Eight bars of a slow waltz, stopping on the same unfinished note. You have hummed this your whole life. Inside the lid: "For Evelyn, who is not afraid of the dark. From A."',
    evidence: 'music_box',
  },
  {
    id: 'sealed_wardrobe',
    room: 'sealed',
    label: 'Inside the wardrobe',
    name: 'A Photograph Pinned to the Door',
    x: 16,
    y: 40,
    art: 'photo',
    chapter: 3,
    description:
      'A child\'s wardrobe, empty but for a raincoat two sizes too big. A photograph is pinned inside the door at eye height for a small person.',
    found:
      'Arthur, much younger, kneeling in the rose garden beside a girl of seven. Both muddy. Both laughing. "E. and A., planting the yellow roses. She says they are the colour of the inside of the sun."',
    evidence: 'garden_photo',
  },
  {
    id: 'sealed_mirror',
    room: 'sealed',
    label: 'The mirror',
    name: 'A Locket You Have Always Worn',
    x: 88,
    y: 30,
    art: 'locket',
    chapter: 3,
    description:
      'A small mirror above the washstand, clouded at the edges. In the glass: your own face, and beside it a photograph tucked into the frame. A girl of seven, wearing a locket.',
    found:
      'Your hand goes to your throat before you decide to move it. The locket is warm. Inside: a curl of dark hair, and three letters scratched with a pin — E.B. The chain has been repaired with garden wire.',
    evidence: 'locket',
  },
  {
    id: 'sealed_rabbit',
    room: 'sealed',
    label: 'The toy rabbit',
    name: 'A Rabbit with One Ear',
    x: 44,
    y: 74,
    art: 'doll',
    chapter: 3,
    description:
      'A grey stuffed rabbit on the bed, dusted but not decayed. A new silk ribbon around its neck.',
    found:
      'The seams have been repaired in the same thread as the doll in Charlotte\'s suitcase. Somebody comes into this room. Somebody has been keeping it ready.',
    evidence: 'toy_rabbit',
  },
  {
    id: 'sealed_window',
    room: 'sealed',
    label: 'The window lock',
    name: 'Sealed from the Inside',
    x: 92,
    y: 52,
    art: 'key',
    chapter: 3,
    description:
      'The nursery window, painted shut, with a screw driven through the latch. Soot still clings to the inside of the glass at a child\'s height.',
    found:
      'The screw is bright, and newer than the paint. It was put in long after the fire. Fingerprints in the soot, small ones, on the inside of the glass. Whoever sealed this room was not trying to keep the rain out.',
    evidence: 'window_lock',
  },
  {
    id: 'sealed_marks',
    room: 'sealed',
    label: 'The height marks',
    name: 'Two Sets of Marks',
    x: 32,
    y: 30,
    art: 'document',
    chapter: 3,
    description:
      'Pencil lines on the door frame, each with a date in a careful adult hand.',
    found:
      '"E. — 3 years, 4 months, 5, 6, 7." Then, faintly, in a different pencil, one more line at the same height as the third: "M. — 8." Someone measured a second child against this door. Someone who was not supposed to be in this house.',
    flag: 'saw_height_marks',
    note: {
      id: 'note_marks',
      title: 'The Height Marks',
      text: 'Two sets of marks on the same door frame, twenty years apart. E. up to seven years old, and then a single mark for an eight-year-old called M. I have stood against this frame. My head fits the pencil line.',
      chapter: 3,
    },
  },
  // CELLAR
  {
    id: 'cellar_deeds',
    room: 'cellar',
    label: 'The deed boxes',
    name: 'Two Certificates, One Night',
    x: 26,
    y: 60,
    art: 'certificate',
    chapter: 4,
    description:
      'A wall of tin deed boxes, labelled by year. The 2006 box is out of line, as though recently pulled and badly replaced.',
    found:
      'Two death certificates, consecutive numbers, both dated 15 October 2006, both signed by H. Ashford, both witnessed by E. Blackwood. Neither records a post-mortem. Neither has a burial reference. Two deaths in one house, certified in a single sitting.',
    evidence: 'death_cert',
  },
  {
    id: 'cellar_crates',
    room: 'cellar',
    label: 'The packing crates',
    name: 'Twenty Years of Letters',
    x: 74,
    y: 66,
    art: 'letter',
    chapter: 4,
    description:
      'Packing crates marked "A.B. — correspondence". The straw inside has been disturbed.',
    found:
      'Dozens of letters from Alexander, all typed, none signed by hand. Weather, shares, roses, Charlotte\'s schooling. Not one mentions the fire, the east wing, or a dead child. The same typewriter for twenty years.',
    evidence: 'alexander_letters',
  },
  {
    id: 'cellar_boiler',
    room: 'cellar',
    label: 'The boiler',
    name: 'A Boiler Fed More Than Coal',
    x: 50,
    y: 34,
    art: 'glass',
    chapter: 4,
    description:
      'An old cast-iron boiler, warm despite the season. The ash pan is full of something that is not coal.',
    found:
      'Ash with a rim of unburned paper: the corner of a photograph, the edge of a ledger page, a fragment of a child\'s drawing. Someone has been heating this house with the family archive.',
    flag: 'saw_boiler',
  },
  {
    id: 'cellar_files',
    room: 'cellar',
    label: 'The fire file',
    name: 'A Report Kept by the Journalist',
    x: 86,
    y: 52,
    art: 'document',
    chapter: 5,
    description:
      'A separate file, out of sequence, tied with red string. On the cover, in Vivian\'s hand: "BLACKWOOD FIRE — ORIGINAL."',
    found:
      'Fire service report, 14 October 2006, 23:47. East wing fully involved. One adult male recovered, deceased, extensive burns, identity unconfirmed. One child reported missing, later confirmed deceased per family. Cause: overturned paraffin lamp, no further action. Handwritten addendum: "Occupant stated child was in the garden with the gardener. Not pursued."',
    evidence: 'fire_report',
  },
  // GARDEN
  {
    id: 'garden_shed',
    room: 'garden',
    label: 'Arthur\'s shed',
    name: 'A Typewriter Under a Sheet',
    x: 16,
    y: 58,
    art: 'document',
    chapter: 4,
    description:
      'A potting shed at the end of the rose walk, warm inside, lit by a single bulb. The tools are immaculate.',
    found:
      'An Underwood under a sheet, still warm. A dropped e, a crooked t. On the platen: "I did what had to be". Beside it: black wax pellets, a seal stand with the seal missing, and Blackwood stationery twenty years out of date.',
    evidence: 'typewriter',
  },
  {
    id: 'garden_twine',
    room: 'garden',
    label: 'A bundle tied with twine',
    name: 'A Letter from Ruth Vale',
    x: 22,
    y: 72,
    art: 'letter',
    chapter: 5,
    description:
      'On the shed shelf, behind the seed tins, a bundle of letters tied with garden twine.',
    found:
      'Ruth Vale to Arthur, four years ago: "She is asking about the fire again. She has the dreams still. I have told her nothing, as I promised, but Arthur — she is a woman now, and she investigates things for a living. One day she will find her way to you, and I will not lie to her twice." Under it, a photograph: "Evelyn, three days old, 1999."',
    evidence: 'ruth_letter',
  },
  {
    id: 'garden_ruins',
    room: 'garden',
    label: 'The east wing ruins',
    name: 'A Photograph in the Rubble',
    x: 72,
    y: 40,
    art: 'photo',
    chapter: 5,
    description:
      'The east wing stands roofless, its windows empty, blackened brick showing through the ivy. The rain has been getting in for twenty years.',
    found:
      'A photograph trapped under a fallen beam, its edges burned: Alexander in evening dress, raising a glass. Beside him, half faded out of the image, a younger Arthur Finch — not in livery, but in a good suit. On the back, in Alexander\'s hand: "A. and A. — before the name. 1993."',
    evidence: 'burnt_photo',
  },
  {
    id: 'garden_grave',
    room: 'garden',
    label: 'The family plot',
    name: 'A Grave with Nothing Beneath It',
    x: 46,
    y: 78,
    art: 'photo',
    chapter: 3,
    description:
      'Beyond the yew hedge, a small stone in the wet grass. Fresh yellow roses have been laid at its base.',
    found:
      '"EVELYN BLACKWOOD, 1999–2006. BELOVED DAUGHTER." The earth is undisturbed. The grass has grown over it for twenty years. There was never a funeral. The roses are two days old.',
    evidence: 'gravestone',
  },
  {
    id: 'garden_spare_key',
    room: 'garden',
    label: 'A ring of spare keys',
    name: 'The Spare Ring',
    x: 32,
    y: 52,
    art: 'key',
    chapter: 3,
    description:
      'A ring of spare keys on a nail inside the shed door, each one tagged with a room in a careful copperplate hand. One tag has no room on it at all — only a small brass door.',
    found:
      'A spare key for the east corridor door. Arthur keeps the working ring on his person, but a house this old has always had two of everything.',
    flag: 'sealed_key',
    note: {
      id: 'note_spare_key',
      title: 'The Spare Key',
      text: 'A spare key to the sealed east-corridor door hangs in the garden shed, tagged only with a door. Arthur is not the only way into that room.',
      chapter: 3,
    },
  },
  {
    id: 'garden_roses',
    room: 'garden',
    label: 'The yellow roses',
    name: 'Roses Along a Blackened Wall',
    x: 56,
    y: 62,
    art: 'doll',
    chapter: 4,
    description:
      'Yellow roses, trained along the blackened wall of the east wing. They are the only thing in the garden that has been properly cared for.',
    found:
      'The stems are tied with garden wire, in the same way the locket chain has been repaired. A brass tag at the root, in Arthur\'s hand: "For E. — the colour of the inside of the sun."',
    flag: 'saw_roses',
  },
];

export const HOTSPOTS_BY_ROOM: Record<string, Hotspot[]> = HOTSPOTS.reduce(
  (acc, spot) => {
    acc[spot.room] = acc[spot.room] ? [...acc[spot.room], spot] : [spot];
    return acc;
  },
  {} as Record<string, Hotspot[]>,
);

export function getHotspot(id: string): Hotspot | undefined {
  return HOTSPOTS.find((h) => h.id === id);
}
