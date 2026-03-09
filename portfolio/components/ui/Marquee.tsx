interface MarqueeProps {
  items: string[];
  separator?: string;
  speed?: number;
}

export default function Marquee({ items, separator = '·', speed = 30 }: MarqueeProps) {
  const text = items.join(` ${separator} `) + ` ${separator} `;

  return (
    <div className="overflow-hidden bg-primary py-3">
      <div
        className="marquee-inner flex whitespace-nowrap font-mono text-sm text-white/70 uppercase tracking-widest"
        style={{ animationDuration: `${speed}s` }}
      >
        <span>{text}</span>
        <span aria-hidden>{text}</span>
      </div>
    </div>
  );
}
