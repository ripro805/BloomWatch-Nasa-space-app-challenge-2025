import React, { useState } from 'react';

interface DummyMapProps {
  selectedLocation: {
    country: string;
    region: string;
    lat: number;
    lng: number;
    zone: string;
    percentage: number;
  } | null;
}

export default function DummyMap({ selectedLocation }: DummyMapProps) {
  const [isHovering, setIsHovering] = useState(false);

  // Get color based on zone with vibrant colors
  const getZoneColor = (zone: string) => {
    switch (zone) {
      case 'healthy': return '#10b981'; // Bright green
      case 'at-risk': return '#f59e0b'; // Golden yellow  
      case 'critical': return '#ef4444'; // Vivid red
      default: return '#6b7280'; // Gray
    }
  };

  // Get glow color for zone
  const getGlowColor = (zone: string) => {
    switch (zone) {
      case 'healthy': return 'rgba(16, 185, 129, 0.4)';
      case 'at-risk': return 'rgba(245, 158, 11, 0.4)';
      case 'critical': return 'rgba(239, 68, 68, 0.4)';
      default: return 'rgba(107, 114, 128, 0.4)';
    }
  };

  // Calculate position based on lat/lng (simplified projection)
  const getMarkerPosition = (lat: number, lng: number) => {
    // Simple conversion: lat/lng to percentage position
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x, y };
  };

  const markerPosition = selectedLocation 
    ? getMarkerPosition(selectedLocation.lat, selectedLocation.lng)
    : null;

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-2xl overflow-hidden shadow-lg border border-border/30">
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Modern Vector World Map */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 500"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Professional flat design gradients and filters */}
        <defs>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(200, 70%, 85%)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="hsl(180, 60%, 80%)" stopOpacity="0.1" />
          </linearGradient>
          
          {/* Smooth glow filter for selected region */}
          <filter id="regionGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Marker glow filter */}
          <filter id="markerGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Asia - smooth vector paths */}
        <path 
          d="M 550 120 Q 620 100, 720 140 Q 780 170, 820 220 Q 850 280, 800 330 Q 740 370, 670 360 Q 600 350, 570 310 Q 540 260, 540 200 Q 540 150, 550 120 Z" 
          fill="url(#mapGradient)" 
          stroke="hsl(200, 40%, 60%)" 
          strokeWidth="2" 
          opacity="0.8"
          className={selectedLocation?.country === 'bangladesh' || selectedLocation?.country === 'india' || selectedLocation?.country === 'china' ? 'transition-all duration-500' : 'transition-all duration-300'}
          style={selectedLocation?.country === 'bangladesh' || selectedLocation?.country === 'india' || selectedLocation?.country === 'china' ? { filter: 'url(#regionGlow)', fill: getGlowColor(selectedLocation.zone), opacity: 0.6 } : {}}
        />
        
        {/* Europe */}
        <path 
          d="M 460 100 Q 510 85, 550 100 Q 580 120, 570 150 Q 550 180, 510 175 Q 470 165, 460 135 Z" 
          fill="url(#mapGradient)" 
          stroke="hsl(200, 40%, 60%)" 
          strokeWidth="2" 
          opacity="0.8"
          className={selectedLocation?.country === 'germany' || selectedLocation?.country === 'france' || selectedLocation?.country === 'uk' ? 'transition-all duration-500' : 'transition-all duration-300'}
          style={selectedLocation?.country === 'germany' || selectedLocation?.country === 'france' || selectedLocation?.country === 'uk' ? { filter: 'url(#regionGlow)', fill: getGlowColor(selectedLocation.zone), opacity: 0.6 } : {}}
        />
        
        {/* Africa */}
        <path 
          d="M 460 190 Q 510 175, 550 200 Q 580 240, 570 310 Q 540 370, 480 390 Q 440 385, 420 340 Q 400 270, 425 220 Z" 
          fill="url(#mapGradient)" 
          stroke="hsl(200, 40%, 60%)" 
          strokeWidth="2" 
          opacity="0.8"
          className={selectedLocation?.country === 'kenya' || selectedLocation?.country === 'south-africa' || selectedLocation?.country === 'nigeria' ? 'transition-all duration-500' : 'transition-all duration-300'}
          style={selectedLocation?.country === 'kenya' || selectedLocation?.country === 'south-africa' || selectedLocation?.country === 'nigeria' ? { filter: 'url(#regionGlow)', fill: getGlowColor(selectedLocation.zone), opacity: 0.6 } : {}}
        />
        
        {/* North America */}
        <path 
          d="M 180 100 Q 240 75, 310 90 Q 380 110, 405 160 Q 420 210, 390 250 Q 350 280, 290 270 Q 240 260, 200 230 Q 160 185, 170 135 Z" 
          fill="url(#mapGradient)" 
          stroke="hsl(200, 40%, 60%)" 
          strokeWidth="2" 
          opacity="0.8"
          className={selectedLocation?.country === 'usa' || selectedLocation?.country === 'canada' || selectedLocation?.country === 'mexico' ? 'transition-all duration-500' : 'transition-all duration-300'}
          style={selectedLocation?.country === 'usa' || selectedLocation?.country === 'canada' || selectedLocation?.country === 'mexico' ? { filter: 'url(#regionGlow)', fill: getGlowColor(selectedLocation.zone), opacity: 0.6 } : {}}
        />
        
        {/* South America */}
        <path 
          d="M 290 280 Q 330 265, 365 290 Q 385 335, 365 400 Q 335 445, 290 430 Q 260 415, 250 375 Q 240 330, 270 295 Z" 
          fill="url(#mapGradient)" 
          stroke="hsl(200, 40%, 60%)" 
          strokeWidth="2" 
          opacity="0.8"
          className={selectedLocation?.country === 'brazil' || selectedLocation?.country === 'argentina' ? 'transition-all duration-500' : 'transition-all duration-300'}
          style={selectedLocation?.country === 'brazil' || selectedLocation?.country === 'argentina' ? { filter: 'url(#regionGlow)', fill: getGlowColor(selectedLocation.zone), opacity: 0.6 } : {}}
        />
        
        {/* Australia */}
        <path 
          d="M 750 355 Q 800 340, 850 365 Q 870 395, 845 425 Q 805 445, 750 430 Q 720 415, 725 385 Z" 
          fill="url(#mapGradient)" 
          stroke="hsl(200, 40%, 60%)" 
          strokeWidth="2" 
          opacity="0.8"
          className={selectedLocation?.country === 'australia' ? 'transition-all duration-500' : 'transition-all duration-300'}
          style={selectedLocation?.country === 'australia' ? { filter: 'url(#regionGlow)', fill: getGlowColor(selectedLocation.zone), opacity: 0.6 } : {}}
        />
        
        {/* Minimal grid lines */}
        <g stroke="hsl(200, 30%, 70%)" strokeWidth="0.5" opacity="0.2">
          {/* Latitude lines */}
          {[125, 250, 375].map(y => (
            <line key={`lat-${y}`} x1="0" y1={y} x2="1000" y2={y} strokeDasharray="5 5" />
          ))}
          {/* Longitude lines */}
          {[250, 500, 750].map(x => (
            <line key={`lng-${x}`} x1={x} y1="0" x2={x} y2="500" strokeDasharray="5 5" />
          ))}
        </g>
      </svg>

      {/* Animated Marker with Glow */}
      {selectedLocation && markerPosition && (
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 group cursor-pointer"
          style={{
            left: `${markerPosition.x}%`,
            top: `${markerPosition.y}%`,
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Outer pulsing glow - smooth animation */}
          <div 
            className="absolute rounded-full"
            style={{
              width: '48px',
              height: '48px',
              left: '-24px',
              top: '-24px',
              backgroundColor: getZoneColor(selectedLocation.zone),
              opacity: 0.2,
              animation: 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          />
          
          {/* Middle glow ring */}
          <div 
            className="absolute rounded-full transition-all duration-300"
            style={{
              width: '36px',
              height: '36px',
              left: '-18px',
              top: '-18px',
              backgroundColor: getZoneColor(selectedLocation.zone),
              opacity: 0.25,
              boxShadow: `0 0 24px ${getGlowColor(selectedLocation.zone)}`,
            }}
          />
          
          {/* Main marker dot - polished and minimal */}
          <div
            className="relative w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              backgroundColor: getZoneColor(selectedLocation.zone),
              boxShadow: `0 0 20px ${getGlowColor(selectedLocation.zone)}, 0 2px 8px rgba(0,0,0,0.15)`,
            }}
          >
            <div className="w-2.5 h-2.5 bg-white rounded-full opacity-90" />
          </div>
          
          {/* Clean tooltip card - appears on hover */}
          <div 
            className={`absolute top-12 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 backdrop-blur-sm border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl p-4 min-w-[240px] z-30 transition-all duration-300 ${
              isHovering ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'
            }`}
          >
            {/* Arrow pointer */}
            <div 
              className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-800 border-l border-t border-gray-200 dark:border-slate-700 rotate-45"
            />
            
            <div className="relative">
              <h4 className="font-semibold text-base mb-0.5 capitalize text-gray-900 dark:text-white">{selectedLocation.region}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                {selectedLocation.country.replace('-', ' ')}
              </p>
              
              <div className="space-y-2.5">
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Pollinator Activity</span>
                  <span 
                    className="font-bold text-xl"
                    style={{ color: getZoneColor(selectedLocation.zone) }}
                  >
                    {selectedLocation.percentage}%
                  </span>
                </div>
                
                <div className="pt-2 border-t border-gray-200 dark:border-slate-700">
                  <span 
                    className="inline-flex items-center justify-center w-full px-3 py-2 rounded-lg text-white font-medium text-sm tracking-wide transition-all"
                    style={{ 
                      backgroundColor: getZoneColor(selectedLocation.zone),
                      boxShadow: `0 4px 16px ${getGlowColor(selectedLocation.zone)}`
                    }}
                  >
                    {selectedLocation.zone === 'healthy' && '✅ '}
                    {selectedLocation.zone === 'at-risk' && '⚠️ '}
                    {selectedLocation.zone === 'critical' && '❌ '}
                    {selectedLocation.zone.replace('-', ' ')} Zone
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Elegant placeholder when no location selected */}
      {!selectedLocation && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-3 p-8 bg-card/40 backdrop-blur-sm rounded-xl border border-border/50">
            <div className="text-4xl mb-2">🌍</div>
            <p className="text-sm font-medium text-foreground">Select a Location</p>
            <p className="text-xs text-muted-foreground max-w-[250px]">
              Choose a country and region from the dropdowns above to visualize pollination data
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
