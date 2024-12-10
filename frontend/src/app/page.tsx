"use client";

import { useState } from "react";

import dynamic from "next/dynamic";

import { Header } from "@/components/Header";
import { SearchConditionModal } from "@/components/SearchConditionModal";

import { getShelter } from "@/utils/api/getShelter";
import { LandData, ShelterData } from "@/utils/type";

import { FaPersonShelter } from "react-icons/fa6";

export default function Home() {
  const [land, setLand] = useState<LandData>([]);
  const [shelter, setShelter] = useState<ShelterData>([]);

  const LeafletMap = dynamic(() => import("../components/LeafletMap").then((mod) => mod.LeafletMap), { ssr: false });

  const onClickDisplayShelter = async () => {
    const json = await getShelter();
    setShelter(json);
  };

  return (
    <>
      <div className="relative">
        <Header />
        <div className="mt-16">
          <LeafletMap land={land} shelter={shelter} />
        </div>
        <SearchConditionModal setLand={setLand} />
        <button className="hover:bg-gray-500 fixed gap-2 right-14 z-[400] rounded-2xl top-40 bg-gray-900 shadow-xl text-white flex items-center px-4 py-3" onClick={onClickDisplayShelter}>
          避難所
          <span>
            <FaPersonShelter />
          </span>
        </button>
      </div>
    </>
  );
}
