import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue with Leaflet in React
// Using CDN for reliable icon loading
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapLocation {
  lat: number;
  lng: number;
  name?: string;
}

interface InteractiveMapProps {
  selectedLocation?: MapLocation;
  userLocation?: { lat: number; lng: number } | null;
  onLocationChange?: (location: MapLocation) => void;
  height?: string;
}

// Custom marker icon with better visibility
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to handle map center changes
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  
  return null;
}


export default function InteractiveMap({ 
  selectedLocation, 
  userLocation,
  onLocationChange,
  height = '400px'
}: InteractiveMapProps) {
  const defaultCenter: [number, number] = [23.8103, 90.4125]; // Dhaka, Bangladesh
  const center: [number, number] = userLocation
    ? [userLocation.lat, userLocation.lng]
    : selectedLocation
      ? [selectedLocation.lat, selectedLocation.lng]
      : defaultCenter;

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    if (onLocationChange) {
      onLocationChange({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        name: 'Custom Location'
      });
    }
  };

  return (
    <div style={{ height, width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
      <MapContainer
        // @ts-ignore - react-leaflet v4 types compatibility
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        // @ts-ignore
        onClick={handleMapClick}
      >
        <MapController center={center} />
        
        {/* OpenStreetMap Tiles - FREE, No API Key Required! */}
        <TileLayer
          // @ts-ignore - react-leaflet v4 types compatibility
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Marker for user location */}
        {userLocation && (
          <Marker 
            position={[userLocation.lat, userLocation.lng]}
            // @ts-ignore
            icon={customIcon}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">Your Location</p>
                <p className="text-xs text-muted-foreground">
                  Lat: {userLocation.lat.toFixed(6)}<br/>
                  Lng: {userLocation.lng.toFixed(6)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
        {/* Marker for selected region location (if not user location) */}
        {selectedLocation && (!userLocation || (userLocation.lat !== selectedLocation.lat || userLocation.lng !== selectedLocation.lng)) && (
          <Marker 
            position={[selectedLocation.lat, selectedLocation.lng]}
            // @ts-ignore
            icon={customIcon}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{selectedLocation.name || 'Selected Location'}</p>
                <p className="text-xs text-muted-foreground">
                  Lat: {selectedLocation.lat.toFixed(6)}<br/>
                  Lng: {selectedLocation.lng.toFixed(6)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
      
      <div className="mt-2 text-xs text-muted-foreground text-center">
        <p>🗺️ Interactive map powered by OpenStreetMap (Free & Open Source)</p>
        <p className="text-[10px]">Click anywhere on the map to set a location</p>
      </div>
    </div>
  );
}
