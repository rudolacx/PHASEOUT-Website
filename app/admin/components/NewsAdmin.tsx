"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";


type News = {

id:number;
title:string;
content:string;
date:string;

};



export default function NewsAdmin(){


const [news,setNews]=useState<News[]>([]);

const [edit,setEdit]=useState<number|null>(null);



const [form,setForm]=useState({

title:"",
content:"",
date:""

});







async function load(){


const {data,error}=await supabase

.from("news")

.select("*")

.order("id",{ascending:false});



if(!error && data){

setNews(data);

}


}






useEffect(()=>{

load();

},[]);








async function save(){



if(edit){


await supabase

.from("news")

.update(form)

.eq("id",edit);



}else{


await supabase

.from("news")

.insert(form);



}



setForm({

title:"",
content:"",
date:""

});


setEdit(null);

load();


}







async function remove(id:number){


await supabase

.from("news")

.delete()

.eq("id",id);



load();


}







function editNews(item:News){


setEdit(item.id);


setForm({

title:item.title,

content:item.content,

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

NEWS MANAGEMENT

</h2>







<input

className="
block
bg-zinc-900
p-3
mb-3
"

placeholder="Title"

value={form.title}

onChange={e=>

setForm({

...form,

title:e.target.value

})

}

/>








<textarea

className="
block
bg-zinc-900
p-3
mb-3
w-full
"

placeholder="Content"

value={form.content}

onChange={e=>

setForm({

...form,

content:e.target.value

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

news.map(item=>(


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

{item.title}

</h3>



<p className="text-gray-400">

{item.date}

</p>




<p className="mt-3">

{item.content}

</p>







<button

onClick={()=>editNews(item)}

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