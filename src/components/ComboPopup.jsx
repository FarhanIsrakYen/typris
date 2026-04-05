export function ComboPopup({ combo }) {
  const colors = [
    'text-yellow-400',
    'text-orange-400',
    'text-red-400',
    'text-fuchsia-400',
    'text-violet-400',
  ];
  const colorIdx = Math.min(Math.floor((combo.count - 2) / 2), colors.length - 1);

  return (
    <div
      className={`combo-popup absolute font-bold text-lg z-20 ${colors[colorIdx]}`}
      style={{
        left: combo.x,
        top: combo.y - 10,
        textShadow: '0 0 10px currentColor',
      }}
    >
      {combo.count}x COMBO!
    </div>
  );
}
