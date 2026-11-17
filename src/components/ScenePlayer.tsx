import { useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  Menu,
  Network,
  Save,
  Settings,
  LogOut,
  RotateCcw,
  Play,
  X,
} from 'lucide-react';
import { useGame } from '../state/GameProvider';
import { CHARACTERS } from '../game/characters';
import { getChapter } from '../game/chapters';
import type { Choice, Line } from '../game/types';
import { visibleChoices, visibleSceneLines } from '../game/storyEngine';
import { useTypewriter } from '../hooks/useTypewriter';
import { audio } from '../audio/audioEngine';
import { Backdrop } from './art/Backdrop';
import { Portrait } from './art/Portrait';
import { ConfirmDialog } from './ui/ConfirmDialog';

const AMBIENCE_CAPTION: Record<string, string> = {
  rain: 'Rain against the windows.',
  thunder: 'Thunder somewhere beyond the grounds.',
  clock: 'A clock ticks in the empty hall.',
  fire: 'The fire settles in the grate.',
  musicbox: 'A music box, winding down.',
  door: 'A door closes somewhere above.',
  footsteps: 'Footsteps on the landing.',
  paper: 'Paper turns in the quiet.',
  glass: 'Glass, shifting.',
  heart: 'Your own pulse.',
  click: 'A mechanism releases.',
  tape: 'Tape hiss.',
};

export function ScenePlayer() {
  const {
    state,
    currentScene: scene,
    completeScene,
    applyLineEffect,
    logConversation,
    openOverlay,
    saveNow,
    restartChapter,
    returnToMenu,
    goToHub,
  } = useGame();

  const initial = useRef<Line[]>(scene ? visibleSceneLines(scene, state) : []);
  const [lines, setLines] = useState<Line[]>(initial.current);
  const [keys, setKeys] = useState<string[]>(initial.current.map((_, i) => `l${i}`));
  const [index, setIndex] = useState(0);
  const [bg, setBg] = useState(scene?.bg ?? 'manor_night');
  const [chosen, setChosen] = useState<string[]>([]);
  const [paused, setPaused] = useState(false);
  const [confirmMenu, setConfirmMenu] = useState(false);
  const [confirmRestart, setConfirmRestart] = useState(false);
  const finished = useRef(false);

  const current = lines[index];
  const typer = useTypewriter(current?.text ?? '', state.settings.textSpeed);
  const chapter = getChapter(state.chapter);
  const choices = current ? visibleChoices(current, state).filter((c) => !chosen.includes(c.id)) : [];
  const sceneId = scene?.id ?? '';

  useEffect(() => {
    if (!scene) return;
    audio.setAmbience(scene.ambience ?? 'rain');
    if (scene.music) audio.setMusic(scene.music);
  }, [scene]);

  useEffect(() => {
    if (!current) return;
    applyLineEffect(`${sceneId}:${keys[index]}`, current.effect);
    if (current.sfx) audio.playSfx(current.sfx);
    if (current.music) audio.setMusic(current.music);
    if (current.bg) setBg(current.bg);
    // Effects are keyed per line by the provider, so re-running is safe.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, lines.length]);

  const finishScene = () => {
    if (finished.current || !scene) return;
    finished.current = true;
    logConversation(
      `${scene.id}:${state.chapter}`,
      `${chapter.title} — ${scene.title}`,
      lines,
    );
    completeScene();
  };

  const advance = () => {
    if (!scene || paused || state.overlay) return;
    if (!current) {
      finishScene();
      return;
    }
    if (!typer.done) {
      typer.skip();
      return;
    }
    if (choices.length > 0) return;
    if (index >= lines.length - 1) finishScene();
    else setIndex((i) => i + 1);
  };

  const choose = (choice: Choice) => {
    applyLineEffect(`${sceneId}:choice:${choice.id}`, choice.effect);
    setChosen((prev) => [...prev, choice.id]);
    const reply = choice.reply ?? [];
    if (reply.length) {
      const replyKeys = reply.map((_, i) => `reply:${choice.id}:${i}`);
      setLines((prev) => [
        ...prev.slice(0, index + 1),
        ...reply,
        ...prev.slice(index + 1),
      ]);
      setKeys((prev) => [
        ...prev.slice(0, index + 1),
        ...replyKeys,
        ...prev.slice(index + 1),
      ]);
      setIndex(index + 1);
    } else if (index >= lines.length - 1) {
      finishScene();
    } else {
      setIndex(index + 1);
    }
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (state.overlay) return;
        setPaused((p) => !p);
        return;
      }
      if (paused || state.overlay) return;
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        advance();
        return;
      }
      if (/^[1-9]$/.test(event.key)) {
        const choice = choices[Number(event.key) - 1];
        if (choice && typer.done) choose(choice);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!scene) {
    return (
      <div className="subscreen">
        <div className="subscreen-body center" style={{ marginTop: '20vh' }}>
          <p className="serif" style={{ fontSize: '1.4rem' }}>
            The scene has not been set.
          </p>
          <button className="btn btn--solid" style={{ marginTop: 18 }} onClick={goToHub}>
            Return to the manor
          </button>
        </div>
      </div>
    );
  }

  const speakerName =
    current?.speaker === 'narrator' ? 'Blackwood Manor' : CHARACTERS[current?.speaker ?? 'narrator']?.name;

  return (
    <div className="scene-screen">
      <div className="scene-stage fade-in" key={bg}>
        <Backdrop bg={bg} />
      </div>

      <header className="scene-hud">
        <div className="scene-hud-title">
          <span className="kicker">
            Chapter {chapter.id} · {chapter.era}
          </span>
          <h2>{scene.title}</h2>
        </div>
        <div className="scene-hud-actions">
          <button
            className="icon-btn"
            title="Journal"
            aria-label="Open journal"
            onClick={() => openOverlay('journal')}
          >
            <BookOpen size={17} />
          </button>
          <button
            className="icon-btn"
            title="Evidence board"
            aria-label="Open evidence board"
            onClick={() => openOverlay('board')}
          >
            <Network size={17} />
          </button>
          <button
            className="icon-btn"
            title="Save"
            aria-label="Save game"
            onClick={saveNow}
          >
            <Save size={17} />
          </button>
          <button
            className="icon-btn"
            title="Pause"
            aria-label="Pause menu"
            onClick={() => setPaused(true)}
          >
            <Menu size={17} />
          </button>
        </div>
      </header>

      {state.settings.subtitles && scene.ambience && (
        <div className="scene-caption">{AMBIENCE_CAPTION[scene.ambience] ?? ''}</div>
      )}

      <div className="dialogue-wrap" onClick={advance}>
        <div className="dialogue-box">
          <div className="dialogue-head">
            {current?.speaker && current.speaker !== 'narrator' && current.speaker !== 'voice' && (
              <div className="dialogue-portrait" aria-hidden="true">
                <Portrait id={current.speaker} mood={current.mood ?? 'calm'} />
              </div>
            )}
            <div
              className={`dialogue-speaker ${
                current?.speaker === 'narrator' ? 'dialogue-speaker--narrator' : ''
              }`}
            >
              {current?.speaker === 'narrator' ? 'The House' : speakerName}
            </div>
          </div>
          <p
            className={`dialogue-text ${
              current?.speaker === 'narrator' ? 'dialogue-text--narrator' : ''
            } ${current?.emphasis ? 'dialogue-text--emphasis' : ''}`}
          >
            {typer.display}
            {!typer.done && <span className="gold-text">▌</span>}
          </p>

          {typer.done && choices.length > 0 && (
            <div className="choices" onClick={(event) => event.stopPropagation()}>
              {choices.map((choice, i) => (
                <button
                  key={choice.id}
                  className="choice-btn"
                  onClick={() => choose(choice)}
                  autoFocus={i === 0}
                >
                  <span className="choice-index">{i + 1}</span>
                  <span>
                    {choice.text}
                    {choice.hint && <span className="choice-hint">{choice.hint}</span>}
                  </span>
                </button>
              ))}
            </div>
          )}

          <div className="dialogue-footer">
            <span>
              {index + 1} / {lines.length}
            </span>
            <button
              className="continue-hint"
              onClick={(event) => {
                event.stopPropagation();
                advance();
              }}
            >
              <span className="dot" />
              {!typer.done ? 'Skip text' : choices.length > 0 ? 'Choose' : 'Continue'}
            </button>
          </div>
        </div>
      </div>

      {paused && !state.overlay && (
        <div className="pause-overlay">
          <div className="pause-panel panel">
            <span className="kicker">The Last Witness</span>
            <h2>Paused</h2>
            <p className="muted" style={{ fontSize: '0.8rem' }}>
              Chapter {chapter.id} — {chapter.title}
              <br />
              {scene.title}
            </p>
            <div className="pause-actions">
              <button className="btn" onClick={() => setPaused(false)}>
                <Play size={14} /> Continue
              </button>
              <button
                className="btn"
                onClick={() => {
                  saveNow();
                }}
              >
                <Save size={14} /> Save progress
              </button>
              <button className="btn" onClick={() => openOverlay('settings')}>
                <Settings size={14} /> Audio &amp; accessibility
              </button>
              <button className="btn" onClick={() => setConfirmRestart(true)}>
                <RotateCcw size={14} /> Restart chapter
              </button>
              <button className="btn btn--danger" onClick={() => setConfirmMenu(true)}>
                <LogOut size={14} /> Main menu
              </button>
            </div>
            <button
              className="icon-btn"
              style={{ position: 'absolute', top: 12, right: 12 }}
              onClick={() => setPaused(false)}
              aria-label="Close pause menu"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {confirmRestart && (
        <ConfirmDialog
          title="Restart this chapter?"
          body="The chapter will begin again from its opening scene. Evidence, deductions and decisions made during this chapter will be lost; progress from earlier chapters is kept."
          confirmLabel="Restart chapter"
          danger
          onConfirm={() => {
            setConfirmRestart(false);
            setPaused(false);
            restartChapter();
          }}
          onCancel={() => setConfirmRestart(false)}
        />
      )}

      {confirmMenu && (
        <ConfirmDialog
          title="Return to the main menu?"
          body="Your case is saved automatically. You can continue from the main menu at any time."
          confirmLabel="Return to menu"
          onConfirm={() => {
            setConfirmMenu(false);
            returnToMenu();
          }}
          onCancel={() => setConfirmMenu(false)}
        />
      )}
    </div>
  );
}
