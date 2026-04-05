import { useState, useRef, useCallback, useEffect } from 'react';
import { WordManager } from '../engine/WordManager';
import { PhysicsEngine } from '../engine/PhysicsEngine';
import { TypingHandler } from '../engine/TypingHandler';
import { soundManager } from '../engine/SoundManager';

const GAME_WIDTH = 600;
const GAME_HEIGHT = 500;
const CEILING_Y = 40;
const INITIAL_SPAWN_INTERVAL = 4000;
const MIN_SPAWN_INTERVAL = 800;
const SPAWN_INTERVAL_DECAY = 30;
const WORDS_PER_LEVEL = 8;
const COMPLETING_DURATION = 300;

export function useGameEngine() {
  const [gameState, setGameState] = useState('menu');
  const [words, setWords] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [input, setInput] = useState('');
  const [stats, setStats] = useState({ wpm: 0, accuracy: 100, wordsCompleted: 0, combo: 0, maxCombo: 0 });
  const [comboPopup, setComboPopup] = useState(null);
  const [dangerLevel, setDangerLevel] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [shaking, setShaking] = useState(false);

  const wordManagerRef = useRef(new WordManager());
  const physicsRef = useRef(new PhysicsEngine(GAME_HEIGHT, CEILING_Y));
  const typingRef = useRef(new TypingHandler());
  const wordsRef = useRef([]);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(0);
  const spawnTimerRef = useRef(0);
  const spawnIntervalRef = useRef(INITIAL_SPAWN_INTERVAL);
  const levelRef = useRef(1);
  const scoreRef = useRef(0);
  const gameStateRef = useRef('menu');
  const totalSpawnedRef = useRef(0);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { levelRef.current = level; }, [level]);

  const spawnWord = useCallback(() => {
    const word = wordManagerRef.current.createWord(GAME_WIDTH, levelRef.current, CEILING_Y);
    wordsRef.current = [...wordsRef.current, word];
    totalSpawnedRef.current++;

    spawnIntervalRef.current = Math.max(
      MIN_SPAWN_INTERVAL,
      spawnIntervalRef.current - SPAWN_INTERVAL_DECAY
    );

    const newLevel = Math.floor(totalSpawnedRef.current / WORDS_PER_LEVEL) + 1;
    if (newLevel > levelRef.current) {
      levelRef.current = newLevel;
      setLevel(newLevel);
      soundManager.play('levelUp');
    }
  }, []);

  const gameLoop = useCallback((timestamp) => {
    if (gameStateRef.current !== 'playing') return;

    const delta = lastTimeRef.current ? timestamp - lastTimeRef.current : 16;
    lastTimeRef.current = timestamp;

    spawnTimerRef.current += delta;
    if (spawnTimerRef.current >= spawnIntervalRef.current) {
      spawnTimerRef.current = 0;
      spawnWord();
    }

    const physics = physicsRef.current;
    let updatedWords = physics.update([...wordsRef.current], delta);

    updatedWords = updatedWords.filter(w => w.status !== 'removed');

    if (physics.checkGameOver(updatedWords)) {
      gameStateRef.current = 'gameOver';
      setGameState('gameOver');
      soundManager.play('gameOver');
      setWords(updatedWords);
      return;
    }

    const highestY = physics.getHighestStackY(updatedWords);
    const totalRange = GAME_HEIGHT - CEILING_Y;
    const danger = Math.max(0, 1 - (highestY - CEILING_Y) / totalRange);
    setDangerLevel(danger);

    wordsRef.current = updatedWords;
    setWords([...updatedWords]);
    setStats(typingRef.current.getStats());

    animFrameRef.current = requestAnimationFrame(gameLoop);
  }, [spawnWord]);

  const startGame = useCallback(() => {
    wordManagerRef.current.reset();
    typingRef.current.reset();
    wordsRef.current = [];
    spawnTimerRef.current = 0;
    spawnIntervalRef.current = INITIAL_SPAWN_INTERVAL;
    lastTimeRef.current = 0;
    totalSpawnedRef.current = 0;
    levelRef.current = 1;
    scoreRef.current = 0;

    setWords([]);
    setScore(0);
    setLevel(1);
    setInput('');
    setStats({ wpm: 0, accuracy: 100, wordsCompleted: 0, combo: 0, maxCombo: 0 });
    setComboPopup(null);
    setDangerLevel(0);

    soundManager.init();
    typingRef.current.start();

    spawnWord();

    setGameState('playing');
    gameStateRef.current = 'playing';
    animFrameRef.current = requestAnimationFrame(gameLoop);
  }, [gameLoop, spawnWord]);

  const pauseGame = useCallback(() => {
    if (gameState === 'playing') {
      setGameState('paused');
      gameStateRef.current = 'paused';
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    } else if (gameState === 'paused') {
      setGameState('playing');
      gameStateRef.current = 'playing';
      lastTimeRef.current = 0;
      animFrameRef.current = requestAnimationFrame(gameLoop);
    }
  }, [gameState, gameLoop]);

  const handleInput = useCallback((value) => {
    setInput(value);

    if (gameStateRef.current !== 'playing') return;

    const typing = typingRef.current;
    const result = typing.processInput(value, wordsRef.current);

    if (result.completed) {
      const word = result.completed;
      const comboCount = typing.combo;

      const baseScore = 10;
      const lengthBonus = word.value.length * 2;
      const comboMultiplier = Math.min(comboCount, 10);
      const points = (baseScore + lengthBonus) * (1 + comboMultiplier * 0.2);
      scoreRef.current += Math.round(points);
      setScore(scoreRef.current);

      if (comboCount >= 3) {
        soundManager.play('combo');
      } else {
        soundManager.play('complete');
      }

      if (comboCount >= 2) {
        setComboPopup({
          id: Date.now(),
          count: comboCount,
          x: word.x,
          y: word.y,
        });
      }

      setTimeout(() => {
        wordsRef.current = wordsRef.current.filter(w => w.id !== word.id);
      }, COMPLETING_DURATION);

      spawnWord();

      setInput('');
    } else if (value.length > 0) {
      const hasPartialMatch = wordsRef.current.some(
        w => (w.status === 'active' || w.status === 'stacked') &&
             w.value.toLowerCase().startsWith(value.toLowerCase())
      );
      typing.trackKeypress(hasPartialMatch);
    }

    wordsRef.current = [...result.words];
    setWords([...wordsRef.current]);
  }, [spawnWord]);

  const toggleSound = useCallback(() => {
    soundManager.init();
    const enabled = soundManager.toggle();
    setSoundEnabled(enabled);
  }, []);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && (gameStateRef.current === 'playing' || gameStateRef.current === 'paused')) {
        pauseGame();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pauseGame]);

  return {
    gameState,
    words,
    score,
    level,
    input,
    stats,
    comboPopup,
    dangerLevel,
    soundEnabled,
    shaking,
    startGame,
    pauseGame,
    handleInput,
    toggleSound,
    gameWidth: GAME_WIDTH,
    gameHeight: GAME_HEIGHT,
    ceilingY: CEILING_Y,
  };
}
