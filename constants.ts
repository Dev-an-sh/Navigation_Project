import type { CampusLocation } from './types';

// Coordinates for C.K. Pithawala College of Engineering & Technology, Surat
export const CAMPUS_ENTRANCE = { lat: 21.1435, lng: 72.7915 }; 

export const STREET_VIEW_START = { lat: 21.1435, lng: 72.7915, heading: 180, pitch: 0, zoom: 1 };

export const LOCATIONS: CampusLocation[] = [
  {
    id: 'main_building',
    name: 'CK Pithawala College',
    coordinates: { lat: 21.1432, lng: 72.7918 },
    area: { x: 70, y: 70, width: 25, height: 18 },
    description: "The main administrative and academic building of the CKP Campus.",
    streetView: { lat: 21.1432, lng: 72.7918, heading: 90, pitch: 5 },
  },
  {
    id: 'civil_dept',
    name: 'Civil Engineering Dept.',
    coordinates: { lat: 21.1445, lng: 72.7910 },
    area: { x: 55, y: 15, width: 35, height: 20 },
    description: "Home to the Civil Engineering department, equipped with modern labs and facilities.",
    streetView: { lat: 21.1445, lng: 72.7910, heading: 180, pitch: 0 },
  },
  {
    id: 'ec_dept',
    name: 'Electronics & Comm. Dept.',
    coordinates: { lat: 21.1438, lng: 72.7912 },
    area: { x: 62, y: 54, width: 30, height: 12 },
    description: "The hub for Electronics and Communication Engineering students and faculty.",
    streetView: { lat: 21.1438, lng: 72.7912, heading: 270, pitch: 2 }
  },
  {
    id: 'cricket_ground',
    name: 'CKPCMC Cricket Ground',
    coordinates: { lat: 21.1430, lng: 72.7895 },
    area: { x: 5, y: 65, width: 40, height: 25 },
    description: "A spacious and well-maintained cricket ground for sports and recreational activities.",
    streetView: { lat: 21.1430, lng: 72.7895, heading: 0, pitch: 5 }
  }
];
