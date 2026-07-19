"use client";

import {useState} from "react";
import {supabase} from "@/lib/supabase";


export default function NewsAdmin(){


const [title,setTitle]=useState("");
const [content,setContent]=useState("");



async function addNews(){


await supabase.from("news").insert({

title,

content

});


alert("뉴스 등록 완료");


}



return(

<div className="bg-zinc-900 p-5">


<h2 className="text-2xl">
뉴스 추가
</h2>


<input

className="bg-zinc-800 p-3 w-full"

placeholder="제목"

onChange={(e)=>setTitle(e.target.value)}

/>


<textarea

className="bg-zinc-800 p-3 w-full mt-3"

placeholder="내용"

onChange={(e)=>setContent(e.target.value)}

>


</textarea>


<button

onClick={addNews}

className="bg-purple-600 p-3 mt-3"

>
등록
</button>


</div>

)

}