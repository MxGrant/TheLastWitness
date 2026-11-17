import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { Line, SpeakerId } from '../game/types';
import { CHARACTERS } from '../game/characters';
import { useTypewriter } from '../hooks/useTypewriter';
import { useGame } from '../state/GameProvider';
import { Portrait } from './art/Portrait';
import { Modal } from './ui/Modal';

interface Props {
  title: string;
  kicker: string;
  lines: Line[];
  portraitId: SpeakerId;
  onDone: () => void;
}

export function DialogueModal({ title, kicker, lines, portraitId, onDone }: Props) {
  const { state } = useGame();
  const [index, setIndex] = useState(0);
  const current = lines[index];
  const typer = useTypewriter(current?.text ?? '', state.settings.textSpeed);
  const atEnd = index >= lines.length - 1;

  const advance = () => {
    if (!typer.done) {
      typer.skip();
      return;
    }
    if (atEnd) onDone();
    else setIndex((i) => i + 1);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onDone();
        return;
      }
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        advance();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!current) {
    onDone();
    return null;
  }

  const character = CHARACTERS[portraitId];
  const speaker = CHARACTERS[current.speaker];

  return (
    <Modal onClose={onDone}>
      <div className="dialogue-modal">
        <div className="dialogue-modal-head">
          <Portrait id={portraitId} mood={current.mood ?? 'calm'} />
          <div>
            <span className="kicker">{kicker}</span>
            <h3>{title}</h3>
          </div>
          <button className="icon-btn" style={{ marginLeft: 'auto' }} onClick={onDone} aria-label="Close conversation">
            <X size={16} />
          </button>
        </div>
        <div className="dialogue-modal-body" onClick={advance}>
          <div className={`dialogue-speaker ${current.speaker === 'narrator' ? 'dialogue-speaker--narrator' : ''}`}>
            {current.speaker === 'narrator' ? 'Blackwood Manor' : speaker?.name ?? 'Unknown'}
            {current.speaker === portraitId && character?.role ? (
              <span className="muted" style={{ fontSize: '0.62rem', letterSpacing: '0.12em' }}>
                {character.role}
              </span>
            ) : null}
          </div>
          <p
            className={`dialogue-text ${
              current.speaker === 'narrator' ? 'dialogue-text--narrator' : ''
            }`}
          >
            {typer.display}
            {!typer.done && <span className="gold-text">▌</span>}
          </p>
        </div>
        <div className="dialogue-modal-foot">
          <span className="muted" style={{ fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            {index + 1} / {lines.length}
          </span>
          <button className="btn btn--small btn--solid" onClick={advance}>
            {!typer.done ? 'Finish line' : atEnd ? 'Done' : 'Continue'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
