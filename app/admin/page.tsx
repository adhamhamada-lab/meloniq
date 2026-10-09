"use client";

import { useEffect, useState } from "react";
import { normalizeProduct, productPrice } from "@/lib/products";

type Item = {
  product: string;
  quantity: number;
};

type Order = {
  id: number;
  name: string;
  contact: string;
  address: string;
  status: string;
  created_at: string;
  items: Item[];
  discount_code?: string;
  total?: number;
};

type DiscountCode = {
  id: number;
  code: string;
  type: string;
  value: number;
  active: boolean;
  created_at: string;
};

function calcOrderTotal(o: Order, discounts: DiscountCode[]) {
  // لو الـ total محفوظ في الـ database استخدمه
  if (o.total) return o.total;

  // لو لأ احسبه من الـ items مع الخصم
  const raw = (o.items || []).reduce((sum, item) => {
    return sum + productPrice(item.product) * item.quantity;
  }, 0);

  if (!o.discount_code) return raw;

  const discount = discounts.find(
    (d) => d.code.toLowerCase() === o.discount_code?.toLowerCase()
  );
  if (!discount) return raw;

  if (discount.type === "percentage") {
    return Math.round(raw * (1 - discount.value / 100));
  } else {
    return raw - discount.value;
  }
}

export default function AdminPage() {
  const [tab, setTab] = useState<"preorders" | "revenue" | "discounts">("preorders");
  const [preorders, setPreorders] = useState<Order[]>([]);
  const [discounts, setDiscounts] = useState<DiscountCode[]>([]);
  const [loading, setLoading] = useState(true);

  const [newCode, setNewCode] = useState("");
  const [newType, setNewType] = useState("percentage");
  const [newValue, setNewValue] = useState("");
  const [addingCode, setAddingCode] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/preorders").then((r) => r.json()),
      fetch("/api/discount").then((r) => r.json()),
    ]).then(([preordersData, discountsData]) => {
      setPreorders(preordersData.data || []);
      setDiscounts(discountsData.data || []);
      setLoading(false);
    });
  }, []);

  async function toggleStatus(id: number, current: string) {
    const next = current === "done" ? "pending" : "done";
    setPreorders((prev) => prev.map((o) => (o.id === id ? { ...o, status: next } : o)));
    await fetch(`/api/preorder/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
  }

  async function toggleDiscountActive(id: number, current: boolean) {
    setDiscounts((prev) => prev.map((d) => (d.id === id ? { ...d, active: !current } : d)));
    await fetch(`/api/discount/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !current }),
    });
  }

  async function addDiscountCode() {
    if (!newCode.trim() || !newValue) return;
    setAddingCode(true);
    const res = await fetch("/api/discount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: newCode, type: newType, value: Number(newValue) }),
    });
    const data = await res.json();
    if (data.success) {
      setDiscounts((prev) => [data.data[0], ...prev]);
      setNewCode("");
      setNewValue("");
    }
    setAddingCode(false);
  }

  const productTotals = preorders
    .filter((o) => o.status !== "done")
    .flatMap((o) => o.items || [])
    .reduce((acc, item) => {
      const key = normalizeProduct(item.product);
      acc[key] = (acc[key] || 0) + item.quantity;
      return acc;
    }, {} as Record<string, number>);

  const totalRevenue = preorders.reduce((sum, o) => sum + calcOrderTotal(o, discounts), 0);
  const collectedRevenue = preorders.filter((o) => o.status === "done").reduce((sum, o) => sum + calcOrderTotal(o, discounts), 0);
  const pendingRevenue = preorders.filter((o) => o.status !== "done").reduce((sum, o) => sum + calcOrderTotal(o, discounts), 0);

  const pending = preorders.filter((o) => o.status !== "done");
  const done = preorders.filter((o) => o.status === "done");

  // الإيرادات الشهرية — من أول شهر فيه طلب لحد الشهر الحالي
  const now = new Date();
  const orderTimes = preorders
    .map((o) => new Date(o.created_at).getTime())
    .filter((n) => !isNaN(n));
  const firstDate = orderTimes.length ? new Date(Math.min(...orderTimes)) : now;
  const monthCount =
    (now.getFullYear() - firstDate.getFullYear()) * 12 +
    (now.getMonth() - firstDate.getMonth()) + 1;

  const monthlyData = Array.from({ length: monthCount }, (_, idx) => {
    const d = new Date(firstDate.getFullYear(), firstDate.getMonth() + idx, 1);
    return {
      key: `${d.getFullYear()}-${d.getMonth()}`,
      label: d.toLocaleString("en-US", { month: "short" }),
      year: d.getFullYear(),
      total: 0,
      collected: 0,
      orders: 0,
    };
  });
  preorders.forEach((o) => {
    const d = new Date(o.created_at);
    const m = monthlyData.find((x) => x.key === `${d.getFullYear()}-${d.getMonth()}`);
    if (!m) return;
    const t = calcOrderTotal(o, discounts);
    m.total += t;
    m.orders += 1;
    if (o.status === "done") m.collected += t;
  });
  const thisMonth = monthlyData[monthlyData.length - 1];
  const lastMonth = monthlyData.length > 1 ? monthlyData[monthlyData.length - 2] : null;
  const maxMonth = Math.max(...monthlyData.map((m) => m.total), 1);
  const monthChange = lastMonth && lastMonth.total > 0
    ? Math.round(((thisMonth.total - lastMonth.total) / lastMonth.total) * 100)
    : null;

  function OrderCard({ o, faded }: { o: Order; faded?: boolean }) {
    const total = calcOrderTotal(o, discounts);
    const rawTotal = (o.items || []).reduce((sum, item) => {
      return sum + productPrice(item.product) * item.quantity;
    }, 0);
    const hasDiscount = o.discount_code && total !== rawTotal;

    return (
      <div className={`rounded-[35px] p-8 flex flex-col gap-4 ${faded ? "opacity-60 bg-[#c8cdb8]" : "bg-[#D7DCCB]"}`}>
        <div className="flex-1">
          <p className="text-[#55614A]"><b>Name:</b> {o.name}</p>
          <div className="mt-3">
            <p className="text-[#55614A] font-bold mb-2">Items:</p>
            {o.items && o.items.length > 0 ? (
              <div className="flex flex-col gap-1">
                {o.items.map((item, i) => (
                  <div key={i} className="flex gap-3 text-[#55614A]">
                    <span className="opacity-50 text-sm">#{i + 1}</span>
                    <span>{item.product}</span>
                    <span className="opacity-60">× {item.quantity}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#66705D] text-sm opacity-60">No items</p>
            )}
          </div>
          <p className="mt-3 text-[#55614A]"><b>Phone:</b> {o.contact}</p>
          <p className="mt-2 text-[#55614A]"><b>Address:</b> {o.address}</p>

          {total > 0 && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <b className="text-[#55614A]">Total:</b>
              {hasDiscount && (
                <span className="line-through text-[#66705D] text-sm opacity-60">{rawTotal} EGP</span>
              )}
              <span className="text-[#55614A]">{total} EGP</span>
              {o.discount_code && (
                <span className="text-[#66705D] text-sm opacity-70">({o.discount_code})</span>
              )}
            </div>
          )}

          <p className="mt-2 text-[#66705D] text-sm opacity-60">
            {new Date(o.created_at).toLocaleString("en-EG")}
          </p>
        </div>
        <button
          onClick={() => toggleStatus(o.id, o.status)}
          className={`w-full py-3 rounded-full text-sm uppercase tracking-[0.1em] hover:scale-105 duration-300 ${
            faded ? "border border-[#55614A] text-[#55614A]" : "bg-[#55614A] text-white"
          }`}
        >
          {faded ? "Undo" : "Mark Done ✓"}
        </button>
      </div>
    );
  }

  return (
    <main className="bg-[#E4E7D6] min-h-screen p-6 md:p-16">

      <h1 className="text-[50px] md:text-[90px] text-[#55614A]">Dashboard</h1>

      <div className="mt-8 flex gap-4 flex-wrap">
        <button onClick={() => setTab("preorders")} className={`px-8 py-3 rounded-full text-sm uppercase tracking-[0.1em] duration-300 ${tab === "preorders" ? "bg-[#55614A] text-white" : "border border-[#55614A] text-[#55614A]"}`}>
          Orders ({pending.length})
        </button>
        <button onClick={() => setTab("revenue")} className={`px-8 py-3 rounded-full text-sm uppercase tracking-[0.1em] duration-300 ${tab === "revenue" ? "bg-[#55614A] text-white" : "border border-[#55614A] text-[#55614A]"}`}>
          Revenue
        </button>
        <button onClick={() => setTab("discounts")} className={`px-8 py-3 rounded-full text-sm uppercase tracking-[0.1em] duration-300 ${tab === "discounts" ? "bg-[#55614A] text-white" : "border border-[#55614A] text-[#55614A]"}`}>
          Discount Codes ({discounts.filter((d) => d.active).length})
        </button>
      </div>

      {tab === "revenue" && !loading && (
        <div className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#55614A] rounded-[25px] p-6">
            <p className="text-white/70 text-xs uppercase tracking-[0.2em]">Total Revenue</p>
            <p className="text-white text-4xl mt-2 font-medium">{totalRevenue.toLocaleString()} <span className="text-xl opacity-70">EGP</span></p>
            <p className="text-white/50 text-xs mt-1">{preorders.length} orders</p>
          </div>
          <div className="bg-[#D7DCCB] rounded-[25px] p-6">
            <p className="text-[#66705D] text-xs uppercase tracking-[0.2em]">Collected</p>
            <p className="text-[#55614A] text-4xl mt-2 font-medium">{collectedRevenue.toLocaleString()} <span className="text-xl opacity-70">EGP</span></p>
            <p className="text-[#66705D] text-xs mt-1">{preorders.filter((o) => o.status === "done").length} completed</p>
          </div>
          <div className="bg-[#D7DCCB] rounded-[25px] p-6">
            <p className="text-[#66705D] text-xs uppercase tracking-[0.2em]">Pending</p>
            <p className="text-[#55614A] text-4xl mt-2 font-medium">{pendingRevenue.toLocaleString()} <span className="text-xl opacity-70">EGP</span></p>
            <p className="text-[#66705D] text-xs mt-1">{preorders.filter((o) => o.status !== "done").length} pending</p>
          </div>
        </div>

          <div className="mt-4 bg-[#D7DCCB] rounded-[25px] p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="text-[#66705D] text-xs uppercase tracking-[0.2em]">Monthly Revenue</p>
              <p className="text-[#55614A] text-4xl mt-2 font-medium">
                {thisMonth.total.toLocaleString()} <span className="text-xl opacity-70">EGP</span>
              </p>
              <p className="text-[#66705D] text-xs mt-1">
                This month ({thisMonth.label} {thisMonth.year}) · {thisMonth.orders} orders
                {monthChange !== null && lastMonth && (
                  <span className={`ml-2 ${monthChange >= 0 ? "text-[#55614A]" : "text-red-500"}`}>
                    {monthChange >= 0 ? "▲" : "▼"} {Math.abs(monthChange)}% vs {lastMonth.label}
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-[#66705D]">
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#55614A]" /> Collected</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#B7C0A5]" /> Pending</span>
            </div>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="flex items-end gap-3 md:gap-5 h-48" style={{ minWidth: `${monthlyData.length * 72}px` }}>
              {monthlyData.map((m, i) => {
                const heightPct = m.total > 0 ? Math.max((m.total / maxMonth) * 100, 4) : 0;
                const collectedPct = m.total > 0 ? (m.collected / m.total) * 100 : 0;
                const isCurrent = i === monthlyData.length - 1;
                return (
                  <div key={m.key} className="flex-1 flex flex-col items-center justify-end h-full gap-2">
                    <span className="text-[#55614A] text-[11px] md:text-xs">{m.total > 0 ? m.total.toLocaleString() : "—"}</span>
                    <div className="w-full flex-1 flex items-end">
                      <div
                        className={`w-full rounded-t-[12px] overflow-hidden flex flex-col justify-end bg-[#B7C0A5] ${isCurrent ? "ring-2 ring-[#55614A]" : ""}`}
                        style={{ height: `${heightPct}%` }}
                      >
                        <div className="w-full bg-[#55614A]" style={{ height: `${collectedPct}%` }} />
                      </div>
                    </div>
                    <span className={`text-xs uppercase tracking-[0.1em] text-center leading-tight ${isCurrent ? "text-[#55614A] font-bold" : "text-[#66705D]"}`}>
                      {m.label}
                      <br />
                      <span className="opacity-60 text-[10px]">{m.year}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left text-[#55614A] text-sm min-w-[480px]">
              <thead>
                <tr className="text-[#66705D] text-xs uppercase tracking-[0.15em] border-b border-[#B7C0A5]">
                  <th className="py-3 font-normal">Month</th>
                  <th className="py-3 font-normal">Orders</th>
                  <th className="py-3 font-normal">Collected</th>
                  <th className="py-3 font-normal">Pending</th>
                  <th className="py-3 font-normal text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {[...monthlyData].reverse().map((m) => (
                  <tr key={m.key} className="border-b border-[#C5CBA8] last:border-0">
                    <td className="py-3">{m.label} {m.year}</td>
                    <td className="py-3">{m.orders}</td>
                    <td className="py-3">{m.collected.toLocaleString()} EGP</td>
                    <td className="py-3">{(m.total - m.collected).toLocaleString()} EGP</td>
                    <td className="py-3 text-right font-medium">{m.total.toLocaleString()} EGP</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      )}

      {tab === "discounts" && (
        <div className="mt-10">
          <div className="bg-[#D7DCCB] rounded-[30px] p-8 mb-8">
            <p className="text-[#66705D] tracking-[0.2em] uppercase text-sm mb-6">Add New Code</p>
            <div className="flex flex-wrap gap-4">
              <input type="text" value={newCode} onChange={(e) => setNewCode(e.target.value)} placeholder="Code (e.g. SUMMER20)" className="bg-white text-[#55614A] placeholder:text-[#7C8572] rounded-full px-6 py-4 outline-none border border-transparent focus:border-[#55614A] duration-300 text-base flex-1 min-w-[200px]" />
              <select value={newType} onChange={(e) => setNewType(e.target.value)} className="bg-white text-[#55614A] rounded-full px-6 py-4 outline-none border border-transparent focus:border-[#55614A] duration-300 text-base">
                <option value="percentage">Percentage %</option>
                <option value="fixed">Fixed EGP</option>
              </select>
              <input type="number" value={newValue} onChange={(e) => setNewValue(e.target.value)} placeholder={newType === "percentage" ? "e.g. 10" : "e.g. 50"} className="bg-white text-[#55614A] placeholder:text-[#7C8572] rounded-full px-6 py-4 outline-none border border-transparent focus:border-[#55614A] duration-300 text-base w-[140px]" />
              <button onClick={addDiscountCode} disabled={addingCode || !newCode.trim() || !newValue} className="px-8 py-4 rounded-full bg-[#55614A] text-white text-sm uppercase tracking-[0.1em] hover:scale-105 duration-300 disabled:opacity-50">
                {addingCode ? "Adding..." : "+ Add Code"}
              </button>
            </div>
          </div>
          <div className="grid gap-4">
            {discounts.length === 0 ? (
              <p className="text-[#66705D]">No discount codes yet.</p>
            ) : (
              discounts.map((d) => (
                <div key={d.id} className={`rounded-[25px] p-6 flex justify-between items-center gap-6 ${d.active ? "bg-[#D7DCCB]" : "bg-[#c8cdb8] opacity-60"}`}>
                  <div>
                    <p className="text-[#55614A] text-xl font-medium tracking-widest">{d.code}</p>
                    <p className="text-[#66705D] text-sm mt-1">{d.value}{d.type === "percentage" ? "% off" : " EGP off"} · {d.active ? "Active" : "Inactive"}</p>
                  </div>
                  <button onClick={() => toggleDiscountActive(d.id, d.active)} className={`px-6 py-3 rounded-full text-sm uppercase tracking-[0.1em] hover:scale-105 duration-300 ${d.active ? "border border-[#55614A] text-[#55614A]" : "bg-[#55614A] text-white"}`}>
                    {d.active ? "Deactivate" : "Activate"}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {tab === "preorders" && (
        <>
          {Object.keys(productTotals).length > 0 && (
            <div className="mt-8 bg-[#D7DCCB] rounded-[30px] p-8">
              <p className="text-[#66705D] tracking-[0.2em] uppercase text-sm mb-4">Production Summary</p>
              <p className="text-[#66705D] text-sm mb-4 opacity-70">Total units needed from pending orders:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(productTotals).map(([product, total]) => (
                  <div key={product} className="bg-[#E4E7D6] rounded-[20px] px-5 py-4">
                    <p className="text-[#55614A] font-medium">{product}</p>
                    <p className="text-[#55614A] text-3xl mt-1">{total} <span className="text-lg opacity-60">units</span></p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-6 text-[#66705D] text-lg">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C4A35A] inline-block" />
              Pending: <b>{pending.length}</b>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#55614A] inline-block" />
              Done: <b>{done.length}</b>
            </span>
          </div>

          {loading ? (
            <p className="mt-10 text-[#66705D]">Loading...</p>
          ) : preorders.length === 0 ? (
            <p className="mt-10 text-[#66705D]">No orders yet.</p>
          ) : (
            <div className="mt-10 grid gap-6">
              {pending.length > 0 && (
                <div>
                  <p className="text-[#66705D] tracking-[0.2em] uppercase text-sm mb-4">Pending</p>
                  <div className="grid gap-4">
                    {pending.map((o) => <OrderCard key={o.id} o={o} />)}
                  </div>
                </div>
              )}
              {done.length > 0 && (
                <div className="mt-6">
                  <p className="text-[#66705D] tracking-[0.2em] uppercase text-sm mb-4">Completed</p>
                  <div className="grid gap-4">
                    {done.map((o) => <OrderCard key={o.id} o={o} faded />)}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </main>
  );
}