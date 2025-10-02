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
    <div className="relative w-full h-96 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-green-50/50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-green-950/20 rounded-2xl overflow-hidden shadow-xl border border-border/50">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
      
      {/* Modern Vector World Map */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 500"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Continents with modern flat design */}
        <defs>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
          </linearGradient>
          
          {/* Glow filter for selected region */}
          <filter id="regionGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Asia */}
        <path 
          d="M 550 120 Q 620 100, 720 140 Q 780 170, 820 220 Q 850 280, 800 330 Q 740 370, 670 360 Q 600 350, 570 310 Q 540 260, 540 200 Q 540 150, 550 120 Z" 
          fill="url(#mapGradient)" 
          stroke="hsl(var(--primary))" 
          strokeWidth="1.5" 
          opacity="0.7"
          className={selectedLocation?.country === 'bangladesh' || selectedLocation?.country === 'india' || selectedLocation?.country === 'china' ? 'animate-pulse' : ''}
          style={selectedLocation?.country === 'bangladesh' || selectedLocation?.country === 'india' || selectedLocation?.country === 'china' ? { filter: 'url(#regionGlow)', fill: getGlowColor(selectedLocation.zone) } : {}}
        />
        
        {/* Europe */}
        <path 
          d="M 460 100 Q 510 85, 550 100 Q 580 120, 570 150 Q 550 180, 510 175 Q 470 165, 460 135 Z" 
          fill="url(#mapGradient)" 
          stroke="hsl(var(--primary))" 
          strokeWidth="1.5" 
          opacity="0.7"
          className={selectedLocation?.country === 'germany' || selectedLocation?.country === 'france' || selectedLocation?.country === 'uk' ? 'animate-pulse' : ''}
          style={selectedLocation?.country === 'germany' || selectedLocation?.country === 'france' || selectedLocation?.country === 'uk' ? { filter: 'url(#regionGlow)', fill: getGlowColor(selectedLocation.zone) } : {}}
        />
        
        {/* Africa */}
        <path 
          d="M 460 190 Q 510 175, 550 200 Q 580 240, 570 310 Q 540 370, 480 390 Q 440 385, 420 340 Q 400 270, 425 220 Z" 
          fill="url(#mapGradient)" 
          stroke="hsl(var(--primary))" 
          strokeWidth="1.5" 
          opacity="0.7"
          className={selectedLocation?.country === 'kenya' || selectedLocation?.country === 'south-africa' || selectedLocation?.country === 'nigeria' ? 'animate-pulse' : ''}
          style={selectedLocation?.country === 'kenya' || selectedLocation?.country === 'south-africa' || selectedLocation?.country === 'nigeria' ? { filter: 'url(#regionGlow)', fill: getGlowColor(selectedLocation.zone) } : {}}
        />
        
        {/* North America */}
        <path 
          d="M 180 100 Q 240 75, 310 90 Q 380 110, 405 160 Q 420 210, 390 250 Q 350 280, 290 270 Q 240 260, 200 230 Q 160 185, 170 135 Z" 
          fill="url(#mapGradient)" 
          stroke="hsl(var(--primary))" 
          strokeWidth="1.5" 
          opacity="0.7"
          className={selectedLocation?.country === 'usa' || selectedLocation?.country === 'canada' || selectedLocation?.country === 'mexico' ? 'animate-pulse' : ''}
          style={selectedLocation?.country === 'usa' || selectedLocation?.country === 'canada' || selectedLocation?.country === 'mexico' ? { filter: 'url(#regionGlow)', fill: getGlowColor(selectedLocation.zone) } : {}}
        />
        
        {/* South America */}
        <path 
          d="M 290 280 Q 330 265, 365 290 Q 385 335, 365 400 Q 335 445, 290 430 Q 260 415, 250 375 Q 240 330, 270 295 Z" 
          fill="url(#mapGradient)" 
          stroke="hsl(var(--primary))" 
          strokeWidth="1.5" 
          opacity="0.7"
          className={selectedLocation?.country === 'brazil' || selectedLocation?.country === 'argentina' ? 'animate-pulse' : ''}
          style={selectedLocation?.country === 'brazil' || selectedLocation?.country === 'argentina' ? { filter: 'url(#regionGlow)', fill: getGlowColor(selectedLocation.zone) } : {}}
        />
        
        {/* Australia */}
        <path 
          d="M 750 355 Q 800 340, 850 365 Q 870 395, 845 425 Q 805 445, 750 430 Q 720 415, 725 385 Z" 
          fill="url(#mapGradient)" 
          stroke="hsl(var(--primary))" 
          strokeWidth="1.5" 
          opacity="0.7"
          className={selectedLocation?.country === 'australia' ? 'animate-pulse' : ''}
          style={selectedLocation?.country === 'australia' ? { filter: 'url(#regionGlow)', fill: getGlowColor(selectedLocation.zone) } : {}}
        />
        
        {/* Decorative grid - subtle */}
        <g stroke="hsl(var(--muted-foreground))" strokeWidth="0.3" opacity="0.15">
          {/* Latitude lines */}
          {[0, 125, 250, 375, 500].map(y => (
            <line key={`lat-${y}`} x1="0" y1={y} x2="1000" y2={y} strokeDasharray="4 4" />
          ))}
          {/* Longitude lines */}
          {[0, 250, 500, 750, 1000].map(x => (
            <line key={`lng-${x}`} x1={x} y1="0" x2={x} y2="500" strokeDasharray="4 4" />
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
          {/* Outer pulsing glow - continuous animation */}
          <div 
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              width: '40px',
              height: '40px',
              left: '-20px',
              top: '-20px',
              backgroundColor: getZoneColor(selectedLocation.zone),
              opacity: 0.3,
              animationDuration: '2s',
            }}
          />
          
          {/* Middle glow ring */}
          <div 
            className="absolute rounded-full"
            style={{
              width: '32px',
              height: '32px',
              left: '-16px',
              top: '-16px',
              backgroundColor: getZoneColor(selectedLocation.zone),
              opacity: 0.2,
              boxShadow: `0 0 20px ${getGlowColor(selectedLocation.zone)}`,
            }}
          />
          
          {/* Main marker dot */}
          <div
            className="relative w-5 h-5 rounded-full border-3 border-white shadow-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-125"
            style={{
              backgroundColor: getZoneColor(selectedLocation.zone),
              boxShadow: `0 0 15px ${getGlowColor(selectedLocation.zone)}, 0 4px 10px rgba(0,0,0,0.3)`,
            }}
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
          
          {/* Interactive Tooltip - appears on hover */}
          <div 
            className={`absolute top-10 left-1/2 transform -translate-x-1/2 bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-2xl p-4 min-w-[220px] z-30 transition-all duration-300 ${
              isHovering ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            {/* Arrow pointer */}
            <div 
              className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-card border-l border-t border-border rotate-45"
            />
            
            <div className="relative">
              <h4 className="font-bold text-base mb-1 capitalize">{selectedLocation.region}</h4>
              <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">
                {selectedLocation.country.replace('-', ' ')}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Pollinator Activity</span>
                  <span 
                    className="font-bold text-lg"
                    style={{ color: getZoneColor(selectedLocation.zone) }}
                  >
                    {selectedLocation.percentage}%
                  </span>
                </div>
                
                <div className="pt-2 border-t border-border">
                  <span 
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-white font-semibold text-xs uppercase tracking-wider shadow-lg"
                    style={{ 
                      backgroundColor: getZoneColor(selectedLocation.zone),
                      boxShadow: `0 4px 12px ${getGlowColor(selectedLocation.zone)}`
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
