"use client";

import { useEffect, useState } from "react";

import { getTsunami } from "@/utils/getTsunami";
import { getLand } from "@/utils/getLand";
import { LandData, TsunamiData } from "@/utils/type";

import { useLeafletMap } from "@/hooks/useLeafletMap";

import "leaflet/dist/leaflet.css";

type Props = {
  tsunami: TsunamiData;
  land: LandData;
};

export const LeafletMap = (props: Props) => {
  const mapRef = useLeafletMap([33.5902, 130.4207], props.tsunami, props.land);

  return (
    <>
      <div ref={mapRef} className="w-full h-[100vh]" />
    </>
  );
};
