import fs from "fs";
import path from "path";

export async function POST(req: Request) {

const body = await req.json();

const email = body.email;

const file =
path.join(
process.cwd(),
"data",
"emails.json"
);

const current =
JSON.parse(
fs.readFileSync(
file,
"utf8"
)
);

current.push({
email,
date:
new Date(),
});

fs.writeFileSync(
file,
JSON.stringify(
current,
null,
2
)
);

return Response.json({
success:true,
});

}