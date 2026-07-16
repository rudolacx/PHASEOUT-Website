"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";


type Sponsor = {

id:number;
name:string;
logo:string;
description:string;

};



export default function SponsorAdmin(){


const [sponsors,setSponsors]=useState<Sponsor[]>([]);


const [edit,setEdit]=useState<number|null>(null);



const [form,setForm]=useState({

name:"",
logo:"",
description:""

});






async function load(){


const {data}=await supabase

.from("sponsors")

.select("*")

.order("id");



if(data){

setSponsors(data);

}


}






useEffect(()=>{

load();

},[]);






async function save(){



if(edit){


await supabase

.from("sponsors")

.update(form)

.eq("id",edit);



}else{


await supabase

.from("sponsors")

.insert(form);



}



setForm({

name:"",
logo:"",
description:""

});


setEdit(null);


load();


}







async function remove(id:number){


await supabase

.from("sponsors")

.delete()

.eq("id",id);


load();


}







function editSponsor(item:Sponsor){


setEdit(item.id);


setForm({

name:item.name,

logo:item.logo || "",

description:item.description || ""

});


}








return(

<div>


<h2 className="
text-3xl
font-bold
mb-5
">

SPONSOR MANAGEMENT

</h2>





<input

className="
block
bg-zinc-900
p-3
mb-3
"

placeholder="Sponsor Name"

value={form.name}

onChange={e=>

setForm({...form,name:e.target.value})

}

/>





<input

className="
block
bg-zinc-900
p-3
mb-3
"

placeholder="Logo URL"

value={form.logo}

onChange={e=>

setForm({...form,logo:e.target.value})

}

/>





<input

className="
block
bg-zinc-900
p-3
mb-3
"

placeholder="Description"

value={form.description}

onChange={e=>

setForm({...form,description:e.target.value})

}

/>






<button

onClick={save}

className="
bg-purple-600
px-5
py-3
"

>

{edit ? "UPDATE":"ADD"}

</button>







<div className="mt-10">


{

sponsors.map(item=>(


<div

key={item.id}

className="
border
border-purple-900
bg-zinc-950
p-5
mb-3
"

>



<h3 className="
text-2xl
font-bold
">

{item.name}

</h3>




<p className="text-gray-400">

{item.description}

</p>





<button

onClick={()=>editSponsor(item)}

className="
bg-blue-600
px-3
py-2
mr-3
"

>

EDIT

</button>





<button

onClick={()=>remove(item.id)}

className="
bg-red-600
px-3
py-2
"

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