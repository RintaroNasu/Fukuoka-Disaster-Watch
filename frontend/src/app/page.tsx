"use client";

import { SearchConditionModal } from "@/components/SearchConditionModal";
import { LandData } from "@/utils/type";
import dynamic from "next/dynamic";
import { useState } from "react";

export default function Home() {
  const [land, setLand] = useState<LandData>([]);

  const LeafletMap = dynamic(() => import("../components/LeafletMap").then((mod) => mod.LeafletMap), { ssr: false });

  return (
    <>
      <div className="relative">
        <div className="fixed top-0 right-0 w-full z-[3000] flex justify-center text-3xl font-semibold bg-[#0f1b2a] text-white p-4">福岡災害予測アプリ</div>
        <div className="mt-16">
          <LeafletMap land={land} />
        </div>
        <SearchConditionModal setLand={setLand} />
      </div>
    </>
  );
}
