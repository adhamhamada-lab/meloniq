"use client";

import { useEffect, useState } from "react";

type Order = {
  id: number;
  name: string;
  product: string;
  quantity: number;
  contact: string;
  address: string;
  status: string;
  created_at: string;
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

  return (
    <main className="bg-[#E4E7D6] min-h-screen p-6 md:p-16">

      <h1 className="text-[50px] md:text-[90px] text-[#55614A]">
        Orders
      </h1>

      <div className="mt-4 flex gap-6 text-[#66705D] text-lg">
        <span>🟡 Pending: <b>{pending.length}</b></span>
        <span>🟢 Done: <b>{done.length}</b></span>
      </div>

      {loading ? (
        <p className="mt-10 text-[#66705D]">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="mt-10 text-[#66705D]">No orders yet.</p>
      ) : (
        <div className="mt-10 grid gap-6">

          {/* PENDING */}
          {pending.length > 0 && (
            <div>
              <p className="text-[#66705D] tracking-[0.2em] uppercase text-sm mb-4">
                Pending
              </p>
              <div className="grid gap-4">
                {pending.map((o) => (
                  <div
                    key={o.id}
                    className="bg-[#D7DCCB] rounded-[35px] p-8 flex justify-between items-start gap-6"
                  >
                    <div className="flex-1">
                      <p className="text-[#55614A]"><b>Name:</b> {o.name}</p>
                      <p className="mt-2 text-[#55614A]"><b>Product:</b> {o.product}</p>
                      <p className="mt-2 text-[#55614A]"><b>Quantity:</b> {o.quantity}</p>
                      <p className="mt-2 text-[#55614A]"><b>Phone:</b> {o.contact}</p>
                      <p className="mt-2 text-[#55614A]"><b>Address:</b> {o.address}</p>
                      <p className="mt-2 text-[#66705D] text-sm opacity-60">
                        {new Date(o.created_at).toLocaleString("en-EG")}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleStatus(o.id, o.status)}
                      className="
                      shrink-0
                      px-6 py-3
                      rounded-full
                      bg-[#55614A]
                      text-white
                      text-sm
                      uppercase
                      tracking-[0.1em]
                      hover:scale-105
                      duration-300
                      "
                    >
                      Mark Done ✓
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DONE */}
          {done.length > 0 && (
            <div className="mt-6">
              <p className="text-[#66705D] tracking-[0.2em] uppercase text-sm mb-4">
                Completed
              </p>
              <div className="grid gap-4">
                {done.map((o) => (
                  <div
                    key={o.id}
                    className="bg-[#c8cdb8] rounded-[35px] p-8 flex justify-between items-start gap-6 opacity-60"
                  >
                    <div className="flex-1">
                      <p className="text-[#55614A]"><b>Name:</b> {o.name}</p>
                      <p className="mt-2 text-[#55614A]"><b>Product:</b> {o.product}</p>
                      <p className="mt-2 text-[#55614A]"><b>Quantity:</b> {o.quantity}</p>
                      <p className="mt-2 text-[#55614A]"><b>Phone:</b> {o.contact}</p>
                      <p className="mt-2 text-[#55614A]"><b>Address:</b> {o.address}</p>
                      <p className="mt-2 text-[#66705D] text-sm opacity-60">
                        {new Date(o.created_at).toLocaleString("en-EG")}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleStatus(o.id, o.status)}
                      className="
                      shrink-0
                      px-6 py-3
                      rounded-full
                      border
                      border-[#55614A]
                      text-[#55614A]
                      text-sm
                      uppercase
                      tracking-[0.1em]
                      hover:scale-105
                      duration-300
                      "
                    >
                      Undo
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </main>
  );
}