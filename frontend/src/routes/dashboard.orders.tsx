import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { orders as fallbackOrders } from "../data/dashboard";
import type { Order } from "../data/dashboard";
import { apiFetch } from "../lib/api";

export const Route = createFileRoute("/dashboard/orders")({
  component: OrdersPage,
});

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(fallbackOrders);

  useEffect(() => {
    apiFetch<Order[]>("/orders").then((res) => {
      if (res.success && res.data && res.data.length > 0) setOrders(res.data);
    });
  }, []);

  return (
    <div>
      <h1 className="dashboard-h1">Orders</h1>
      <p className="dashboard-sub">Your recent SmartVent purchases.</p>
      <table className="dash-table">
        <thead>
          <tr>
            <th>Order</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => {
            const cls = o.status === "Delivered" ? "badge-success" : o.status === "Processing" ? "badge" : "badge";
            return (
              <tr key={o.id}>
                <td><strong>{o.id}</strong></td>
                <td>{o.date}</td>
                <td>{o.items}</td>
                <td>${o.total}</td>
                <td><span className={`badge ${cls}`}>{o.status}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
