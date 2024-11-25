"use client";

import { LandData } from "@/utils/type";

import { useLeafletMap } from "@/hooks/useLeafletMap";

import "leaflet/dist/leaflet.css";

type Props = {
  land: LandData;
};

export const LeafletMap = (props: Props) => {
  const mapRef = useLeafletMap([33.5902, 130.4207], props.land);

  return (
    <>
      <div ref={mapRef} className="w-full h-[100vh]" />
    </>
  );
};
