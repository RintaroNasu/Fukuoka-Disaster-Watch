export type Coordinate = [number, number];

export type MultiPolygonGeometry = {
  type: string;
  coordinates: number[][][][];
};

export type Land = {
  location_name: string;
  address: string;
  record_date: string;
  geometry: MultiPolygonGeometry;
};

export type LandData = Land[];

export type Comment = {
  id: number;
  lat: number;
  lng: number;
  content: string;
  createdAt: string;
  userId: number;
};

export type PostComment = {
  lat: number;
  lng: number;
  content: string;
  userId: number;
};
