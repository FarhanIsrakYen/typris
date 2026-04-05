import { useRef, useEffect } from 'react';

export function InputArea({ value, onChange, disabled }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleBlur = () => {
    if (!disabled) {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  };

  return (
    <div className="mt-3 w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={disabled ? 'Game paused...' : 'Type the falling words...'}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          className="
            w-full pl-12 pr-4 py-3.5 rounded-xl
            bg-slate-800/90 border border-slate-600/50
            text-white text-lg font-mono tracking-wide
            placeholder:text-slate-600
            focus:outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
          "
        />
        {value && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 text-xs font-mono">
            {value.length} chars
          </div>
        )}
      </div>
    </div>
  );
}
