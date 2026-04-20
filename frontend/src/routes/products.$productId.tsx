import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageLayout } from "../components/PageLayout";
import { ProductCard } from "../components/ProductCard";
import { RatingStars } from "../components/RatingStars";
import { products } from "../data/products";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import "../styles/ProductDetail.css";

export const Route = createFileRoute("/products/$productId")({
  component: ProductDetail,
});

function ProductDetail() {
  const { productId } = Route.useParams();
  const product = products.find((p) => p.id === productId);
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <PageLayout>
        <div className="container page text-center">
          <h1 className="page-title">Product not found</h1>
          <Link to="/products" className="btn btn-primary mt-4">Back to products</Link>
        </div>
      </PageLayout>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addItem(product.id, qty);
    toast.success(`${product.name} added to cart`);
  };

  const handleBuy = () => {
    addItem(product.id, qty);
    if (!isAuthenticated) {
      toast.info("Please login to complete your purchase");
      navigate({ to: "/login", search: { redirect: "/checkout" } });
    } else {
      navigate({ to: "/checkout" });
    }
  };

  return (
    <PageLayout>
      <div className="container page">
        <nav className="breadcrumb">
          <Link to="/">Home</Link> / <Link to="/products">Products</Link> / <span>{product.name}</span>
        </nav>

        <div className="pd-layout">
          <div className="pd-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="pd-info">
            <span className="badge">{product.category}</span>
            <h1>{product.name}</h1>
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
            <div className="pd-price">${product.price}</div>
            <p className="pd-desc">{product.description}</p>

            <div className="pd-specs">
              <h4>Key specs</h4>
              <ul>
                {product.specs.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>

            <div className="pd-qty">
              <label>Quantity</label>
              <div className="qty-stepper">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)}>+</button>
              </div>
            </div>

            <div className="pd-actions">
              <button className="btn btn-cta btn-lg" onClick={handleAdd}>Add to Cart</button>
              <button className="btn btn-primary btn-lg" onClick={handleBuy}>Buy Now</button>
            </div>

            {!isAuthenticated && (
              <div className="pd-notice">
                🔒 Please <Link to="/login" search={{ redirect: "/checkout" }}>login</Link> to purchase.
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="pd-related">
            <h2 className="section-title" style={{ textAlign: "left", marginBottom: 16 }}>Related products</h2>
            <div className="pd-related-grid">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </PageLayout>
  );
}
