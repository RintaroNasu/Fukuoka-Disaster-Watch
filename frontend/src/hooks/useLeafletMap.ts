"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Coordinate } from "@/utils/type";

const useLeafletMap = (center: Coordinate, polygonData: Coordinate[]) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current) {
      const map = L.map(mapRef.current).setView(center, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      if (polygonData.length > 0) {
        const polygon = L.polygon(polygonData, {
          color: "blue",
          fillColor: "#f03",
          fillOpacity: 0.5,
        }).addTo(map);

        return () => {
          polygon.remove();
          map.remove();
        };
      }

      return () => {
        map.remove();
      };
    }
  }, [center, polygonData]);

  return mapRef;
};

export { useLeafletMap };
