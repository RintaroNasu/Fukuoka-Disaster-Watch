"use client";

import { SearchConditionModal } from "@/components/SearchConditionModal";
import dynamic from "next/dynamic";

export default function Home() {
  const LeafletMap = dynamic(() => import("../components/LeafletMap").then((mod) => mod.LeafletMap), { ssr: false });
  return (
    <>
      <div className="relative">
        <div className="fixed w-full z-[3000] flex justify-center text-3xl font-semibold bg-[#0f1b2a] text-white p-4">福岡災害予測アプリ</div>
        <LeafletMap />
        <SearchConditionModal />
      </div>
    </>
  );
}
