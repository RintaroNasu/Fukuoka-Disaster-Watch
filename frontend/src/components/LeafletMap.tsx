"use client";

import { useEffect, useState } from "react";

import { getTsunami } from "@/utils/getTsunami";
import { TsunamiData } from "@/utils/type";

import { useLeafletMap } from "@/hooks/useLeafletMap";

import "leaflet/dist/leaflet.css";
import { getLand } from "@/utils/getLand";

export const LeafletMap = () => {
  const [tsunami, setTsunami] = useState<TsunamiData>([]);
  const  [land, setLand] = useState<TsunamiData>([])

  const mapRef = useLeafletMap([33.5902, 130.4207], tsunami, land);

  useEffect(() => {
    const getData = async () => {
      // const json = await getTsunami();
      // setTsunami(json);
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
