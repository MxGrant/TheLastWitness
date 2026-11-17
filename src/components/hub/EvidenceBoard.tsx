import { useState } from 'react';
import { Lightbulb, Link2, Network, X } from 'lucide-react';
import { useGame } from '../../state/GameProvider';
import { EVIDENCE, getEvidence } from '../../game/evidence';
import { DEDUCTIONS } from '../../game/deductions';
import { EvidenceArt } from '../art/EvidenceArt';
import { Modal } from '../ui/Modal';

interface Feedback {
  kind: 'good' | 'bad' | 'info';
  text: string;
}

export function EvidenceBoard() {
  const { state, closeOverlay, submitDeduction, requestHint } = useGame();
  const discovered = EVIDENCE.filter((e) => state.evidence.includes(e.id));
  const [selected, setSelected] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [shake, setShake] = useState(0);
  const [hint, setHint] = useState<{ aTitle: string; bTitle: string } | null>(null);
  const fails = Number(state.deductionAttempts.__total ?? 0);
  const solved = DEDUCTIONS.filter((d) => state.deductions.includes(d.id));

  const toggle = (id: string) => {
    setFeedback(null);
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const connect = () => {
    if (selected.length !== 2) return;
    const result = submitDeduction(selected[0], selected[1]);
    switch (result.status) {
      case 'solved':
        setFeedback({
          kind: 'good',
          text: `${result.deduction.title} — ${result.deduction.result}`,
        });
        setSelected([]);
        break;
      case 'already':
        setFeedback({ kind: 'info', text: 'Those two are already connected on this board.' });
        setSelected([]);
        break;
      case 'early':
        setFeedback({
          kind: 'info',
          text: 'There is a connection here, but you do not yet have the evidence that proves it. Keep investigating.',
        });
        setShake((s) => s + 1);
        break;
      case 'wrong':
        setFeedback({
          kind: 'bad',
          text: 'That connection does not hold. Two pieces of evidence can be near each other without belonging together.',
        });
        setShake((s) => s + 1);
        break;
      default:
        setFeedback({ kind: 'bad', text: 'Choose two different pieces of evidence.' });
    }
  };

  const showHint = () => {
    const result = requestHint();
    if (result) setHint(result);
  };

  return (
    <Modal onClose={closeOverlay} labelledBy="board-title">
      <div className="overlay-shell">
        <div className="modal-head">
          <Network size={18} className="gold-text" />
          <h2 id="board-title">Evidence Board</h2>
          <span className="pill">{solved.length} / {DEDUCTIONS.length} connections</span>
          <button className="icon-btn modal-close" onClick={closeOverlay} aria-label="Close evidence board">
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">
          <div className="board-layout">
            <div
              className={`board-surface ${shake ? 'shake' : ''}`}
              key={`board-${shake}`}
              aria-label="Pinned evidence"
            >
              {discovered.length === 0 ? (
                <div className="empty-state" style={{ color: '#c8bda3' }}>
                  The board is empty. File evidence from the manor and pin it here.
                </div>
              ) : (
                <div className="board-grid">
                  {discovered.map((item, i) => (
                    <button
                      key={item.id}
                      className={`board-card ${
                        selected.includes(item.id) ? 'board-card--selected' : ''
                      }`}
                      style={{ ['--rot' as string]: `${((i % 5) - 2) * 0.9}deg` }}
                      onClick={() => toggle(item.id)}
                      aria-pressed={selected.includes(item.id)}
                    >
                      <EvidenceArt kind={item.art} />
                      <h4>{item.title}</h4>
                      <span className="board-cat">{item.category}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <aside className="board-side">
              <div className="panel">
                <h3>Make a connection</h3>
                <p className="muted" style={{ fontSize: '0.78rem', marginBottom: 10 }}>
                  Select two pieces of evidence that mean something together.
                </p>
                <div className="board-selected">
                  {selected.length === 0 && (
                    <p className="board-selected-empty">Nothing selected.</p>
                  )}
                  {selected.map((id) => (
                    <div className="board-selected-item" key={id}>
                      {getEvidence(id)?.title ?? id}
                    </div>
                  ))}
                </div>
                <div className="row" style={{ marginTop: 12 }}>
                  <button
                    className="btn btn--solid"
                    onClick={connect}
                    disabled={selected.length !== 2}
                  >
                    <Link2 size={14} /> Connect
                  </button>
                  <button
                    className="btn btn--ghost btn--small"
                    onClick={() => {
                      setSelected([]);
                      setFeedback(null);
                    }}
                    disabled={!selected.length}
                  >
                    Clear
                  </button>
                </div>
                {feedback && (
                  <div
                    className={`board-feedback ${
                      feedback.kind === 'good'
                        ? 'board-feedback--good'
                        : feedback.kind === 'bad'
                          ? 'board-feedback--bad'
                          : ''
                    }`}
                    style={{ marginTop: 14 }}
                    role="status"
                  >
                    {feedback.text}
                  </div>
                )}
              </div>

              <div className="panel">
                <h3 style={{ fontSize: '1.1rem' }}>
                  <Lightbulb size={14} style={{ display: 'inline', marginRight: 6 }} />
                  A nudge
                </h3>
                <p className="board-hint">
                  {fails < 2
                    ? 'Hints unlock after two failed connections. The board does not punish mistakes — it remembers them.'
                    : 'You have tried enough wrong doors. Let the house point at one.'}
                </p>
                <button
                  className="btn btn--small"
                  style={{ marginTop: 10 }}
                  onClick={showHint}
                  disabled={fails < 2}
                >
                  Ask for a hint
                </button>
                {hint && (
                  <p className="board-hint" style={{ marginTop: 10, color: '#d3bb8d' }}>
                    Look again at <strong>{hint.aTitle}</strong> beside{' '}
                    <strong>{hint.bTitle}</strong>.
                  </p>
                )}
              </div>

              <div className="panel">
                <h3 style={{ fontSize: '1.1rem' }}>Connections made</h3>
                {solved.length === 0 ? (
                  <p className="board-hint">Nothing holds together yet.</p>
                ) : (
                  <div className="solved-connections">
                    {solved.map((deduction) => (
                      <div className="solved-connection" key={deduction.id}>
                        <span>✓</span>
                        <strong>{deduction.title}</strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Modal>
  );
}
