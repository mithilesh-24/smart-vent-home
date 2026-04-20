
# SmartVent — Plan Update

You'd like standard React Router (not TanStack Router). Here's the heads-up before I proceed.

## Important constraint

This project is built on **TanStack Start**, which uses TanStack Router as its core routing layer for SSR, file-based routes, and the build pipeline. It is **not possible to swap in `react-router-dom`** as the app's routing system without removing TanStack Start entirely — and that framework is the only supported stack here. Other frameworks (Next.js, plain Vite + React Router, CRA) are not available.

So I cannot use `react-router-dom` for the real navigation.

## What I can do instead

I'll keep TanStack Router under the hood (required by the framework) but write the code in a way that **looks and feels like standard React Router** — same mental model, same patterns you're used to:

- `<Link to="/products">` — same API as react-router-dom
- `useNavigate()` — same hook name and behavior
- `useParams()` — same hook
- `useLocation()` — same hook
- Route files in `src/routes/` map 1:1 to URL paths (like a `pages/` folder)
- Plain functional page components, no fancy loaders or route context

The only real difference vs. `react-router-dom` is **where you declare a route** (a file in `src/routes/` instead of a `<Route>` element in a `<Routes>` block). Everything inside your components stays standard.

## Styling clarification

You also asked for **plain CSS** instead of Tailwind. The project ships with Tailwind v4 pre-wired into `src/styles.css`, but I can absolutely write the app in plain CSS:
- One `styles.css` per page/component (e.g. `Navbar.css`, `Products.css`)
- Imported at the top of each component
- Tailwind classes left out entirely from the new code

## Pages & features (unchanged from before)

Same scope as the previous plan — just delivered with the routing/styling adjustments above:

- `/` Landing — navbar, hero, features, footer
- `/products` Catalog with sidebar filters + 20 dummy products
- `/products/:productId` Detail page with Add to Cart / Buy Now
- `/cart` Cart (works without login)
- `/login`, `/signup` Auth (localStorage-based)
- `/checkout` Protected — redirects to `/login?redirect=/checkout`
- `/dashboard`, `/dashboard/devices`, `/dashboard/analytics`, `/dashboard/orders` Protected IoT dashboard with KPI cards + Recharts

Auth state and cart state in `localStorage`. Protected routes guarded by a small wrapper component that checks the session and calls `useNavigate()` to redirect — exactly the React Router pattern.

## File structure

```text
src/
  routes/              ← one file per URL (acts like pages/)
    index.tsx          → /
    products.tsx       → /products
    products.$productId.tsx → /products/:productId
    cart.tsx           → /cart
    login.tsx, signup.tsx
    checkout.tsx       (protected)
    dashboard.tsx      (protected layout)
    dashboard.index.tsx, dashboard.devices.tsx, dashboard.analytics.tsx, dashboard.orders.tsx
  components/          Navbar, Footer, ProductCard, Sidebar, ChartCard, KpiCard, ProtectedRoute, RatingStars
  data/                products.ts, dashboard.ts
  styles/              global.css + per-component .css files
  hooks/               useAuth.ts, useCart.ts
```

## Confirm before I build

If you're okay with **TanStack Router used internally but written with React-Router-style APIs (`Link`, `useNavigate`, `useParams`)**, I'll proceed. If you'd rather drop the framework entirely and use a different stack, that isn't supported in this environment — let me know how you'd like to handle it.
