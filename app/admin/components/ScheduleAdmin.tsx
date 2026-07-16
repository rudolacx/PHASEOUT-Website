"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";


type Schedule = {

id:number;
event:string;
date:string;
time:string;

};



export default function ScheduleAdmin(){


const [schedule,setSchedule]=useState<Schedule[]>([]);

const [edit,setEdit]=useState<number|null>(null);



const [form,setForm]=useState({

event:"",
date:"",
time:""

});







async function load(){


const {data,error}=await supabase

.from("schedule")

.select("*")

.order("date",{ascending:true});



if(!error && data){

setSchedule(data);

}


}







useEffect(()=>{

load();

},[]);








async function save(){


if(edit){


await supabase

.from("schedule")

.update(form)

.eq("id",edit);



}else{


await supabase

.from("schedule")

.insert(form);


}




setForm({

event:"",
date:"",
time:""

});


setEdit(null);

load();


}







async function remove(id:number){


await supabase

.from("schedule")

.delete()

.eq("id",id);


load();


}







function editSchedule(item:Schedule){


setEdit(item.id);


setForm({

event:item.event,

date:item.date,

time:item.time

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

SCHEDULE MANAGEMENT

</h2>






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







<input

className="
block
bg-zinc-900
p-3
mb-3
"

placeholder="Time"

value={form.time}

onChange={e=>

setForm({

...form,

time:e.target.value

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

schedule.map(item=>(


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

{item.event}

</h3>



<p>

📅 {item.date}

</p>



<p>

⏰ {item.time}

</p>





<button

onClick={()=>editSchedule(item)}

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