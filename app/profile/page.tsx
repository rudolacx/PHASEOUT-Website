"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);
    }

    load();
  }, []);

  if (!profile)
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );

  return (
    <main className="min-h-screen bg-black text-white flex justify-center p-10">

      <div className="w-full max-w-xl rounded-xl bg-zinc-900 p-8">

        <h1 className="text-3xl font-bold mb-6">
          {profile.nickname}
        </h1>

        <p className="mb-3">
          소개
        </p>

        <p className="text-gray-400">
          {profile.bio || "소개가 없습니다."}
        </p>

      </div>

    </main>
  );
}