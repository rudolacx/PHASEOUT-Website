"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

function uploadToCloudinary(
  file: File,
  cloudName: string,
  uploadPreset: string,
  onProgress: (percent: number) => void
): Promise<{ secure_url: string }> {
  return new Promise((resolve, reject) => {
    const resourceType = file.type.startsWith("video/") ? "video" : "image";

    const xhr = new XMLHttpRequest();

    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`
    );

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      const data = JSON.parse(xhr.responseText);

      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(data);
      } else {
        reject(new Error(data.error?.message || "업로드에 실패했습니다."));
      }
    };

    xhr.onerror = () => reject(new Error("네트워크 오류로 업로드에 실패했습니다."));

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    xhr.send(formData);
  });
}

export default function UploadClipPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"link" | "file">("link");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  async function uploadClip() {
    if (!title || (mode === "link" && !youtubeUrl) || (mode === "file" && !file)) {
      alert("제목과 영상 링크(또는 파일)를 입력해주세요.");
      return;
    }

    setLoading(true);
    setProgress(0);

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

      try {
        const data = await uploadToCloudinary(
          file,
          cloudName,
          uploadPreset,
          setProgress
        );

        mediaUrl = data.secure_url;
      } catch (err: any) {
        alert(err.message);
        setLoading(false);
        return;
      }
    }

    const { error } = await supabase.from("clips").insert({
      user_id: user.id,
      title,
      description,
      youtube_url: mediaUrl,
    });

    setLoading(false);
    setProgress(0);

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

        {loading && mode === "file" && (
          <div className="mb-6">
            <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full bg-purple-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-2 text-center text-sm text-gray-400">
              {progress}% 업로드 중...
            </p>
          </div>
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
