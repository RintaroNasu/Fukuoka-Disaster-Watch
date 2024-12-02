"use client";

import { useState } from "react";

import { Modal } from "./parts/Modal";

import { getLand } from "@/utils/api/getLand";
import { LandData } from "@/utils/type";
import { getAiResponse } from "@/utils/api/getAiResponse";

import { TbAdjustmentsSearch } from "react-icons/tb";
import { errorToast } from "@/utils/toast";

type Props = {
  setLand: (land: LandData) => void;
};

const regions = {
  福岡地域: ["福岡市", "糸島市", "那珂川市", "春日市", "大野城市", "太宰府市", "筑紫野市", "朝倉市", "古賀市", "福津市", "宗像市", "新宮町", "久山町", "粕屋町", "篠栗町", "志免町", "須江町", "宇美町", "筑前町", "東峰村"],
  北九州地域: ["北九州市", "行橋市", "豊前市", "中間市", "遠賀町", "水巻町", "芦屋町", "岡垣町", "苅田町", "みやこ町", "吉富町", "上毛町", "築上町"],
  筑豊地域: ["飯塚市", "嘉麻市", "田川市", "直方市", "宮若市", "桂川町", "福智町", "小竹町", "鞍手町", "香春町", "添田町", "糸田町", "川崎町", "大任町", "赤村"],
  筑後地域: ["久留米市", "大牟田市", "八女市", "筑後市", "柳川市", "大川市", "みやま市", "小郡市", "うきは市", "大刀洗町", "広川町", "大木町"],
};

export const SearchConditionModal = (props: Props) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string>("");

  const onClickSearchModalOpenButton = () => setIsSearchModalOpen(true);
  const onClickSearchModalCloseButton = () => setIsSearchModalOpen(false);

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

    const selectedRegion = getRegionByCity(selectedCities[0]);
    if (!selectedRegion) {
      errorToast("市の情報が不正です");
      return;
    }

    setLoading(true);

    const jsonAiResponse = await getAiResponse({ city: selectedCities[0], region: selectedRegion });
    setAiAnalysis(jsonAiResponse.advice);

    const jsonLand = await getLand(selectedCities[0]);
    props.setLand(jsonLand);

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

      {aiAnalysis && (
        <div className="fixed bottom-0 left-0 z-[400] mt-4 p-6 bg-gray-100 rounded-lg max-w-md shadow">
          <h2 className="text-lg text-gray-700 font-semibold inline-block border-b border-gray-400 mb-2">{selectedCities}住民へのアドバイス</h2>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{aiAnalysis}</p>
        </div>
      )}
      <Modal className="w-[750px] h-[400px] px-6 py-2" isOpen={isSearchModalOpen} onClose={onClickSearchModalCloseButton}>
        <div className="text-white text-center">土砂災害の知りたい市にチェックを入れてください。</div>
        <div className="text-white flex  gap-6 justify-center items-center mt-10">
          {Object.entries(regions).map(([regionName, cities]) => (
            <div key={regionName}>
              <div className="text-2xl underline mb-4">{regionName}</div>
              <select
                value={selectedCities[0] || ""}
                onChange={(e) => {
                  const options = Array.from(e.target.options);
                  const selected = options.filter((option) => option.selected).map((option) => option.value);
                  setSelectedCities(selected);
                }}
                className="w-full border rounded-md p-2 text-black bg-white"
              >
                <option value="">選択してください</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="flex justify-end items-center  mt-10 gap-3">
          <button className="text-blue-500 flex items-center border-2 border-blue-500 rounded-2xl px-4 py-2 hover:bg-blue-800" onClick={() => setSelectedCities([])}>
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
