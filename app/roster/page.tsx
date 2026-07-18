"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { supabase } from "../../lib/supabase";

type Player = {
  id: number;
  name: string;
  role?: string;
  legend?: string;
  style?: string;
  image_url?: string;
  description?: string;
};

export default function RosterPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadPlayers() {
    setLoading(true);

    const { data, error } = await supabase
      .from("roster")
      .select("*")
      .order("id", { ascending: true });

    if (!error && data) {
      setPlayers(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadPlayers();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white px-10 py-24">
        <h1 className="text-6xl font-black text-purple-500">
          PHASEOUT ROSTER
        </h1>

        <p className="mt-3 text-gray-400">
          Apex Legends Esports Team Members
        </p>

        {loading && <p className="mt-10">Loading...</p>}

        {!loading && players.length === 0 && (
          <p className="mt-10 text-gray-400">
            등록된 선수가 없습니다.
          </p>
        )}

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {players.map((player) => (
            <div
              key={player.id}
              className="overflow-hidden rounded-2xl border border-purple-800 bg-gradient-to-br from-purple-950 to-black transition hover:-translate-y-2 hover:border-purple-400"
            >
              <div className="relative flex h-64 items-center justify-center bg-zinc-900">
                {player.image_url ? (
                  <Image
                    src={player.image_url}
                    alt={player.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-6xl font-black text-purple-800">
                    {player.name?.[0]?.toUpperCase() ?? "?"}
                  </span>
                )}
              </div>

              <div className="p-6">
                <h2 className="text-3xl font-black">{player.name}</h2>

                <p className="mt-2 text-lg font-bold text-purple-400">
                  {player.role || "미정"}
                </p>

                <div className="mt-4 space-y-1 text-gray-300">
                  <p>🎮 Legend : {player.legend || "미정"}</p>
                  <p>⚡ Style : {player.style || "미정"}</p>
                </div>

                <p className="mt-4 text-sm leading-6 text-gray-400">
                  {player.description || "소개가 등록되지 않았습니다."}
                </p>

                <div className="mt-5 inline-block rounded-full bg-purple-600 px-4 py-2 font-bold">
                  POT
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
