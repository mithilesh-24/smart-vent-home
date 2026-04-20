import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageLayout } from "../components/PageLayout";
import { products } from "../data/products";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";
import "../styles/Cart.css";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — SmartVent" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, updateQuantity, removeItem } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const detailed = items
    .map((i) => ({ item: i, product: products.find((p) => p.id === i.productId) }))
    .filter((d) => d.product) as { item: { productId: string; quantity: number }; product: typeof products[number] }[];

  const subtotal = detailed.reduce((sum, d) => sum + d.product.price * d.item.quantity, 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 9;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.info("Please login to checkout");
      navigate({ to: "/login", search: { redirect: "/checkout" } });
    } else {
      navigate({ to: "/checkout" });
    }
  };

  if (detailed.length === 0) {
    return (
      <PageLayout>
        <div className="container page text-center">
          <h1 className="page-title">Your cart is empty</h1>
          <p className="text-muted mb-4">Browse our products and add something to get started.</p>
          <Link to="/products" className="btn btn-primary btn-lg">Shop Products</Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container page">
        <h1 className="page-title">Cart</h1>
        <div className="cart-layout">
          <div className="cart-items">
            {detailed.map(({ item, product }) => (
              <div key={product.id} className="cart-item">
                <Link to="/products/$productId" params={{ productId: product.id }} className="cart-item-img">
                  <img src={product.image} alt={product.name} />
                </Link>
                <div className="cart-item-info">
                  <Link to="/products/$productId" params={{ productId: product.id }} className="cart-item-title">
                    {product.name}
                  </Link>
                  <span className="text-muted" style={{ fontSize: 13 }}>{product.category}</span>
                  <button className="cart-remove" onClick={() => removeItem(product.id)}>Remove</button>
                </div>
                <div className="cart-item-qty">
                  <button onClick={() => updateQuantity(product.id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(product.id, item.quantity + 1)}>+</button>
                </div>
                <div className="cart-item-price">${(product.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h3>Order Summary</h3>
            <div className="cart-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="cart-row"><span>Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping}`}</span></div>
            {subtotal < 50 && shipping > 0 && (
              <p className="cart-hint">Add ${(50 - subtotal).toFixed(2)} more for free shipping</p>
            )}
            <div className="cart-row cart-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
            <button className="btn btn-cta btn-lg btn-block mt-4" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            {!isAuthenticated && (
              <p className="cart-hint" style={{ marginTop: 8 }}>You'll need to login to complete your order.</p>
            )}
          </aside>
        </div>
      </div>
    </PageLayout>
  );
}
