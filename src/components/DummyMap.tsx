import React from 'react';
import { Card } from './ui/card';

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
  // Get color based on zone
  const getZoneColor = (zone: string) => {
    switch (zone) {
      case 'healthy': return '#22c55e'; // Green
      case 'at-risk': return '#eab308'; // Yellow  
      case 'critical': return '#ef4444'; // Red
      default: return '#6b7280'; // Gray
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
    <div className="relative w-full h-64 bg-gradient-to-br from-blue-900/20 via-blue-800/20 to-blue-700/20 rounded-lg overflow-hidden border border-border">
      {/* World Map Background Pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 800 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Continents simplified outlines */}
        <g fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
          {/* Asia */}
          <path d="M 450 100 Q 520 80, 600 120 Q 650 140, 680 180 Q 700 220, 650 250 Q 600 270, 550 260 Q 500 250, 480 220 Q 450 180, 450 140 Z" />
          
          {/* Europe */}
          <path d="M 380 80 Q 420 70, 450 80 Q 470 90, 460 110 Q 450 130, 420 125 Q 390 120, 380 100 Z" />
          
          {/* Africa */}
          <path d="M 380 150 Q 420 140, 450 160 Q 470 190, 460 240 Q 440 280, 400 290 Q 370 285, 360 250 Q 350 200, 370 170 Z" />
          
          {/* North America */}
          <path d="M 150 80 Q 200 60, 250 70 Q 300 85, 320 120 Q 330 150, 310 180 Q 280 200, 240 195 Q 200 190, 170 170 Q 140 140, 150 100 Z" />
          
          {/* South America */}
          <path d="M 240 210 Q 270 200, 290 220 Q 300 250, 285 290 Q 265 320, 240 310 Q 220 300, 215 270 Q 210 240, 230 220 Z" />
          
          {/* Australia */}
          <path d="M 620 270 Q 660 260, 690 280 Q 700 300, 680 315 Q 650 325, 620 315 Q 600 305, 610 285 Z" />
        </g>
        
        {/* Grid lines */}
        <g stroke="currentColor" strokeWidth="0.5" opacity="0.2" className="text-muted-foreground">
          {/* Latitude lines */}
          {[0, 100, 200, 300, 400].map(y => (
            <line key={`lat-${y}`} x1="0" y1={y} x2="800" y2={y} />
          ))}
          {/* Longitude lines */}
          {[0, 200, 400, 600, 800].map(x => (
            <line key={`lng-${x}`} x1={x} y1="0" x2={x} y2="400" />
          ))}
        </g>
      </svg>

      {/* Location Marker */}
      {selectedLocation && markerPosition && (
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 animate-pulse"
          style={{
            left: `${markerPosition.x}%`,
            top: `${markerPosition.y}%`,
          }}
        >
          {/* Pulsing circle effect */}
          <div 
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              width: '24px',
              height: '24px',
              backgroundColor: getZoneColor(selectedLocation.zone),
              opacity: 0.4,
            }}
          />
          
          {/* Main marker */}
          <div
            className="relative w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
            style={{
              backgroundColor: getZoneColor(selectedLocation.zone),
            }}
          >
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
          
          {/* Tooltip */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded-lg shadow-lg p-3 min-w-[200px] z-20">
            <h4 className="font-medium text-sm mb-1">{selectedLocation.region}</h4>
            <p className="text-xs text-muted-foreground mb-1">
              {selectedLocation.country.replace('-', ' ').toUpperCase()}
            </p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Pollinator Activity:</span>
              <span className="font-bold" style={{ color: getZoneColor(selectedLocation.zone) }}>
                {selectedLocation.percentage}%
              </span>
            </div>
            <div className="mt-2 text-xs">
              <span 
                className="inline-block px-2 py-1 rounded text-white font-medium"
                style={{ backgroundColor: getZoneColor(selectedLocation.zone) }}
              >
                {selectedLocation.zone.toUpperCase()} ZONE
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Placeholder message when no location selected */}
      {!selectedLocation && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">Select a country and region to view location on map</p>
          </div>
        </div>
      )}
    </div>
  );
}
