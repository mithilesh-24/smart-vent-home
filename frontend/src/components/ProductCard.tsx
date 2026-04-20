import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import type { Product } from "../data/products";
import { useCart } from "../hooks/useCart";
import { RatingStars } from "./RatingStars";
import "./ProductCard.css";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id, 1);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link to="/products/$productId" params={{ productId: product.id }} className="product-card">
      <div className="product-card-image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-card-body">
        <span className="product-card-cat">{product.category}</span>
        <h3 className="product-card-title">{product.name}</h3>
        <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
        <div className="product-card-price">${product.price}</div>
        <button className="btn btn-cta btn-block" onClick={handleAdd}>Add to Cart</button>
      </div>
    </Link>
  );
}
