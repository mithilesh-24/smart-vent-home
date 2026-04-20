import { Link } from "react-router-dom";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="navbar-logo-mark" style={{ width: 32, height: 32, fontSize: 12 }}>SV</span>
            <span>SmartVent</span>
          </Link>
          <p>Smart ventilation for modern homes.</p>
        </div>
        <div className="footer-links">
          <div>
            <h4>Shop</h4>
            <Link to="/products">All Products</Link>
            <Link to="/cart">Cart</Link>
          </div>
          <div>
            <h4>Account</h4>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>&copy; {new Date().getFullYear()} SmartVent. All rights reserved.</span>
      </div>
    </footer>
  );
}
