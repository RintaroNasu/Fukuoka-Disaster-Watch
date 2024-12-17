"use client";
import { useCallback, useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { Coordinate, LandData, ShelterData } from "@/utils/type";

import { getComments, postComment, deleteComment } from "@/utils/api/commentActions";

import { errorToast, successToast } from "@/utils/toast";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DefaultIcon = L.icon({
  iconUrl: "/images/marker-icon.png",
  iconRetinaUrl: "/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
});

L.Marker.prototype.options.icon = DefaultIcon;

export const useLeafletMap = (initialCenter: Coordinate, land?: LandData, shelter?: ShelterData) => {
  const router = useRouter();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  const [formVisible, setFormVisible] = useState(false);
  const [latLng, setLatLng] = useState<{ lat: number; lng: number } | null>(null);
  const [content, setContent] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [center, setCenter] = useState<Coordinate>(initialCenter);
  const currentMarkerRef = useRef<L.Marker | null>(null);

  // コメント削除処理
  const handleDeleteComment = useCallback(
    async (commentId: number, marker: L.Marker, commentUserId: number) => {
      if (!isLoggedIn) {
        errorToast("削除するにはログインが必要です。");
        return;
      }

      if (currentUserId !== commentUserId) {
        errorToast("自分のコメントのみ削除できます。");
        return;
      }

      const isDeleted = await deleteComment(commentId);
      router.push("/");

      if (isDeleted) {
        successToast("コメントを削除しました。");
        if (mapRef.current) {
          mapRef.current.removeLayer(marker);
        }
      } else {
        errorToast("コメントの削除に失敗しました。");
      }
    },
    [isLoggedIn, currentUserId, router]
  );

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
    const currentUserId = localStorage.getItem("user_id");
    if (currentUserId) {
      setCurrentUserId(parseInt(currentUserId));
    }

    if (typeof window !== "undefined" && mapContainerRef.current && !mapRef.current) {
      // マップ初期化処理
      const map = L.map(mapContainerRef.current).setView(center, 13);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // マップクリックイベント処理
      map.on("click", (e: L.LeafletMouseEvent) => {
        if (!isLoggedIn) {
          errorToast("地図上に投稿するためにはログインが必要です。");
          return;
        }
        const clickedLatLng = { lat: e.latlng.lat, lng: e.latlng.lng };
        setLatLng(clickedLatLng);
        setFormVisible(true);

        // 既存のピンを削除して新しいピンを追加
        if (currentMarkerRef.current) {
          map.removeLayer(currentMarkerRef.current);
        }

        // 新しいピンを作成して追加
        const newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
        currentMarkerRef.current = newMarker;

        // ズームレベルを維持しながらビューを移動
        map.setView(clickedLatLng, map.getZoom());
      });

      // 災害情報取得・表示処理
      if (land) {
        land.forEach((feature) => {
          const coordinates = (feature.geometry.coordinates[0][0] as number[][]).map((coord) => [coord[1], coord[0]]);
          L.polygon(coordinates as L.LatLngExpression[], {
            color: "red",
          }).addTo(map);
        });
      }

      // 避難所取得・表示処理
      if (shelter) {
        const customIcon = L.icon({
          iconUrl: "images/shelter-icon.png",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });

        shelter.forEach((shelter) => {
          const capacityContent = shelter.capacity === -1 ? "収容人数: 0人" : `収容人数: ${shelter.capacity}人`;

          const popupContent = `
          <p>避難所名: ${shelter.name}</p>
          <p>住所: ${shelter.address}</p>
          <p>種別: ${shelter.shelter_type}</p>
          <p>${capacityContent}</p>
        `;

          L.marker([shelter.latitude, shelter.longitude], { icon: customIcon }).bindPopup(popupContent).addTo(map);
        });
      }

      // コメント取得・表示処理
      const fetchAndDisplayComments = async () => {
        const comments = await getComments();

        comments.forEach((comment) => {
          if (mapRef.current) {
            const popupContent = `
            <div style="font-family: Arial, sans-serif; padding: 8px;">
              <p style="margin: 0; font-size: 14px; color: #555;"><strong>ユーザーID:</strong> ${comment.userId}</p>
              <p style="margin: 8px 0; font-size: 16px; color: #333;">
                <strong>コメント:</strong><br>${comment.content}
              </p>
              <p style="margin: 0; font-size: 12px; color: #888;">
                <strong>日時:</strong> ${new Date(comment.createdAt).toLocaleString()}
              </p>
              <button 
                id="delete-${comment.id}" 
                style="
                display: block;
                margin-top: 10px;
                padding: 8px 12px;
                background-color: #ff4d4f;
                color: #fff;
                border: none;
                border-radius: 4px;
                font-size: 14px;
                cursor: pointer;
                transition: background-color 0.2s ease;
              "
              onmouseover="this.style.backgroundColor='#e33e3e'"
              onmouseout="this.style.backgroundColor='#ff4d4f'">削除</button>
            `;
            const marker = L.marker([comment.lat, comment.lng]).bindPopup(popupContent).addTo(mapRef.current);
            marker.on("popupopen", () => {
              const deleteButton = document.getElementById(`delete-${comment.id}`);
              if (deleteButton) {
                deleteButton.addEventListener("click", () => handleDeleteComment(comment.id, marker, comment.userId));
              }
            });
          } else {
            console.error("mapRef.current が null です。コメントをマップに追加できません。");
          }
        });
      };
      fetchAndDisplayComments();
    }

    // 中心座標が更新されたら地図のビューを変更
    if (mapRef.current) {
      mapRef.current.setView(center, mapRef.current.getZoom());
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [center, land, , shelter, isLoggedIn, handleDeleteComment]);

  // コメント投稿処理
  const handleSubmit = async () => {
    if (!latLng || !content || !isLoggedIn) return;
    setLoading(true);
    if (!currentUserId) {
      errorToast("ユーザー情報が取得できませんでした。");
      return;
    }
    const result = await postComment({
      lat: latLng.lat,
      lng: latLng.lng,
      content,
      userId: currentUserId,
    });

    if (result) {
      successToast("登録されているユーザーにコメントが送信されました。");
      setFormVisible(false);
      setContent("");
      setLoading(false);
      router.push("/");
    } else {
      errorToast("保存に失敗しました。");
    }
  };

  return {
    mapRef: mapContainerRef,
    formVisible,
    latLng,
    setContent,
    loading,
    content,
    handleSubmit,
    setFormVisible,
    setCenter,
  };
};
