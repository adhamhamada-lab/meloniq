import fs from "fs";
import path from "path";

export async function POST(req: Request) {
try {

const body = await req.json();

const email = body.email;
console.log("EMAIL RECEIVED:", email);

const filePath = path.join(
process.cwd(),
"data",
"emails.json"
);

let emails = [];

if (fs.existsSync(filePath)) {

emails = JSON.parse(
fs.readFileSync(
filePath,
"utf8"
)
);

}

emails.push({
email,
date:
new Date(),
});

fs.writeFileSync(
filePath,
JSON.stringify(
emails,
null,
2
)
);

return Response.json({
success:true,
});

}

catch(err){

console.log(err);

return Response.json({
success:false,
});

}

}