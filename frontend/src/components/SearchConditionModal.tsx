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
        <div className="text-white flex justify-around h-[85%]">
          <div className="">災害予測</div>
          <div>水害予測</div>
          <div>地震予測</div>
        </div>
        <div className="flex justify-end gap-3">
          <button className="text-blue-500 border-2 border-blue-500 rounded-2xl px-4 py-2 hover:bg-blue-800">検索条件クリア</button>
          <button type="submit">
            <div className="text-white bg-blue-500 rounded-2xl px-4 py-2 hover:bg-blue-700">確定</div>
          </button>
        </div>
      </Modal>
    </>
  );
};
