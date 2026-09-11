import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { code, phone } = await req.json();

  const { data, error } = await supabase
    .from("discount_codes")
    .select("*")
    .eq("code", code)
    .eq("active", true)
    .single();

  if (error || !data) {
    return Response.json({ valid: false, message: "Invalid or expired code" });
  }

  if (phone) {
    const { data: usage } = await supabase
      .from("discount_usage")
      .select("id")
      .eq("code", code)
      .eq("phone", phone)
      .single();

    if (usage) {
      return Response.json({ valid: false, message: "You have already used this code" });
    }
  }

  return Response.json({ valid: true, type: data.type, value: data.value });
}