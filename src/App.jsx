import { useEffect } from 'react';
import { useGameEngine } from './hooks/useGameEngine';
import { GameArea } from './components/GameArea';
import { HUD } from './components/HUD';
import { InputArea } from './components/InputArea';
import { MenuScreen } from './components/MenuScreen';
import { PauseOverlay } from './components/PauseOverlay';
import { GameOverScreen } from './components/GameOverScreen';

function App() {
  const {
    gameState,
    words,
    score,
    level,
    input,
    stats,
    comboPopup,
    dangerLevel,
    soundEnabled,
    startGame,
    pauseGame,
    handleInput,
    toggleSound,
    gameWidth,
    gameHeight,
    ceilingY,
  } = useGameEngine();

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Enter' && (gameState === 'menu' || gameState === 'gameOver')) {
        startGame();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameState, startGame]);

  return (
    <div className="h-screen flex items-center justify-center bg-[#0a0e1a] p-4">
      <div className="flex flex-col items-center" style={{ width: gameWidth }}>
        {gameState === 'menu' && (
          <div style={{ width: gameWidth, height: gameHeight + 120 }}>
            <MenuScreen onStart={startGame} />
          </div>
        )}

        {gameState === 'gameOver' && (
          <div style={{ width: gameWidth, height: gameHeight + 120 }}>
            <GameOverScreen
              score={score}
              stats={stats}
              level={level}
              onRestart={startGame}
            />
          </div>
        )}

        {(gameState === 'playing' || gameState === 'paused') && (
          <>
            <HUD
              score={score}
              level={level}
              stats={stats}
              soundEnabled={soundEnabled}
              onToggleSound={toggleSound}
              onPause={pauseGame}
            />

            <div className="relative">
              <GameArea
                words={words}
                ceilingY={ceilingY}
                gameWidth={gameWidth}
                gameHeight={gameHeight}
                dangerLevel={dangerLevel}
                comboPopup={comboPopup}
              />
              {gameState === 'paused' && (
                <PauseOverlay onResume={pauseGame} />
              )}
            </div>

            <InputArea
              value={input}
              onChange={handleInput}
              disabled={gameState === 'paused'}
            />

            <div className="mt-2 flex justify-between w-full text-xs text-slate-600 font-mono">
              <span>Words: {stats.wordsCompleted}</span>
              <span>Max Combo: {stats.maxCombo}x</span>
              <span>ESC to pause</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
