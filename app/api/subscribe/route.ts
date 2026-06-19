export async function POST(req: Request) {

const body = await req.json();

const email = body.email;

console.log("NEW EMAIL:", email);

return Response.json({
success: true,
});

}