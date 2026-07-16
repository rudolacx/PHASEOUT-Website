"use client";


type Props={

name:string;

role:string;

legend:string;

style:string;

}



export default function PlayerCard({

name,

role,

legend,

style

}:Props){



return(

<div

className="
group
relative
overflow-hidden
rounded-2xl
border
border-purple-800
bg-gradient-to-br
from-purple-950
to-black
p-6
transition
hover:-translate-y-2
hover:border-purple-400
"

>



<div

className="
absolute
right-0
top-0
h-24
w-24
rounded-full
bg-purple-600
opacity-20
blur-2xl
"

></div>






<h2

className="
text-4xl
font-black
text-white
"

>

{name}

</h2>






<p

className="
mt-3
text-xl
font-bold
text-purple-400
"

>

{role}

</p>






<div

className="
mt-5
space-y-2
text-gray-300
"

>

<p>

🎮 Legend : {legend || "미정"}

</p>


<p>

⚡ Style : {style}

</p>


</div>






<div

className="
mt-6
inline-block
rounded-full
bg-purple-600
px-4
py-2
font-bold
"

>

POT

</div>






</div>


)

}