"use client";

import { Header } from "@/components/Header";
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
        <Header />
        <div className="mt-16">
          <LeafletMap land={land} />
        </div>
        <SearchConditionModal setLand={setLand} />
      </div>
    </>
  );
}
