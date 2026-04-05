export function GameOverScreen({ score, stats, level, onRestart }) {
  return (
    <div className="flex flex-col items-center justify-center h-full fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-5xl font-extrabold text-red-400 mb-2">GAME OVER</h2>
        <p className="text-slate-400">The stack reached the ceiling!</p>
      </div>

      <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 mb-8 min-w-[320px]">
        <div className="grid grid-cols-2 gap-4">
          <StatItem label="Final Score" value={score.toLocaleString()} color="text-white" large />
          <StatItem label="Level Reached" value={level} color="text-sky-400" large />
          <StatItem label="Words Typed" value={stats.wordsCompleted} color="text-emerald-400" />
          <StatItem label="WPM" value={stats.wpm} color="text-amber-400" />
          <StatItem label="Accuracy" value={`${stats.accuracy}%`} color="text-fuchsia-400" />
          <StatItem label="Max Combo" value={`${stats.maxCombo}x`} color="text-orange-400" />
        </div>
      </div>

      <PerformanceBadge wpm={stats.wpm} accuracy={stats.accuracy} />

      <button
        onClick={onRestart}
        className="
          mt-6 px-16 py-5 rounded-xl font-bold text-xl min-w-[240px] min-h-[60px]
          bg-sky-500 hover:bg-sky-400 text-white
          shadow-lg shadow-sky-500/25 hover:shadow-sky-400/40
          transition-all duration-200 hover:scale-105 active:scale-95
        "
      >
        Play Again
      </button>
    </div>
  );
}

function StatItem({ label, value, color, large }) {
  return (
    <div className="text-center py-2">
      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">{label}</div>
      <div className={`${large ? 'text-2xl' : 'text-xl'} font-bold font-mono ${color}`}>{value}</div>
    </div>
  );
}

function PerformanceBadge({ wpm, accuracy }) {
  let badge, color;
  if (wpm >= 60 && accuracy >= 95) {
    badge = 'LEGENDARY';
    color = 'text-amber-400 border-amber-400/30 bg-amber-400/5';
  } else if (wpm >= 40 && accuracy >= 90) {
    badge = 'EXCELLENT';
    color = 'text-fuchsia-400 border-fuchsia-400/30 bg-fuchsia-400/5';
  } else if (wpm >= 25 && accuracy >= 80) {
    badge = 'GREAT';
    color = 'text-sky-400 border-sky-400/30 bg-sky-400/5';
  } else if (wpm >= 15) {
    badge = 'GOOD';
    color = 'text-emerald-400 border-emerald-400/30 bg-emerald-400/5';
  } else {
    badge = 'KEEP PRACTICING';
    color = 'text-slate-400 border-slate-400/30 bg-slate-400/5';
  }

  return (
    <div className={`px-4 py-2 rounded-lg border font-bold text-sm tracking-wider ${color}`}>
      {badge}
    </div>
  );
}
