import { useEffect, useState, useCallback } from "react";
import { apiFetch, getToken } from "../lib/api.js";

const CART_KEY = "smartvent_cart";

function readLocalCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeLocalCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("smartvent:cart"));
}

function isLoggedIn() {
  return !!getToken();
}

export function useCart() {
  const [items, setItems] = useState([]);

  const syncCart = useCallback(async () => {
    if (isLoggedIn()) {
      const res = await apiFetch("/cart");
      if (res.success && res.data) {
        setItems(res.data);
        writeLocalCart(res.data);
        return;
      }
    }
    setItems(readLocalCart());
  }, []);

  useEffect(() => {
    syncCart();
    const sync = () => setItems(readLocalCart());
    window.addEventListener("smartvent:cart", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("smartvent:cart", sync);
      window.removeEventListener("storage", sync);
    };
  }, [syncCart]);

  const addItem = useCallback(async (productId, quantity = 1) => {
    if (isLoggedIn()) {
      const res = await apiFetch("/cart/add", {
        method: "POST",
        body: JSON.stringify({ productId, quantity }),
      });
      if (res.success && res.data) {
        setItems(res.data);
        writeLocalCart(res.data);
        return;
      }
    }
    const current = readLocalCart();
    const existing = current.find((i) => i.productId === productId);
    let next;
    if (existing) {
      next = current.map((i) =>
        i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
      );
    } else {
      next = [...current, { productId, quantity }];
    }
    writeLocalCart(next);
  }, []);

  const updateQuantity = useCallback(async (productId, quantity) => {
    if (isLoggedIn()) {
      const res = await apiFetch("/cart/update", {
        method: "PUT",
        body: JSON.stringify({ productId, quantity }),
      });
      if (res.success && res.data) {
        setItems(res.data);
        writeLocalCart(res.data);
        return;
      }
    }
    const next = readLocalCart()
      .map((i) => (i.productId === productId ? { ...i, quantity } : i))
      .filter((i) => i.quantity > 0);
    writeLocalCart(next);
  }, []);

  const removeItem = useCallback(async (productId) => {
    if (isLoggedIn()) {
      const res = await apiFetch(`/cart/remove/${productId}`, { method: "DELETE" });
      if (res.success && res.data) {
        setItems(res.data);
        writeLocalCart(res.data);
        return;
      }
    }
    writeLocalCart(readLocalCart().filter((i) => i.productId !== productId));
  }, []);

  const clear = useCallback(async () => {
    if (isLoggedIn()) {
      await apiFetch("/cart/clear", { method: "DELETE" });
    }
    writeLocalCart([]);
  }, []);

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return { items, totalCount, addItem, updateQuantity, removeItem, clear };
}
