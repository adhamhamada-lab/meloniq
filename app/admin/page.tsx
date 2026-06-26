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
};

export default function AdminPage() {
  const [tab, setTab] = useState<"orders" | "preorders">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [preorders, setPreorders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/orders").then((r) => r.json()),
      fetch("/api/admin/preorders").then((r) => r.json()),
    ]).then(([ordersData, preordersData]) => {
      setOrders(ordersData.data || []);
      setPreorders(preordersData.data || []);
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

  // حساب إجمالي كل منتج في الـ preorders
  const productTotals = preorders
    .filter((o) => o.status !== "done")
    .flatMap((o) => o.items || [])
    .reduce((acc, item) => {
      acc[item.product] = (acc[item.product] || 0) + item.quantity;
      return acc;
    }, {} as Record<string, number>);

  function OrderCard({ o, faded, type }: { o: Order; faded?: boolean; type: "orders" | "preorders" }) {
    return (
      <div className={`rounded-[35px] p-8 flex justify-between items-start gap-6 ${faded ? "opacity-60 bg-[#c8cdb8]" : "bg-[#D7DCCB]"}`}>
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
          <p className="mt-2 text-[#66705D] text-sm opacity-60">
            {new Date(o.created_at).toLocaleString("en-EG")}
          </p>
        </div>
        <button
          onClick={() => toggleStatus(o.id, o.status, type)}
          className={`shrink-0 px-6 py-3 rounded-full text-sm uppercase tracking-[0.1em] hover:scale-105 duration-300 ${
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
      <div className="mt-6 flex gap-4">
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
      </div>

      {/* PRODUCTION SUMMARY - بس في تبويب الـ preorders */}
      {tab === "preorders" && Object.keys(productTotals).length > 0 && (
        <div className="mt-8 bg-[#D7DCCB] rounded-[30px] p-8">
          <p className="text-[#66705D] tracking-[0.2em] uppercase text-sm mb-4">
            Production Summary
          </p>
          <p className="text-[#66705D] text-sm mb-4 opacity-70">
            Total units needed from pending pre-orders:
          </p>
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
      ) : currentList.length === 0 ? (
        <p className="mt-10 text-[#66705D]">No {tab === "orders" ? "orders" : "pre-orders"} yet.</p>
      ) : (
        <div className="mt-10 grid gap-6">
          {pending.length > 0 && (
            <div>
              <p className="text-[#66705D] tracking-[0.2em] uppercase text-sm mb-4">Pending</p>
              <div className="grid gap-4">
                {pending.map((o) => <OrderCard key={o.id} o={o} type={tab} />)}
              </div>
            </div>
          )}
          {done.length > 0 && (
            <div className="mt-6">
              <p className="text-[#66705D] tracking-[0.2em] uppercase text-sm mb-4">Completed</p>
              <div className="grid gap-4">
                {done.map((o) => <OrderCard key={o.id} o={o} faded type={tab} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}