"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function UploadClipPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function uploadClip() {
    if (!title || !youtubeUrl) {
      alert("제목과 유튜브 링크를 입력해주세요.");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("clips").insert({
      user_id: user.id,
      title,
      description,
      youtube_url: youtubeUrl,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("클립이 업로드되었습니다!");

    router.push("/clips");
  }

  return (
    <main className="min-h-screen bg-black text-white flex justify-center items-center p-10">
      <div className="w-full max-w-xl rounded-xl bg-zinc-900 p-8">

        <h1 className="text-3xl font-bold mb-6">
          Upload Clip
        </h1>

        <input
          className="w-full mb-4 rounded bg-zinc-800 p-3"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full mb-4 rounded bg-zinc-800 p-3 h-32"
          placeholder="설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="w-full mb-6 rounded bg-zinc-800 p-3"
          placeholder="https://youtu.be/..."
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
        />

        <button
          onClick={uploadClip}
          disabled={loading}
          className="w-full rounded bg-purple-600 p-3 font-bold hover:bg-purple-700"
        >
          {loading ? "업로드 중..." : "업로드"}
        </button>

      </div>
    </main>
  );
}