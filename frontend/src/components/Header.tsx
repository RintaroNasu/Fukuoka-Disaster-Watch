"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { successToast } from "@/utils/toast";

export const Header = () => {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const isAuthPage = pathname === "/sign_in" || pathname === "/sign_up";
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  const onClickLogout = () => {
    localStorage.removeItem("access_token");
    successToast("ログアウトしました。");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <>
      <div className={`${isAuthPage ? "" : "fixed top-0 right-0 w-full z-[3000]"} flex justify-between bg-[#0f1b2a] text-white p-4`}>
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
          {isLoggedIn && (
            <button className="px-2 py-1 rounded hover:bg-[#2f598f]" onClick={onClickLogout}>
              ログアウト
            </button>
          )}
        </div>
      </div>
    </>
  );
};
