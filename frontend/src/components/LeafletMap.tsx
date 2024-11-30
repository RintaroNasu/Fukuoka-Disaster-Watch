"use client";

import { LandData } from "@/utils/type";

import { useLeafletMap } from "@/hooks/useLeafletMap";

import "leaflet/dist/leaflet.css";

type Props = {
  land: LandData;
};

export const LeafletMap = (props: Props) => {
  const {
    mapRef,
    formVisible,
    latLng,
    content,
    setContent,
    handleSubmit,
    setFormVisible,
  } = useLeafletMap([33.5902, 130.4207], props.land);

  return (
    <>
      <div ref={mapRef} className="w-full h-[100vh]" />
      {formVisible && latLng && (
        <div className="absolute top-20 left-10 bg-white p-4 rounded shadow-md z-[3000]">
          <p>緯度: {latLng.lat}</p>
          <p>経度: {latLng.lng}</p>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="コメントを入力してください"
          ></textarea>
          <button
            onClick={handleSubmit}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            投稿
          </button>
          <button
            onClick={() => setFormVisible(false)}
            className="mt-2 ml-2 bg-gray-300 text-black px-4 py-2 rounded"
          >
            キャンセル
          </button>
        </div>
      )}
    </>
  );
};
