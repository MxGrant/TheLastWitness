import { useState } from 'react';
import {
  BookOpen,
  Check,
  ChevronRight,
  Lock,
  LogOut,
  Network,
  Save,
  Settings,
  User,
} from 'lucide-react';
import { useGame } from '../../state/GameProvider';
import { chapterProgress, getChapter } from '../../game/chapters';
import { CHARACTERS } from '../../game/characters';
import { ROOM_BY_ID } from '../../game/rooms';
import { Backdrop } from '../art/Backdrop';
import { Portrait } from '../art/Portrait';
import { ConfirmDialog } from '../ui/ConfirmDialog';

export function ChapterHub() {
  const {
    state,
    progress,
    openRoom,
    openSuspect,
    openOverlay,
    saveNow,
    returnToMenu,
    playClosingScene,
    notify,
  } = useGame();
  const [confirmMenu, setConfirmMenu] = useState(false);
  const chapter = getChapter(state.chapter);
  const prog = chapterProgress(progress);
  const sealedLocked = !state.flags['sealed_unlocked'];

  const handleRoom = (id: string) => {
    if (id === 'sealed' && sealedLocked) {
      notify({
        id: `locked-sealed-${Date.now()}`,
        kind: 'info',
        title: 'The door is sealed',
        text: 'A key is needed. Arthur carries a ring of them.',
      });
      return;
    }
    openRoom(id);
  };

  return (
    <div className="hub">
      <div className="hub-bg">
        <Backdrop bg={state.chapter >= 5 ? 'corridor' : state.chapter === 1 ? 'manor_night' : 'foyer'} />
      </div>

      <header className="hub-head">
        <div className="hub-title">
          <span className="kicker">
            Chapter {chapter.id} · {chapter.era}
          </span>
          <h1>{chapter.title}</h1>
          <p>{chapter.subtitle} — {chapter.synopsis}</p>
        </div>
        <div className="hub-actions">
          <button className="btn btn--small" onClick={() => openOverlay('journal')}>
            <BookOpen size={14} /> Journal
          </button>
          <button className="btn btn--small" onClick={() => openOverlay('board')}>
            <Network size={14} /> Evidence board
          </button>
          <button
            className="icon-btn"
            title="Save progress"
            aria-label="Save progress"
            onClick={saveNow}
          >
            <Save size={16} />
          </button>
          <button
            className="icon-btn"
            title="Settings"
            aria-label="Settings"
            onClick={() => openOverlay('settings')}
          >
            <Settings size={16} />
          </button>
          <button
            className="icon-btn"
            title="Main menu"
            aria-label="Main menu"
            onClick={() => setConfirmMenu(true)}
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <div className="hub-body">
        <section className="panel objectives" aria-label="Chapter objectives">
          <div className="objectives-head">
            <span className="kicker">Objectives</span>
            <span className="muted" style={{ fontSize: '0.72rem' }}>
              {prog.done} / {prog.required} required
            </span>
          </div>
          {chapter.objectives.map((objective) => {
            const done = objective.done(progress);
            return (
              <div
                key={objective.id}
                className={`objective ${done ? 'objective--done' : ''} ${
                  objective.required ? '' : 'objective--optional'
                }`}
              >
                <span className="objective-mark" aria-hidden="true">
                  {done ? <Check size={11} /> : ''}
                </span>
                <div>
                  {objective.label}
                  {!objective.required && (
                    <span className="muted" style={{ fontSize: '0.66rem' }}> · optional</span>
                  )}
                  {!done && objective.hint && (
                    <span className="objective-hint">{objective.hint}</span>
                  )}
                </div>
              </div>
            );
          })}
        </section>

        <div className="section-head">
          <h2>Investigate</h2>
          <span className="kicker">{chapter.rooms.length} rooms open</span>
        </div>
        <div className="card-grid">
          {chapter.rooms.map((roomId) => {
            const room = ROOM_BY_ID[roomId];
            if (!room) return null;
            const locked = roomId === 'sealed' && sealedLocked;
            const visited = state.roomsVisited.includes(roomId);
            return (
              <button
                key={roomId}
                className={`room-card ${locked ? 'room-card--locked' : ''}`}
                onClick={() => handleRoom(roomId)}
                aria-disabled={locked}
              >
                <div className="room-thumb">
                  <Backdrop bg={roomId} />
                </div>
                <span className="room-badge">
                  {locked ? 'Sealed' : visited ? 'Searched' : 'Unexplored'}
                </span>
                <div className="room-info">
                  <h3>
                    {room.name} {locked && <Lock size={13} style={{ display: 'inline' }} />}
                  </h3>
                  <p>{room.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="section-head">
          <h2>The household</h2>
          <span className="kicker">{chapter.suspects.length} available</span>
        </div>
        <div className="card-grid">
          {chapter.suspects.map((id) => {
            const suspect = CHARACTERS[id];
            const trust = state.trust[id] ?? 50;
            const refuses = state.interviewLocked.includes(id);
            return (
              <button
                key={id}
                className="suspect-card"
                onClick={() => openSuspect(id)}
                aria-label={`Question ${suspect.name}`}
              >
                <Portrait id={id} mood={refuses ? 'cold' : 'calm'} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3>{suspect.name}</h3>
                  <div className="role">{suspect.role}</div>
                  {refuses ? (
                    <div className="refuses">Refuses to speak with you.</div>
                  ) : (
                    <div className="trust">
                      <div className="trust-track">
                        <div className="trust-fill" style={{ width: `${trust}%` }} />
                      </div>
                      <span className="trust-label">
                        {trust >= 70 ? 'Open' : trust >= 40 ? 'Guarded' : 'Hostile'}
                      </span>
                    </div>
                  )}
                </div>
                <ChevronRight size={16} className="muted" />
              </button>
            );
          })}
        </div>

        <div className="section-head">
          <h2>Cased notes</h2>
          <span className="kicker">{state.notes.length} entries</span>
        </div>
        <div className="panel" style={{ padding: 20 }}>
          <div className="row" style={{ gap: 20, flexWrap: 'wrap' }}>
            <div>
              <div className="kicker" style={{ fontSize: '0.54rem' }}>Evidence filed</div>
              <div className="serif" style={{ fontSize: '1.8rem' }}>
                {state.evidence.length}
              </div>
            </div>
            <div>
              <div className="kicker" style={{ fontSize: '0.54rem' }}>Deductions</div>
              <div className="serif" style={{ fontSize: '1.8rem' }}>{state.deductions.length}</div>
            </div>
            <div>
              <div className="kicker" style={{ fontSize: '0.54rem' }}>Interviews locked</div>
              <div className="serif" style={{ fontSize: '1.8rem' }}>
                {state.interviewLocked.length}
              </div>
            </div>
            <div style={{ marginLeft: 'auto', maxWidth: 420 }}>
              <p className="muted" style={{ fontSize: '0.76rem', lineHeight: 1.6 }}>
                <User size={13} style={{ display: 'inline', marginRight: 6 }} />
                Present evidence to a suspect to open new conversations. A wrong accusation closes
                a door that will not reopen.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hub-footer">
        <span className="progress-copy">
          {prog.complete ? (
            <>
              <strong>Chapter ready.</strong> Every required thread is accounted for.
            </>
          ) : (
            <>
              <strong>{prog.pending.length} required</strong> — {prog.pending[0]?.label}
            </>
          )}
        </span>
        <div className="spacer" />
        <button className="btn btn--ghost" onClick={() => openOverlay('journal')}>
          Journal
        </button>
        <button className="btn btn--ghost" onClick={() => openOverlay('board')}>
          Board
        </button>
        <button className="btn btn--solid" onClick={playClosingScene} disabled={!prog.complete}>
          {state.chapter === 6 ? 'Enter the final confrontation' : 'Close the chapter'}
          <ChevronRight size={15} />
        </button>
      </div>

      {confirmMenu && (
        <ConfirmDialog
          title="Leave the manor?"
          body="Your progress is saved. You can return from the main menu with Continue."
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
