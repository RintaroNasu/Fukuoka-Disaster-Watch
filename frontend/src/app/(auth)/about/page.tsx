"use client";

import Link from "next/link";

export default function about() {
  return (
    <div className="flex justify-center mt-12">
      <div className="flex flex-col items-center bg-[#202c3d] shadow-2xl p-4 rounded-xl mt-12 gap-5">
        <div className=" text-center flex flex-col gap-7 p-8">
          <div className="text-white text-2xl font-semibold underline">このアプリの使い方について</div>
          <div className="mt-8 text-white text-lg font-semibold"> このアプリは、福岡県内の災害情報をリアルタイムで共有するために設計された災害情報共有プラットフォームです。</div>
          <div className="text-white font-semibold text-left flex flex-col gap-2">
            <p>1. 土砂災害のデータを地図上に視覚的に表示し、市区町村単位で災害情報を簡単に検索することができます。</p>
            <p>2. 地域の特性に基づいたAIの防災アドバイスを提供し、災害発生時に迅速かつ適切に対応するためのサポートを行います。</p>
            <p>3. ユーザーが災害情報をリアルタイムで投稿・共有できる機能を備えており、住民同士での迅速な情報共有を可能にします。</p>
            <p>4. ユーザー登録を行うことで、リアルタイム通知機能が利用可能になります。 投稿された災害情報を即座に受信できるため、迅速な対応や適切な行動に役立てることができます。</p>
          </div>
        </div>
        <Link className="font-semibold text-white px-4 py-2 hover:bg-gray-600 rounded-xl underline" href="/">
          ホームへ
        </Link>
      </div>
    </div>
  );
}
