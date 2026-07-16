"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Navbar from "./components/Navbar";
import PlayerCard from "./components/PlayerCard";

import { supabase } from "../lib/supabase";



type Player = {
  id:number;
  name:string;
  role?:string;
  legend?:string;
  style?:string;
};



type Sponsor = {
  id:number;
  name:string;
  logo?:string;
  description?:string;
};




export default function Home(){


const [players,setPlayers]=useState<Player[]>([]);

const [sponsors,setSponsors]=useState<Sponsor[]>([]);

const [loading,setLoading]=useState(true);





async function loadData(){


setLoading(true);



const {data:rosterData,error:rosterError}=await supabase

.from("roster")

.select("*")

.order("id",{ascending:true});



if(!rosterError && rosterData){

setPlayers(rosterData);

}






const {data:sponsorData,error:sponsorError}=await supabase

.from("sponsors")

.select("*")

.order("id",{ascending:true});



if(!sponsorError && sponsorData){

setSponsors(sponsorData);

}



setLoading(false);


}







useEffect(()=>{

loadData();

},[]);







return(

<>

<Navbar />


<main

className="
min-h-screen
bg-black
text-white
"

>


{/* HERO */}

<section

className="
flex
min-h-screen
flex-col
items-center
justify-center
bg-gradient-to-b
from-purple-950
to-black
"

>


<Image

src="/logo.png"

width={250}

height={250}

alt="PHASEOUT"

/>



<h1

className="
mt-6
text-7xl
font-black
text-purple-500
"

>

PHASEOUT

</h1>



<p className="text-gray-400">

EST. 2025

</p>


<p className="text-gray-500">

APEX LEGENDS ESPORTS

</p>


</section>







{/* ROSTER */}

<section

id="roster"

className="
px-10
py-20
"

>


<h2

className="
text-5xl
font-black
text-purple-500
"

>

ROSTER

</h2>




{

loading ?

<p className="mt-10">

Loading...

</p>


:


<div

className="
mt-10
grid
gap-6
md:grid-cols-3
"

>


{

players.map(player=>(


<PlayerCard

key={player.id}

name={player.name}

role={player.role || "미정"}

legend={player.legend || "미정"}

style={player.style || "미정"}

/>


))


}


</div>


}



</section>









{/* SPONSOR */}

<section

id="sponsor"

className="
px-10
py-20
"

>


<h2

className="
text-5xl
font-black
text-purple-500
"

>

SPONSOR

</h2>




<div

className="
mt-10
grid
gap-6
md:grid-cols-3
"

>


{

sponsors.map(sponsor=>(


<div

key={sponsor.id}

className="
rounded-xl
border
border-purple-800
bg-zinc-950
p-6
"

>



{

sponsor.logo &&

<Image

src={sponsor.logo}

width={200}

height={100}

alt={sponsor.name}

/>

}



<h3

className="
mt-4
text-2xl
font-bold
"

>

{sponsor.name}

</h3>




<p

className="
text-gray-400
"

>

{sponsor.description || "Official Partner"}

</p>



</div>


))


}



</div>


</section>







<footer

className="
border-t
border-zinc-800
p-10
text-center
text-gray-500
"

>

PHASEOUT ESPORTS

<br/>

POT

</footer>




</main>

</>

)

}