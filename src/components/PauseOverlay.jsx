export function PauseOverlay({ onResume }) {
  return (
    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-30 rounded-xl">
      <div className="text-center fade-in-up">
        <div className="text-4xl font-bold text-white mb-2">PAUSED</div>
        <p className="text-slate-400 mb-6">Press ESC or click to resume</p>
        <button
          onClick={onResume}
          className="
            px-16 py-5 rounded-xl font-bold text-xl min-w-[240px] min-h-[60px]
            bg-sky-500 hover:bg-sky-400 text-white
            transition-all duration-200 hover:scale-105 active:scale-95
          "
        >
          Resume
        </button>
      </div>
    </div>
  );
}
