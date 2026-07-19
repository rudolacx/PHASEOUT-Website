"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";


export default function PostWrite(){

  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");


  async function submit(){

    const {
      data:{user}
    } = await supabase.auth.getUser();


    if(!user){
      alert("로그인이 필요합니다");
      return;
    }


    const {error}=await supabase
    .from("posts")
    .insert({

      user_id:user.id,
      title,
      content

    });


    if(error){

      alert(error.message);
      return;

    }


    alert("게시글 작성 완료");

    window.location.reload();

  }



  return(

    <div className="bg-zinc-900 p-5 rounded-xl">


      <h2 className="text-xl font-bold mb-5">
        게시글 작성
      </h2>


      <input

      className="w-full bg-zinc-800 p-3 rounded mb-3"

      placeholder="제목"

      value={title}

      onChange={(e)=>setTitle(e.target.value)}

      />


      <textarea

      className="w-full bg-zinc-800 p-3 rounded h-32"

      placeholder="내용"

      value={content}

      onChange={(e)=>setContent(e.target.value)}

      />


      <button

      onClick={submit}

      className="bg-purple-600 px-5 py-3 rounded mt-3"

      >

      작성하기

      </button>


    </div>

  );


}