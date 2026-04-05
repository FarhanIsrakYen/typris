export function MenuScreen({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center h-full fade-in-up">
      <div className="mb-8 text-center">
        <h1 className="text-6xl font-extrabold tracking-tight mb-2">
          <span className="text-sky-400">TYP</span>
          <span className="text-white">RIS</span>
        </h1>
        <p className="text-slate-400 text-lg">A Tetris-style typing speed game</p>
      </div>

      <div className="m-2 bg-slate-800/50 rounded-xl border border-slate-700/50 p-8 mb-8 max-w-md w-full">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 text-center">How to Play</h2>
        <div className="space-y-3 text-sm text-slate-400">
          <div className="flex gap-3 items-start">
            <span className="text-sky-400 font-bold mt-0.5">1</span>
            <span>Words fall from the top of the screen</span>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-sky-400 font-bold mt-0.5">2</span>
            <span>Type each word to clear it before it stacks up</span>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-sky-400 font-bold mt-0.5">3</span>
            <span>Words stack like Tetris blocks at the bottom</span>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-red-400 font-bold mt-0.5">!</span>
            <span>Game over when the stack reaches the <strong className="text-red-400">ceiling</strong></span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-700/50 flex flex-wrap gap-3 text-xs text-slate-500">
          <kbd className="px-2 py-1 bg-slate-700/50 rounded text-slate-400">ESC</kbd>
          <span className="self-center">Pause</span>
          <span className="text-slate-600 self-center">·</span>
          <span className="self-center">Chain words for combo multipliers</span>
        </div>
      </div>

      <button
        onClick={onStart}
        className="
          px-16 py-5 rounded-xl font-bold text-xl min-w-[240px] min-h-[60px]
          bg-sky-500 hover:bg-sky-400 text-white
          shadow-lg shadow-sky-500/25 hover:shadow-sky-400/40
          transition-all duration-200 hover:scale-105 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900
        "
      >
        Start Game
      </button>

      <p className="mt-4 text-xs text-slate-600">Press Enter or click to start</p>
    </div>
  );
}
