import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MapPin, Satellite } from 'lucide-react';

/// <reference types="google.maps" />

interface GoogleMapProps {
  selectedLocation: {
    country: string;
    region: string;
    lat: number;
    lng: number;
    zone: string;
    percentage: number;
  } | null;
  onLocationChange?: (location: { country: string; region: string; lat: number; lng: number }) => void;
}

export default function GoogleMap({ selectedLocation, onLocationChange }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiInput, setShowApiInput] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

  const initializeMap = async (key: string) => {
    if (!mapRef.current || !key) return;

    setIsLoading(true);
    try {
      const loader = new Loader({
        apiKey: key,
        version: 'weekly',
        libraries: ['places']
      });

      const { Map } = await loader.importLibrary('maps');
      const { Marker } = await loader.importLibrary('marker') as google.maps.MarkerLibrary;

      const mapInstance = new Map(mapRef.current, {
        center: selectedLocation ? { lat: selectedLocation.lat, lng: selectedLocation.lng } : { lat: 23.8103, lng: 90.4125 },
        zoom: selectedLocation ? 8 : 6,
        mapTypeId: 'hybrid',
        styles: [
          {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#ffffff' }]
          },
          {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#000000' }, { weight: 2 }]
          }
        ],
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true
      });

      setMap(mapInstance);
      setShowApiInput(false);

      // Add marker if location is selected
      if (selectedLocation) {
        addLocationMarker(mapInstance, selectedLocation, Marker);
      }

      // Add click listener for new location selection
      mapInstance.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (event.latLng && onLocationChange) {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          
          // Reverse geocoding to get location info (simplified)
          onLocationChange({
            country: 'custom-location',
            region: `Location ${lat.toFixed(2)}, ${lng.toFixed(2)}`,
            lat,
            lng
          });
        }
      });

    } catch (error) {
      console.error('Failed to load Google Maps:', error);
      alert('Failed to load Google Maps. Please check your API key.');
    } finally {
      setIsLoading(false);
    }
  };

  const addLocationMarker = (mapInstance: google.maps.Map, location: any, MarkerClass: any) => {
    // Remove existing marker
    if (marker) {
      marker.setMap(null);
    }

    // Get color based on zone
    const getMarkerColor = (zone: string) => {
      switch (zone) {
        case 'healthy': return '#22c55e'; // Green
        case 'at-risk': return '#eab308'; // Yellow  
        case 'critical': return '#ef4444'; // Red
        default: return '#6b7280'; // Gray
      }
    };

    // Create custom marker
    const newMarker = new MarkerClass({
      position: { lat: location.lat, lng: location.lng },
      map: mapInstance,
      title: `${location.region} - ${location.percentage}% Pollinator Activity`,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: getMarkerColor(location.zone),
        fillOpacity: 0.8,
        strokeColor: '#ffffff',
        strokeWeight: 2
      }
    });

    // Info window
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding: 8px; font-family: system-ui;">
          <h3 style="margin: 0 0 8px 0; color: #1f2937;">${location.region}</h3>
          <p style="margin: 0 0 4px 0; color: #6b7280;">Pollinator Activity: <strong>${location.percentage}%</strong></p>
          <div style="display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 12px; background: ${getMarkerColor(location.zone)}; color: white;">
            ${location.zone.toUpperCase()} ZONE
          </div>
        </div>
      `
    });

    newMarker.addListener('click', () => {
      infoWindow.open(mapInstance, newMarker);
    });

    setMarker(newMarker);

    // Center and zoom to location
    mapInstance.setCenter({ lat: location.lat, lng: location.lng });
    mapInstance.setZoom(10);
  };

  useEffect(() => {
    if (map && selectedLocation) {
      addLocationMarker(map, selectedLocation, google.maps.Marker);
    }
  }, [selectedLocation, map]);

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      initializeMap(apiKey.trim());
    }
  };

  if (showApiInput) {
    return (
      <Card className="h-64">
        <CardContent className="h-full flex flex-col items-center justify-center space-y-4 p-6">
          <Satellite className="h-12 w-12 text-primary animate-pulse" />
          <div className="text-center space-y-2">
            <h3 className="font-medium">Google Maps Integration</h3>
            <p className="text-sm text-muted-foreground">Enter your Google Maps API key to enable interactive mapping</p>
          </div>
          <div className="w-full max-w-md space-y-2">
            <Input
              placeholder="Google Maps API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              type="password"
            />
            <Button onClick={handleApiKeySubmit} disabled={!apiKey.trim()} className="w-full">
              <MapPin className="h-4 w-4 mr-2" />
              Load Interactive Map
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Get your API key from <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Cloud Console</a>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative h-64">
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 flex items-center justify-center rounded-lg">
          <div className="flex items-center space-x-2">
            <Satellite className="h-6 w-6 animate-spin text-primary" />
            <span>Loading map...</span>
          </div>
        </div>
      )}
      {!selectedLocation && !isLoading && (
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm p-2 rounded text-xs text-muted-foreground">
          Click on map to select location
        </div>
      )}
    </div>
  );
}