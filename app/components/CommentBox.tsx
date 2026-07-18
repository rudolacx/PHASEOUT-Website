"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Comment = {
  id: string;
  content: string;
  created_at: string;
};

export default function CommentBox({
  clipId,
}: {
  clipId: string;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadComments();
  }, []);

  async function loadComments() {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("clip_id", clipId)
      .order("created_at", { ascending: true });

    if (data) setComments(data);
  }

  async function sendComment() {
    if (!text.trim()) return;

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("로그인이 필요합니다.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("comments").insert({
      clip_id: clipId,
      user_id: user.id,
      content: text,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setText("");
    loadComments();
  }

  return (
    <div className="mt-8">

      <h3 className="mb-4 text-xl font-bold">
        💬 댓글
      </h3>

      <div className="flex gap-3">

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="댓글을 입력하세요..."
          className="flex-1 rounded-lg bg-zinc-800 p-3 outline-none"
        />

        <button
          onClick={sendComment}
          disabled={loading}
          className="rounded-lg bg-purple-600 px-5 hover:bg-purple-700"
        >
          등록
        </button>

      </div>

      <div className="mt-6 space-y-3">

        {comments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-lg bg-zinc-800 p-4"
          >
            <p>{comment.content}</p>

            <p className="mt-2 text-xs text-gray-400">
              {new Date(comment.created_at).toLocaleString()}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}