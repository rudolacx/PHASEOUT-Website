"use client";

import { useState } from "react";
import RosterAdmin from "./components/RosterAdmin";
import AchievementAdmin from "./components/AchievementAdmin";
import NewsAdmin from "./components/NewsAdmin";
import ScheduleAdmin from "./components/ScheduleAdmin";
import SponsorAdmin from "./components/SponsorAdmin";

export default function AdminDashboard() {
  const [tab, setTab] = useState("roster");

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold">
        PHASEOUT ADMIN
      </h1>

      <p className="mt-3 text-gray-400">
        관리자 권한 확인 완료
      </p>


      <div className="flex gap-4 mt-8">

        <button
          onClick={() => setTab("roster")}
          className="border border-white px-5 py-2 rounded"
        >
          로스터
        </button>


        <button
          onClick={() => setTab("achievement")}
          className="border border-white px-5 py-2 rounded"
        >
          성과
        </button>

        <button
          onClick={() => setTab("news")}
          className="border border-white px-5 py-2 rounded"
        >
          뉴스
        </button>

        <button
          onClick={() => setTab("schedule")}
          className="border border-white px-5 py-2 rounded"
        >
          일정
        </button>

        <button
          onClick={() => setTab("sponsor")}
          className="border border-white px-5 py-2 rounded"
        >
          스폰서
        </button>

      </div>


      <section className="mt-10">

        {tab === "roster" && (
          <RosterAdmin />
        )}


        {tab === "achievement" && (
          <AchievementAdmin />
        )}

        {tab === "news" && (
          <NewsAdmin />
        )}

        {tab === "schedule" && (
          <ScheduleAdmin />
        )}

        {tab === "sponsor" && (
          <SponsorAdmin />
        )}

      </section>

    </main>
  );
}