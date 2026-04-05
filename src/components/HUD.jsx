export function HUD({ score, level, stats, soundEnabled, onToggleSound, onPause }) {
  return (
    <div className="flex items-center justify-between w-full mb-3">
      <div className="flex gap-4 items-center">
        <div className="bg-slate-800/80 rounded-lg px-4 py-2 border border-slate-700/50">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Score</div>
          <div className="text-xl font-bold text-white text-center font-mono">{score.toLocaleString()}</div>
        </div>
        <div className="bg-slate-800/80 rounded-lg px-4 py-2 border border-slate-700/50">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Level</div>
          <div className="text-xl font-bold text-sky-400 text-center font-mono">{level}</div>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <StatBadge label="WPM" value={stats.wpm} color="text-emerald-400" />
        <StatBadge label="Accuracy" value={`${stats.accuracy}%`} color="text-amber-400" />
        {stats.combo >= 2 && (
          <StatBadge label="Combo" value={`${stats.combo}x`} color="text-fuchsia-400" pulse />
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={onToggleSound}
          className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/50 hover:bg-slate-700/80 transition-colors text-slate-400 hover:text-white"
          title={soundEnabled ? 'Mute' : 'Unmute'}
        >
          {soundEnabled ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M11 5L6 9H2v6h4l5 4V5z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          )}
        </button>
        <button
          onClick={onPause}
          className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/50 hover:bg-slate-700/80 transition-colors text-slate-400 hover:text-white"
          title="Pause (Esc)"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function StatBadge({ label, value, color, pulse }) {
  return (
    <div className={`text-center ${pulse ? 'animate-pulse' : ''}`}>
      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{label}</div>
      <div className={`text-base font-bold font-mono ${color}`}>{value}</div>
    </div>
  );
}
