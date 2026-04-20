const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Generate order ID like ORD-1042
const generateOrderId = async () => {
  const count = await Order.countDocuments();
  return `ORD-${1042 + count}`;
};

// POST /api/orders/create
const createOrder = async (req, res) => {
  try {
    const { items, shipping, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "No items in order" });
    }

    const orderId = await generateOrderId();
    const today = new Date().toISOString().split("T")[0];
    const itemCount = items.reduce((sum, i) => sum + (i.quantity || 1), 0);

    const order = await Order.create({
      id: orderId,
      user: req.user._id,
      date: today,
      items: itemCount,
      total: total || 0,
      status: "Processing",
      orderItems: items,
      shipping: shipping || {},
    });

    // Clear user's cart after order
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

    console.log(`[ORDERS] Created order ${orderId} for user ${req.user.email}`);

    res.status(201).json({
      success: true,
      data: {
        id: order.id,
        date: order.date,
        items: order.items,
        total: order.total,
        status: order.status,
      },
    });
  } catch (error) {
    console.error("[ORDERS] Create error:", error.message);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
};

// GET /api/orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .select("id date items total status -_id")
      .sort({ createdAt: -1 });

    console.log(`[ORDERS] Fetched ${orders.length} orders for user ${req.user.email}`);
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("[ORDERS] Fetch error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

module.exports = { createOrder, getOrders };
