import type { MusicKey, SfxKey } from '../game/types';

interface AudioSettings {
  musicVolume: number;
  sfxVolume: number;
  muted: boolean;
}

interface MusicConfig {
  chords: number[][];
  melody: number[];
  duration: number;
  level: number;
  wave: OscillatorType;
}

const MUSIC: Record<MusicKey, MusicConfig> = {
  menu: {
    chords: [
      [110, 164.81, 220, 261.63],
      [98, 146.83, 196, 246.94],
      [87.31, 130.81, 174.61, 220],
      [110, 164.81, 220, 293.66],
    ],
    melody: [440, 392, 329.63, 293.66, 261.63],
    duration: 7.5,
    level: 0.055,
    wave: 'sine',
  },
  manor: {
    chords: [
      [146.83, 174.61, 220, 293.66],
      [130.81, 164.81, 196, 261.63],
      [110, 146.83, 174.61, 246.94],
      [123.47, 155.56, 185, 233.08],
    ],
    melody: [293.66, 349.23, 392, 440],
    duration: 8.5,
    level: 0.042,
    wave: 'sine',
  },
  tension: {
    chords: [
      [116.54, 123.47, 174.61, 246.94],
      [110, 130.81, 164.81, 233.08],
      [103.83, 138.59, 185, 277.18],
    ],
    melody: [466.16, 440, 415.3],
    duration: 6,
    level: 0.03,
    wave: 'triangle',
  },
  revelation: {
    chords: [
      [130.81, 155.56, 196, 261.63],
      [110, 146.83, 174.61, 261.63],
      [98, 130.81, 164.81, 246.94],
      [116.54, 155.56, 196, 293.66],
    ],
    melody: [523.25, 493.88, 440, 392, 349.23],
    duration: 6.5,
    level: 0.05,
    wave: 'sine',
  },
  melancholy: {
    chords: [
      [87.31, 130.81, 174.61, 207.65],
      [82.41, 123.47, 164.81, 196],
      [77.78, 116.54, 155.56, 185],
    ],
    melody: [349.23, 329.63, 311.13, 261.63],
    duration: 9,
    level: 0.045,
    wave: 'sine',
  },
  memory: {
    chords: [
      [261.63, 329.63, 392, 523.25],
      [220, 277.18, 329.63, 440],
      [196, 246.94, 293.66, 392],
    ],
    melody: [659.25, 587.33, 523.25, 493.88, 440, 392],
    duration: 5.5,
    level: 0.028,
    wave: 'sine',
  },
  finale: {
    chords: [
      [98, 146.83, 196, 233.08],
      [87.31, 130.81, 174.61, 220],
      [110, 164.81, 220, 261.63],
      [130.81, 196, 261.63, 329.63],
    ],
    melody: [392, 349.23, 311.13, 293.66, 261.63],
    duration: 7,
    level: 0.05,
    wave: 'triangle',
  },
};

class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private musicBus: GainNode | null = null;
  private sfxBus: GainNode | null = null;
  private ambienceBus: GainNode | null = null;
  private music: MusicKey | null = null;
  private ambience: SfxKey | null = null;
  private musicTimer: number | null = null;
  private musicVoice: GainNode | null = null;
  private ambienceNodes: AudioNode[] = [];
  private ambienceTimer: number | null = null;
  private settings: AudioSettings = { musicVolume: 38, sfxVolume: 45, muted: false };
  private unlocked = false;
  private noiseBuffer: AudioBuffer | null = null;
  private step = 0;

  unlock(): void {
    if (this.unlocked) {
      void this.ctx?.resume();
      return;
    }
    try {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return;
      const ctx = new Ctor();
      this.ctx = ctx;
      this.master = ctx.createGain();
      this.master.gain.value = this.settings.muted ? 0 : 0.9;
      this.master.connect(ctx.destination);

      this.musicBus = ctx.createGain();
      this.sfxBus = ctx.createGain();
      this.ambienceBus = ctx.createGain();
      this.musicBus.connect(this.master);
      this.sfxBus.connect(this.master);
      this.ambienceBus.connect(this.master);

      this.noiseBuffer = this.makeNoise(ctx);
      this.applyVolumes();
      this.unlocked = true;
      void ctx.resume();
      if (this.music) {
        const key = this.music;
        this.music = null;
        this.setMusic(key);
      }
      if (this.ambience) {
        const key = this.ambience;
        this.ambience = null;
        this.setAmbience(key);
      }
    } catch {
      this.unlocked = false;
    }
  }

  configure(settings: AudioSettings): void {
    this.settings = { ...settings };
    if (!this.ctx) return;
    this.applyVolumes();
  }

  private applyVolumes(): void {
    if (!this.ctx || !this.master || !this.musicBus || !this.sfxBus || !this.ambienceBus) return;
    const now = this.ctx.currentTime;
    this.master.gain.setTargetAtTime(this.settings.muted ? 0 : 0.9, now, 0.2);
    const music = Math.pow(this.settings.musicVolume / 100, 1.4);
    const sfx = Math.pow(this.settings.sfxVolume / 100, 1.2);
    this.musicBus.gain.setTargetAtTime(music, now, 0.3);
    this.sfxBus.gain.setTargetAtTime(sfx, now, 0.2);
    this.ambienceBus.gain.setTargetAtTime(sfx * 0.85, now, 0.3);
  }

  setMusic(key: MusicKey): void {
    if (this.music === key) return;
    this.stopMusic();
    this.music = key;
    if (!this.unlocked || !this.ctx) return;
    this.startMusic();
  }

  setAmbience(key: SfxKey | null): void {
    if (this.ambience === key) return;
    this.stopAmbience();
    this.ambience = key;
    if (!this.unlocked || !this.ctx || !key) return;
    this.startAmbience(key);
  }

  playSfx(key: SfxKey): void {
    if (!this.unlocked || !this.ctx || !this.sfxBus || this.settings.muted) return;
    try {
      switch (key) {
        case 'thunder':
          this.thunder();
          break;
        case 'door':
          this.door();
          break;
        case 'footsteps':
          this.footsteps();
          break;
        case 'paper':
          this.noiseBurst(1400, 0.16, 0.09, 'highpass');
          break;
        case 'glass':
          this.ping(1760, 0.5, 0.06);
          break;
        case 'heart':
          this.thump(58, 0.16);
          window.setTimeout(() => this.thump(52, 0.2), 240);
          break;
        case 'click':
          this.ping(920, 0.06, 0.03);
          break;
        case 'fire':
          this.noiseBurst(420, 0.9, 0.12, 'lowpass');
          break;
        case 'musicbox':
          this.musicBox();
          break;
        case 'tape':
          this.noiseBurst(2600, 0.4, 0.035, 'highpass');
          this.ping(660, 0.1, 0.02);
          break;
        case 'clock':
        case 'rain':
          break;
        default:
          break;
      }
    } catch {
      /* audio is an enhancement, never a blocker */
    }
  }

  /* ---------------------------------------------------------------- */
  /* Music                                                            */
  /* ---------------------------------------------------------------- */
  private startMusic(): void {
    if (!this.ctx || !this.musicBus || !this.music) return;
    const ctx = this.ctx;
    const config = MUSIC[this.music];
    const voice = ctx.createGain();
    voice.gain.value = 1;
    voice.connect(this.musicBus);
    this.musicVoice = voice;
    this.step = 0;

    const play = () => {
      if (!this.ctx || !this.musicVoice) return;
      const now = this.ctx.currentTime;
      const chord = config.chords[this.step % config.chords.length];
      chord.forEach((freq, index) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = config.wave;
        osc.frequency.value = freq;
        const level = config.level / (1 + index * 0.45);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(level, now + 1.4);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + config.duration);
        osc.connect(gain);
        gain.connect(this.musicVoice!);
        osc.start(now);
        osc.stop(now + config.duration + 0.4);
      });
      if (this.step % 2 === 1) {
        const note = config.melody[Math.floor(this.step / 2) % config.melody.length];
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = note;
        gain.gain.setValueAtTime(0.0001, now + 0.6);
        gain.gain.linearRampToValueAtTime(config.level * 1.1, now + 1.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + config.duration * 0.85);
        osc.connect(gain);
        gain.connect(this.musicVoice);
        osc.start(now + 0.6);
        osc.stop(now + config.duration);
      }
      this.step += 1;
    };

    play();
    this.musicTimer = window.setInterval(play, config.duration * 1000);
  }

  private stopMusic(): void {
    if (this.musicTimer !== null) {
      window.clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
    const voice = this.musicVoice;
    this.musicVoice = null;
    if (voice && this.ctx) {
      const now = this.ctx.currentTime;
      voice.gain.setTargetAtTime(0.0001, now, 0.4);
      window.setTimeout(() => {
        try {
          voice.disconnect();
        } catch {
          /* ignore */
        }
      }, 1600);
    }
  }

  /* ---------------------------------------------------------------- */
  /* Ambience                                                         */
  /* ---------------------------------------------------------------- */
  private startAmbience(key: SfxKey): void {
    if (!this.ctx || !this.ambienceBus) return;
    if (key === 'rain' || key === 'fire') {
      const source = this.ctx.createBufferSource();
      source.buffer = this.noiseBuffer;
      source.loop = true;
      const filter = this.ctx.createBiquadFilter();
      filter.type = key === 'rain' ? 'bandpass' : 'lowpass';
      filter.frequency.value = key === 'rain' ? 1400 : 320;
      filter.Q.value = key === 'rain' ? 0.6 : 0.9;
      const gain = this.ctx.createGain();
      gain.gain.value = key === 'rain' ? 0.1 : 0.16;
      source.connect(filter);
      filter.connect(gain);
      gain.connect(this.ambienceBus);
      source.start();
      this.ambienceNodes.push(source, filter, gain);
    }
    if (key === 'clock' || key === 'rain') {
      this.ambienceTimer = window.setInterval(() => {
        if (!this.ctx || !this.ambienceBus) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = key === 'clock' ? 1250 : 900;
        gain.gain.setValueAtTime(0.012, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
        osc.connect(gain);
        gain.connect(this.ambienceBus);
        osc.start(now);
        osc.stop(now + 0.08);
      }, key === 'clock' ? 1000 : 4200);
    }
  }

  private stopAmbience(): void {
    if (this.ambienceTimer !== null) {
      window.clearInterval(this.ambienceTimer);
      this.ambienceTimer = null;
    }
    for (const node of this.ambienceNodes) {
      try {
        if ('stop' in node && typeof (node as AudioBufferSourceNode).stop === 'function') {
          (node as AudioBufferSourceNode).stop();
        }
        node.disconnect();
      } catch {
        /* ignore */
      }
    }
    this.ambienceNodes = [];
  }

  /* ---------------------------------------------------------------- */
  /* SFX primitives                                                   */
  /* ---------------------------------------------------------------- */
  private makeNoise(ctx: AudioContext): AudioBuffer {
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  private noiseBurst(
    frequency: number,
    duration: number,
    level: number,
    type: BiquadFilterType,
  ): void {
    if (!this.ctx || !this.sfxBus || !this.noiseBuffer) return;
    const now = this.ctx.currentTime;
    const source = this.ctx.createBufferSource();
    source.buffer = this.noiseBuffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = frequency;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(level, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxBus);
    source.start(now);
    source.stop(now + duration + 0.05);
  }

  private thunder(): void {
    if (!this.ctx || !this.sfxBus || !this.noiseBuffer) return;
    const now = this.ctx.currentTime;
    const source = this.ctx.createBufferSource();
    source.buffer = this.noiseBuffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, now);
    filter.frequency.exponentialRampToValueAtTime(90, now + 2);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxBus);
    source.start(now);
    source.stop(now + 2.5);
  }

  private door(): void {
    if (!this.ctx || !this.sfxBus) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(52, now + 0.9);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.07, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1);
    osc.connect(gain);
    gain.connect(this.sfxBus);
    osc.start(now);
    osc.stop(now + 1.05);
    this.noiseBurst(900, 0.5, 0.03, 'bandpass');
  }

  private footsteps(): void {
    for (let i = 0; i < 4; i += 1) {
      window.setTimeout(() => {
        this.thump(80 - i * 6, 0.08);
        this.noiseBurst(700, 0.09, 0.025, 'lowpass');
      }, i * 320);
    }
  }

  private thump(freq: number, level: number): void {
    if (!this.ctx || !this.sfxBus) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * 1.6, now);
    osc.frequency.exponentialRampToValueAtTime(freq, now + 0.15);
    gain.gain.setValueAtTime(level, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
    osc.connect(gain);
    gain.connect(this.sfxBus);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  private ping(freq: number, duration: number, level: number): void {
    if (!this.ctx || !this.sfxBus) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(level, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain);
    gain.connect(this.sfxBus);
    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  private musicBox(): void {
    const notes = [659.25, 587.33, 523.25, 493.88, 440, 392, 440, 523.25];
    notes.forEach((freq, i) => {
      window.setTimeout(() => this.ping(freq, 0.9, 0.05), i * 260);
    });
  }

  dispose(): void {
    this.stopMusic();
    this.stopAmbience();
    try {
      void this.ctx?.close();
    } catch {
      /* ignore */
    }
    this.ctx = null;
    this.unlocked = false;
  }
}

export const audio = new AudioEngine();
