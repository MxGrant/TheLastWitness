import { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Fingerprint,
  Lock,
  MessageSquare,
  Network,
  AlertTriangle,
  X,
} from 'lucide-react';
import { useGame } from '../../state/GameProvider';
import { CHARACTERS } from '../../game/characters';
import { topicsFor, ACCUSATION_CLOSE_LINE } from '../../game/interrogations';
import { getEvidence } from '../../game/evidence';
import type { Line, Topic } from '../../game/types';
import { Portrait } from '../art/Portrait';
import { EvidenceArt } from '../art/EvidenceArt';
import { DialogueModal } from '../DialogueModal';
import { Modal } from '../ui/Modal';
import { ConfirmDialog } from '../ui/ConfirmDialog';

interface Conversation {
  title: string;
  kicker: string;
  lines: Line[];
}

export function Interrogation() {
  const {
    state,
    closeSuspect,
    askTopic,
    presentEvidence,
    accuse,
    openOverlay,
  } = useGame();
  const suspectId = state.activeSuspect;
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [picker, setPicker] = useState(false);
  const [confirmAccuse, setConfirmAccuse] = useState(false);
  const [lockedReason, setLockedReason] = useState<string | null>(null);

  if (!suspectId) return null;
  const suspect = CHARACTERS[suspectId];
  const topics = topicsFor(suspectId).filter(
    (topic) => !(topic.hideIfFlag && state.flags[topic.hideIfFlag]),
  );
  const trust = state.trust[suspectId] ?? 50;
  const refuses = state.interviewLocked.includes(suspectId);
  const discoveredEvidence = state.evidence
    .map((id) => getEvidence(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const reasonFor = (topic: Topic): string | null => {
    if (refuses) return 'They will not speak with you again.';
    if (topic.chapter > state.chapter) return 'Later in the case.';
    if (topic.requiresFlag && !state.flags[topic.requiresFlag])
      return 'You need to know more before asking this.';
    if (topic.requiresEvidence) {
      const missing = topic.requiresEvidence.find((id) => !state.evidence.includes(id));
      if (missing) return `Requires: ${getEvidence(missing)?.title ?? 'evidence'}.`;
    }
    if (topic.minTrust && trust < topic.minTrust) return 'They do not trust you enough.';
    return null;
  };

  const handleTopic = (topic: Topic) => {
    const reason = reasonFor(topic);
    if (reason) {
      setLockedReason(reason);
      return;
    }
    const result = askTopic(topic.id);
    if (!result.ok) {
      setLockedReason(result.reason);
      return;
    }
    setLockedReason(null);
    setConversation({
      title: topic.label,
      kicker: 'Interview',
      lines: result.lines,
    });
  };

  return (
    <div className="interrogation">
      <div className="interrogation-head">
        <button className="icon-btn" onClick={closeSuspect} aria-label="Leave the interview">
          <ArrowLeft size={18} />
        </button>
        <div>
          <span className="kicker">Interview</span>
          <h2>{suspect.name}</h2>
        </div>
        <button className="btn btn--small" onClick={() => openOverlay('journal')}>
          <BookOpen size={13} /> Journal
        </button>
        <button className="btn btn--small" onClick={() => openOverlay('board')}>
          <Network size={13} /> Board
        </button>
      </div>

      <div className="interrogation-body">
        <aside className="suspect-profile">
          <Portrait id={suspectId} mood={refuses ? 'cold' : trust > 65 ? 'warm' : 'calm'} />
          <div>
            <h3>{suspect.name}</h3>
            <div className="role">{suspect.role}</div>
            <div className="trust" style={{ marginTop: 10 }}>
              <div className="trust-track">
                <div className="trust-fill" style={{ width: `${trust}%` }} />
              </div>
              <span className="trust-label">
                {trust >= 70 ? 'Open' : trust >= 40 ? 'Guarded' : 'Hostile'}
              </span>
            </div>
            <p className="suspect-quote" style={{ marginTop: 14 }}>
              “{suspect.quote}”
            </p>
          </div>
          <div className="suspect-actions">
            <button
              className="btn"
              onClick={() => setPicker(true)}
              disabled={!discoveredEvidence.length || refuses}
            >
              <Fingerprint size={14} /> Present evidence
            </button>
            <button className="btn btn--danger" onClick={() => setConfirmAccuse(true)} disabled={refuses}>
              <AlertTriangle size={14} /> Accuse {suspect.shortName}
            </button>
          </div>
        </aside>

        <section className="topics-panel">
          <h3>Lines of questioning</h3>
          <p className="topics-sub">
            {refuses
              ? `${suspect.shortName} has closed the door on further interviews.`
              : `Trust: ${trust >= 70 ? 'they are speaking freely' : trust >= 40 ? 'they are choosing their words' : 'they are guarding something'}. Ask carefully. Evidence opens doors that questions cannot.`}
          </p>

          {refuses && (
            <div className="inspect-locked" style={{ marginBottom: 14 }}>
              <strong>Interview closed</strong>
              You accused them before the case was ready. They will not answer another question in
              this house.
            </div>
          )}

          <div className="topic-list">
            {topics.map((topic, i) => {
              const reason = reasonFor(topic);
              const asked = state.topicsAsked.includes(topic.id);
              return (
                <button
                  key={topic.id}
                  className={`topic ${asked ? 'topic--asked' : ''}`}
                  onClick={() => handleTopic(topic)}
                  aria-disabled={Boolean(reason)}
                >
                  <span className="topic-index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="topic-text">
                    {topic.label}
                    {reason && <span className="topic-reason">{reason}</span>}
                  </span>
                  {reason && <Lock size={13} className="muted" />}
                  {asked && !reason && <MessageSquare size={13} className="gold-text" />}
                  {!reason && topic.requiresEvidence && <span className="topic-tag">Evidence</span>}
                </button>
              );
            })}
          </div>

          {lockedReason && (
            <p className="interrogation-footnote" role="status">
              {lockedReason}
            </p>
          )}

          <p className="interrogation-footnote">
            Presenting evidence can unlock a new line of questioning — or close one. A premature
            accusation is remembered for the rest of the case.
          </p>
        </section>
      </div>

      {conversation && (
        <DialogueModal
          title={conversation.title}
          kicker={conversation.kicker}
          lines={conversation.lines}
          portraitId={suspectId}
          onDone={() => setConversation(null)}
        />
      )}

      {picker && (
        <Modal onClose={() => setPicker(false)} labelledBy="evidence-picker-title">
          <div className="overlay-shell" style={{ maxWidth: 860 }}>
            <div className="modal-head">
              <Fingerprint size={18} className="gold-text" />
              <h2 id="evidence-picker-title">Present evidence to {suspect.shortName}</h2>
              <button
                className="icon-btn modal-close"
                onClick={() => setPicker(false)}
                aria-label="Close evidence picker"
              >
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              {discoveredEvidence.length === 0 ? (
                <div className="empty-state">You have nothing filed to present.</div>
              ) : (
                <div className="evidence-picker">
                  {discoveredEvidence.map((item) => (
                    <button
                      key={item.id}
                      className="evidence-pick"
                      onClick={() => {
                        const lines = presentEvidence(suspectId, item.id);
                        setConversation({
                          title: item.title,
                          kicker: 'Evidence presented',
                          lines,
                        });
                        setPicker(false);
                      }}
                    >
                      <span className="thumb">
                        <EvidenceArt kind={item.art} />
                      </span>
                      <span>
                        {item.title}
                        <span style={{ display: 'block', color: '#6f6d72', fontSize: '0.62rem' }}>
                          {item.category}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}

      {confirmAccuse && (
        <ConfirmDialog
          title={`Accuse ${suspect.name}?`}
          body={
            state.chapter < 4
              ? 'The case is not yet complete. Accusing this early will close their interview for the rest of this chapter, and they will not speak with you again until the case moves on.'
              : 'An accusation changes how this person treats you for the rest of the case, and it will be remembered in the final accounting.'
          }
          confirmLabel="Make the accusation"
          cancelLabel="Not yet"
          danger
          onConfirm={() => {
            const lines = accuse(suspectId);
            setConfirmAccuse(false);
            setConversation({
              title: `Accusation — ${suspect.name}`,
              kicker: 'The house is listening',
              lines: [
                ...lines,
                { speaker: 'narrator', text: ACCUSATION_CLOSE_LINE[suspectId] },
              ],
            });
          }}
          onCancel={() => setConfirmAccuse(false)}
        />
      )}
    </div>
  );
}

