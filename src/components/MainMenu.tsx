import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useGame } from '../state/GameProvider';
import { Backdrop } from './art/Backdrop';
import { getChapter } from '../game/chapters';
import { ENDING_ORDER } from '../game/gameState';
import { ConfirmDialog } from './ui/ConfirmDialog';

export function MainMenu() {
  const {
    state,
    hasSave,
    startNewGame,
    continueGame,
    openChapterSelect,
    openSettings,
    openCredits,
    updateSettings,
  } = useGame();
  const [confirmNew, setConfirmNew] = useState(false);
  const muted = state.settings.muted;
  const chapterTitle = getChapter(state.chapter).title;

  return (
    <div className="menu-screen">
      <Backdrop bg="manor_night" />
      <div className="menu-scrim" />
      <div className="menu-inner">
        <div className="menu-title-block fade-in">
          <div className="menu-eyebrow">A Blackwood Manor Mystery</div>
          <h1 className="game-title">
            <span>The</span>
            <span>
              Last <em>Witness</em>
            </span>
          </h1>
          <p className="menu-tagline">
            Everyone remembers the murder.
            <br />
            Nobody remembers the victim.
          </p>
          <div className="menu-meta">
            <span>Psychological Thriller</span>
            <span>·</span>
            <span>Six Suspects</span>
            <span>·</span>
            <span>Four Endings</span>
          </div>
        </div>

        <nav className="menu-nav rise-in" aria-label="Main menu">
          <button
            onClick={() => {
              if (hasSave) setConfirmNew(true);
              else startNewGame();
            }}
          >
            <span>New Game</span>
            <span className="nav-index">01</span>
          </button>
          <button onClick={continueGame} disabled={!hasSave}>
            <span>Continue</span>
            <span className="nav-index">02</span>
          </button>
          <button onClick={openChapterSelect}>
            <span>Chapters</span>
            <span className="nav-index">03</span>
          </button>
          <button onClick={openSettings}>
            <span>Settings</span>
            <span className="nav-index">04</span>
          </button>
          <button onClick={openCredits}>
            <span>Credits</span>
            <span className="nav-index">05</span>
          </button>
          {hasSave && (
            <p className="muted" style={{ fontSize: '0.72rem', marginTop: 14, letterSpacing: '0.04em' }}>
              Saved: Chapter {state.chapter} — {chapterTitle}
              {state.unlockedEndings.length > 0 &&
                ` · ${state.unlockedEndings.length}/${ENDING_ORDER.length} endings found`}
            </p>
          )}
        </nav>
      </div>

      <footer className="menu-footer">
        <span>Blackwood Manor · November 2026</span>
        <div className="row" style={{ gap: 14 }}>
          <button
            className="sound-toggle"
            onClick={() => updateSettings({ muted: !muted })}
            aria-pressed={!muted}
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            {muted ? 'Sound off' : 'Sound on'}
          </button>
          <span>v1.0</span>
        </div>
      </footer>

      {confirmNew && (
        <ConfirmDialog
          title="Abandon the current case?"
          body={`You have a case in progress: Chapter ${state.chapter}, ${chapterTitle}. Starting again will erase all evidence, deductions and decisions from this save.`}
          confirmLabel="Begin a new case"
          cancelLabel="Keep my case"
          danger
          onConfirm={() => {
            setConfirmNew(false);
            startNewGame();
          }}
          onCancel={() => setConfirmNew(false)}
        />
      )}
    </div>
  );
}
