export interface User {
  name: string;
  email: string;
}

export interface CampusLocation {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  area: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  description: string;
  streetView: {
    lat: number;
    lng: number;
    heading: number;
    pitch: number;
  };
  customImageUrl?: string;
}
