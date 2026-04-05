class SoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.volume = 0.3;
  }

  init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch {
      this.enabled = false;
    }
  }

  play(type) {
    if (!this.enabled || !this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    switch (type) {
      case 'type': this._playType(); break;
      case 'complete': this._playComplete(); break;
      case 'combo': this._playCombo(); break;
      case 'stack': this._playStack(); break;
      case 'gameOver': this._playGameOver(); break;
      case 'levelUp': this._playLevelUp(); break;
    }
  }

  _playType() {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.frequency.value = 600 + Math.random() * 200;
    osc.type = 'sine';
    gain.gain.value = this.volume * 0.15;
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  _playComplete() {
    const now = this.ctx.currentTime;
    [523, 659, 784].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.value = this.volume * 0.2;
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15 + i * 0.05);
      osc.start(now + i * 0.05);
      osc.stop(now + 0.15 + i * 0.05);
    });
  }

  _playCombo() {
    const now = this.ctx.currentTime;
    [659, 784, 988, 1047].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'triangle';
      gain.gain.value = this.volume * 0.25;
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2 + i * 0.04);
      osc.start(now + i * 0.04);
      osc.stop(now + 0.2 + i * 0.04);
    });
  }

  _playStack() {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.frequency.value = 150;
    osc.type = 'square';
    gain.gain.value = this.volume * 0.15;
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  _playGameOver() {
    const now = this.ctx.currentTime;
    [440, 370, 311, 261].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sawtooth';
      gain.gain.value = this.volume * 0.2;
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4 + i * 0.15);
      osc.start(now + i * 0.15);
      osc.stop(now + 0.4 + i * 0.15);
    });
  }

  _playLevelUp() {
    const now = this.ctx.currentTime;
    [523, 659, 784, 1047].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.value = this.volume * 0.25;
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3 + i * 0.06);
      osc.start(now + i * 0.06);
      osc.stop(now + 0.3 + i * 0.06);
    });
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

export const soundManager = new SoundManager();
