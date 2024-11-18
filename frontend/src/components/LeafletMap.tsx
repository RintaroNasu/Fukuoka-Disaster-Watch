"use client";

import { useEffect } from "react";

import { getTsunami } from "@/utils/getTsunami";

import { useLeafletMap } from "@/hooks/useLeafletMap";
import "leaflet/dist/leaflet.css";

export const LeafletMap = () => {
  const mapRef = useLeafletMap([33.5902, 130.4207]);

  useEffect(() => {
    const getData = async () => {
      const data = await getTsunami();
    };
    getData();
  }, []);

  return (
    <>
      <div ref={mapRef} className="w-full h-[100vh]" />
    </>
  );
};
