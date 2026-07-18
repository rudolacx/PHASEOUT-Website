"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LikeButton({
  clipId,
}: {
  clipId: string;
}) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    loadLike();
  }, []);

  async function loadLike() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { count } = await supabase
      .from("likes")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("clip_id", clipId);

    setCount(count ?? 0);

    if (!user) return;

    const { data } = await supabase
      .from("likes")
      .select("*")
      .eq("clip_id", clipId)
      .eq("user_id", user.id);

    setLiked((data?.length ?? 0) > 0);
  }

  async function toggleLike() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (liked) {
      await supabase
        .from("likes")
        .delete()
        .eq("clip_id", clipId)
        .eq("user_id", user.id);

      setLiked(false);
      setCount((c) => c - 1);
    } else {
      await supabase.from("likes").insert({
        clip_id: clipId,
        user_id: user.id,
      });

      setLiked(true);
      setCount((c) => c + 1);
    }
  }

  return (
    <button
      onClick={toggleLike}
      className="rounded-lg bg-zinc-800 px-4 py-2 hover:bg-zinc-700"
    >
      {liked ? "❤️" : "🤍"} {count}
    </button>
  );
}