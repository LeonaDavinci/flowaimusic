const HEIGHTS = [
  22, 38, 55, 30, 68, 44, 80, 52, 34, 62, 90, 48, 28, 72, 58, 40, 84, 36,
  66, 46, 94, 54, 26, 70, 42, 60, 88, 32, 50, 76, 44, 64, 38, 82, 56, 30,
  48, 68, 40, 58,
];

export function Waveform({ bars = 40 }: { bars?: number }) {
  return (
    <div className="waveform" aria-hidden="true">
      {HEIGHTS.slice(0, bars).map((h, i) => (
        <span
          key={i}
          className="wave-bar"
          style={{
            height: `${h}%`,
            animationDelay: `${(i % 9) * 0.11}s`,
          }}
        />
      ))}
    </div>
  );
}
