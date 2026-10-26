const LETTERS = ["L", "E", "G", "B", "A", "H"];

const Logo = ({ className = "h-8" }: { className?: string }) => (
  <svg
    viewBox="0 0 290 64"
    role="img"
    aria-label="LEGBAH"
    className={`w-auto select-none ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    {LETTERS.map((l, i) => (
      <text
        key={i}
        x={24 + i * 48}
        y="46"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="48"
        fontWeight="700"
        fill="currentColor"
      >
        {l}
      </text>
    ))}
    <path d="M204 62 L216 52 L228 62 Z" fill="#8B5A2B" />
  </svg>
);

export default Logo;
