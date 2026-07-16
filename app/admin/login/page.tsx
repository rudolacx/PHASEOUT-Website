"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";


export default function LoginPage(){

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");



  async function login(){


    const { error } = await supabase.auth.signInWithPassword({

      email,
      password

    });



    if(error){

      setError(error.message);
      return;

    }



    router.push("/admin");

  }






  return(

    <main

    className="
    min-h-screen
    bg-black
    flex
    items-center
    justify-center
    text-white
    "

    >


      <div

      className="
      w-96
      rounded-xl
      border
      border-purple-900
      bg-zinc-950
      p-10
      "

      >


        <h1

        className="
        text-4xl
        font-black
        text-purple-500
        mb-8
        "

        >

        PHASEOUT ADMIN

        </h1>



        <input

        className="
        w-full
        bg-black
        border
        p-3
        mb-3
        "

        placeholder="Email"

        value={email}

        onChange={(e)=>setEmail(e.target.value)}

        />





        <input

        type="password"

        className="
        w-full
        bg-black
        border
        p-3
        mb-3
        "

        placeholder="Password"

        value={password}

        onChange={(e)=>setPassword(e.target.value)}

        />





        <button

        onClick={login}

        className="
        w-full
        bg-purple-600
        py-3
        font-bold
        "

        >

        LOGIN

        </button>





        {

        error &&

        <p className="
        text-red-500
        mt-4
        "

        >

        {error}

        </p>

        }



      </div>


    </main>


  )

}