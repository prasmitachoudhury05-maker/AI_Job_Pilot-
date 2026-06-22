'use client';

export default function LiveBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-black print:hidden">
      {/* Marquee Text */}
      <div className="absolute inset-0 flex flex-col justify-between opacity-5 py-20 pointer-events-none transform -rotate-12 scale-150">
        <div className="flex whitespace-nowrap animate-marquee font-black text-[20vw] leading-none text-amber-50 uppercase tracking-tighter">
          JOBPILOT ENGINE /// JOBPILOT ENGINE /// JOBPILOT ENGINE ///
        </div>
        <div className="flex whitespace-nowrap animate-marquee font-black text-[20vw] leading-none text-amber-50 uppercase tracking-tighter" style={{ animationDirection: 'reverse' }}>
          DOMINATE /// THE /// SEARCH /// DOMINATE /// THE /// SEARCH ///
        </div>
      </div>

      {/* Grid / Diagonal Stripes */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #ff0000 10px, #ff0000 12px)',
        }}
      ></div>
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
    </div>
  );
}
