const Cart = require("../models/Cart");

// GET /api/cart
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }
    console.log(`[CART] Fetched cart for user ${req.user.email}: ${cart.items.length} items`);
    res.json({ success: true, data: cart.items });
  } catch (error) {
    console.error("[CART] Get error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch cart" });
  }
};

// POST /api/cart/add
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: "productId is required" });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    const existingIndex = cart.items.findIndex((i) => i.productId === productId);
    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    console.log(`[CART] Added ${productId} (qty: ${quantity}) for user ${req.user.email}`);
    res.json({ success: true, data: cart.items });
  } catch (error) {
    console.error("[CART] Add error:", error.message);
    res.status(500).json({ success: false, message: "Failed to add to cart" });
  }
};

// PUT /api/cart/update
const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({ success: false, message: "productId and quantity are required" });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.productId !== productId);
    } else {
      const item = cart.items.find((i) => i.productId === productId);
      if (item) {
        item.quantity = quantity;
      }
    }

    await cart.save();
    console.log(`[CART] Updated ${productId} to qty ${quantity} for user ${req.user.email}`);
    res.json({ success: true, data: cart.items });
  } catch (error) {
    console.error("[CART] Update error:", error.message);
    res.status(500).json({ success: false, message: "Failed to update cart" });
  }
};

// DELETE /api/cart/remove/:productId
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter((i) => i.productId !== productId);
    await cart.save();

    console.log(`[CART] Removed ${productId} for user ${req.user.email}`);
    res.json({ success: true, data: cart.items });
  } catch (error) {
    console.error("[CART] Remove error:", error.message);
    res.status(500).json({ success: false, message: "Failed to remove from cart" });
  }
};

// DELETE /api/cart/clear
const clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    console.log(`[CART] Cleared cart for user ${req.user.email}`);
    res.json({ success: true, data: [] });
  } catch (error) {
    console.error("[CART] Clear error:", error.message);
    res.status(500).json({ success: false, message: "Failed to clear cart" });
  }
};

module.exports = { getCart, addToCart, updateCart, removeFromCart, clearCart };
