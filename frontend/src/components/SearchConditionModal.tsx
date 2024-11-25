"use client";

import { useState } from "react";

import { Modal } from "./parts/Modal";

import { getLand } from "@/utils/getLand";
import { LandData } from "@/utils/type";
import { getAiResponse } from "@/utils/getAiResponse";

import { TbAdjustmentsSearch } from "react-icons/tb";

type Props = {
  setLand: (land: LandData) => void;
};

const regions = {
  福岡地域: ["福岡市", "春日市", "太宰府市", "筑紫野市"],
  北九州地域: ["北九州市", "中間市", "遠賀町", "水巻町"],
  筑豊地域: ["飯塚市", "嘉麻市", "田川市", "桂川町"],
  筑後地域: ["久留米市", "八女市", "筑後市", "大川市"],
};

export const SearchConditionModal = (props: Props) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCities, setSelectedCities] = useState<string | null>(null);

  const onClickSearchModalOpenButton = () => setIsSearchModalOpen(true);
  const onClickSearchModalCloseButton = () => setIsSearchModalOpen(false);

  const handleRadioChange = (city: string) => {
    setSelectedCities(city);
  };

  const getRegionByCity = (city: string) => {
    for (const [region, cities] of Object.entries(regions)) {
      if (cities.includes(city)) {
        return region;
      }
    }
    return null;
  };

  const handleConfirm = async () => {
    if (!selectedCities) {
      alert("市を選択してください");
      return;
    }

    const selectedRegion = getRegionByCity(selectedCities);
    if (!selectedRegion) {
      alert("市の情報が不正です");
      return;
    }

    setLoading(true);
    const jsonLand = await getLand(selectedCities);
    props.setLand(jsonLand);
    const jsonAiResponse = await getAiResponse({ city: selectedCities, region: selectedRegion });
    console.log(jsonAiResponse);

    setLoading(false);
    onClickSearchModalCloseButton();
  };

  return (
    <>
      <button className="fixed gap-2 right-14 z-[400] rounded-2xl top-24 bg-gray-900 shadow-xl text-white flex items-center px-4 py-3" onClick={onClickSearchModalOpenButton}>
        検索
        <span>
          <TbAdjustmentsSearch size={18} />
        </span>
      </button>
      <Modal className="w-[750px] h-[400px] px-6 py-2" isOpen={isSearchModalOpen} onClose={onClickSearchModalCloseButton}>
        <div className="text-white text-center">土砂災害の知りたい市にチェックを入れてください。</div>
        <div className="text-white flex  gap-6 justify-center items-center mt-10">
          {Object.entries(regions).map(([regionName, cities]) => (
            <div key={regionName}>
              <div className="text-2xl underline mb-4">{regionName}</div>
              <div className="flex flex-col gap-2">
                {cities.map((city) => (
                  <div key={city} className="flex items-center gap-2">
                    <input type="radio" id={city} value={city} checked={selectedCities === city} onChange={() => handleRadioChange(city)} />
                    <label htmlFor={city}>{city}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end items-center  mt-10 gap-3">
          <button className="text-blue-500 flex items-center border-2 border-blue-500 rounded-2xl px-4 py-2 hover:bg-blue-800" onClick={() => setSelectedCities(null)}>
            検索条件クリア
          </button>
          <button type="submit" onClick={handleConfirm}>
            <div className={`text-white rounded-2xl px-4 py-2 ${loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"}`}>{loading ? "取得中..." : "確定"}</div>
          </button>
        </div>
      </Modal>
    </>
  );
};
