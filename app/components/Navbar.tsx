"use client";

import Link from "next/link";


export default function Navbar(){


return(

<nav

className="
fixed
top-0
z-50
w-full
border-b
border-purple-900
bg-black/80
backdrop-blur
"

>


<div

className="
mx-auto
flex
max-w-7xl
items-center
justify-between
px-8
py-5
"

>


{/* LOGO */}

<Link

href="/"

className="
text-3xl
font-black
text-purple-500
"

>

PHASEOUT

</Link>





{/* MENU */}

<div

className="
flex
items-center
gap-5
text-sm
font-bold
text-white
"

>



<Link

href="/"

className="
transition
hover:text-purple-400
"

>

HOME

</Link>





<Link

href="/#roster"

className="
transition
hover:text-purple-400
"

>

ROSTER

</Link>





<Link

href="/about"

className="
transition
hover:text-purple-400
"

>

ABOUT

</Link>





<Link

href="/news"

className="
transition
hover:text-purple-400
"

>

NEWS

</Link>





<Link

href="/schedule"

className="
transition
hover:text-purple-400
"

>

SCHEDULE

</Link>





<Link

href="/achievement"

className="
transition
hover:text-purple-400
"

>

RESULT

</Link>






{/* X LINK */}

<Link

href="https://x.com/PHASEOUTAPEX"

target="_blank"

rel="noopener noreferrer"

className="
transition
hover:text-purple-400
"

>

X

</Link>







<Link

href="/#sponsor"

className="
transition
hover:text-purple-400
"

>

SPONSOR

</Link>







<Link

href="/admin"

className="
rounded
bg-purple-600
px-4
py-2
transition
hover:bg-purple-500
"

>

ADMIN

</Link>





</div>



</div>


</nav>


)

}