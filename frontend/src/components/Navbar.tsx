import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import "./Navbar.css";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalCount } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate({ to: "/" });
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo" onClick={() => setOpen(false)}>
          <span className="navbar-logo-mark">SV</span>
          <span>SmartVent</span>
        </Link>

        <nav className={`navbar-links ${open ? "open" : ""}`}>
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "active" }} onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/products" activeProps={{ className: "active" }} onClick={() => setOpen(false)}>
            Products
          </Link>
          {isAuthenticated && (
            <Link to="/dashboard" activeProps={{ className: "active" }} onClick={() => setOpen(false)}>
              Dashboard
            </Link>
          )}
          <a href="#about" onClick={() => setOpen(false)}>About</a>
        </nav>

        <div className="navbar-actions">
          <Link to="/cart" className="navbar-cart" aria-label="Cart">
            <CartIcon />
            {totalCount > 0 && <span className="navbar-cart-badge">{totalCount}</span>}
          </Link>

          {isAuthenticated ? (
            <div className="navbar-user">
              <span className="navbar-user-name">Hi, {user?.name.split(" ")[0]}</span>
              <button className="btn btn-outline btn-sm" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="navbar-auth">
              <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
              <Link to="/signup" className="btn btn-primary btn-sm">Sign up</Link>
            </div>
          )}

          <button className="navbar-burger" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
    </svg>
  );
}
