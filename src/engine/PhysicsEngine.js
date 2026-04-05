export class PhysicsEngine {
  constructor(gameHeight, ceilingY) {
    this.gameHeight = gameHeight;
    this.ceilingY = ceilingY;
    this.floorY = gameHeight;
  }

  update(words, deltaTime) {
    const activeWords = words.filter(w => w.status === 'active');
    const stackedWords = words.filter(w => w.status === 'stacked');

    for (const word of activeWords) {
      word.y += word.speed * deltaTime * 0.06;

      const landingY = this._findLandingY(word, stackedWords);

      if (word.y + word.height >= landingY) {
        word.y = landingY - word.height;
        word.status = 'stacked';
        word.speed = 0;
      }
    }

    return words;
  }

  _findLandingY(fallingWord, stackedWords) {
    let landingY = this.floorY;

    for (const stacked of stackedWords) {
      const fallingRight = fallingWord.x + this._getWordWidth(fallingWord);
      const stackedRight = stacked.x + this._getWordWidth(stacked);

      const overlapsX =
        fallingWord.x < stackedRight && fallingRight > stacked.x;

      if (overlapsX && stacked.y < landingY) {
        landingY = stacked.y;
      }
    }

    return landingY;
  }

  _getWordWidth(word) {
    return word.value.length * 12 + 24;
  }

  checkGameOver(words) {
    const stackedWords = words.filter(w => w.status === 'stacked');
    for (const word of stackedWords) {
      if (word.y <= this.ceilingY + 5) {
        return true;
      }
    }
    return false;
  }

  getHighestStackY(words) {
    const stackedWords = words.filter(w => w.status === 'stacked');
    if (stackedWords.length === 0) return this.floorY;
    return Math.min(...stackedWords.map(w => w.y));
  }
}
