// دوال مشتركة للتعامل مع أكواد الخصم — مقارنة بدون حساسية لحروف كبيرة/صغيرة ومن غير مسافات

export const normCode = (c: string) => (c || "").trim().toLowerCase();

// بيدور على كود فعّال حتى لو الحروف مختلفة أو فيه مسافات، ومبيتعطلش لو الكود متكرر
export async function findActiveDiscount(supabase: any, code: string) {
  const target = normCode(code);
  if (!target) return null;

  const { data } = await supabase
    .from("discount_codes")
    .select("*")
    .eq("active", true);

  return (data || []).find((d: any) => normCode(d.code) === target) || null;
}

// هل الرقم ده استخدم الكود ده قبل كده؟
export async function hasUsedCode(supabase: any, code: string, phone: string) {
  const { data, error } = await supabase
    .from("discount_usage")
    .select("code")
    .eq("phone", (phone || "").trim());

  if (error) return { error: true, used: false };
  return {
    error: false,
    used: (data || []).some((r: any) => normCode(r.code) === normCode(code)),
  };
}