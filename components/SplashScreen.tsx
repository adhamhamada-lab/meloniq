"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen({
children,
}:{
children: React.ReactNode;
}) {

const [show,setShow]=
useState(true);

useEffect(()=>{

const timer =
setTimeout(
()=>{
setShow(false);
},
2200
);

return ()=>{
clearTimeout(timer);
};

},[]);

if(show){

return(

<div
className="
fixed
inset-0
bg-[#E4E7D6]
flex
items-center
justify-center
z-[9999]
"
>

<div className="logo-loading">

<Image
src="/images/logoo.png"
alt="Meloniq"
width={280}
height={120}
priority
/>

</div>

</div>

);

}

return <>{children}</>;

}