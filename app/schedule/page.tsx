"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";



type Match = {

id:number;

event:string;

date:string;

time:string;

};



export default function SchedulePage(){


const [matches,setMatches]=useState<Match[]>([]);





async function loadSchedule(){


const {data,error}=await supabase

.from("schedule")

.select("*")

.order("date",{ascending:true});



if(!error && data){

setMatches(data);

}


}





useEffect(()=>{

loadSchedule();

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

PHASEOUT SCHEDULE

</h1>





<div

className="
mt-10
grid
gap-6
md:grid-cols-2
"

>


{

matches.map(match=>(


<div

key={match.id}

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

{match.event}

</h2>




<p

className="
mt-4
text-purple-400
"

>

📅 {match.date}

</p>




<p

className="
text-gray-400
"

>

⏰ {match.time}

</p>




</div>


))


}



</div>





</main>


)

}