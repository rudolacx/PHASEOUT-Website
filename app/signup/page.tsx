"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    if (!nickname || !email || !password) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          nickname,
          avatar_url: "",
          bio: "",
        });

      if (profileError) {
        alert(profileError.message);
        setLoading(false);
        return;
      }

      alert("회원가입이 완료되었습니다!");

      router.push("/login");
    }

    setLoading(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-8 shadow-xl">

        <h1 className="mb-8 text-center text-3xl font-bold">
          PHASEOUT 회원가입
        </h1>

        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="mb-4 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 outline-none"
        />

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
          onClick={signUp}
          disabled={loading}
          className="w-full rounded-lg bg-purple-600 p-3 font-bold transition hover:bg-purple-700"
        >
          {loading ? "가입 중..." : "회원가입"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          이미 계정이 있으신가요?
        </p>

        <button
          onClick={() => router.push("/login")}
          className="mt-2 w-full rounded-lg border border-zinc-700 p-3 hover:bg-zinc-800"
        >
          로그인
        </button>

      </div>
    </main>
  );
}