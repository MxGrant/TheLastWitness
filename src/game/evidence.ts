import type { Evidence } from './types';

export const EVIDENCE: Evidence[] = [
  {
    id: 'invitation',
    title: 'The Black Seal Invitation',
    category: 'Document',
    short: 'An anonymous invitation to investigate a murder.',
    description:
      'A single card of heavy cream stock, folded once, sealed with black wax pressed with a letter B. It was delivered by hand to Mara\'s office, though the locksmith below swears no one came up the stairs. Inside, in block capitals, ten words and a time: "Alexander Blackwood has been murdered. Six were present. Come alone."',
    detail:
      'The card stock is Blackwood stationery from before the fire — the watermark is the old house crest, retired twenty years ago. The wax is from the study seal, and the seal is missing from its brass stand.',
    location: 'Mara\'s coat pocket',
    related: ['arthur'],
    essential: true,
    chapter: 1,
    art: 'invitation',
    revealFlag: 'arthur_staged',
  },
  {
    id: 'guestlist',
    title: 'The Guest List',
    category: 'Document',
    short: 'Six names in copperplate — and a seventh line, erased.',
    description:
      'Arthur\'s hand, precise as engraving: Eleanor Blackwood, Charlotte Blackwood, Dr Henry Ashford, Richard Graves, Vivian Cross. The last name, Arthur Finch, has been written and then struck through. Beneath it, a seventh line has been erased so thoroughly that the paper has gone thin — but the pressure of the pen remains, an indentation you can feel with a fingertip.',
    detail:
      'Six guests, and a seventh place that someone did not want counted. The indentation is too faint to read, but the pen travelled in a short, upward stroke and then stopped.',
    location: 'Foyer — the hall table',
    related: ['arthur', 'evelyn'],
    essential: false,
    chapter: 1,
    art: 'document',
  },
  {
    id: 'bloodstain',
    title: 'The Bloodstain',
    category: 'Forensic',
    short: 'A great deal of blood, in the wrong place, in the wrong shape.',
    description:
      'A dark pool has dried into the nap of the study carpet, roughly the width of a man\'s shoulders. It has soaked outward in a near-perfect circle. There is no spray on the desk legs, no cast-off on the wainscoting, no drag marks, no footprint leaving the room. It looks less like an injury and more like something poured.',
    detail:
      'The stain smells of salt and iron and something sweeter underneath. It is far too neat, and far too old — the fibres have wicked it evenly, as though it were allowed to sit for days.',
    location: 'Study — the floor',
    related: ['arthur'],
    essential: true,
    chapter: 1,
    art: 'glass',
  },
  {
    id: 'revolver',
    title: 'The Revolver',
    category: 'Object',
    short: 'One chamber empty. No body, no bullet, no hole.',
    description:
      'A heavy Webley service revolver, old but well oiled, lying on the study rug as though set down rather than dropped. One chamber is empty. There is no bullet embedded in the walls, floor or furniture, and no exit wound in the room. The grip is clean. Whoever held it last was not panicking.',
    detail:
      'The serial number has been filed away. Inside the empty chamber there is a thin film of soot but no fresh powder smell — the round was fired long before tonight.',
    location: 'Study — beside the desk',
    related: ['arthur', 'richard'],
    essential: true,
    chapter: 1,
    art: 'weapon',
  },
  {
    id: 'staged_note',
    title: 'The Torn Note',
    category: 'Document',
    short: 'A typed confession with no name and no handwriting.',
    description:
      'Fished from the wastepaper basket: half a page, typed. "I did what had to be done. He would have destroyed all of us. Burn the rest." The paper has been torn through the middle of a word, and the tear is clean, deliberate — someone wanted it found, but not read whole.',
    detail:
      'Typed on a machine with a dropped e and a crooked t. Machine-typed confessions are theatrical. People who kill in a house full of witnesses do not stop to compose a paragraph.',
    location: 'Study — wastepaper basket',
    related: ['arthur'],
    essential: true,
    chapter: 1,
    art: 'note',
  },
  {
    id: 'old_photo',
    title: 'The Old Photograph',
    category: 'Photograph',
    short: 'A young girl outside the manor, holding a paper boat.',
    description:
      'A square, sepia photograph in a silver frame, the glass wiped clean. A girl of about seven stands on the front steps in a raincoat two sizes too big, holding a paper boat up to the camera. Behind her, the east wing is whole, its windows lit. The photograph has been reframed — the left edge is folded back, hiding whoever was standing beside her.',
    detail:
      'On the back, in faded pencil: "E. — the last good day. 14th." The 14th of what, and which year, has been scratched away. The fold in the left edge covers a hand resting on the girl\'s shoulder.',
    location: 'Study — framed on the desk',
    related: ['evelyn', 'arthur'],
    essential: true,
    chapter: 1,
    art: 'photo',
    revealFlag: 'evelyn_survived',
  },
  {
    id: 'stopped_clock',
    title: 'The Stopped Clock',
    category: 'Object',
    short: 'A hall clock stopped at 11:47 — and recently restarted.',
    description:
      'The long-case clock in the foyer stopped at 11:47. There is dust on the pendulum, but none on the key. The mechanism is wound. Someone has been keeping the hands exactly where they are — or set them there, very carefully, after the fact.',
    detail:
      'The fire brigade\'s account of the 2006 fire gives the time of the call as 11:47 pm. The clock is not broken. It has been stopped on purpose, and stopped recently enough that the brass is still bright under the dust.',
    location: 'Foyer — the long-case clock',
    related: ['arthur', 'evelyn'],
    essential: false,
    chapter: 1,
    art: 'watch',
    revealFlag: 'no_murder',
  },
  {
    id: 'guest_book',
    title: 'The Guest Book',
    category: 'Record',
    short: 'Six arrivals, all within one hour, all in different inks.',
    description:
      'The house guest book has been used for forty years without a skipped page. Tonight\'s entries begin at 5:10 pm and end at 6:02. Six names, six different pens. Arthur\'s entry has been crossed out. The line after it has been ruled through so hard the nib tore the page.',
    detail:
      'Five of the six guests arrived within eleven minutes of one another, as though summoned to the same appointment. The handwriting grows shakier down the page — fear, or cold, or both.',
    location: 'Foyer — the hall table',
    related: ['arthur'],
    essential: false,
    chapter: 1,
    art: 'ledger',
  },
  {
    id: 'seating',
    title: 'The Seating Plan',
    category: 'Document',
    short: 'Seven places laid for six guests and a host who is not here.',
    description:
      'A pencil seating plan pinned in the dining room, in Eleanor\'s hand. Seven places. Six names. The seventh card is blank. The plan has been corrected twice: one name erased, moved, and erased again — always the same place at the head of the table, the one set with the black-handled knife.',
    detail:
      'The blank card sits at the head of the table, where Alexander used to sit. The setting includes a wine glass, a napkin ring and a place for a watch, precisely as the household laid it for him twenty years ago.',
    location: 'Dining room — the sideboard',
    related: ['eleanor', 'alexander'],
    essential: false,
    chapter: 2,
    art: 'document',
  },
  {
    id: 'ledger',
    title: 'The Household Ledger',
    category: 'Record',
    short: 'Twenty years of payments to a name no one will explain.',
    description:
      'The household accounts, kept in Arthur\'s immaculate hand. Every quarter since 2006, a payment leaves the estate: "R. VALE — maintenance." The amounts rise with each year, as though someone were being paid to keep pace with a growing child. The last entry is dated three weeks ago.',
    detail:
      'R. Vale. Ruth Vale. The name appears nowhere else in the house — but the payments stop and start around every significant date in the family calendar, and each one is signed off by Eleanor.',
    location: 'Dining room — the sideboard drawer',
    related: ['arthur', 'eleanor', 'evelyn'],
    essential: true,
    chapter: 2,
    art: 'ledger',
    revealFlag: 'evelyn_survived',
  },
  {
    id: 'medical_letter',
    title: 'The Doctor\'s Letter',
    category: 'Letter',
    short: 'A letter about a certificate signed in the wrong year.',
    description:
      'A folded letter in Dr Ashford\'s bag, never sent. "Eleanor — I have done what you asked, but I will not do it twice. The certificate is dated the fifteenth. The child died on the fourteenth. If anyone ever compares the two documents, we are finished. Do not telephone me again."',
    detail:
      'The letter is dated 3 October 2006, three weeks after the fire. It is unsigned — or rather, the signature has been torn away, leaving only the loop of an H.',
    location: 'Library — the doctor\'s bag',
    related: ['henry', 'eleanor', 'evelyn'],
    essential: true,
    chapter: 2,
    art: 'letter',
    revealFlag: 'forged_records',
  },
  {
    id: 'doll',
    title: 'The Doll with the Stitched Name',
    category: 'Object',
    short: 'A rag doll, lovingly repaired, with an E stitched on its hem.',
    description:
      'A cloth doll in a child\'s dress, found in Charlotte\'s suitcase among the cigarettes and the paintbrushes. Its face has been repaired many times, in many different threads. On the hem of the dress, in a child\'s uneven stitching: E. The doll smells faintly of woodsmoke, even now.',
    detail:
      'The repairs are the work of a child who kept mending the same tear over and over — a calm, repetitive, careful hand. On the underside of the dress, a later adult hand has added a second initial, in gold thread: M.',
    location: 'Charlotte\'s suitcase',
    related: ['charlotte', 'evelyn'],
    essential: false,
    chapter: 2,
    art: 'doll',
  },
  {
    id: 'share_contract',
    title: 'The Transfer of Shares',
    category: 'Document',
    short: 'Alexander\'s signature, dated four days after he vanished.',
    description:
      'A share transfer dated four days after Alexander was last seen alive, moving his holding in the Blackwood estate into a holding company registered in St Helier. His signature is a confident, slanting scrawl. Beside it, Richard Graves has signed as witness.',
    detail:
      'The signature does not match the one on the marriage certificate. The slant is wrong; the loop of the B is a different shape. On the back, in Richard\'s hand: "File with the others. Keep the originals out of the house."',
    location: 'Dining room — the writing desk',
    related: ['richard', 'alexander'],
    essential: false,
    chapter: 2,
    art: 'document',
  },
  {
    id: 'article_draft',
    title: 'The Unpublished Draft',
    category: 'Document',
    short: 'A journalist\'s article about the fire, spiked before print.',
    description:
      'A typed feature, twenty years old, headed: "THE HOUSE THAT BURNED A CHILD AND CALLED IT AN ACCIDENT." It names the fire, the sealed wing, the absent father, the death certificate signed without a body. In the margin, in red pen: "KILL. £. V.C."',
    detail:
      'The red margin note is in Richard Graves\'s hand — the same sloping capitals as the share transfer. The article was never published. Someone paid to keep it warm, not to burn it.',
    location: 'Library — Vivian\'s portfolio',
    related: ['vivian', 'richard'],
    essential: true,
    chapter: 2,
    art: 'newspaper',
    revealFlag: 'hush_money',
  },
  {
    id: 'newspaper',
    title: 'The Newspaper Archive',
    category: 'Record',
    short: 'A two-inch article about a small kitchen fire.',
    description:
      'The local paper, 16 October 2006. Two inches below the fold: "BLACKWOOD MANOR: SMALL FIRE CONTAINED. No injuries reported. The family requests privacy." No mention of a child. No mention of a death. The byline has been cut out with a razor blade.',
    detail:
      'The fire service\'s own record, when it surfaces, tells a different story: two appliances, an east wing fully involved, one adult male fatality, one child unaccounted for. The newspaper printed what the family paid it to print.',
    location: 'Library — bound volumes',
    related: ['vivian', 'eleanor'],
    essential: false,
    chapter: 2,
    art: 'newspaper',
    revealFlag: 'no_murder',
  },
  {
    id: 'sealed_letter',
    title: 'The Sealed Letter',
    category: 'Letter',
    short: 'A letter about a child whose name has been crossed out.',
    description:
      'Found in the trunk in the sealed room, still sealed: a letter from Eleanor to her solicitor. "The child\'s name is to be struck from the register. The grave is to be marked but not used. No announcement. If my husband\'s affairs require a daughter, we will say she is abroad. Do not write to me of this again."',
    detail:
      'The name Evelyn has been crossed out so many times the paper is furred. In the margin, in a much younger hand — a child\'s, or a young woman\'s — someone has written one word, very small: "Here."',
    location: 'The sealed bedroom — the trunk',
    related: ['eleanor', 'evelyn'],
    essential: true,
    chapter: 3,
    art: 'letter',
    revealFlag: 'evelyn_survived',
  },
  {
    id: 'diary',
    title: 'The Childhood Diary',
    category: 'Document',
    short: 'A seven-year-old\'s account of the night of the fire.',
    description:
      'A fabric-bound diary with a broken clasp. The last entry is written in pencil, in a child\'s hand, the letters growing larger and wilder down the page. "Father is shouting again. He has the lamp. Mother says go to bed. The lamp is on the curtains. It is bright like a birthday. I am under the bed. Someone is calling my name in the garden. It is Arthur. He says put your hand in mine. I do not want to leave the rabbit."',
    detail:
      'The final page has a fingerprint in soot beside a pressed rose petal. On the inside cover, in careful adult pencil: "Recovered 15 October 2006. Not to be shown to the family. A.F."',
    location: 'The sealed bedroom — beneath the mattress',
    related: ['evelyn', 'arthur'],
    essential: true,
    chapter: 3,
    art: 'diary',
    revealFlag: 'evelyn_survived',
  },
  {
    id: 'music_box',
    title: 'The Music Box',
    category: 'Object',
    short: 'A cracked cylinder that plays a melody Mara knows by heart.',
    description:
      'A rosewood music box with a hairline crack across the lid. Wound, it plays eight bars of a slow waltz — and stops, always, on the same unfinished note, because a tooth on the cylinder has snapped. Mara knows the melody. She has hummed it her whole life without knowing where it came from.',
    detail:
      'Inside the lid, a paper label in a child\'s hand: "For Evelyn, who is not afraid of the dark. From A." The missing tooth was broken inward, not worn — someone closed the box while it was still playing.',
    location: 'The sealed bedroom — the windowsill',
    related: ['evelyn', 'arthur'],
    essential: true,
    chapter: 3,
    art: 'musicbox',
    revealFlag: 'memory_link',
  },
  {
    id: 'garden_photo',
    title: 'The Garden Photograph',
    category: 'Photograph',
    short: 'A gardener and a girl, laughing, in the rose garden.',
    description:
      'A photograph taken in the rose garden, the east wing behind them. A much younger Arthur Finch kneels beside a girl of seven, both of them muddy to the elbows, a trowel between them. He is laughing. The girl is holding up a rose as though it were a prize. It is the only photograph in the house where anyone looks happy.',
    detail:
      'On the back: "E. and A., planting the yellow roses. She says they are the colour of the inside of the sun." The handwriting is Arthur\'s.',
    location: 'The sealed bedroom — pinned inside the wardrobe',
    related: ['arthur', 'evelyn'],
    essential: true,
    chapter: 3,
    art: 'photo',
  },
  {
    id: 'burn_note',
    title: 'The Burn Record',
    category: 'Record',
    short: 'A clinic note about a child\'s left palm, dated after her death.',
    description:
      'A carbon copy of a clinic record, dated eleven days after Evelyn Blackwood was declared dead. "Patient: female, approx. 7. Full-thickness burn to the left palm, healed badly. Scar will be permanent. Guardian: R. Vale. Patient does not speak." Stapled to it: a second record, dated twenty years later, for a woman named Mara Vale, noting the same scar.',
    detail:
      'The clinic is in Carrow Street — four streets from the office where Mara works. The scar is the shape of a small hand closing on something hot. Mara has never known how she got hers.',
    location: 'Library — Dr Ashford\'s case notes',
    related: ['henry', 'evelyn', 'mara'],
    essential: true,
    chapter: 3,
    art: 'document',
    revealFlag: 'scar_match',
  },
  {
    id: 'toy_rabbit',
    title: 'The Toy Rabbit',
    category: 'Object',
    short: 'One ear missing. Buried once, dug up, kept.',
    description:
      'A stuffed rabbit, grey with age, one ear chewed away. It sits on the child\'s bed as though waiting, dusted but not decayed. Around its neck a ribbon has been tied in a neat, adult bow — recently.',
    detail:
      'The rabbit has been repaired at the seams with the same thread as the doll in Charlotte\'s suitcase. Someone has been coming into this sealed room. The ribbon is new silk, the colour of the curtains in the drawing room.',
    location: 'The sealed bedroom — the bed',
    related: ['arthur', 'charlotte', 'evelyn'],
    essential: false,
    chapter: 3,
    art: 'doll',
  },
  {
    id: 'window_lock',
    title: 'The Painted Window Lock',
    category: 'Object',
    short: 'A nursery window painted shut from the inside.',
    description:
      'The nursery window has been sealed with three coats of paint and a screw driven through the latch. The screw head is bright — it was put in long after the fire, and recently enough to still turn. On the inside of the glass, at a child\'s height, there are fingerprints in old soot.',
    detail:
      'The window does not open. Whoever sealed this room wanted to be certain that nothing came back in — or that nothing got out again.',
    location: 'The sealed bedroom — the window',
    related: ['arthur', 'eleanor'],
    essential: false,
    chapter: 3,
    art: 'key',
  },
  {
    id: 'gravestone',
    title: 'The Unused Grave',
    category: 'Photograph',
    short: 'A headstone with a name and two dates, and nothing beneath it.',
    description:
      'In the family plot, behind the yew hedge: a small headstone. "EVELYN BLACKWOOD, 1999–2006. BELOVED DAUGHTER." The earth in front of it is undisturbed and level, and the grass has grown over it for twenty years. There is no coffin under this stone. There was never a funeral.',
    detail:
      'Fresh yellow roses have been laid at the base of the stone, tied with garden twine. They are two days old at most. Somebody still visits a grave that holds no one.',
    location: 'The garden — the family plot',
    related: ['evelyn', 'arthur'],
    essential: false,
    chapter: 3,
    art: 'photo',
    revealFlag: 'evelyn_survived',
  },
  {
    id: 'birth_missing',
    title: 'The Missing Birth Certificate',
    category: 'Certificate',
    short: 'A registry search that returns nothing at all.',
    description:
      'In the study safe: a letter from a genealogist, engaged by Richard Graves in 2011. "Further to your enquiry: there is no civil birth record for an Alexander Blackwood in England, Scotland or Wales for any year between 1955 and 1975. Nor is there a school record, a military record, or a passport application predating 1994."',
    detail:
      'Alexander Blackwood acquired his name in 1994, on a marriage certificate, at the age of thirty-eight. Before that, there is no one. A man with no childhood, no school, no papers — only a signature, repeated for twelve years and then repeated by other hands for twenty more.',
    location: 'Study — the safe',
    related: ['alexander', 'richard'],
    essential: true,
    chapter: 4,
    art: 'certificate',
    revealFlag: 'alexander_fiction',
  },
  {
    id: 'passport',
    title: 'The Passport',
    category: 'Document',
    short: 'Alexander\'s passport — stamps end abruptly in 2006.',
    description:
      'A burgundy passport in the study desk, issued 1996, renewed never. The photograph shows a lean man in profile, as though he did not care to be looked at directly. The stamps run from 1998 to September 2006, and then stop. Not a single entry after the fire.',
    detail:
      'The passport was reported lost in 2007. It is here, in the desk of a man who supposedly disappeared last night. Twenty years of a businessman who never left the country — and someone has been renewing the visa pages by hand.',
    location: 'Study — the desk drawer',
    related: ['alexander', 'richard'],
    essential: true,
    chapter: 4,
    art: 'document',
    revealFlag: 'alexander_fiction',
  },
  {
    id: 'medical_record',
    title: 'The Altered Medical Record',
    category: 'Record',
    short: 'The same death rewritten in two different inks.',
    description:
      'Dr Ashford\'s original case notes for October 2006. The cause of death has been altered three times: "smoke inhalation" struck through, "cardiac failure" written over it, then "exposure" added in a third ink. The date of death has been changed from the fourteenth to the fifteenth. The signature is the same on every version.',
    detail:
      'The original entry, still legible under the layers: "Male, approx. 45, extensive burns, identified by ring and watch only. No dental record. Body removed to mortuary by R. Graves." There is no mention of a child\'s body at all.',
    location: 'Library — the doctor\'s case notes',
    related: ['henry', 'alexander', 'richard'],
    essential: false,
    chapter: 4,
    art: 'document',
    revealFlag: 'forged_records',
  },
  {
    id: 'death_cert',
    title: 'The Death Certificate',
    category: 'Certificate',
    short: 'Two certificates, signed on the same day, by the same hand.',
    description:
      'In the cellar files: two death certificates, one for Alexander Blackwood and one for Evelyn Blackwood, both dated 15 October 2006, both signed by H. Ashford, both witnessed by E. Blackwood. Neither records a cause of death that a post-mortem could support. Neither has a burial reference.',
    detail:
      'The certificates are numbered consecutively. Two deaths in one house on one night, certified in a single sitting, by a doctor who had not slept. The registrar\'s stamp is genuine. The truth it certifies is not.',
    location: 'Cellar — the deed files',
    related: ['henry', 'eleanor', 'evelyn', 'alexander'],
    essential: true,
    chapter: 4,
    art: 'certificate',
    revealFlag: 'forged_records',
  },
  {
    id: 'typewriter',
    title: 'The Typewriter',
    category: 'Object',
    short: 'A dropped e and a crooked t, in a shed in the garden.',
    description:
      'An old Underwood in Arthur\'s garden shed, under a sheet, still warm with use. The e key sits low; the t strikes crooked. On the platen, a half-finished line: "I did what had to be". The same dropped e. The same crooked t as the note in the study.',
    detail:
      'Beside the machine: a tin of black wax pellets, a brass seal stand with the seal missing, and a box of Blackwood stationery twenty years out of date. Every object used to stage the murder came from this shed.',
    location: 'Garden — Arthur\'s shed',
    related: ['arthur'],
    essential: true,
    chapter: 4,
    art: 'document',
    revealFlag: 'arthur_staged',
  },
  {
    id: 'shell_company',
    title: 'The Shell Company',
    category: 'Document',
    short: 'An estate kept breathing on a dead man\'s name.',
    description:
      'A folder of company filings for Barrow Holdings, registered in St Helier. The sole director is A. Blackwood. The accounts are signed each year in a different version of his signature. The company owns the manor, the land, and the debt. It has not filed a set of accounts in Alexander\'s true hand since 2006.',
    detail:
      'Barrow. Not Blackwood. The name on the incorporation documents, in 1993, is "A. Barrow, trading as Blackwood". A man who bought a name, and then had to keep pretending to be it, long after he was dead.',
    location: 'Study — the safe',
    related: ['richard', 'alexander'],
    essential: false,
    chapter: 4,
    art: 'ledger',
    revealFlag: 'alexander_fiction',
  },
  {
    id: 'alexander_letters',
    title: 'Alexander\'s Letters',
    category: 'Letter',
    short: 'Twenty years of letters, every one of them typed.',
    description:
      'A crate of correspondence in the cellar, all from Alexander, all typed, none signed by hand. The tone is warm, fluent, and entirely without incident: weather, shares, the roses, Charlotte\'s schooling. There is not one letter that mentions the fire, the east wing, or a dead child.',
    detail:
      'The paper is identical across two decades. The typewriter is the same one. Every letter was written by the same person, at the same machine, in the same shed — and that person was not Alexander Blackwood.',
    location: 'Cellar — the packing crates',
    related: ['arthur', 'alexander'],
    essential: false,
    chapter: 4,
    art: 'letter',
    revealFlag: 'arthur_staged',
  },
  {
    id: 'fire_report',
    title: 'The Fire Brigade Report',
    category: 'Record',
    short: 'The original report, kept by the journalist who buried it.',
    description:
      'Fire service incident report, 14 October 2006, 23:47. "East wing fully involved on arrival. Two appliances. One adult male recovered, deceased, extensive burns, identity unconfirmed. One child reported missing, later confirmed deceased per family. Cause: accident, overturned paraffin lamp. No further action."',
    detail:
      'The phrase "identity unconfirmed" has been underlined, twice, in different inks — once by Vivian Cross, once by someone else. At the bottom, a fire officer\'s handwritten addendum: "Occupant stated child was in the garden with the gardener. Not pursued."',
    location: 'Cellar — the deed files',
    related: ['vivian', 'arthur', 'alexander'],
    essential: true,
    chapter: 5,
    art: 'document',
    revealFlag: 'no_murder',
  },
  {
    id: 'vivian_tape',
    title: 'The Vivian Tape',
    category: 'Testimony',
    short: 'A twenty-year-old recording of Eleanor, off the record.',
    description:
      'A microcassette, labelled in Vivian\'s hand: "E.B. — 21.10.06 — NOT FOR PRINT." The recording is poor, the room full of rain. Eleanor\'s voice, younger, harder: "The child is not your story. The child is a closed door. I have paid for this house to stay standing, and I will pay for the door to stay closed. Name your figure."',
    detail:
      'On the same tape, after the negotiation, a second voice — a man\'s, tired, close to the microphone: "She asked me to leave her in the garden. I did not. That is the whole of it." The voice belongs to Arthur Finch.',
    location: 'Library — Vivian\'s recorder',
    related: ['vivian', 'eleanor', 'arthur'],
    essential: true,
    chapter: 5,
    art: 'tape',
    revealFlag: 'no_murder',
  },
  {
    id: 'ruth_letter',
    title: 'Ruth Vale\'s Letter',
    category: 'Letter',
    short: 'A letter from the woman who raised Mara.',
    description:
      'In the shed, tied with garden twine: a letter from Ruth Vale to Arthur, dated four years ago. "She is asking about the fire again. She has the dreams still. I have told her nothing, as I promised, but Arthur — she is a woman now, and she investigates things for a living. One day she will find her way to you, and I will not lie to her twice."',
    detail:
      'Underneath the letter, a photograph: Ruth Vale, thin and tired, holding a newborn. On the back: "Evelyn, three days old, 1999." Ruth Vale died in 2023. Mara has the same photograph, without the writing.',
    location: 'Garden — Arthur\'s shed',
    related: ['arthur', 'mara', 'evelyn'],
    essential: true,
    chapter: 5,
    art: 'letter',
    revealFlag: 'mara_is_evelyn',
  },
  {
    id: 'insurance',
    title: 'The Insurance Payout',
    category: 'Document',
    short: 'The estate was paid out for a fire it caused and a death it staged.',
    description:
      'A payout schedule from 2007: fire damage to the east wing, content loss, and a life policy on Alexander Blackwood. The estate received the money eleven weeks after the fire. The signature accepting the terms is Eleanor\'s. The witness is Richard Graves.',
    detail:
      'The life policy was taken out in 2005 — one year before the fire — with a double indemnity clause for accidental death. Whoever wrote that policy knew the house had an east wing full of paraffin and a man who drank.',
    location: 'Study — the safe',
    related: ['eleanor', 'richard', 'alexander'],
    essential: false,
    chapter: 5,
    art: 'ledger',
    revealFlag: 'hush_money',
  },
  {
    id: 'burnt_photo',
    title: 'The Burnt Photograph',
    category: 'Photograph',
    short: 'Alexander\'s portrait, saved from the fire — with a second man.',
    description:
      'A photograph recovered from the east wing, its edges burned. Alexander Blackwood in evening dress, raising a glass. Beside him, half out of frame and chemically faded, stands a younger Arthur Finch — not in livery, but in a good suit, holding the same glass. They are laughing at something the photographer cannot show.',
    detail:
      'On the back, in Alexander\'s hand — the only handwriting of his anyone has found: "A. and A. — before the name. 1993." Before the name. Before Blackwood.',
    location: 'Garden — the east wing ruins',
    related: ['alexander', 'arthur'],
    essential: false,
    chapter: 5,
    art: 'photo',
    revealFlag: 'alexander_fiction',
  },
  {
    id: 'locket',
    title: 'Mara\'s Locket',
    category: 'Object',
    short: 'A child\'s locket, worn for as long as she can remember.',
    description:
      'The locket Mara has worn since childhood — the only thing she owned when she was found, or the only thing she kept. Inside: a curl of dark hair, and on the inner face, scratched with a pin, three letters: E.B. In the nursery mirror, beside a photograph of a girl wearing the same locket, it is impossible to look at it and not know.',
    detail:
      'The locket\'s chain was repaired with garden wire — the same wire Arthur uses on the roses. It has been repaired twice, both times with the same careful hand.',
    location: 'The sealed bedroom — the mirror',
    related: ['mara', 'evelyn', 'arthur'],
    essential: true,
    chapter: 3,
    art: 'locket',
    revealFlag: 'mara_is_evelyn',
  },
];

export const EVIDENCE_BY_ID: Record<string, Evidence> = Object.fromEntries(
  EVIDENCE.map((e) => [e.id, e]),
);

export function getEvidence(id: string): Evidence | undefined {
  return EVIDENCE_BY_ID[id];
}

export const ESSENTIAL_EVIDENCE = EVIDENCE.filter((e) => e.essential).map((e) => e.id);
