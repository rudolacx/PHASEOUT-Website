"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";


type Achievement = {

id:number;
year:string;
event:string;
placement:string;
date:string;

};



export default function AchievementAdmin(){


const [results,setResults]=useState<Achievement[]>([]);

const [edit,setEdit]=useState<number|null>(null);



const [form,setForm]=useState({

year:"",
event:"",
placement:"",
date:""

});






async function load(){


const {data,error}=await supabase

.from("achievements")

.select("*")

.order("date",{ascending:false});



if(!error && data){

setResults(data);

}


}






useEffect(()=>{

load();

},[]);







async function save(){



if(edit){


await supabase

.from("achievements")

.update(form)

.eq("id",edit);



}else{


await supabase

.from("achievements")

.insert(form);



}



setForm({

year:"",
event:"",
placement:"",
date:""

});


setEdit(null);

load();


}







async function remove(id:number){


await supabase

.from("achievements")

.delete()

.eq("id",id);



load();


}







function editResult(item:Achievement){


setEdit(item.id);


setForm({

year:item.year,

event:item.event,

placement:item.placement,

date:item.date

});


}









return(

<div>


<h2

className="
text-3xl
font-bold
mb-5
"

>

RESULT MANAGEMENT

</h2>







<input

className="
block
bg-zinc-900
p-3
mb-3
"

placeholder="Year"

value={form.year}

onChange={e=>

setForm({

...form,

year:e.target.value

})

}

/>







<input

className="
block
bg-zinc-900
p-3
mb-3
"

placeholder="Event"

value={form.event}

onChange={e=>

setForm({

...form,

event:e.target.value

})

}

/>








<input

className="
block
bg-zinc-900
p-3
mb-3
"

placeholder="Placement"

value={form.placement}

onChange={e=>

setForm({

...form,

placement:e.target.value

})

}

/>







<input

type="date"

className="
block
bg-zinc-900
p-3
mb-3
"

value={form.date}

onChange={e=>

setForm({

...form,

date:e.target.value

})

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

results.map(item=>(


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



<h3

className="
text-2xl
font-bold
"

>

{item.event}

</h3>



<p>

{item.year}

</p>




<p>

🏆 {item.placement}

</p>



<p className="text-gray-400">

📅 {item.date}

</p>







<button

onClick={()=>editResult(item)}

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