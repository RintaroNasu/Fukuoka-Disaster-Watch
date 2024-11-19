"use client";

import { useEffect, useState } from "react";

import { getTsunami } from "@/utils/getTsunami";
import { getLand } from "@/utils/getLand";
import { LandData, TsunamiData } from "@/utils/type";

import { useLeafletMap } from "@/hooks/useLeafletMap";

import "leaflet/dist/leaflet.css";

export const LeafletMap = () => {
  const [tsunami, setTsunami] = useState<TsunamiData>([]);
  const [land, setLand] = useState<LandData>([]);

  const mapRef = useLeafletMap([33.5902, 130.4207], tsunami, land);

  useEffect(() => {
    const getData = async () => {
      const jsonTsunami = await getTsunami();
      setTsunami(jsonTsunami);
      const jsonLand = await getLand();
      setLand(jsonLand);
      console.log(jsonLand);
    };
    getData();
  }, []);

  return (
    <>
      <div ref={mapRef} className="w-full h-[100vh]" />
    </>
  );
};
