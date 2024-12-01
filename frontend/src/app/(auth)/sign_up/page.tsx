"use client";

import { PrimaryButton } from "@/components/parts/PrimaryButton";
import { signUp } from "@/utils/auth";
import { errorToast, successToast } from "@/utils/toast";
import Link from "next/link";
import { useState } from "react";

export default function Sign_up() {
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

    if (token) {
      localStorage.setItem("access_token", token);
      successToast("新規登録に成功しました。");
    } else {
      errorToast("そのメールアドレスは既に使用されています。");
    }
  };

  return (
    <div className="flex flex-col items-center mt-12">
      <div className="mx-auto w-[300px] text-center">
        <div>サインアップ画面</div>
        <form onSubmit={onSubmit} className="mt-8 w-full flex flex-col items-center mb-5 gap-4">
          <input onChange={onChangeEmail} type="email" placeholder="メールアドレス" className="mb-3 rounded-[4px]" />
          <input onChange={onChangePassword} type="password" placeholder="パスワード" className="mb-3 rounded-[4px]" />
          <PrimaryButton disabled={!email || !password}>新規登録</PrimaryButton>
        </form>
      </div>
      <Link href="/">ホームへ</Link>
    </div>
  );
}