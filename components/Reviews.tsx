"use client";

import { useState } from "react";

export default function Reviews() {

const [name,setName]=useState("");
const [review,setReview]=useState("");
const [loading,setLoading]=useState(false);

async function send(){

if(!name || !review) return;

setLoading(true);

await fetch(
"/api/review",
{
method:"POST",

headers:{
"Content-Type":"application/json",
},

body:JSON.stringify({
name,
review,
}),
}
);

setLoading(false);

setName("");
setReview("");

alert("Thank you ✨");

}

return (

<section
className="
px-6
md:px-16
py-32
bg-[#E4E7D6]
"
>

<div
className="
max-w-[1200px]
mx-auto
"
>

<p
className="
uppercase
tracking-[0.25em]
text-[#7C8572]
text-sm
mb-4
"
>
Customer Love
</p>

<h2
className="
text-[56px]
md:text-[100px]
leading-[0.9]
text-[#55614A]
mb-16
"
>
Reviews
</h2>

<div
className="
bg-[#D7DCCB]
rounded-[40px]
p-8
md:p-14
max-w-[760px]
"
>

<div
className="
flex
flex-col
gap-5
"
>

<input
value={name}
onChange={(e)=>
setName(
e.target.value
)}
placeholder="Your Name"
className="
w-full
bg-white
rounded-full
px-8
py-5
outline-none
text-[#55614A]
"
/>

<textarea
value={review}
onChange={(e)=>
setReview(
e.target.value
)}
placeholder="Tell us about your experience..."
rows={6}
className="
w-full
bg-white
rounded-[30px]
px-8
py-6
outline-none
resize-none
text-[#55614A]
"
/>

<button
onClick={send}
disabled={loading}
className="
mt-3
bg-[#55614A]
text-white
rounded-full
py-5
hover:scale-[1.02]
duration-300
"
>

{
loading
?
"Sending..."
:
"Submit Review"
}

</button>

</div>

</div>

</div>

</section>

);

}