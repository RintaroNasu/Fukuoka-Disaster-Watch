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
