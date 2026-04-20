import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="container footer-inner">
        <div>
          <div className="footer-brand">SmartVent</div>
          <p className="footer-tag">Smart ventilation for modern, healthy homes.</p>
        </div>
        <div>
          <h4>Shop</h4>
          <a href="/products">All Products</a>
          <a href="/products">Fans</a>
          <a href="/products">Sensors</a>
        </div>
        <div>
          <h4>Company</h4>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#careers">Careers</a>
        </div>
        <div>
          <h4>Support</h4>
          <a href="#help">Help Center</a>
          <a href="#warranty">Warranty</a>
          <a href="#shipping">Shipping</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">© {new Date().getFullYear()} SmartVent. All rights reserved.</div>
      </div>
    </footer>
  );
}
