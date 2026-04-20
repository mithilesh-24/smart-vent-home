import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageLayout } from "../components/PageLayout";
import { ProductCard } from "../components/ProductCard";
import { categories, products, type Category } from "../data/products";
import "../styles/Products.css";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — SmartVent" },
      { name: "description", content: "Browse smart fans, sensors, controllers and networking gear for IoT ventilation." },
    ],
  }),
  component: ProductsPage,
});

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

function ProductsPage() {
  const [selectedCats, setSelectedCats] = useState<Category[]>([]);
  const [maxPrice, setMaxPrice] = useState(250);
  const [minRating, setMinRating] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort>("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (selectedCats.length && !selectedCats.includes(p.category)) return false;
      if (p.price > maxPrice) return false;
      if (p.rating < minRating) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });

    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
    }
    return list;
  }, [selectedCats, maxPrice, minRating, search, sort]);

  const toggleCat = (c: Category) => {
    setSelectedCats((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);
  };

  const Filters = (
    <>
      <div className="filter-block">
        <h4>Category</h4>
        {categories.map((c) => (
          <label key={c} className="filter-check">
            <input type="checkbox" checked={selectedCats.includes(c)} onChange={() => toggleCat(c)} />
            <span>{c}</span>
          </label>
        ))}
      </div>
      <div className="filter-block">
        <h4>Max price: ${maxPrice}</h4>
        <input
          type="range"
          min={5}
          max={300}
          step={5}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="filter-range"
        />
      </div>
      <div className="filter-block">
        <h4>Min rating</h4>
        <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className="input">
          <option value={0}>All ratings</option>
          <option value={3}>3★ & up</option>
          <option value={4}>4★ & up</option>
          <option value={4.5}>4.5★ & up</option>
        </select>
      </div>
    </>
  );

  return (
    <PageLayout>
      <div className="container page">
        <div className="products-head">
          <div>
            <h1 className="page-title">All Products</h1>
            <p className="text-muted">{filtered.length} of {products.length} items</p>
          </div>
          <div className="products-toolbar">
            <input
              className="input"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select className="input" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top rated</option>
            </select>
            <button className="btn btn-outline products-filter-btn" onClick={() => setShowFilters((s) => !s)}>
              Filters
            </button>
          </div>
        </div>

        <div className="products-layout">
          <aside className={`products-sidebar ${showFilters ? "open" : ""}`}>
            {Filters}
          </aside>

          {filtered.length === 0 ? (
            <div className="products-empty">
              <p>No products match your filters.</p>
            </div>
          ) : (
            <div className="products-grid">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
