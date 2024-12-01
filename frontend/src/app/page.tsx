"use client";

import { SearchConditionModal } from "@/components/SearchConditionModal";
import { successToast } from "@/utils/toast";
import { LandData } from "@/utils/type";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [land, setLand] = useState<LandData>([]);

  const LeafletMap = dynamic(() => import("../components/LeafletMap").then((mod) => mod.LeafletMap), { ssr: false });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  const onClickLogout = () => {
    localStorage.removeItem("access_token");
    successToast("ログアウトしました。");
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="relative">
        <div className="fixed top-0 right-0 w-full z-[3000] flex justify-between bg-[#0f1b2a] text-white p-4">
          <div className="text-3xl font-semibold">Fukuoka Disaster Watch</div>
          <div className="flex gap-5 items-center font-semibold">
            {!isLoggedIn && (
              <>
                <Link className="hover:bg-[#2f598f] py-1 px-2 rounded" href="/sign_in">
                  ログイン
                </Link>
                <Link className="hover:bg-[#2f598f] py-1 px-2 rounded" href="/sign_up">
                  新規登録
                </Link>
              </>
            )}
            {isLoggedIn && <button onClick={onClickLogout}>ログアウト</button>}
          </div>
        </div>
        <div className="mt-16">
          <LeafletMap land={land} />
        </div>
        <SearchConditionModal setLand={setLand} />
      </div>
    </>
  );
}
