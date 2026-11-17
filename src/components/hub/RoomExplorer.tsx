import { useEffect, useState } from 'react';
import { ArrowLeft, BookOpen, Check, FileText, List, Network, Plus, X } from 'lucide-react';
import { useGame } from '../../state/GameProvider';
import { HOTSPOTS_BY_ROOM, ROOM_BY_ID } from '../../game/rooms';
import { getEvidence } from '../../game/evidence';
import type { Hotspot } from '../../game/types';
import { Backdrop } from '../art/Backdrop';
import { EvidenceArt } from '../art/EvidenceArt';
import { Modal } from '../ui/Modal';

function InspectionModal({ hotspot, onClose }: { hotspot: Hotspot; onClose: () => void }) {
  const { state, examine, fileHotspot, openOverlay } = useGame();
  const [locked, setLocked] = useState(false);
  const [investigated, setInvestigated] = useState(false);

  useEffect(() => {
    const res = examine(hotspot.id);
    setLocked(res.locked);
    setInvestigated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotspot.id]);

  const evidence = hotspot.evidence ? getEvidence(hotspot.evidence) : undefined;
  const filedEvidence = evidence ? state.evidence.includes(evidence.id) : false;
  const filedNote = hotspot.note ? state.notes.some((n) => n.id === hotspot.note!.id) : false;
  const filed = filedEvidence || filedNote;

  return (
    <Modal onClose={onClose} labelledBy={`inspect-${hotspot.id}`}>
      <div className="inspect-panel panel">
        <div className="inspect-art">
          <EvidenceArt kind={hotspot.art} />
          <div className="inspect-meta">
            <span>{ROOM_BY_ID[hotspot.room]?.name ?? 'Blackwood Manor'}</span>
            <span>
              {locked ? 'Locked' : filed ? 'Filed in journal' : 'Unfiled observation'}
            </span>
          </div>
          <p className="muted" style={{ fontSize: '0.72rem', lineHeight: 1.6 }}>
            {investigated
              ? 'Everything you notice has been recorded in the journal once filed.'
              : 'Examining…'}
          </p>
        </div>
        <div className="inspect-copy">
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <span className="kicker">Object examination</span>
            <button className="icon-btn" onClick={onClose} aria-label="Close examination">
              <X size={16} />
            </button>
          </div>
          <h2 id={`inspect-${hotspot.id}`}>{hotspot.name}</h2>
          <p className="inspect-desc">{hotspot.description}</p>

          {locked ? (
            <div className="inspect-locked">
              <strong style={{ display: 'block', marginBottom: 6 }}>Not yet accessible</strong>
              {hotspot.lockedText ??
                'You do not yet have what you need to make sense of this.'}
            </div>
          ) : (
            hotspot.found && (
              <div className="inspect-found">
                <strong>What you notice</strong>
                {hotspot.found}
              </div>
            )
          )}

          {!locked && evidence && (
            <div className="row" style={{ fontSize: '0.72rem', color: '#99969A' }}>
              <span className="pill">{evidence.category}</span>
              <span>{evidence.essential ? 'Essential to the case' : 'Supplementary'}</span>
            </div>
          )}

          <div className="inspect-actions">
            {!locked && (evidence || hotspot.note) && (
              <button
                className={`btn ${filed ? '' : 'btn--solid'}`}
                onClick={() => fileHotspot(hotspot.id)}
                disabled={filed}
              >
                {filed ? <Check size={14} /> : <Plus size={14} />}
                {filed
                  ? 'Filed in journal'
                  : evidence
                    ? 'Add to evidence journal'
                    : 'Record this note'}
              </button>
            )}
            <button className="btn btn--ghost" onClick={() => openOverlay('journal')}>
              <BookOpen size={14} /> Open journal
            </button>
            <button className="btn btn--ghost" onClick={onClose}>
              <ArrowLeft size={14} /> Step back
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function RoomExplorer() {
  const { state, closeRoom, examine, openOverlay } = useGame();
  const [active, setActive] = useState<Hotspot | null>(null);
  const [showList, setShowList] = useState(false);
  const room = state.activeRoom ? ROOM_BY_ID[state.activeRoom] : undefined;

  if (!room) return null;
  const spots = (HOTSPOTS_BY_ROOM[room.id] ?? []).filter((h) => h.chapter <= state.chapter);

  const openSpot = (hotspot: Hotspot) => {
    examine(hotspot.id);
    setActive(hotspot);
  };

  const statusOf = (hotspot: Hotspot) => {
    if (hotspot.evidence) {
      if (state.evidence.includes(hotspot.evidence)) return 'filed';
      if (state.examined.includes(hotspot.id)) return 'examined';
      return 'new';
    }
    if (hotspot.note) {
      if (state.notes.some((n) => n.id === hotspot.note!.id)) return 'filed';
      if (state.examined.includes(hotspot.id)) return 'examined';
      return 'new';
    }
    return state.examined.includes(hotspot.id) ? 'filed' : 'new';
  };

  return (
    <div className="room-screen">
      <div className="room-scene">
        <Backdrop bg={room.id} />
      </div>
      <div className="room-vignette" />

      <div className="room-topbar">
        <button className="icon-btn" onClick={closeRoom} aria-label="Leave this room">
          <ArrowLeft size={18} />
        </button>
        <div>
          <span className="kicker">Investigation</span>
          <h2>{room.name}</h2>
        </div>
        <div className="spacer" />
        <button className="btn btn--small" onClick={() => openOverlay('journal')}>
          <BookOpen size={13} /> Journal
        </button>
        <button className="btn btn--small" onClick={() => openOverlay('board')}>
          <Network size={13} /> Board
        </button>
        <button
          className="btn btn--small"
          onClick={() => setShowList((value) => !value)}
          aria-expanded={showList}
        >
          <List size={13} /> Objects ({spots.length})
        </button>
      </div>

      <div className="hotspot-layer">
        {spots.map((hotspot) => {
          const status = statusOf(hotspot);
          return (
            <button
              key={hotspot.id}
              className={`hotspot ${status !== 'new' ? 'hotspot--done' : ''}`}
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              onClick={() => openSpot(hotspot)}
              aria-label={`Examine ${hotspot.name}`}
            >
              <span className="hotspot-dot" />
              <span className="hotspot-label">{hotspot.label}</span>
            </button>
          );
        })}
      </div>

      {showList && (
      <aside className="room-sidebar" aria-label="Objects in this room">
        <h3>In this room</h3>
        <div className="room-sidebar-list">
          {spots.map((hotspot) => {
            const status = statusOf(hotspot);
            return (
              <button
                key={hotspot.id}
                className={`room-sidebar-item ${status === 'new' ? '' : 'room-sidebar-item--done'}`}
                onClick={() => openSpot(hotspot)}
              >
                <span className="dot" />
                <span>
                  {hotspot.name}
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.62rem',
                      color: status === 'filed' ? '#B99A62' : '#6f6d72',
                      fontStyle: 'italic',
                    }}
                  >
                    {status === 'filed'
                      ? 'Filed'
                      : status === 'examined'
                        ? 'Examined — not filed'
                        : 'Not yet examined'}
                  </span>
                </span>
              </button>
            );
          })}
          {spots.length === 0 && (
            <p className="room-sidebar-empty">This room has nothing to offer yet.</p>
          )}
        </div>
        <div className="hairline" />
        <p className="muted" style={{ fontSize: '0.7rem', lineHeight: 1.55 }}>
          <FileText size={12} style={{ display: 'inline', marginRight: 5 }} />
          Objects that matter are marked in gold. Examine them, then file what you find.
        </p>
      </aside>
      )}

      <p className="room-description">{room.description}</p>

      <button className="btn room-back" onClick={closeRoom}>
        <ArrowLeft size={15} /> Back to the house
      </button>

      {active && <InspectionModal hotspot={active} onClose={() => setActive(null)} />}
    </div>
  );
}
