"use client";

import dynamic from "next/dynamic";

export default function Page() {
  const LeafletMap = dynamic(() => import("../../components/LeafletMap").then((mod) => mod.LeafletMap), { ssr: false });
  return (
    <>
      <div className="px-3">
        <div className="flex justify-center text-3xl font-semibold text-[rgba(0,164,150,1)] m-5">Leafletアプリ</div>
        <LeafletMap />
      </div>
    </>
  );
}
