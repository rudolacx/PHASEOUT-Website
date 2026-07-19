"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function UploadClipPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"link" | "file">("link");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function uploadClip() {
    if (!title || (mode === "link" && !youtubeUrl) || (mode === "file" && !file)) {
      alert("제목과 영상 링크(또는 파일)를 입력해주세요.");
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

    let mediaUrl = youtubeUrl;

    if (mode === "file" && file) {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        alert("Cloudinary 설정이 안 되어 있습니다.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error?.message || "파일 업로드에 실패했습니다.");
        setLoading(false);
        return;
      }

      mediaUrl = data.secure_url;
    }

    const { error } = await supabase.from("clips").insert({
      user_id: user.id,
      title,
      description,
      youtube_url: mediaUrl,
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

        <div className="mb-4 flex gap-2">
          <button
            type="button"
            onClick={() => setMode("link")}
            className={`flex-1 rounded p-3 font-bold ${
              mode === "link" ? "bg-purple-600" : "bg-zinc-800"
            }`}
          >
            링크로 올리기
          </button>

          <button
            type="button"
            onClick={() => setMode("file")}
            className={`flex-1 rounded p-3 font-bold ${
              mode === "file" ? "bg-purple-600" : "bg-zinc-800"
            }`}
          >
            파일 업로드 (gif/이미지/영상)
          </button>
        </div>

        {mode === "link" ? (
          <input
            className="w-full mb-6 rounded bg-zinc-800 p-3"
            placeholder="https://youtu.be/...  또는 트위치/네이버TV/mp4/gif 링크"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
        ) : (
          <input
            type="file"
            accept="image/gif,image/png,image/jpeg,image/webp,video/mp4,video/webm"
            className="w-full mb-6 rounded bg-zinc-800 p-3"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        )}

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
