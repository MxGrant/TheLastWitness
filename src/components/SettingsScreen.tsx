import { useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { useGame } from '../state/GameProvider';
import { ConfirmDialog } from './ui/ConfirmDialog';

export function SettingsPanel({ compact = false }: { compact?: boolean }) {
  const { state, updateSettings } = useGame();
  const settings = state.settings;
  const [confirmReset, setConfirmReset] = useState(false);
  const { resetAllProgress } = useGame();
  const [preview, setPreview] = useState(false);

  const slider = (
    label: string,
    value: number,
    hint: string,
    onChange: (value: number) => void,
  ) => (
    <div className="field">
      <div>
        <span className="field-label">{label}</span>
        <span className="field-hint">{hint}</span>
      </div>
      <div className="row" style={{ gap: 12 }}>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          aria-label={label}
          style={{ ['--fill' as string]: `${value}%` }}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        <span className="muted" style={{ minWidth: 34, textAlign: 'right', fontSize: '0.75rem' }}>
          {value}
        </span>
      </div>
    </div>
  );

  const toggle = (label: string, hint: string, checked: boolean, onChange: () => void) => (
    <div className="field">
      <div>
        <span className="field-label">{label}</span>
        <span className="field-hint">{hint}</span>
      </div>
      <button
        className="switch"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
      />
    </div>
  );

  return (
    <>
      <div className="settings-grid">
        <div className="panel settings-card">
          <h3>Sound</h3>
          <p className="muted" style={{ fontSize: '0.78rem', marginBottom: 8 }}>
            Ambient rain, music and effects are generated in the browser. Audio begins after your
            first interaction, as browsers require.
          </p>
          {slider(
            'Music volume',
            settings.musicVolume,
            'The score beneath the house.',
            (value) => updateSettings({ musicVolume: value }),
          )}
          {slider(
            'Sound effect volume',
            settings.sfxVolume,
            'Rain, thunder, doors and footsteps.',
            (value) => updateSettings({ sfxVolume: value }),
          )}
          {toggle(
            'Mute all audio',
            'Silences music, ambience and effects.',
            settings.muted,
            () => updateSettings({ muted: !settings.muted }),
          )}
        </div>

        <div className="panel settings-card">
          <h3>Reading</h3>
          {slider(
            'Text speed',
            settings.textSpeed,
            'How quickly dialogue is written onto the page.',
            (value) => updateSettings({ textSpeed: value }),
          )}
          <div className="field">
            <div>
              <span className="field-label">Preview</span>
              <span className="field-hint">A line of dialogue at your current speed.</span>
            </div>
            <button className="btn btn--small" onClick={() => setPreview(true)}>
              Type a line
            </button>
          </div>
          {preview && (
            <div className="board-feedback" aria-live="polite">
              The house remembers what its people agree to forget.
            </div>
          )}
          {toggle(
            'Ambience captions',
            'Show a short description of the sound in the scene.',
            settings.subtitles,
            () => updateSettings({ subtitles: !settings.subtitles }),
          )}
          {toggle(
            'Reduced motion',
            'Turns off rain, lightning, pulses and cinematic movement.',
            settings.reducedMotion,
            () => updateSettings({ reducedMotion: !settings.reducedMotion }),
          )}
        </div>
      </div>

      {!compact && (
        <div className="danger-zone">
          <h3>Erase the case</h3>
          <p>
            This deletes your saved chapter, every piece of evidence, every deduction and all
            unlocked endings. It cannot be undone.
          </p>
          <button className="btn btn--danger" onClick={() => setConfirmReset(true)}>
            <RotateCcw size={14} /> Reset all progress
          </button>
        </div>
      )}

      {confirmReset && (
        <ConfirmDialog
          title="Erase all progress?"
          body="Every chapter, evidence item, deduction, decision and unlocked ending will be removed from this browser. There is no way to recover them."
          confirmLabel="Erase everything"
          danger
          onConfirm={() => {
            resetAllProgress();
            setConfirmReset(false);
          }}
          onCancel={() => setConfirmReset(false)}
        />
      )}
    </>
  );
}

export function SettingsScreen() {
  const { backFromScreen } = useGame();
  return (
    <div className="subscreen">
      <div className="subscreen-head">
        <div>
          <span className="kicker">The Last Witness</span>
          <h1 className="screen-title">Settings</h1>
        </div>
        <button className="btn btn--ghost" onClick={backFromScreen}>
          <ArrowLeft size={15} /> Back
        </button>
      </div>
      <div className="subscreen-body">
        <SettingsPanel />
      </div>
    </div>
  );
}
