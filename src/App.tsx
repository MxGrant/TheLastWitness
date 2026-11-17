import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GameProvider, useGame } from './state/GameProvider';
import { audio } from './audio/audioEngine';
import { MainMenu } from './components/MainMenu';
import { ChaptersScreen } from './components/ChaptersScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { CreditsScreen } from './components/CreditsScreen';
import { ScenePlayer } from './components/ScenePlayer';
import { ChapterHub } from './components/hub/ChapterHub';
import { RoomExplorer } from './components/hub/RoomExplorer';
import { Interrogation } from './components/hub/Interrogation';
import { Journal } from './components/hub/Journal';
import { EvidenceBoard } from './components/hub/EvidenceBoard';
import { EndingScreen } from './components/EndingScreen';
import { Toasts } from './components/Toasts';
import { SettingsPanel } from './components/SettingsScreen';
import { Modal } from './components/ui/Modal';
import { X } from 'lucide-react';

function SettingsModal() {
  const { closeOverlay } = useGame();
  return (
    <Modal onClose={closeOverlay} labelledBy="settings-modal-title">
      <div className="overlay-shell" style={{ maxWidth: 900 }}>
        <div className="modal-head">
          <span className="kicker">The Last Witness</span>
          <h2 id="settings-modal-title">Audio &amp; accessibility</h2>
          <button className="icon-btn modal-close" onClick={closeOverlay} aria-label="Close settings">
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">
          <SettingsPanel />
        </div>
      </div>
    </Modal>
  );
}

function Shell() {
  const { state, currentScene } = useGame();
  const { settings, phase, sceneId, chapter } = state;

  useEffect(() => {
    document.documentElement.dataset.reducedMotion = String(settings.reducedMotion);
  }, [settings.reducedMotion]);

  useEffect(() => {
    audio.configure({
      musicVolume: settings.musicVolume,
      sfxVolume: settings.sfxVolume,
      muted: settings.muted,
    });
  }, [settings.musicVolume, settings.sfxVolume, settings.muted]);

  useEffect(() => {
    const unlock = () => {
      audio.unlock();
      audio.configure({
        musicVolume: settings.musicVolume,
        sfxVolume: settings.sfxVolume,
        muted: settings.muted,
      });
    };
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, [settings.musicVolume, settings.sfxVolume, settings.muted]);

  useEffect(() => {
    if (phase === 'menu' || phase === 'chapters' || phase === 'settings' || phase === 'credits') {
      audio.setMusic('menu');
      audio.setAmbience('rain');
    } else if (phase === 'story') {
      audio.setMusic(currentScene?.music ?? 'manor');
      audio.setAmbience(currentScene?.ambience ?? 'rain');
    } else if (phase === 'hub') {
      audio.setMusic(chapter >= 4 ? 'tension' : 'manor');
      audio.setAmbience('rain');
    } else if (phase === 'ending') {
      audio.setMusic('memory');
      audio.setAmbience('rain');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, sceneId, chapter]);

  useEffect(() => {
    if (state.overlay === null) return;
    // bring the overlay into view on small screens
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [state.overlay]);

  const screenKey = `${phase}:${sceneId ?? ''}:${state.sceneKey}`;

  return (
    <div className="app">
      <motion.div
        key={screenKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: settings.reducedMotion ? 0 : 0.5, ease: 'easeOut' }}
      >
        {phase === 'menu' && <MainMenu />}
        {phase === 'chapters' && <ChaptersScreen />}
        {phase === 'settings' && <SettingsScreen />}
        {phase === 'credits' && <CreditsScreen />}
        {phase === 'story' && <ScenePlayer key={state.sceneKey} />}
        {phase === 'hub' && <ChapterHub />}
        {phase === 'ending' && <EndingScreen />}
      </motion.div>

      {phase === 'hub' && state.activeRoom && <RoomExplorer />}
      {phase === 'hub' && state.activeSuspect && !state.activeRoom && <Interrogation />}

      {state.overlay === 'journal' && <Journal />}
      {state.overlay === 'board' && <EvidenceBoard />}
      {state.overlay === 'settings' && <SettingsModal />}

      <Toasts />
    </div>
  );
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="subscreen">
          <div className="subscreen-body" style={{ marginTop: '14vh', maxWidth: 640 }}>
            <span className="kicker">Blackwood Manor</span>
            <h1 className="screen-title">The page has gone dark.</h1>
            <p className="muted" style={{ margin: '16px 0 22px', fontSize: '0.9rem' }}>
              The game hit an unexpected error. Your saved case is kept in this browser's storage.
              Reload the page to return to the main menu and continue.
            </p>
            <div className="row">
              <button className="btn btn--solid" onClick={() => window.location.reload()}>
                Reload the manor
              </button>
            </div>
            <p className="muted" style={{ marginTop: 18, fontSize: '0.7rem' }}>
              {this.state.error.message}
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <GameProvider>
        <Shell />
      </GameProvider>
    </ErrorBoundary>
  );
}
