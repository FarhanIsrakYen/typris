import { getWordsForLevel } from '../data/words';

const RECENT_BUFFER_SIZE = 20;

export class WordManager {
  constructor() {
    this.recentWords = [];
    this.nextId = 0;
  }

  getRandomWord(level) {
    const pool = getWordsForLevel(level);
    const available = pool.filter(w => !this.recentWords.includes(w));
    const source = available.length > 0 ? available : pool;
    const word = source[Math.floor(Math.random() * source.length)];

    this.recentWords.push(word);
    if (this.recentWords.length > RECENT_BUFFER_SIZE) {
      this.recentWords.shift();
    }

    return word;
  }

  createWord(gameWidth, level, ceilingY) {
    const value = this.getRandomWord(level);
    const wordPixelWidth = value.length * 12 + 24;
    const margin = 10;
    const minX = margin;
    const maxX = gameWidth - wordPixelWidth - margin;
    const x = minX + Math.random() * (maxX - minX);

    return {
      id: this.nextId++,
      value,
      x,
      y: ceilingY,
      speed: this._getSpeed(level),
      status: 'active',
      matchedChars: 0,
      height: 36,
    };
  }

  _getSpeed(level) {
    const base = 0.4 + level * 0.08;
    return base + Math.random() * 0.15;
  }

  reset() {
    this.recentWords = [];
    this.nextId = 0;
  }
}
