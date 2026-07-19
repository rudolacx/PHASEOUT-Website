"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type PostWriteProps = {
  onPosted?: () => void;
};

export default function PostWrite({ onPosted }: PostWriteProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    if (!title.trim() || !content.trim()) {
      setError("제목과 내용을 모두 입력해주세요.");
      return;
    }

    setLoading(true);
    setError("");

    const { error: insertError } = await supabase.from("posts").insert({
      title,
      content,
    });

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setTitle("");
    setContent("");

    if (onPosted) {
      onPosted();
    }
  }

  return (
    <div className="rounded-xl bg-zinc-900 p-6">
      <h3 className="text-xl font-bold">새 글 작성</h3>

      <input
        className="mt-4 block w-full rounded bg-zinc-800 p-3 text-white"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="mt-3 block w-full rounded bg-zinc-800 p-3 text-white"
        placeholder="내용을 입력하세요"
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      <button
        onClick={submit}
        disabled={loading}
        className="mt-4 rounded bg-purple-600 px-5 py-3 font-bold hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? "등록 중..." : "게시글 등록"}
      </button>
    </div>
  );
}
