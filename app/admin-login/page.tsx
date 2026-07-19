"use client";


import {useState} from "react";
import {supabase} from "@/lib/supabase";
import {useRouter} from "next/navigation";


export default function AdminLogin(){


const router=useRouter();


const [email,setEmail]=useState("");
const [password,setPassword]=useState("");



async function login(){


const {data,error}=await supabase.auth.signInWithPassword({

email,
password

});


if(error){

alert(error.message);
return;

}



const {data:profile}=await supabase

.from("profiles")

.select("role")

.eq("id",data.user.id)

.single();



if(!profile || profile.role !== "admin"){


alert("관리자 권한 없음");

await supabase.auth.signOut();

return;


}



router.push("/admin");


}



return(

<main className="bg-black text-white min-h-screen flex items-center justify-center">


<div className="bg-zinc-900 p-10 rounded-xl">


<h1 className="text-3xl font-bold mb-5">
PHASEOUT ADMIN
</h1>


<input
className="bg-zinc-800 p-3 mb-3"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>


<input
className="bg-zinc-800 p-3 mb-5"
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>


<button
onClick={login}
className="bg-purple-600 p-3 w-full"
>
ADMIN LOGIN
</button>


</div>


</main>

)

}