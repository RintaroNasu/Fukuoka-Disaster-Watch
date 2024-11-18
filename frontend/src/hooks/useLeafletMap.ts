"use client";
import { useEffect, useRef } from "react";

import { Coordinate, TsunamiData } from "@/utils/type";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

export const useLeafletMap = (center: Coordinate, tsunami: TsunamiData) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current) {
      const map = L.map(mapRef.current).setView(center, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      tsunami.forEach((feature) => {
        const coordinates = (feature.geometry.coordinates[0][0] as number[][]).map((coord) => [coord[1], coord[0]]);
        L.polygon(coordinates as L.LatLngExpression[], { color: "blue" }).addTo(map);
      });

      return () => {
        map.remove();
      };
    }
  }, [center, tsunami]);

  return mapRef;
};
