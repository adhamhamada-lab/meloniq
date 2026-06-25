import Image from "next/image";

export default function Loading() {
return (

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
src="/images/logooo.png"
alt="Meloniq"
width={260}
height={120}
priority
/>

</div>

</div>

);
}