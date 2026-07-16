"use client";

import { useEffect,useState } from "react";
import { supabase } from "../../../lib/supabase";


type Player={

id:number;
name:string;
role:string;
legend:string;
style:string;

};



export default function RosterAdmin(){


const [players,setPlayers]=useState<Player[]>([]);


const [form,setForm]=useState({

name:"",
role:"",
legend:"",
style:""

});


const [edit,setEdit]=useState<number|null>(null);





async function load(){


const {data}=await supabase

.from("roster")
.select("*")
.order("id");


if(data)setPlayers(data);


}




useEffect(()=>{

load();

},[]);






async function save(){



if(edit){


await supabase

.from("roster")

.update(form)

.eq("id",edit);



}else{


await supabase

.from("roster")

.insert(form);


}



setForm({

name:"",
role:"",
legend:"",
style:""

});


setEdit(null);

load();


}







async function remove(id:number){


await supabase

.from("roster")

.delete()

.eq("id",id);


load();


}








function editPlayer(player:Player){


setEdit(player.id);


setForm({

name:player.name,

role:player.role,

legend:player.legend,

style:player.style

});


}






return(

<div>


<h2 className="text-3xl font-bold mb-5">

ROSTER MANAGEMENT

</h2>



<input

className="block bg-zinc-900 p-3 mb-3"

placeholder="Name"

value={form.name}

onChange={e=>setForm({...form,name:e.target.value})}

/>



<input

className="block bg-zinc-900 p-3 mb-3"

placeholder="Role"

value={form.role}

onChange={e=>setForm({...form,role:e.target.value})}

/>




<input

className="block bg-zinc-900 p-3 mb-3"

placeholder="Legend"

value={form.legend}

onChange={e=>setForm({...form,legend:e.target.value})}

/>





<input

className="block bg-zinc-900 p-3 mb-3"

placeholder="Style"

value={form.style}

onChange={e=>setForm({...form,style:e.target.value})}

/>





<button

onClick={save}

className="bg-purple-600 px-5 py-3"

>

{edit ? "UPDATE":"ADD"}

</button>








<div className="mt-10">


{

players.map(player=>(


<div

key={player.id}

className="
border
border-purple-900
p-5
mb-3
"

>


<h3 className="text-2xl font-bold">

{player.name}

</h3>


<p>{player.role}</p>

<p>{player.legend}</p>

<p>{player.style}</p>



<button

onClick={()=>editPlayer(player)}

className="mr-3 bg-blue-600 px-3 py-2"

>

EDIT

</button>




<button

onClick={()=>remove(player.id)}

className="bg-red-600 px-3 py-2"

>

DELETE

</button>




</div>


))


}



</div>



</div>

)

}