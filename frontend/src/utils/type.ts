export type Coordinate = [number, number];

export type MultiPolygonGeometry = {
  type: string;
  coordinates: number[][][][];
};

export type Tsunami = {
  prefecture: string;
  prefecture_code: string;
  flood_level: string;
  geometry: MultiPolygonGeometry;
};

export type TsunamiData = Tsunami[];

export type Land = {
  prefecture: string;
  prefecture_code: string;
  flood_level: string;
  geometry: MultiPolygonGeometry;
};

export type LandData = Land[];