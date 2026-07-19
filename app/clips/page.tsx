"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import LikeButton from "../components/LikeButton";
import CommentBox from "../components/CommentBox";
import VideoPlayer from "../components/VideoPlayer";

type Clip = {
  id: string;
  title: string;
  description: string;
  youtube_url: string;
  created_at: string;
};

export default function ClipsPage() {
  const [clips, setClips] = useState<Clip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClips();
  }, []);

  async function loadClips() {
    const { data, error } = await supabase
      .from("clips")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setClips(data);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="mx-auto max-w-6xl p-8">

        <div className="mb-8 flex items-center justify-between">

          <h1 className="text-4xl font-bold">
            🎬 PHASEOUT Clips
          </h1>

          <Link
            href="/clips/upload"
            className="rounded-lg bg-purple-600 px-5 py-3 font-bold hover:bg-purple-700"
          >
            + Upload Clip
          </Link>

        </div>

        {loading && (
          <div className="text-center text-gray-400">
            불러오는 중...
          </div>
        )}

        {!loading && clips.length === 0 && (
          <div className="rounded-xl bg-zinc-900 p-10 text-center">

            <h2 className="text-2xl font-bold">
              아직 업로드된 클립이 없습니다.
            </h2>

            <p className="mt-3 text-gray-400">
              첫 번째 클립을 올려보세요.
            </p>

          </div>
        )}

        <div className="space-y-10">

          {clips.map((clip) => {

            return (
              <div
                key={clip.id}
                className="rounded-xl bg-zinc-900 p-6"
              >

                <VideoPlayer url={clip.youtube_url} />

                <h2 className="mt-5 text-3xl font-bold">
                  {clip.title}
                </h2>

                <p className="mt-3 text-gray-400">
                  {clip.description}
                </p>

                <div className="mt-6 flex gap-6">

                  <LikeButton clipId={clip.id} />

                  <button
                    className="rounded-lg bg-zinc-800 px-4 py-2"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/clips#${clip.id}`
                      );
                      alert("링크가 복사되었습니다!");
                    }}
                  >
                    🔗 공유
                  </button>

                </div>

                <CommentBox clipId={clip.id} />

              </div>
            );

          })}

        </div>

      </div>

    </main>
  );
}