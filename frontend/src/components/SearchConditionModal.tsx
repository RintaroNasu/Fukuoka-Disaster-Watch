"use client";

import { useState } from "react";

import { Modal } from "./parts/Modal";

import { getTsunami } from "../utils/getTsunami";
import { getLand } from "@/utils/getLand";
import { Condition, LandData, TsunamiData } from "@/utils/type";

import { TbAdjustmentsSearch } from "react-icons/tb";

type Props = {
  setTsunami: (tsunami: TsunamiData) => void;
  setLand: (land: LandData) => void;
};

export const SearchConditionModal = (props: Props) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedConditions, setSelectedConditions] = useState({
    land: false,
    tsunami: false,
  });
  const [loading, setLoading] = useState(false);

  const onClickSearchModalOpenButton = () => setIsSearchModalOpen(true);
  const onClickSearchModalCloseButton = () => setIsSearchModalOpen(false);

  const handleConfirm = async () => {
    setLoading(true);

    if (!selectedConditions.land && !selectedConditions.tsunami) {
      props.setTsunami([]);
      props.setLand([]);
      onClickSearchModalCloseButton();
      setLoading(false);
      return;
    }

    if (selectedConditions.land) {
      const jsonLand = await getLand();
      props.setLand(jsonLand);
    }

    if (selectedConditions.tsunami) {
      const jsonTsunami = await getTsunami();
      props.setTsunami(jsonTsunami);
    }
    setLoading(false);
    onClickSearchModalCloseButton();
  };

  const handleCheckboxChange = (condition: Condition) => {
    setSelectedConditions((prev) => ({
      ...prev,
      [condition]: !prev[condition],
    }));
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
        <div className="text-white h-[10%] text-center mt-12">
          知りたい項目にチェックを入れてください。
          <br />
          災害情報など様々な情報を確認することが出来ます。
        </div>
        <div className="text-white flex gap-10 justify-center items-center h-[50%]">
          <div>
            <label className="text-lg flex gap-2">
              <input type="checkbox" checked={selectedConditions.land} onChange={() => handleCheckboxChange("land")} />
              土砂災害データ
            </label>
          </div>
          <div>
            <label className="text-lg flex gap-2">
              <input type="checkbox" checked={selectedConditions.tsunami} onChange={() => handleCheckboxChange("tsunami")} />
              津波データ
            </label>
          </div>
        </div>
        <div className="flex justify-end items-center gap-3 h-[20%]">
          <button className="text-blue-500 flex items-center border-2 border-blue-500 rounded-2xl px-4 py-2 hover:bg-blue-800" onClick={() => setSelectedConditions({ land: false, tsunami: false })}>
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
