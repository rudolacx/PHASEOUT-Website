"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";


type Achievement = {
  id: number;
  year: string;
  event: string;
  placement: string;
  date: string;
};



export default function AchievementPage() {


  const [results, setResults] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);



  async function loadAchievements() {


    const { data, error } = await supabase
      .from("achievements")
      .select("*")
      .order("date", {
        ascending: false
      });



    if (error) {

      console.log("SUPABASE ERROR:", error);

    }



    if (data) {

      console.log("ACHIEVEMENTS:", data);

      setResults(data);

    }



    setLoading(false);

  }





  useEffect(() => {

    loadAchievements();

  }, []);







  return (

    <main
      className="
      min-h-screen
      bg-black
      text-white
      px-10
      py-24
      "
    >


      <h1
        className="
        text-6xl
        font-black
        text-purple-500
        "
      >

        PHASEOUT RESULTS

      </h1>



      <p className="mt-3 text-gray-400">

        Competitive Achievement History

      </p>





      {
        loading && (

          <p className="mt-10">

            Loading...

          </p>

        )
      }







      <div
        className="
        mt-10
        grid
        gap-6
        md:grid-cols-2
        "
      >



        {
          results.map((item) => (


            <div
              key={item.id}
              className="
              rounded-2xl
              border
              border-purple-900
              bg-zinc-950
              p-8
              "
            >


              <p
                className="
                text-purple-400
                font-bold
                "
              >

                {item.year}

              </p>



              <h2
                className="
                mt-3
                text-3xl
                font-black
                "
              >

                {item.event}

              </h2>



              <p className="mt-5 text-xl">

                🏆 {item.placement}

              </p>



              <p className="mt-2 text-gray-400">

                📅 {item.date}

              </p>



            </div>


          ))
        }



      </div>





      {
        !loading && results.length === 0 && (

          <p className="mt-10 text-gray-400">

            등록된 성적이 없습니다.

          </p>

        )
      }



    </main>

  );

}