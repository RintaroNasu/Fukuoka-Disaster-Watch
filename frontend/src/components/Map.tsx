"use client";
import { MapContainer, Polygon, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { getPolygon } from "@/utils/getPolygon";

type Coordinate = [number, number];

export const Map = () => {
  const [polygonData, setPolygonData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getPolygon();
      console.log(data);
      if (data && data.length > 0) {
        const coordinates = data[0].geometry.coordinates[0].map((coord: Coordinate) => [coord[1], coord[0]]);
        setPolygonData(coordinates);
      }
    };
    getData();
  }, []);

  return (
    <>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} className="w-full h-[100vh]">
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {polygonData.length > 0 && <Polygon positions={polygonData} color="blue" fillColor="#f03" fillOpacity={0.5} />}
      </MapContainer>
    </>
  );
};

