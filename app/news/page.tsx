"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";


type News = {

id:number;

title:string;

content:string;

date:string;

};



export default function NewsPage(){


const [news,setNews]=useState<News[]>([]);



async function loadNews(){


const {data,error}=await supabase

.from("news")

.select("*")

.order("id",{ascending:false});



if(!error && data){

setNews(data);

}


}





useEffect(()=>{

loadNews();

},[]);







return(

<main

className="
min-h-screen
bg-black
text-white
px-10
py-20
"

>


<h1

className="
text-6xl
font-black
text-purple-500
"

>

PHASEOUT NEWS

</h1>





<div

className="
mt-10
grid
gap-6
"

>


{

news.map(item=>(


<div

key={item.id}

className="
rounded-xl
border
border-purple-900
bg-zinc-950
p-6
"

>


<h2

className="
text-3xl
font-bold
"

>

{item.title}

</h2>



<p

className="
mt-3
text-gray-400
"

>

{item.date}

</p>



<p

className="
mt-5
text-gray-300
"

>

{item.content}

</p>



</div>


))


}


</div>



</main>

)

}