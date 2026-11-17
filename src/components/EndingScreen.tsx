import { useState } from 'react';
import { BookOpen, RotateCcw, Home } from 'lucide-react';
import { useGame } from '../state/GameProvider';
import {
  ENDING_META,
  ENDING_ORDER,
  caseStrength,
  essentialFound,
} from '../game/gameState';
import { ESSENTIAL_EVIDENCE } from '../game/evidence';
import { SUSPECT_ORDER, CHARACTERS } from '../game/characters';
import { CHAPTERS, getChapter } from '../game/chapters';
import { Backdrop } from './art/Backdrop';
import { ConfirmDialog } from './ui/ConfirmDialog';

export function EndingScreen() {
  const { state, startNewGame, returnToMenu, openOverlay } = useGame();
  const [confirmReplay, setConfirmReplay] = useState(false);
  const ending = state.ending ?? 'witness';
  const meta = ENDING_META[ending];
  const essential = essentialFound(state);
  const strength = caseStrength(state);

  return (
    <div className="ending-screen">
      <div className="subscreen-bg">
        <Backdrop bg={ending === 'truth' ? 'dawn' : ending === 'ashes' ? 'eastwing' : 'manor_rain'} />
      </div>
      <div className="ending-inner">
        <span className="ending-sub">{meta.subtitle} · Case closed</span>
        <h1 className="ending-title">{meta.title}</h1>
        <p className="ending-blurb">{meta.blurb}</p>

        <div className="summary-grid">
          <div className="summary-card">
            <h4>Case strength</h4>
            <div className="big">{strength}%</div>
            <p>
              A measure of evidence, deductions and the trust you earned in the house.
            </p>
          </div>
          <div className="summary-card">
            <h4>Essential evidence</h4>
            <div className="big">
              {essential}/{ESSENTIAL_EVIDENCE.length}
            </div>
            <p>Documents, photographs and objects the truth could not be told without.</p>
          </div>
          <div className="summary-card">
            <h4>Deductions made</h4>
            <div className="big">{state.deductions.length}</div>
            <p>Connections drawn on the board between two pieces of the past.</p>
          </div>
          <div className="summary-card">
            <h4>Final decision</h4>
            <div className="serif" style={{ fontSize: '1.2rem', lineHeight: 1.4, marginTop: 6 }}>
              {state.decisions.find((d) => d.id === 'ending_choice')?.answer ??
                'You left the house without deciding.'}
            </div>
          </div>
        </div>

        <div className="section-head">
          <h2>The people in the house</h2>
          <span className="kicker">Trust at the end</span>
        </div>
        <div className="summary-grid">
          {SUSPECT_ORDER.map((id) => {
            const trust = state.trust[id] ?? 50;
            return (
              <div className="summary-card" key={id}>
                <h4>{CHARACTERS[id].name}</h4>
                <div className="trust" style={{ marginTop: 6 }}>
                  <div className="trust-track">
                    <div className="trust-fill" style={{ width: `${trust}%` }} />
                  </div>
                  <span className="trust-label">{trust}</span>
                </div>
                <p>{CHARACTERS[id].role}</p>
              </div>
            );
          })}
        </div>

        <div className="section-head">
          <h2>Your decisions</h2>
          <span className="kicker">{state.decisions.length} recorded</span>
        </div>
        <dl className="decision-list">
          {state.decisions.length === 0 && (
            <p className="muted" style={{ fontSize: '0.85rem' }}>
              No decisions were recorded.
            </p>
          )}
          {state.decisions.map((decision) => (
            <div className="decision-row" key={decision.id}>
              <dt>{decision.question}</dt>
              <dd>{decision.answer}</dd>
            </div>
          ))}
        </dl>

        <div className="section-head">
          <h2>Endings</h2>
          <span className="kicker">{state.unlockedEndings.length} / 4 discovered</span>
        </div>
        <div className="ending-unlocks">
          {ENDING_ORDER.map((id) => {
            const found = state.unlockedEndings.includes(id);
            return (
              <div className={`ending-unlock ${found ? '' : 'ending-unlock--locked'}`} key={id}>
                <h4>{found ? ENDING_META[id].title : '???'}</h4>
                <p>{found ? ENDING_META[id].blurb : 'Not yet witnessed.'}</p>
              </div>
            );
          })}
        </div>

        <div className="hairline" style={{ margin: '34px 0 22px' }} />
        <div className="row">
          <button className="btn btn--solid" onClick={() => setConfirmReplay(true)}>
            <RotateCcw size={15} /> Play again
          </button>
          <button className="btn" onClick={() => openOverlay('journal')}>
            <BookOpen size={15} /> Final journal
          </button>
          <button className="btn btn--ghost" onClick={returnToMenu}>
            <Home size={15} /> Main menu
          </button>
        </div>
        <p className="muted" style={{ fontSize: '0.72rem', marginTop: 18, maxWidth: '70ch' }}>
          You reached Chapter {getChapter(state.chapter).id} of {CHAPTERS.length} —{' '}
          {getChapter(state.chapter).title}. Playing again keeps your unlocked endings and settings
          but begins a new case.
        </p>
      </div>

      {confirmReplay && (
        <ConfirmDialog
          title="Begin a new case?"
          body="Your unlocked endings and settings are kept. The current investigation — its evidence, deductions and decisions — will be cleared."
          confirmLabel="Begin again"
          onConfirm={() => {
            setConfirmReplay(false);
            startNewGame();
          }}
          onCancel={() => setConfirmReplay(false)}
        />
      )}
    </div>
  );
}
