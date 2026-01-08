export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite',
        }}
      />
      <div 
        className="absolute w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl"
        style={{ 
          top: '10%', 
          left: '20%',
          animation: 'floatOrb 15s ease-in-out infinite',
        }}
      />
      <div 
        className="absolute w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl"
        style={{ 
          bottom: '10%', 
          right: '10%',
          animation: 'floatOrb 12s ease-in-out infinite reverse',
        }}
      />
      <div 
        className="absolute w-64 h-64 rounded-full bg-teal-500/5 blur-3xl"
        style={{ 
          top: '50%', 
          left: '60%',
          animation: 'floatOrb 18s ease-in-out infinite 2s',
        }}
      />
    </div>
  );
}

export function ScanLine() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      style={{ opacity: 0.03 }}
    >
      <div 
        className="absolute w-full h-32 bg-emerald-500/50"
        style={{ 
          animation: 'scanLine 8s linear infinite',
          filter: 'blur(40px)',
        }}
      />
    </div>
  );
}
