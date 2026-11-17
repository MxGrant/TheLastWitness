import { useEffect } from 'react';
import { useGame } from '../state/GameProvider';
import type { ToastNotice } from '../game/types';

function Toast({ notice }: { notice: ToastNotice }) {
  const { dismissToast } = useGame();

  useEffect(() => {
    const timer = window.setTimeout(() => dismissToast(notice.id), 4800);
    return () => window.clearTimeout(timer);
  }, [notice.id, dismissToast]);

  return (
    <div className={`toast toast--${notice.kind}`} role="status">
      <div>
        <h5>{notice.title}</h5>
        {notice.text && <p>{notice.text}</p>}
      </div>
      <button
        className="toast-close"
        onClick={() => dismissToast(notice.id)}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
}

export function Toasts() {
  const { toasts } = useGame();
  if (!toasts.length) return null;
  return (
    <div className="toast-stack" aria-live="polite">
      {toasts.map((notice) => (
        <Toast key={notice.id} notice={notice} />
      ))}
    </div>
  );
}
