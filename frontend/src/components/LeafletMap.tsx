"use client";

import { LandData } from "@/utils/type";

import { useLeafletMap } from "@/hooks/useLeafletMap";
import { PrimaryButton } from "./parts/button/PrimaryButton";

import "leaflet/dist/leaflet.css";
import { SkeltonButton } from "./parts/button/SkeltonButton";

type Props = {
  land: LandData;
};

export const LeafletMap = (props: Props) => {
  const { mapRef, formVisible, latLng, content, setContent, handleSubmit, setFormVisible } = useLeafletMap([33.5902, 130.4207], props.land);

  return (
    <>
      <div ref={mapRef} className="w-full h-[100vh]" />
      {formVisible && latLng && (
        <div className="absolute top-20 left-10 bg-white p-4 rounded shadow-md z-[3000]">
          <p className="font-semibold mb-3">この地点について起こったことを投稿してみんなに知らせよう！</p>
          <input value={content} onChange={(e) => setContent(e.target.value)} className="w-full border border-gray-300 p-2 rounded mb-5" placeholder="コメントを入力してください"></input>
          <div className="flex gap-3 items-center justify-end">
            <SkeltonButton onClick={() => setFormVisible(false)}>キャンセル</SkeltonButton>
            <PrimaryButton onClick={handleSubmit} disabled={!content}>
              投稿
            </PrimaryButton>
          </div>
        </div>
      )}
    </>
  );
};
