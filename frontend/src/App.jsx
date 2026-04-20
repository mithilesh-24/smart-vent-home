import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DashboardOverview from "./pages/DashboardOverview.jsx";
import DashboardOrders from "./pages/DashboardOrders.jsx";
import DashboardDevices from "./pages/DashboardDevices.jsx";
import DashboardAnalytics from "./pages/DashboardAnalytics.jsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardOverview />} />
          <Route path="orders" element={<DashboardOrders />} />
          <Route path="devices" element={<DashboardDevices />} />
          <Route path="analytics" element={<DashboardAnalytics />} />
        </Route>
      </Routes>
      <Toaster position="top-right" richColors />
    </>
  );
}
