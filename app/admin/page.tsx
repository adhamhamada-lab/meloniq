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
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then((d) => {
        setOrders(d.data || []);
        setLoading(false);
      });
  }, []);

  async function toggleStatus(id: number, current: string) {
    const next = current === "done" ? "pending" : "done";
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: next } : o))
    );
    await fetch(`/api/order/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
  }

  const pending = orders.filter((o) => o.status !== "done");
  const done = orders.filter((o) => o.status === "done");

  function OrderCard({ o, faded }: { o: Order; faded?: boolean }) {
    return (
      <div
        className={`rounded-[35px] p-8 flex justify-between items-start gap-6 ${
          faded ? "opacity-60 bg-[#c8cdb8]" : "bg-[#D7DCCB]"
        }`}
      >
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
          onClick={() => toggleStatus(o.id, o.status)}
          className={`shrink-0 px-6 py-3 rounded-full text-sm uppercase tracking-[0.1em] hover:scale-105 duration-300 ${
            faded
              ? "border border-[#55614A] text-[#55614A]"
              : "bg-[#55614A] text-white"
          }`}
        >
          {faded ? "Undo" : "Mark Done ✓"}
        </button>
      </div>
    );
  }

  return (
    <main className="bg-[#E4E7D6] min-h-screen p-6 md:p-16">

      <h1 className="text-[50px] md:text-[90px] text-[#55614A]">Orders</h1>

      <div className="mt-4 flex gap-6 text-[#66705D] text-lg">
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
      ) : orders.length === 0 ? (
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
    </main>
  );
}