export default function TrustStrip() {
  const items = [
    'Google Local Guide · L7',
    'BBB A+ Accredited',
    'Colorado Only',
  ];
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[12px] uppercase"
      style={{
        color: 'var(--color-on-dark-soft)',
        letterSpacing: '0.16em',
      }}
    >
      {items.map((label, i) => (
        <span key={label} className="flex items-center gap-7">
          <span>{label}</span>
          {i < items.length - 1 && (
            <span style={{ color: 'var(--color-line-strong)' }}>·</span>
          )}
        </span>
      ))}
    </div>
  );
}
