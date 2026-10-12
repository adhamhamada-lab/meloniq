import { createClient } from "@supabase/supabase-js";
import { findActiveDiscount, hasUsedCode } from "../../../../lib/discount";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { code, phone } = await req.json();

  const discount = await findActiveDiscount(supabase, code);

  if (!discount) {
    return Response.json({ valid: false, message: "Invalid or expired code" });
  }

  if (phone) {
    const usage = await hasUsedCode(supabase, discount.code, phone);
    if (usage.used) {
      return Response.json({ valid: false, message: "You have already used this code" });
    }
  }

  return Response.json({ valid: true, type: discount.type, value: discount.value });
}