const Product = require("../models/Product");

// GET /api/products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).select("-_id -__v -createdAt -updatedAt");
    console.log(`[PRODUCTS] Fetched ${products.length} products`);
    res.json({ success: true, data: products });
  } catch (error) {
    console.error("[PRODUCTS] Fetch error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id }).select("-_id -__v -createdAt -updatedAt");
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    console.log(`[PRODUCTS] Fetched product: ${product.name}`);
    res.json({ success: true, data: product });
  } catch (error) {
    console.error("[PRODUCTS] Fetch by ID error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch product" });
  }
};

module.exports = { getProducts, getProductById };
