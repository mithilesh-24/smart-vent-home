import { Link } from "react-router-dom";
import { PageLayout } from "../components/PageLayout.jsx";
import { ProductCard } from "../components/ProductCard.jsx";
import { products } from "../data/products.js";
import "../styles/Home.css";

export default function Home() {
  const featured = products.slice(0, 4);

  return (
    <PageLayout>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="hero-eyebrow">IoT-powered air quality</span>
            <h1>Smart Ventilation System for Modern Homes</h1>
            <p>
              Breathe cleaner air with intelligent fans, precision sensors and a control hub
              that adapts to your home in real time.
            </p>
            <div className="hero-ctas">
              <Link to="/products" className="btn btn-cta btn-lg">Shop Now</Link>
              <a href="#features" className="btn btn-outline btn-lg">Learn more</a>
            </div>
            <div className="hero-stats">
              <div><strong>50K+</strong><span>Homes powered</span></div>
              <div><strong>4.8★</strong><span>Average rating</span></div>
              <div><strong>24/7</strong><span>Air monitoring</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-card-head">
                <span className="status-dot" /> Live air quality
              </div>
              <div className="hero-metrics">
                <div><span>AQI</span><strong>42</strong></div>
                <div><span>Temp</span><strong>22°C</strong></div>
                <div><span>Humidity</span><strong>48%</strong></div>
              </div>
              <div className="hero-bar"><div style={{ width: "32%" }} /></div>
              <div className="hero-card-foot">Fan: <strong>Auto · ON</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="container">
          <h2 className="section-title">Why SmartVent</h2>
          <p className="section-sub">Three pillars that keep your air fresh, automatically.</p>
          <div className="features-grid">
            <Feature icon="🌬️" title="Air Quality Monitoring" desc="Track PM2.5, CO2, VOCs, temperature and humidity room-by-room with industrial-grade sensors." />
            <Feature icon="⚙️" title="Auto Ventilation" desc="Fans and dampers respond to live conditions, keeping every room within healthy thresholds." />
            <Feature icon="📱" title="Smart Control" desc="One app, voice control and detailed analytics. Local-first, cloud-optional." />
          </div>
        </div>
      </section>

      <section className="featured">
        <div className="container">
          <div className="featured-head">
            <h2 className="section-title" style={{ marginBottom: 0 }}>Featured products</h2>
            <Link to="/products" className="btn btn-ghost">View all →</Link>
          </div>
          <div className="featured-grid">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="feature">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
