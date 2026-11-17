import { ArrowLeft, Lock, Check, Play } from 'lucide-react';
import { useGame } from '../state/GameProvider';
import { CHAPTERS } from '../game/chapters';
import { ENDING_META, ENDING_ORDER } from '../game/gameState';

export function ChaptersScreen() {
  const { state, backFromScreen, continueGame, hasSave } = useGame();
  const closed = (id: number) => Boolean(state.flags[`ch${id}_closed`]);
  const unlockedEndings = state.unlockedEndings;

  return (
    <div className="subscreen">
      <div className="subscreen-head">
        <div>
          <span className="kicker">Case File — Blackwood Manor</span>
          <h1 className="screen-title">Chapters</h1>
        </div>
        <div className="row">
          {hasSave && (
            <button className="btn btn--solid" onClick={continueGame}>
              <Play size={14} /> Resume case
            </button>
          )}
          <button className="btn btn--ghost" onClick={backFromScreen}>
            <ArrowLeft size={15} /> Back
          </button>
        </div>
      </div>

      <div className="subscreen-body">
        <div className="chapter-list">
          {CHAPTERS.map((chapter) => {
            const isCurrent = state.chapter === chapter.id;
            const isLocked = chapter.id > state.chapter;
            const isDone = closed(chapter.id) || chapter.id < state.chapter;
            return (
              <div
                key={chapter.id}
                className={`chapter-row ${isCurrent ? 'chapter-row--current' : ''} ${
                  isLocked ? 'chapter-row--locked' : ''
                }`}
              >
                <div className="chapter-num">{String(chapter.id).padStart(2, '0')}</div>
                <div>
                  <span className="kicker" style={{ fontSize: '0.55rem' }}>
                    {chapter.era}
                  </span>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.synopsis}</p>
                </div>
                <div className="chapter-side">
                  {isDone && (
                    <span className="pill">
                      <Check size={11} /> Completed
                    </span>
                  )}
                  {isCurrent && !isDone && (
                    <span className="pill">In progress</span>
                  )}
                  {isLocked && (
                    <span className="pill pill--muted">
                      <Lock size={11} /> Locked
                    </span>
                  )}
                  {isCurrent && (
                    <button className="btn btn--small" onClick={continueGame} disabled={!hasSave}>
                      Resume chapter
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="section-head" style={{ marginTop: 40 }}>
          <h2>Endings discovered</h2>
          <span className="kicker">{unlockedEndings.length} / 4</span>
        </div>
        <div className="ending-unlocks">
          {ENDING_ORDER.map((ending) => {
            const found = unlockedEndings.includes(ending);
            return (
              <div className={`ending-unlock ${found ? '' : 'ending-unlock--locked'}`} key={ending}>
                <h4>{found ? ENDING_META[ending].title : '???'}</h4>
                <p>
                  {found
                    ? ENDING_META[ending].blurb
                    : 'This ending has not been witnessed yet.'}
                </p>
              </div>
            );
          })}
        </div>

        <p className="muted" style={{ fontSize: '0.76rem', marginTop: 26, maxWidth: '70ch' }}>
          The case saves automatically after every discovery. To replay a chapter, use{' '}
          <em>Restart Chapter</em> in the pause menu — this restores the state at the beginning of
          that chapter without touching earlier progress.
        </p>
      </div>
    </div>
  );
}
