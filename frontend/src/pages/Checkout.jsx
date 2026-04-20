import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { PageLayout } from "../components/PageLayout.jsx";
import { ProtectedRoute } from "../components/ProtectedRoute.jsx";
import { products } from "../data/products.js";
import { useCart } from "../hooks/useCart.js";
import { apiFetch } from "../lib/api.js";
import "../styles/Checkout.css";

export default function Checkout() {
  return (
    <ProtectedRoute>
      <CheckoutPage />
    </ProtectedRoute>
  );
}

function CheckoutPage() {
  const { items, clear } = useCart();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);

  const detailed = items
    .map((i) => ({ item: i, product: products.find((p) => p.id === i.productId) }))
    .filter((d) => d.product);

  const subtotal = detailed.reduce((sum, d) => sum + d.product.price * d.item.quantity, 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 9;
  const total = subtotal + shipping;

  const placeOrder = async (e) => {
    e.preventDefault();
    setPlacing(true);
    try {
      const orderItems = items.map((i) => ({ productId: i.productId, quantity: i.quantity }));
      const res = await apiFetch("/orders/create", {
        method: "POST",
        body: JSON.stringify({ items: orderItems, total }),
      });
      if (res.success) {
        await clear();
        toast.success("Order placed!");
        navigate("/dashboard/orders");
      } else {
        toast.error(res.message || "Failed to place order");
        setPlacing(false);
      }
    } catch {
      toast.error("Failed to place order");
      setPlacing(false);
    }
  };

  if (detailed.length === 0) {
    return (
      <PageLayout>
        <div className="container page text-center">
          <h1 className="page-title">Nothing to checkout</h1>
          <Link to="/products" className="btn btn-primary mt-4">Browse products</Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container page">
        <h1 className="page-title">Checkout</h1>
        <form onSubmit={placeOrder} className="checkout-layout">
          <div className="checkout-card">
            <h3>Shipping address</h3>
            <div className="checkout-grid">
              <div className="form-group"><label>Full name</label><input className="input" required /></div>
              <div className="form-group"><label>Phone</label><input className="input" required /></div>
              <div className="form-group full"><label>Address</label><input className="input" required /></div>
              <div className="form-group"><label>City</label><input className="input" required /></div>
              <div className="form-group"><label>Postal code</label><input className="input" required /></div>
            </div>

            <h3 style={{ marginTop: 24 }}>Payment</h3>
            <div className="checkout-grid">
              <div className="form-group full"><label>Card number</label><input className="input" placeholder="4242 4242 4242 4242" required /></div>
              <div className="form-group"><label>Expiry</label><input className="input" placeholder="MM/YY" required /></div>
              <div className="form-group"><label>CVC</label><input className="input" placeholder="123" required /></div>
            </div>
          </div>

          <aside className="checkout-summary">
            <h3>Your order</h3>
            <div className="checkout-items">
              {detailed.map(({ item, product }) => (
                <div key={product.id} className="checkout-item">
                  <img src={product.image} alt={product.name} />
                  <div>
                    <div className="checkout-item-name">{product.name}</div>
                    <div className="text-muted" style={{ fontSize: 12 }}>Qty {item.quantity}</div>
                  </div>
                  <div>${(product.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="cart-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="cart-row"><span>Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping}`}</span></div>
            <div className="cart-row cart-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
            <button type="submit" disabled={placing} className="btn btn-cta btn-lg btn-block mt-4">
              {placing ? "Placing order…" : `Pay $${total.toFixed(2)}`}
            </button>
          </aside>
        </form>
      </div>
    </PageLayout>
  );
}
