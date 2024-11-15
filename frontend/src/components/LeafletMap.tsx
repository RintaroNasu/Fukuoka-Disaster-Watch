"use client";

import { useEffect, useState } from "react";

import { getPolygon } from "@/utils/getPolygon";
import { Coordinate } from "@/utils/type";

import { useLeafletMap } from "@/hooks/useLeafletMap";
import "leaflet/dist/leaflet.css";

export const LeafletMap = () => {
  const [polygonData, setPolygonData] = useState<Coordinate[]>([]);
  const mapRef = useLeafletMap([33.5902, 130.4207], polygonData);

  useEffect(() => {
    const getData = async () => {
      const data = await getPolygon();
      console.log(data);
      if (data && data.length > 0) {
        const coordinates = data[0].geometry.coordinates[0].map((coord: Coordinate) => [coord[1], coord[0]]);
        setPolygonData(coordinates);
      }
    };
    getData();
  }, []);

  return (
    <>
      <div ref={mapRef} className="w-full h-[100vh]" />
    </>
  );
};
