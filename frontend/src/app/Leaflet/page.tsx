"use client";

import { Map } from "@/components/Map";

export default function Page() {
  return (
    <>
      <div className="px-3">
        <div className="flex justify-center text-3xl font-semibold text-[rgba(0,164,150,1)] m-5">Leafletアプリ</div>
        <Map />
      </div>
    </>
  );
}

