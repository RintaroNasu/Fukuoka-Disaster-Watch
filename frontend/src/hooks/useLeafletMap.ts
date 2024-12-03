"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Coordinate, LandData } from "@/utils/type";
import {
  getComments,
  postComment,
  deleteComment,
} from "@/utils/api/commentActions";
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

export const useLeafletMap = (initialCenter: Coordinate, land?: LandData) => {
  const router = useRouter();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  const [formVisible, setFormVisible] = useState(false);
  const [latLng, setLatLng] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [content, setContent] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [center, setCenter] = useState<Coordinate>(initialCenter); // 中心座標を状態管理

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    console.log("token", token);
    setIsLoggedIn(!!token);
    console.log("isLoggedIn", isLoggedIn);
    const currentUserId = localStorage.getItem("user_id");
    if (currentUserId) {
      setCurrentUserId(parseInt(currentUserId));
    }

    if (
      typeof window !== "undefined" &&
      mapContainerRef.current &&
      !mapRef.current
    ) {
      // マップ初期化処理
      const map = L.map(mapContainerRef.current).setView(center, 13);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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
        map.setView(clickedLatLng, map.getZoom());
      });

      // 災害情報取得・表示処理
      land &&
        land.forEach((feature) => {
          const coordinates = (
            feature.geometry.coordinates[0][0] as number[][]
          ).map((coord) => [coord[1], coord[0]]);
          L.polygon(coordinates as L.LatLngExpression[], {
            color: "red",
          }).addTo(map);
        });

      // コメント取得・表示処理
      const fetchAndDisplayComments = async () => {
        const comments = await getComments();

        comments.forEach((comment) => {
          if (mapRef.current) {
            const popupContent = `
              <p>ユーザーID:${comment.userId}</p>
              <b>コメント:</b> ${comment.content}<br>
              <i>日時:</i> ${new Date(comment.createdAt).toLocaleString()}
              <button id="delete-${
                comment.id
              }" className="px-4 py-2 font-semibold" >削除</button>
            `;
            const marker = L.marker([comment.lat, comment.lng])
              .bindPopup(popupContent)
              .addTo(mapRef.current);
            marker.on("popupopen", () => {
              const deleteButton = document.getElementById(
                `delete-${comment.id}`
              );
              if (deleteButton) {
                deleteButton.addEventListener("click", () =>
                  handleDeleteComment(comment.id, marker, comment.userId)
                );
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
  }, [center, land, isLoggedIn]); // 中心座標が変更されたときに再レンダリング

  // コメント投稿処理
  const handleSubmit = async () => {
    if (!latLng || !content || !isLoggedIn) return;

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
      successToast("コメントを投稿しました。");
      setFormVisible(false);
      setContent("");
      router.push("/");
    } else {
      errorToast("保存に失敗しました。");
    }
  };

  // コメント削除処理
  const handleDeleteComment = async (
    commentId: number,
    marker: L.Marker,
    commentUserId: number
  ) => {
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
  };

  return {
    mapRef: mapContainerRef,
    formVisible,
    latLng,
    setContent,
    content,
    handleSubmit,
    setFormVisible,
    setCenter,
  };
};