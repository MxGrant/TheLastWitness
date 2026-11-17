import { ArrowLeft } from 'lucide-react';
import { useGame } from '../state/GameProvider';
import { Backdrop } from './art/Backdrop';

export function CreditsScreen() {
  const { backFromScreen } = useGame();
  return (
    <div className="subscreen">
      <div className="subscreen-bg">
        <Backdrop bg="manor_rain" />
      </div>
      <div className="subscreen-head" style={{ position: 'relative', zIndex: 2 }}>
        <div>
          <span className="kicker">Blackwood Manor</span>
          <h1 className="screen-title">Credits</h1>
        </div>
        <button className="btn btn--ghost" onClick={backFromScreen}>
          <ArrowLeft size={15} /> Back
        </button>
      </div>
      <div className="subscreen-body">
        <div className="credits-body">
          <h2>The Last Witness</h2>
          <p className="muted" style={{ fontStyle: 'italic' }}>
            Everyone remembers the murder. Nobody remembers the victim.
          </p>

          <div className="credits-role">Written, designed and built for the browser</div>
          <div className="credits-name">An original interactive mystery</div>

          <div className="credits-role">Story &amp; Script</div>
          <div className="credits-name">Original narrative, characters and dialogue</div>

          <div className="credits-role">Engineering</div>
          <div className="credits-name">React · TypeScript · Vite</div>
          <div className="credits-name" style={{ fontSize: '0.9rem', color: '#99969A' }}>
            Framer Motion · Lucide · procedural Web Audio · localStorage
          </div>

          <div className="credits-role">Art Direction</div>
          <div className="credits-name">
            Hand-authored SVG scenes, portraits and evidence illustrations
          </div>
          <div className="credits-name" style={{ fontSize: '0.9rem', color: '#99969A' }}>
            No third-party artwork is used
          </div>

          <div className="credits-role">Sound</div>
          <div className="credits-name">Procedurally generated ambience and score</div>
          <div className="credits-name" style={{ fontSize: '0.9rem', color: '#99969A' }}>
            Rain, thunder and clockwork built with the Web Audio API
          </div>

          <p className="credits-note">
            THE LAST WITNESS is a work of fiction. Blackwood Manor, its family and its staff do not
            exist. Any resemblance to real houses, real names or real fires is coincidental — though
            every family has a room it does not discuss.
          </p>
          <p className="credits-note" style={{ marginTop: 10 }}>
            Thank you for investigating. The house has been waiting for someone to ask the right
            question.
          </p>
        </div>
      </div>
    </div>
  );
}
