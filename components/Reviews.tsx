"use client";

import {
useState
}
from "react";

export default function Reviews(){

const [
name,
setName
]=
useState("");

const [
review,
setReview
]=
useState("");

async function send(){

await fetch(
"/api/review",
{

method:
"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify({

name,

review,

}),

}

);

alert(
"Review submitted ✨"
);

setName("");

setReview("");

}

return(

<section
className="
py-24
px-8
"
>

<h2
className="
text-5xl
mb-8
"
>
Reviews
</h2>

<div
className="
flex
flex-col
gap-4
max-w-[600px]
"
>

<input

value={name}

onChange={(e)=>
setName(
e.target.value
)}

placeholder="Name"

className="
p-5
rounded-full
"
/>

<textarea

value={review}

onChange={(e)=>
setReview(
e.target.value
)}

placeholder="Review"

className="
p-5
rounded-[30px]
"
/>

<button

onClick={send}

className="
bg-[#55614A]
text-white
p-5
rounded-full
"

>

Submit

</button>

</div>

</section>

);

}