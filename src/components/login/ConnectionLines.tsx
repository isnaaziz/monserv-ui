interface ConnectionLinesProps {
  mousePosition: { x: number; y: number };
}

export function ConnectionLines({ mousePosition }: ConnectionLinesProps) {
  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30" 
      style={{ transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)` }}
    >
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
          <stop offset="50%" stopColor="#10b981" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="10%" y1="20%" x2="75%" y2="15%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="5,5">
        <animate attributeName="stroke-dashoffset" values="0;-100" dur="10s" repeatCount="indefinite" />
      </line>
      <line x1="75%" y1="15%" x2="85%" y2="45%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="5,5">
        <animate attributeName="stroke-dashoffset" values="0;-100" dur="8s" repeatCount="indefinite" />
      </line>
      <line x1="5%" y1="60%" x2="60%" y2="70%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="5,5">
        <animate attributeName="stroke-dashoffset" values="0;-100" dur="12s" repeatCount="indefinite" />
      </line>
      <line x1="25%" y1="80%" x2="60%" y2="70%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="5,5">
        <animate attributeName="stroke-dashoffset" values="0;-100" dur="9s" repeatCount="indefinite" />
      </line>
    </svg>
  );
}
