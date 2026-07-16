"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "../../lib/supabase";

import RosterAdmin from "./components/RosterAdmin";
import SponsorAdmin from "./components/SponsorAdmin";
import NewsAdmin from "./components/NewsAdmin";
import ScheduleAdmin from "./components/ScheduleAdmin";
import AchievementAdmin from "./components/AchievementAdmin";



export default function AdminPage(){


const router = useRouter();

const [checking,setChecking] = useState(true);





useEffect(()=>{

checkAuth();

},[]);





async function checkAuth(){


const {

data:{
session

}

}=await supabase.auth.getSession();



if(!session){

router.push("/admin/login");

return;

}



setChecking(false);


}







async function logout(){


await supabase.auth.signOut();


router.push("/admin/login");


}






if(checking){


return(

<main

className="
min-h-screen
bg-black
text-white
flex
items-center
justify-center
"

>

Loading...

</main>

)


}








return(

<main

className="
min-h-screen
bg-black
text-white
p-8
"

>



<div

className="
flex
justify-between
items-center
border-b
border-purple-900
pb-6
"

>


<h1

className="
text-5xl
font-black
text-purple-500
"

>

PHASEOUT ADMIN

</h1>





<button

onClick={logout}

className="
bg-red-600
px-6
py-3
rounded-lg
font-bold
hover:bg-red-500
"

>

LOGOUT

</button>



</div>







<section

className="
mt-10
space-y-16
"

>



<div>

<RosterAdmin />

</div>





<div>

<SponsorAdmin />

</div>





<div>

<NewsAdmin />

</div>





<div>

<ScheduleAdmin />

</div>





<div>

<AchievementAdmin />

</div>





</section>





</main>

)


}