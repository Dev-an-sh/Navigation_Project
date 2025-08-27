import React, { useState } from 'react';
import type { User, CampusLocation } from '../types';
import CampusMap from './CampusMap';
import { LOCATIONS, STREET_VIEW_START, CAMPUS_ENTRANCE } from '../constants';
import { Logo } from './icons/Logo';
import { MapPinIcon } from './icons/MapPinIcon';
import { ArrowRightOnRectangleIcon } from './icons/ArrowRightOnRectangleIcon';

interface MainPageProps {
  user: User;
  onLogout: () => void;
}

const MainPage: React.FC<MainPageProps> = ({ user, onLogout }) => {
  const [selectedLocation, setSelectedLocation] = useState<CampusLocation | null>(null);

  const handleLocationSelect = (location: CampusLocation) => {
    setSelectedLocation(location);
  };

  const startTour = () => {
    const { lat, lng, heading, pitch, zoom } = STREET_VIEW_START;
    const url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}&heading=${heading}&pitch=${pitch}&zoom=${zoom}`;
    window.open(url, '_blank');
  };
  
  const getDirections = () => {
    if (!selectedLocation) return;
    const { lat: destLat, lng: destLng } = selectedLocation.coordinates;
    const { lat: originLat, lng: originLng } = CAMPUS_ENTRANCE;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}&travelmode=walking`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-sky-50">
       <header className="bg-white/80 backdrop-blur-md shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Logo />
          <h1 className="text-xl font-bold text-gray-800 hidden sm:block">CKP Campus Navigation</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Welcome, <span className="font-semibold">{user.name}</span>!</span>
          <button onClick={onLogout} className="p-2 rounded-full hover:bg-sky-100 transition-colors" title="Logout">
            <ArrowRightOnRectangleIcon className="w-6 h-6 text-sky-600" />
          </button>
        </div>
      </header>
      
      <main className="p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4 text-center">Interactive Campus Map</h2>
            <p className="text-gray-500 mb-6 text-center">Click on a building to get information and directions.</p>
            <CampusMap locations={LOCATIONS} onLocationSelect={handleLocationSelect} selectedLocationId={selectedLocation?.id ?? null} />
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <h2 className="text-2xl font-bold mb-4">Virtual Campus Tour</h2>
              <p className="text-gray-500 mb-6">Explore our campus from anywhere with a 360° street view tour.</p>
              <button onClick={startTour} className="w-full py-3 px-6 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-white transition-transform transform hover:scale-105 duration-300">
                Start Tour
              </button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><MapPinIcon className="w-6 h-6 text-sky-500"/> Navigation</h2>
              {selectedLocation ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-lg">Selected: <span className="font-semibold text-sky-600">{selectedLocation.name}</span></p>
                    <p className="text-gray-500 mt-1">{selectedLocation.description}</p>
                  </div>
                  <button onClick={getDirections} className="w-full py-3 px-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-white transition-transform transform hover:scale-105 duration-300">
                    Get Directions
                  </button>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Please select a location on the map to get directions.</p>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default MainPage;