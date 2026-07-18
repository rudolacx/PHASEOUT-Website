"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <nav className="flex items-center justify-between bg-black px-8 py-4 text-white border-b border-zinc-800">

      <Link href="/" className="text-2xl font-bold">
        PHASEOUT
      </Link>

      <div className="flex gap-6 items-center">

        <Link href="/">Home</Link>

        <Link href="/roster">Roster</Link>

        <Link href="/achievement">Results</Link>

        <Link href="/schedule">Schedule</Link>

        <Link href="/news">News</Link>

        <Link href="/contact">Contact</Link>

        <Link href="/clips">Clips</Link>

        {user ? (
          <>
            <Link href="/profile">Profile</Link>

            <button
              onClick={logout}
              className="rounded bg-red-600 px-4 py-2 hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>

            <Link
              href="/signup"
              className="rounded bg-purple-600 px-4 py-2 hover:bg-purple-700"
            >
              Sign Up
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}