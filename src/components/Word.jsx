export function Word({ word }) {
  const isCompleting = word.status === 'completing';
  const isStacked = word.status === 'stacked';
  const hasMatch = word.matchedChars > 0 && !isCompleting;

  const baseClasses = `
    absolute px-3 py-1.5 rounded-md font-mono text-sm font-semibold
    select-none whitespace-nowrap transition-colors duration-100
  `;

  const statusClasses = isCompleting
    ? 'word-completing'
    : isStacked
      ? 'border border-slate-600/50'
      : '';

  const bgColor = isCompleting
    ? 'bg-emerald-500/30'
    : isStacked
      ? 'bg-slate-800/90'
      : 'bg-sky-500/10 border border-sky-500/30';

  return (
    <div
      className={`${baseClasses} ${statusClasses} ${bgColor}`}
      style={{
        left: word.x,
        top: word.y,
        transform: isCompleting ? undefined : `translateZ(0)`,
        willChange: 'top',
      }}
    >
      {hasMatch ? (
        <>
          <span className="text-emerald-400">
            {word.value.slice(0, word.matchedChars)}
          </span>
          <span className={isStacked ? 'text-slate-400' : 'text-sky-300'}>
            {word.value.slice(word.matchedChars)}
          </span>
        </>
      ) : (
        <span className={
          isStacked ? 'text-slate-400' :
          'text-sky-300'
        }>
          {word.value}
        </span>
      )}
    </div>
  );
}
