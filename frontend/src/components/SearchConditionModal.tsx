"use client";
import { TbAdjustmentsSearch } from "react-icons/tb";
import { Modal } from "./parts/Modal";
import { useState } from "react";

export const SearchConditionModal = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const onClickSearchModalOpenButton = () => setIsSearchModalOpen(true);
  const onClickSearchModalCloseButton = () => setIsSearchModalOpen(false);

  return (
    <>
      <button className="absolute gap-2 right-14 z-[400] rounded-2xl top-24 bg-gray-900 shadow-xl text-white flex items-center px-4 py-3" onClick={onClickSearchModalOpenButton}>
        検索
        <span>
          <TbAdjustmentsSearch size={18} />
        </span>
      </button>
      <Modal className="w-[800px] h-[450px] px-6 py-2" isOpen={isSearchModalOpen} onClose={onClickSearchModalCloseButton}>
        <div className="text-white h-[20%] text-center">
          知りたい項目にチェックを入れてください。
          <br />
          災害情報など様々な情報を確認することが出来ます。
        </div>
        <div className="text-white flex justify-around h-[70%]">
          <div>災害予測</div>
          <div>水害予測</div>
          <div>地震予測</div>
        </div>
        <div className="flex justify-end gap-3 h-[10%]">
          <button className="text-blue-500 border-2 border-blue-500 rounded-2xl px-4 py-2 hover:bg-blue-800">検索条件クリア</button>
          <button type="submit">
            <div className="text-white bg-blue-500 rounded-2xl px-4 py-2 hover:bg-blue-700">確定</div>
          </button>
        </div>
      </Modal>
    </>
  );
};
