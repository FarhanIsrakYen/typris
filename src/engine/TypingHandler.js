export class TypingHandler {
  constructor() {
    this.totalTyped = 0;
    this.correctChars = 0;
    this.totalChars = 0;
    this.wordsCompleted = 0;
    this.startTime = null;
    this.combo = 0;
    this.maxCombo = 0;
  }

  start() {
    this.startTime = Date.now();
  }

  processInput(input, words) {
    if (!input) {
      for (const word of words) {
        if (word.status !== 'completing') {
          word.matchedChars = 0;
        }
      }
      return { completed: null, words };
    }

    const lowInput = input.toLowerCase();
    let bestMatch = null;
    let bestMatchChars = 0;

    const typeableWords = words.filter(
      w => w.status === 'active' || w.status === 'stacked'
    );

    for (const word of typeableWords) {
      const wordLower = word.value.toLowerCase();
      if (wordLower.startsWith(lowInput)) {
        word.matchedChars = lowInput.length;
        if (lowInput.length > bestMatchChars) {
          bestMatch = word;
          bestMatchChars = lowInput.length;
        }
      } else if (lowInput.startsWith(wordLower) || !wordLower.startsWith(lowInput)) {
        if (!wordLower.startsWith(lowInput)) {
          word.matchedChars = 0;
        }
      }
    }

    for (const word of typeableWords) {
      if (word.value.toLowerCase() === lowInput) {
        word.status = 'completing';
        this.wordsCompleted++;
        this.combo++;
        if (this.combo > this.maxCombo) this.maxCombo = this.combo;

        return { completed: word, words };
      }
    }

    return { completed: null, words };
  }

  registerMistake() {
    this.combo = 0;
  }

  trackKeypress(correct) {
    this.totalChars++;
    if (correct) this.correctChars++;
  }

  getWPM() {
    if (!this.startTime || this.wordsCompleted === 0) return 0;
    const minutes = (Date.now() - this.startTime) / 60000;
    if (minutes < 0.01) return 0;
    return Math.round(this.wordsCompleted / minutes);
  }

  getAccuracy() {
    if (this.totalChars === 0) return 100;
    return Math.min(100, Math.round((this.correctChars / this.totalChars) * 100));
  }

  getStats() {
    return {
      wpm: this.getWPM(),
      accuracy: this.getAccuracy(),
      wordsCompleted: this.wordsCompleted,
      combo: this.combo,
      maxCombo: this.maxCombo,
    };
  }

  reset() {
    this.totalTyped = 0;
    this.correctChars = 0;
    this.totalChars = 0;
    this.wordsCompleted = 0;
    this.startTime = null;
    this.combo = 0;
    this.maxCombo = 0;
  }
}
