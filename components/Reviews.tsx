"use client";

import { useEffect, useState } from "react";

export default function Reviews() {

const [name,setName]=useState("");
const [review,setReview]=useState("");
const [rating,setRating]=useState(5);

const [reviews,setReviews]=useState<any[]>([]);
const [loading,setLoading]=useState(false);

async function loadReviews(){

const res =
await fetch(
"/api/review/list"
);

const data =
await res.json();

setReviews(
data || []
);

}

useEffect(()=>{
loadReviews();
},[]);

async function send(){

if(
!name ||
!review
)
return;

setLoading(true);

const res =
await fetch(
"/api/review",
{
method:"POST",

headers:{
"Content-Type":
"application/json",
},

body:
JSON.stringify({
name,
review,
rating,
}),
}
);

setLoading(false);

if(
res.ok
){

setName("");
setReview("");
setRating(5);

loadReviews();

}

}

return(

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
mb-20
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

<div
className="
flex
gap-2
text-[40px]
justify-center
"
>

{

[1,2,3,4,5].map(
(star)=>(

<button
key={star}

type="button"

onClick={()=>
setRating(
star
)
}

className="
text-[#55614A]
hover:scale-110
duration-200
"
>

{
star <= rating
?
"★"
:
"☆"
}

</button>

)

)

}

</div>

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
bg-[#55614A]
text-white
rounded-full
py-5
hover:opacity-90
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

<div
className="
grid
md:grid-cols-2
gap-8
"
>

{

reviews.map(
(item)=>(

<div

key={
item.id
}

className="
bg-white
rounded-[30px]
p-8
"

>

<div
className="
text-[#55614A]
text-2xl
mb-5
"
>

{
"★".repeat(
item.rating || 5
)
}

</div>

<h3
className="
text-3xl
mb-3
text-[#55614A]
"
>

{
item.name
}

</h3>

<p
className="
text-[#66705D]
leading-relaxed
"
>

{
item.review
}

</p>

</div>

)

)

}

</div>

</div>

</section>

);

}