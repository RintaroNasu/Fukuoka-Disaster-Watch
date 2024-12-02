"use client";
import { useEffect, useRef, useState } from "react";
import { Coordinate, LandData } from "@/utils/type";
import { deleteComment } from "@/utils/commentApi";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { getComments, postComment } from "@/utils/commentApi";

const DefaultIcon = L.icon({
  iconUrl: "/images/marker-icon.png",
  iconRetinaUrl: "/images/marker-icon.d577052a.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
});

L.Marker.prototype.options.icon = DefaultIcon;

export const useLeafletMap = (center: Coordinate, land?: LandData) => {
  const mapContainerRef = useRef<HTMLDivElement>(null); // DOM 要素を参照
  const mapRef = useRef<L.Map | null>(null); // L.Map を参照
  const [formVisible, setFormVisible] = useState(false);
  const [latLng, setLatLng] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [content, setContent] = useState("");

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      mapContainerRef.current &&
      !mapRef.current
    ) {
      // マップが未生成の場合のみ初期化
      const map = L.map(mapContainerRef.current).setView(center, 13);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // 地図クリックイベント
      map.on("click", (e: L.LeafletMouseEvent) => {
        setLatLng({ lat: e.latlng.lat, lng: e.latlng.lng });
        setFormVisible(true);
      });

      // 土地データを追加
      land &&
        land.forEach((feature) => {
          const coordinates = (
            feature.geometry.coordinates[0][0] as number[][]
          ).map((coord) => [coord[1], coord[0]]);
          L.polygon(coordinates as L.LatLngExpression[], {
            color: "red",
          }).addTo(map);
        });

      // コメント表示
      const fetchAndDisplayComments = async () => {
        const comments = await getComments();
        comments.forEach((comment) => {
          if (mapRef.current) {
            const popupContent = `
              <b>コメント:</b> ${comment.content}<br>
              <i>日時:</i> ${new Date(comment.createdAt).toLocaleString()}
              <button id="delete-${comment.id}">削除</button>
            `;
            const marker = L.marker([comment.lat, comment.lng])
              .bindPopup(popupContent)
              .addTo(mapRef.current);
                  // ポップアップが開かれたときに削除ボタンにイベントリスナーを追加
            marker.on("popupopen", () => {
              const deleteButton = document.getElementById(`delete-${comment.id}`);
              if (deleteButton) {
                deleteButton.addEventListener("click", () => handleDeleteComment(comment.id, marker));
              }
            });
          } else {
            console.error(
              "mapRef.current が null です。コメントをマップに追加できません。"
            );
          }
        });
      };
      fetchAndDisplayComments();
    }

    return () => {
      // クリーンアップ処理
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [center, land]);

  //投稿処理
  const handleSubmit = async () => {
    if (!latLng || !content) return;

    const result = await postComment(latLng.lat, latLng.lng, content);

    if (result) {
      alert("コメントが保存されました！");
      setFormVisible(false);
      setContent("");

      // 新しいコメントをマップに追加
      if (mapRef.current && latLng) {
        const popupContent = `
            <b>コメント:</b> ${content}<br>
            <i>日時:</i> ${new Date().toLocaleString()}
            <button id="delete-${result.id}">削除</button>
          `;
        const marker = L.marker([latLng.lat, latLng.lng])
          .bindPopup(popupContent)
          .addTo(mapRef.current);
        marker.on("popupopen", () => {
          const deleteButton = document.getElementById("delete-new-comment");
          if (deleteButton) {
            deleteButton.addEventListener("click", () => handleDeleteComment(result.id, marker)); // 新しいコメントIDを適切に設定
          }
        });
      }
    } else {
      alert("保存に失敗しました");
    }
  };

  //コメント削除
  const handleDeleteComment = async (commentId: number, marker: L.Marker) => {
    const isDeleted = await deleteComment(commentId);
  
    if (isDeleted) {
      alert("コメントが削除されました！");
      if (mapRef.current) {
        mapRef.current.removeLayer(marker); // マーカーを地図から削除
      }
    } else {
      alert("コメントの削除に失敗しました");
    }
  };

  return {
    mapRef: mapContainerRef,
    formVisible,
    latLng,
    setContent,
    content,
    handleSubmit,
    setFormVisible,
  };
};
