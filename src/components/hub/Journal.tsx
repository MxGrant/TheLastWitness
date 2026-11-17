import { useMemo, useState } from 'react';
import {
  BookOpen,
  Clock,
  Fingerprint,
  GitBranch,
  Lock,
  ScrollText,
  User,
  X,
} from 'lucide-react';
import { useGame } from '../../state/GameProvider';
import { EVIDENCE, getEvidence } from '../../game/evidence';
import { CHARACTERS, SUSPECT_ORDER } from '../../game/characters';
import { CHAPTERS, chapterProgress, getChapter } from '../../game/chapters';
import { DEDUCTIONS } from '../../game/deductions';
import { TIMELINE } from '../../game/timeline';
import type { EvidenceCategory, SuspectId } from '../../game/types';
import { EvidenceArt } from '../art/EvidenceArt';
import { Portrait } from '../art/Portrait';
import { Modal } from '../ui/Modal';

type Tab = 'evidence' | 'suspects' | 'notes' | 'timeline' | 'deductions' | 'chapters' | 'transcripts';

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'evidence', label: 'Evidence', icon: <Fingerprint size={13} /> },
  { id: 'suspects', label: 'Suspects', icon: <User size={13} /> },
  { id: 'notes', label: 'Notes', icon: <BookOpen size={13} /> },
  { id: 'timeline', label: 'Timeline', icon: <Clock size={13} /> },
  { id: 'deductions', label: 'Deductions', icon: <GitBranch size={13} /> },
  { id: 'chapters', label: 'Chapters', icon: <Lock size={13} /> },
  { id: 'transcripts', label: 'Transcripts', icon: <ScrollText size={13} /> },
];

const CATEGORIES: EvidenceCategory[] = [
  'Document',
  'Photograph',
  'Object',
  'Forensic',
  'Testimony',
  'Record',
  'Letter',
  'Certificate',
];

function EvidenceTab() {
  const { state } = useGame();
  const discovered = useMemo(
    () => EVIDENCE.filter((e) => state.evidence.includes(e.id)),
    [state.evidence],
  );
  const [category, setCategory] = useState<EvidenceCategory | 'all'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(discovered[0]?.id ?? null);
  const list = discovered.filter((e) => category === 'all' || e.category === category);
  const selected = (selectedId ? getEvidence(selectedId) : undefined) ?? list[0];

  if (!discovered.length) {
    return (
      <div className="empty-state">
        The journal is empty. Examine objects in the manor and file what you find.
      </div>
    );
  }

  return (
    <div className="journal-grid">
      <div>
        <div className="row" style={{ marginBottom: 12, gap: 6 }}>
          <button
            className={`pill ${category === 'all' ? '' : 'pill--muted'}`}
            onClick={() => setCategory('all')}
          >
            All ({discovered.length})
          </button>
          {CATEGORIES.filter((c) => discovered.some((e) => e.category === c)).map((cat) => (
            <button
              key={cat}
              className={`pill ${category === cat ? '' : 'pill--muted'}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="journal-list">
          {list.map((item) => (
            <button
              key={item.id}
              className={`journal-item ${selected?.id === item.id ? 'journal-item--active' : ''}`}
              onClick={() => setSelectedId(item.id)}
            >
              <div className="thumb">
                <EvidenceArt kind={item.art} />
              </div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.short}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <article className="journal-detail">
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <span className="kicker">{selected.category} · Chapter {selected.chapter}</span>
            <span className={`pill ${selected.essential ? '' : 'pill--muted'}`}>
              {selected.essential ? 'Essential' : 'Supplementary'}
            </span>
          </div>
          <div style={{ marginTop: 14 }}>
            <EvidenceArt kind={selected.art} />
          </div>
          <h3>{selected.title}</h3>
          <p>{selected.description}</p>
          {selected.detail && (
            <div className="inspect-found" style={{ marginTop: 14 }}>
              <strong>What it means</strong>
              {selected.revealFlag && state.flags[selected.revealFlag] ? (
                selected.detail
              ) : (
                <span className="muted" style={{ fontStyle: 'italic' }}>
                  The significance of this is not clear yet. Something else may give it meaning.
                </span>
              )}
            </div>
          )}
          <dl className="meta-grid">
            <div>
              <dt>Found at</dt>
              <dd>{selected.location}</dd>
            </div>
            <div>
              <dt>Related</dt>
              <dd>
                {selected.related
                  .map((r) => CHARACTERS[r as keyof typeof CHARACTERS]?.shortName ?? r)
                  .join(', ')}
              </dd>
            </div>
          </dl>
        </article>
      )}
    </div>
  );
}

function SuspectsTab() {
  const { state } = useGame();
  const [selected, setSelected] = useState<SuspectId>('eleanor');
  const suspect = CHARACTERS[selected];
  const revealed = suspect.secretFlag ? Boolean(state.flags[suspect.secretFlag]) : false;
  const trust = state.trust[selected] ?? 50;

  return (
    <div className="journal-grid">
      <div className="journal-list">
        {SUSPECT_ORDER.map((id) => {
          const person = CHARACTERS[id];
          return (
            <button
              key={id}
              className={`journal-item ${selected === id ? 'journal-item--active' : ''}`}
              onClick={() => setSelected(id)}
            >
              <div className="thumb">
                <Portrait id={id} mood="calm" />
              </div>
              <div style={{ flex: 1 }}>
                <h4>{person.name}</h4>
                <p>{person.role}</p>
                <div className="trust">
                  <div className="trust-track">
                    <div className="trust-fill" style={{ width: `${state.trust[id] ?? 50}%` }} />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <article className="journal-detail">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <span className="kicker">Suspect profile</span>
          <span className="pill">{trust >= 70 ? 'Open' : trust >= 40 ? 'Guarded' : 'Hostile'}</span>
        </div>
        <div style={{ display: 'flex', gap: 18, marginTop: 14, alignItems: 'flex-start' }}>
          <div style={{ width: 132, flex: '0 0 auto' }}>
            <Portrait id={selected} mood="calm" />
          </div>
          <div>
            <h3 style={{ marginTop: 0 }}>{suspect.name}</h3>
            <div className="kicker" style={{ fontSize: '0.55rem' }}>{suspect.role}</div>
            <p className="suspect-quote" style={{ marginTop: 12 }}>
              “{suspect.quote}”
            </p>
          </div>
        </div>
        <p style={{ marginTop: 16 }}>{suspect.bio}</p>
        <dl className="meta-grid">
          <div>
            <dt>Possible motive</dt>
            <dd>{suspect.motive}</dd>
          </div>
          <div>
            <dt>Stated alibi</dt>
            <dd>{suspect.alibi}</dd>
          </div>
        </dl>
        <div className="inspect-found" style={{ marginTop: 16 }}>
          <strong>The secret</strong>
          {revealed ? (
            suspect.secret
          ) : (
            <span className="muted" style={{ fontStyle: 'italic' }}>
              Not yet established. Find the evidence that proves what this person is hiding.
            </span>
          )}
        </div>
        {state.interviewLocked.includes(selected) && (
          <p style={{ color: '#cf9a9d', fontSize: '0.85rem', marginTop: 12 }}>
            They have refused further interviews after your accusation.
          </p>
        )}
      </article>
    </div>
  );
}

function NotesTab() {
  const { state } = useGame();
  if (!state.notes.length) {
    return <div className="empty-state">No notes yet. The case is still a room with a stain in it.</div>;
  }
  return (
    <div style={{ maxWidth: 820 }}>
      {[...state.notes].reverse().map((note) => (
        <div className="note-card" key={note.id}>
          <span className="kicker" style={{ fontSize: '0.54rem' }}>Chapter {note.chapter}</span>
          <h4>{note.title}</h4>
          <p>{note.text}</p>
        </div>
      ))}
    </div>
  );
}

function TimelineTab() {
  const { state } = useGame();
  const entries = TIMELINE.filter((entry) => {
    if (entry.chapter > state.chapter) return false;
    if (entry.requiresEvidence && !entry.requiresEvidence.every((id) => state.evidence.includes(id)))
      return false;
    if (entry.requiresFlag && !state.flags[entry.requiresFlag]) return false;
    return true;
  });
  if (!entries.length) {
    return (
      <div className="empty-state">
        The timeline is a blank page. Find documents that date this house.
      </div>
    );
  }
  return (
    <div className="timeline" style={{ maxWidth: 860 }}>
      {entries.map((entry) => (
        <div className="timeline-item" key={entry.id}>
          <span className="timeline-date">{entry.date}</span>
          <h4>{entry.title}</h4>
          <p>{entry.text}</p>
        </div>
      ))}
    </div>
  );
}

function DeductionsTab() {
  const { state } = useGame();
  const solved = DEDUCTIONS.filter((d) => state.deductions.includes(d.id));
  if (!solved.length) {
    return (
      <div className="empty-state">
        No connections made yet. The evidence board is where the case begins to hold together.
      </div>
    );
  }
  return (
    <div style={{ maxWidth: 860 }}>
      {solved.map((deduction) => (
        <div className="deduction-solved" key={deduction.id}>
          <span className="kicker" style={{ fontSize: '0.54rem' }}>Chapter {deduction.chapter}</span>
          <h4>{deduction.title}</h4>
          <p>{deduction.result}</p>
        </div>
      ))}
    </div>
  );
}

function ChaptersTab() {
  const { state, progress } = useGame();
  const current = getChapter(state.chapter);
  const prog = chapterProgress(progress);
  return (
    <div style={{ maxWidth: 900 }}>
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14 }}>
        <h3 className="serif" style={{ fontSize: '1.6rem', fontWeight: 400 }}>
          Chapter {current.id} — {current.title}
        </h3>
        <span className="pill">
          {prog.done} / {prog.required} required
        </span>
      </div>
      {current.objectives.map((objective) => (
        <div
          key={objective.id}
          className={`objective ${objective.done(progress) ? 'objective--done' : ''}`}
        >
          <span className="objective-mark">{objective.done(progress) ? '✓' : ''}</span>
          <span>{objective.label}</span>
        </div>
      ))}
      <div className="hairline" />
      {CHAPTERS.map((chapter) => {
        const status =
          chapter.id > state.chapter
            ? 'Locked'
            : chapter.id === state.chapter
              ? 'In progress'
              : 'Completed';
        return (
          <div className="row" key={chapter.id} style={{ justifyContent: 'space-between', padding: '7px 0' }}>
            <span className="serif" style={{ fontSize: '1.15rem' }}>
              {String(chapter.id).padStart(2, '0')} · {chapter.title}
            </span>
            <span className={`pill ${status === 'Locked' ? 'pill--muted' : ''}`}>{status}</span>
          </div>
        );
      })}
    </div>
  );
}

function TranscriptsTab() {
  const { state } = useGame();
  if (!state.dialogueLog.length) {
    return <div className="empty-state">No conversations recorded yet.</div>;
  }
  return (
    <div style={{ maxWidth: 900 }}>
      {state.dialogueLog.map((log) => (
        <details className="transcript" key={log.id}>
          <summary>
            <span>{log.title}</span>
            <span className="muted">Chapter {log.chapter} · {log.entries.length} lines</span>
          </summary>
          <div className="transcript-body">
            {log.entries.map((entry, i) => (
              <div className="transcript-line" key={`${log.id}-${i}`}>
                <strong>{entry.speakerName}</strong>
                <span>{entry.text}</span>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

export function Journal() {
  const { closeOverlay } = useGame();
  const [tab, setTab] = useState<Tab>('evidence');

  return (
    <Modal onClose={closeOverlay} labelledBy="journal-title">
      <div className="overlay-shell">
        <div className="modal-head">
          <BookOpen size={18} className="gold-text" />
          <h2 id="journal-title">Detective's Journal</h2>
          <button className="icon-btn modal-close" onClick={closeOverlay} aria-label="Close journal">
            <X size={18} />
          </button>
        </div>
        <div className="tabs" role="tablist" aria-label="Journal sections">
          {TABS.map((item) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={tab === item.id}
              className={`tab ${tab === item.id ? 'tab--active' : ''}`}
              onClick={() => setTab(item.id)}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                {item.icon}
                {item.label}
              </span>
            </button>
          ))}
        </div>
        <div className="modal-body">
          {tab === 'evidence' && <EvidenceTab />}
          {tab === 'suspects' && <SuspectsTab />}
          {tab === 'notes' && <NotesTab />}
          {tab === 'timeline' && <TimelineTab />}
          {tab === 'deductions' && <DeductionsTab />}
          {tab === 'chapters' && <ChaptersTab />}
          {tab === 'transcripts' && <TranscriptsTab />}
        </div>
      </div>
    </Modal>
  );
}
