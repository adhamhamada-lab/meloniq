"use client";

import { useEffect, useState } from "react";

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
};

type DiscountCode = {
  id: number;
  code: string;
  type: string;
  value: number;
  active: boolean;
  created_at: string;
};

const PRODUCT_PRICES: Record<string, number> = {
  "Tea Tree Oil Soap": 150,
  "Argan & Frankincense Soap": 115,
  "Licorice Oil Soap": 140,
  "Saad Oil Soap": 160,
};

const DISCOUNTED_PRICES: Record<string, number> = {
  "Tea Tree Oil Soap": 105,
  "Argan & Frankincense Soap": 105,
  "Licorice Oil Soap": 125,
  "Saad Oil Soap": 145,
};

export default function AdminPage() {
  const [tab, setTab] = useState<"orders" | "preorders" | "discounts">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [preorders, setPreorders] = useState<Order[]>([]);
  const [discounts, setDiscounts] = useState<DiscountCode[]>([]);
  const [loading, setLoading] = useState(true);

  const [newCode, setNewCode] = useState("");
  const [newType, setNewType] = useState("percentage");
  const [newValue, setNewValue] = useState("");
  const [addingCode, setAddingCode] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/orders").then((r) => r.json()),
      fetch("/api/admin/preorders").then((r) => r.json()),
      fetch("/api/discount").then((r) => r.json()),
    ]).then(([ordersData, preordersData, discountsData]) => {
      setOrders(ordersData.data || []);
      setPreorders(preordersData.data || []);
      setDiscounts(discountsData.data || []);
      setLoading(false);
    });
  }, []);

  async function toggleStatus(id: number, current: string, type: "orders" | "preorders") {
    const next = current === "done" ? "pending" : "done";
    const endpoint = type === "orders" ? `/api/order/${id}` : `/api/preorder/${id}`;

    if (type === "orders") {
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: next } : o)));
    } else {
      setPreorders((prev) => prev.map((o) => (o.id === id ? { ...o, status: next } : o)));
    }

    await fetch(endpoint, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
  }

  async function toggleDiscountActive(id: number, current: boolean) {
    setDiscounts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, active: !current } : d))
    );
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
      acc[item.product] = (acc[item.product] || 0) + item.quantity;
      return acc;
    }, {} as Record<string, number>);

  function OrderCard({ o, faded, type }: { o: Order; faded?: boolean; type: "orders" | "preorders" }) {
    const hasDiscount = type === "preorders" && o.discount_code;

    const originalTotal = (o.items || []).reduce((sum, item) => {
      return sum + (PRODUCT_PRICES[item.product] || 0) * item.quantity;
    }, 0);

    const discountedTotal = (o.items || []).reduce((sum, item) => {
      const price = hasDiscount && DISCOUNTED_PRICES[item.product]
        ? DISCOUNTED_PRICES[item.product]
        : PRODUCT_PRICES[item.product] || 0;
      return sum + price * item.quantity;
    }, 0);

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

          {/* TOTAL */}
          {type === "preorders" && originalTotal > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <b className="text-[#55614A]">Total:</b>
              {hasDiscount ? (
                <>
                  <span className="text-[#66705D] line-through opacity-60">{originalTotal} EGP</span>
                  <span className="text-[#55614A] font-medium">{discountedTotal} EGP</span>
                  <span className="text-[#66705D] text-sm opacity-70">({o.discount_code})</span>
                </>
              ) : (
                <span className="text-[#55614A]">{originalTotal} EGP</span>
              )}
            </div>
          )}

          <p className="mt-2 text-[#66705D] text-sm opacity-60">
            {new Date(o.created_at).toLocaleString("en-EG")}
          </p>
        </div>
        <button
          onClick={() => toggleStatus(o.id, o.status, type)}
          className={`w-full py-3 rounded-full text-sm uppercase tracking-[0.1em] hover:scale-105 duration-300 ${
            faded ? "border border-[#55614A] text-[#55614A]" : "bg-[#55614A] text-white"
          }`}
        >
          {faded ? "Undo" : "Mark Done ✓"}
        </button>
      </div>
    );
  }

  const currentList = tab === "orders" ? orders : preorders;
  const pending = currentList.filter((o) => o.status !== "done");
  const done = currentList.filter((o) => o.status === "done");

  return (
    <main className="bg-[#E4E7D6] min-h-screen p-6 md:p-16">

      <h1 className="text-[50px] md:text-[90px] text-[#55614A]">Dashboard</h1>

      {/* TABS */}
      <div className="mt-6 flex gap-4 flex-wrap">
        <button
          onClick={() => setTab("orders")}
          className={`px-8 py-3 rounded-full text-sm uppercase tracking-[0.1em] duration-300 ${
            tab === "orders" ? "bg-[#55614A] text-white" : "border border-[#55614A] text-[#55614A]"
          }`}
        >
          Orders ({orders.filter((o) => o.status !== "done").length})
        </button>
        <button
          onClick={() => setTab("preorders")}
          className={`px-8 py-3 rounded-full text-sm uppercase tracking-[0.1em] duration-300 ${
            tab === "preorders" ? "bg-[#55614A] text-white" : "border border-[#55614A] text-[#55614A]"
          }`}
        >
          Pre-Orders ({preorders.filter((o) => o.status !== "done").length})
        </button>
        <button
          onClick={() => setTab("discounts")}
          className={`px-8 py-3 rounded-full text-sm uppercase tracking-[0.1em] duration-300 ${
            tab === "discounts" ? "bg-[#55614A] text-white" : "border border-[#55614A] text-[#55614A]"
          }`}
        >
          Discount Codes ({discounts.filter((d) => d.active).length})
        </button>
      </div>

      {/* DISCOUNT CODES TAB */}
      {tab === "discounts" && (
        <div className="mt-10">
          <div className="bg-[#D7DCCB] rounded-[30px] p-8 mb-8">
            <p className="text-[#66705D] tracking-[0.2em] uppercase text-sm mb-6">Add New Code</p>
            <div className="flex flex-wrap gap-4">
              <input
                type="text"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="Code (e.g. SUMMER20)"
                className="bg-white text-[#55614A] placeholder:text-[#7C8572] rounded-full px-6 py-4 outline-none border border-transparent focus:border-[#55614A] duration-300 text-base flex-1 min-w-[200px]"
              />
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="bg-white text-[#55614A] rounded-full px-6 py-4 outline-none border border-transparent focus:border-[#55614A] duration-300 text-base"
              >
                <option value="percentage">Percentage %</option>
                <option value="fixed">Fixed EGP</option>
              </select>
              <input
                type="number"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder={newType === "percentage" ? "e.g. 10" : "e.g. 50"}
                className="bg-white text-[#55614A] placeholder:text-[#7C8572] rounded-full px-6 py-4 outline-none border border-transparent focus:border-[#55614A] duration-300 text-base w-[140px]"
              />
              <button
                onClick={addDiscountCode}
                disabled={addingCode || !newCode.trim() || !newValue}
                className="px-8 py-4 rounded-full bg-[#55614A] text-white text-sm uppercase tracking-[0.1em] hover:scale-105 duration-300 disabled:opacity-50"
              >
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
                    <p className="text-[#66705D] text-sm mt-1">
                      {d.value}{d.type === "percentage" ? "% off" : " EGP off"} · {d.active ? "Active" : "Inactive"}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleDiscountActive(d.id, d.active)}
                    className={`px-6 py-3 rounded-full text-sm uppercase tracking-[0.1em] hover:scale-105 duration-300 ${
                      d.active ? "border border-[#55614A] text-[#55614A]" : "bg-[#55614A] text-white"
                    }`}
                  >
                    {d.active ? "Deactivate" : "Activate"}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* PRODUCTION SUMMARY */}
      {tab === "preorders" && Object.keys(productTotals).length > 0 && (
        <div className="mt-8 bg-[#D7DCCB] rounded-[30px] p-8">
          <p className="text-[#66705D] tracking-[0.2em] uppercase text-sm mb-4">Production Summary</p>
          <p className="text-[#66705D] text-sm mb-4 opacity-70">Total units needed from pending pre-orders:</p>
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

      {/* COUNTERS */}
      {tab !== "discounts" && (
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
      )}

      {tab !== "discounts" && (
        loading ? (
          <p className="mt-10 text-[#66705D]">Loading...</p>
        ) : currentList.length === 0 ? (
          <p className="mt-10 text-[#66705D]">No {tab === "orders" ? "orders" : "pre-orders"} yet.</p>
        ) : (
          <div className="mt-10 grid gap-6">
            {pending.length > 0 && (
              <div>
                <p className="text-[#66705D] tracking-[0.2em] uppercase text-sm mb-4">Pending</p>
                <div className="grid gap-4">
                  {pending.map((o) => <OrderCard key={o.id} o={o} type={tab as "orders" | "preorders"} />)}
                </div>
              </div>
            )}
            {done.length > 0 && (
              <div className="mt-6">
                <p className="text-[#66705D] tracking-[0.2em] uppercase text-sm mb-4">Completed</p>
                <div className="grid gap-4">
                  {done.map((o) => <OrderCard key={o.id} o={o} faded type={tab as "orders" | "preorders"} />)}
                </div>
              </div>
            )}
          </div>
        )
      )}
    </main>
  );
}