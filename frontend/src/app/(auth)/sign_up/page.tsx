"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { signUp } from "@/utils/api/auth";
import { errorToast, successToast } from "@/utils/toast";

import { PrimaryButton } from "@/components/parts/button/PrimaryButton";

export default function Sign_up() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit();
  };

  const submit = async () => {
    const res = await signUp({ email, password });
    const token = res?.token;
    const userId = res?.user.id;

    if (token) {
      localStorage.setItem("access_token", token);
      localStorage.setItem("user_id", userId);
      successToast("新規登録に成功しました。");
      router.push("/");
    } else {
      errorToast("新規登録に失敗しました。");
    }
  };

  return (
    <div className="flex justify-center mt-12">
      <div className="flex flex-col items-center bg-[#202c3d] shadow-2xl p-4 rounded-xl">
        <div className="mx-auto w-[300px] text-center">
          <div className="text-white text-2xl font-semibold">サインアップ画面</div>
          <form onSubmit={onSubmit} className="mt-8 w-full flex flex-col items-center mb-5 gap-4">
            <input onChange={onChangeEmail} type="email" placeholder="メールアドレス" className="mb-3 rounded-[4px] px-2 py-1" />
            <input onChange={onChangePassword} type="password" placeholder="パスワード" className="mb-3 rounded-[4px] px-2 py-1" />
            <PrimaryButton disabled={!email || !password}>新規登録</PrimaryButton>
          </form>
        </div>
        <Link className="font-semibold text-white px-4 py-2 hover:bg-gray-600 rounded-xl" href="/">
          ホームへ
        </Link>
      </div>
    </div>
  );
}
