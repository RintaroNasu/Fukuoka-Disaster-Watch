"use client";
import { useEffect, useRef, useState } from "react";
import { Coordinate, LandData } from "@/utils/type";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";
const DefaultIcon = L.icon({
  iconUrl: "/images/marker-icon.png",
  iconRetinaUrl: "/images/marker-icon.d577052a.png",
  shadowUrl: '/images/marker-shadow.png', 
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export const useLeafletMap = (center: Coordinate, land?: LandData) => {
  const mapContainerRef = useRef<HTMLDivElement>(null); // DOM 要素を参照
  const mapRef = useRef<L.Map | null>(null); // L.Map を参照
  const [formVisible, setFormVisible] = useState(false);
  const [latLng, setLatLng] = useState<{ lat: number; lng: number } | null>(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && mapContainerRef.current && !mapRef.current) {
      // マップが未生成の場合のみ初期化
      const map = L.map(mapContainerRef.current).setView(center, 13);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // 地図クリックイベント
      map.on("click", (e: L.LeafletMouseEvent) => {
        setLatLng({ lat: e.latlng.lat, lng: e.latlng.lng });
        setFormVisible(true);
      });

      // 土地データを追加
      land &&
        land.forEach((feature) => {
          const coordinates = (feature.geometry.coordinates[0][0] as number[][]).map((coord) => [coord[1], coord[0]]);
          L.polygon(coordinates as L.LatLngExpression[], {
            color: "red",
          }).addTo(map);
        });

      // コメント表示
      const fetchComments = async () => {
        const response = await fetch("http://localhost:8000/comments");
        const comments = await response.json();
        comments.forEach((comment: { lat: number; lng: number; content: string; createdAt: string }) => {
          if (mapRef.current) {
            const popupContent = `
              <b>コメント:</b> ${comment.content}<br>
              <i>日時:</i> ${new Date(comment.createdAt).toLocaleString()}
            `;
            L.marker([comment.lat, comment.lng]).bindPopup(popupContent).addTo(mapRef.current);
          } else {
            console.error("mapRef.current が null です。コメントをマップに追加できません。");
          }
        });
        
      };

      fetchComments();
    }

    return () => {
      // クリーンアップ処理
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [center, land]);

  const handleSubmit = async () => {
    if (!latLng || !content) return;

    try {
      const response = await fetch("http://localhost:8000/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...latLng, content }),
      });

      if (response.ok) {
        alert("コメントが保存されました！");
        setFormVisible(false);
        setContent("");

        // 新しいコメントをマップに追加
        if (mapRef.current && latLng) {
          const popupContent = `
            <b>コメント:</b> ${content}<br>
            <i>日時:</i> ${new Date().toLocaleString()}
          `;
          L.marker([latLng.lat, latLng.lng]).bindPopup(popupContent).addTo(mapRef.current);
        }
      } else {
        alert("保存に失敗しました");
      }
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  return { mapRef: mapContainerRef, formVisible, latLng, setContent, content, handleSubmit, setFormVisible };
};
