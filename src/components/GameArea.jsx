import { Word } from './Word';
import { ComboPopup } from './ComboPopup';

export function GameArea({ words, ceilingY, gameWidth, gameHeight, dangerLevel, comboPopup }) {
  const dangerColor = dangerLevel > 0.7
    ? 'rgba(239, 68, 68, 0.8)'
    : dangerLevel > 0.4
      ? 'rgba(251, 191, 36, 0.5)'
      : 'rgba(239, 68, 68, 0.3)';

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-sm"
      style={{ width: gameWidth, height: gameHeight }}
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div
        className={`absolute left-0 right-0 h-[2px] z-10 ${dangerLevel > 0.6 ? 'ceiling-warning' : ''}`}
        style={{
          top: ceilingY,
          background: dangerColor,
          boxShadow: `0 0 10px ${dangerColor}, 0 0 20px ${dangerColor}`,
        }}
      />

      <div
        className="absolute left-2 text-[10px] font-mono tracking-wider z-10"
        style={{
          top: ceilingY - 16,
          color: dangerColor,
        }}
      >
        ▼ CEILING ▼
      </div>

      {dangerLevel > 0.4 && (
        <div
          className="absolute inset-x-0 top-0 pointer-events-none z-5 transition-opacity duration-300"
          style={{
            height: '80px',
            background: `linear-gradient(to bottom, rgba(239, 68, 68, ${dangerLevel * 0.3}), transparent)`,
            opacity: dangerLevel > 0.4 ? 1 : 0,
          }}
        />
      )}

      {words.map(word => (
        <Word key={word.id} word={word} />
      ))}

      {comboPopup && (
        <ComboPopup key={comboPopup.id} combo={comboPopup} />
      )}

      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-slate-600/30"
      />
    </div>
  );
}
