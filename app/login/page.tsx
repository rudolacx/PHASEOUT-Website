"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    if (!data.user) {
      alert("로그인 정보를 확인할 수 없습니다.");
      setLoading(false);
      return;
    }

    alert("로그인 성공!");

    router.push("/admin");
    router.refresh();

    setLoading(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-8 shadow-xl">

        <h1 className="mb-8 text-center text-3xl font-bold">
          PHASEOUT 로그인
        </h1>

        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 outline-none"
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 outline-none"
        />

        <button
          onClick={login}
          disabled={loading}
          className="w-full rounded-lg bg-purple-600 p-3 font-bold hover:bg-purple-700"
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          아직 계정이 없나요?
        </p>

        <button
          onClick={() => router.push("/signup")}
          className="mt-2 w-full rounded-lg border border-zinc-700 p-3 hover:bg-zinc-800"
        >
          회원가입
        </button>

      </div>
    </main>
  );
}