// Hindi Varnamala Quest - Audio & Speech Synthesizer Engine
// Uses Web Speech API (hi-IN) + Web Audio API procedural musical chimes

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.hindiVoice = null;
    this.initVoices();
  }

   ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  initVoices() {
    if (!('speechSynthesis' in window)) return;
    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || !voices.length) return;
      // Prefer Lekha / Google हिन्दी / Microsoft Swara / any hi-IN voice
      this.hindiVoice =
        voices.find(v => v.lang === 'hi-IN' && (v.name.includes('Lekha') || v.name.includes('Google') || v.name.includes('Swara'))) ||
        voices.find(v => v.lang && v.lang.toLowerCase().startsWith('hi')) ||
        voices.find(v => v.lang === 'en-IN') ||
        null;
    };
    pickVoice();
    window.speechSynthesis.onvoiceschanged = pickVoice;
  }

  speakHindi(text, fallbackRoman = '', rate = 0.82) {
    this.ensureContext();
    this.playClick(520);
    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      if (this.hindiVoice && this.hindiVoice.lang.toLowerCase().startsWith('hi')) {
        utter.voice = this.hindiVoice;
        utter.lang = 'hi-IN';
      } else {
        utter.lang = 'hi-IN';
        if (!this.hindiVoice && fallbackRoman) {
          utter.text = fallbackRoman;
        }
      }
      utter.rate = rate;
      utter.pitch = 1.08; // Cheerful, clear pitch for kids
      window.speechSynthesis.speak(utter);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }

  speakLetterAndWord(letterObj) {
    if (!letterObj) return;
    const cleanWord = letterObj.wordHindi.split('/')[0].replace(/\(.*\)/, '').trim();
    const phrase = `${letterObj.ttsText || letterObj.letter} ... ${letterObj.letter} से ${cleanWord}`;
    this.speakHindi(phrase, `${letterObj.roman}, for ${letterObj.wordRoman}`, 0.8);
  }

  playTone(freq, type = 'sine', duration = 0.15, startTimeOffset = 0, gainVal = 0.18) {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime + startTimeOffset;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(gainVal, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  playClick(freq = 600) {
    this.playTone(freq, 'triangle', 0.08, 0, 0.12);
  }

  playSparkle() {
    const notes = [587.33, 783.99, 987.77, 1174.66, 1567.98];
    const pick = notes[Math.floor(Math.random() * notes.length)];
    this.playTone(pick, 'sine', 0.18, 0, 0.08);
  }

  playCorrect() {
    // Cheerful C-E-G-C arpeggio
    this.playTone(523.25, 'triangle', 0.14, 0, 0.2);
    this.playTone(659.25, 'triangle', 0.14, 0.09, 0.2);
    this.playTone(783.99, 'triangle', 0.18, 0.18, 0.22);
    this.playTone(1046.50, 'sine', 0.35, 0.27, 0.25);
  }

  playWrong() {
    // Gentle cartoon boing
    this.playTone(300, 'sine', 0.15, 0, 0.16);
    this.playTone(220, 'triangle', 0.25, 0.12, 0.16);
  }

  playFanfare() {
    const melody = [
      { f: 523.25, t: 0, d: 0.15 },
      { f: 659.25, t: 0.13, d: 0.15 },
      { f: 783.99, t: 0.26, d: 0.15 },
      { f: 1046.50, t: 0.40, d: 0.22 },
      { f: 783.99, t: 0.62, d: 0.14 },
      { f: 1046.50, t: 0.76, d: 0.45 }
    ];
    melody.forEach(n => this.playTone(n.f, 'triangle', n.d, n.t, 0.22));
  }

  playDragonPuff() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    // Synthesize a friendly breeze/puff sound using white noise + bandpass filter
    const bufferSize = this.ctx.sampleRate * 0.35;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.35);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
  }
}

window.soundFX = new SoundEngine();
