"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/app/context/LanguageContext";

// ألوان الأفاتار مستوحاة من ألوان الصابونات نفسها (بطيخ / أناناس / صبار / سيچ)
const AVATAR_COLORS = ["#55614A", "#D9838C", "#E3B65E", "#7FA98C"];

function avatarColor(name: string) {
  if (!name) return AVATAR_COLORS[0];
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

function StarIcon({ filled, size = 16 }: { filled: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.6 1.6 6.8L12 17.6l-6.2 3.3 1.6-6.8L2.2 9.5l6.9-.7L12 2.5z" />
    </svg>
  );
}

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <StarIcon key={s} filled={s <= rating} size={size} />
      ))}
    </div>
  );
}

export default function Reviews() {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  async function loadReviews() {
    const res = await fetch("/api/review/list");
    const data = await res.json();
    setReviews(data || []);
  }

  useEffect(() => { loadReviews(); }, []);

  async function send() {
    if (!name || !review) return;
    setLoading(true);
    const res = await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, review, rating }),
    });
    setLoading(false);
    if (res.ok) {
      setName(""); setReview(""); setRating(5);
      setShowForm(false);
      loadReviews();
    }
  }

  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + (r.rating || 5), 0) / reviews.length
    : 0;

  return (
    <section className="px-6 md:px-16 py-24 md:py-36 bg-[#E4E7D6]">
      <div className="max-w-[1200px] mx-auto">

        {/* HEADER: title + aggregate rating + write-review toggle */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 md:mb-20">
          <div>
            <p className="uppercase tracking-[0.25em] text-[#7C8572] text-sm mb-4">
              {t.customerLove}
            </p>
            <h2 className="text-[56px] md:text-[96px] leading-[0.9] text-[#55614A]">
              {t.reviews}
            </h2>
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            {reviews.length > 0 && (
              <div className="flex items-center gap-4">
                <span className="text-[44px] md:text-[60px] text-[#55614A] leading-none">
                  {avgRating.toFixed(1)}
                </span>
                <div>
                  <div className="text-[#55614A]">
                    <StarRow rating={Math.round(avgRating)} size={16} />
                  </div>
                  <p className="text-[#66705D] text-xs mt-1.5">
                    {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
                  </p>
                </div>
              </div>
            )}
            <button
              onClick={() => setShowForm(true)}
              className="px-7 py-3.5 rounded-full border border-[#55614A] text-[#55614A] text-sm uppercase tracking-[0.15em] hover:bg-[#55614A] hover:text-white duration-300 shrink-0"
            >
              {t.submitReview}
            </button>
          </div>
        </div>

        {/* WRITE A REVIEW — collapsible panel */}
        {showForm && (
          <div className="relative bg-[#D7DCCB] rounded-[32px] p-8 md:p-12 max-w-[640px] mb-16 md:mb-20">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-6 right-6 text-[#55614A] opacity-50 hover:opacity-100 duration-200 text-2xl"
              aria-label="Close"
            >
              ×
            </button>
            <div className="flex flex-col gap-5">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.yourName}
                className="w-full bg-white rounded-full px-8 py-5 outline-none text-[#55614A]"
              />
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`duration-200 hover:scale-110 ${star <= rating ? "text-[#55614A]" : "text-[#B7C0A5]"}`}
                  >
                    <StarIcon filled={star <= rating} size={32} />
                  </button>
                ))}
              </div>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder={t.tellUsExperience}
                rows={6}
                className="w-full bg-white rounded-[30px] px-8 py-6 outline-none resize-none text-[#55614A]"
              />
              <button onClick={send} disabled={loading} className="bg-[#55614A] text-white rounded-full py-5 hover:opacity-90 duration-300">
                {loading ? t.sending : t.submitReview}
              </button>
            </div>
          </div>
        )}

        {/* REVIEWS — horizontal card carousel */}
        {reviews.length === 0 ? (
          <p className="text-[#66705D]">{t.tellUsExperience}</p>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 lg:mx-0 lg:px-0 snap-x snap-mandatory">
            {reviews.map((item) => (
              <div
                key={item.id}
                className="relative shrink-0 w-[280px] md:w-[340px] bg-white rounded-[28px] p-8 snap-start overflow-hidden"
              >
                <span
                  className="absolute -top-4 right-5 text-[110px] leading-none text-[#EEF0E4] select-none pointer-events-none"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  ”
                </span>

                <div className="relative flex items-center gap-3 mb-6">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white text-base shrink-0"
                    style={{ backgroundColor: avatarColor(item.name) }}
                  >
                    {item.name?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <p className="text-[#55614A] font-medium leading-tight">{item.name}</p>
                    <div className="text-[#55614A] mt-1">
                      <StarRow rating={item.rating || 5} size={13} />
                    </div>
                  </div>
                </div>

                <p className="relative text-[#66705D] leading-relaxed">{item.review}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}