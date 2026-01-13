import Cart from "../models/Cart.js";
import Product from "../models/Products.js"; 

// Add to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { productId, quantity = 1 } = req.body;

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart
      cart = await Cart.create({
        userId,
        products: [{ productId, quantity }],
      });
      await cart.populate("products.productId");
      return res.status(201).json({ message: "Cart created", cart });
    }

    // Check if product already exists in cart
    const existingProductIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (existingProductIndex !== -1) {
      // Update quantity
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // Add new product
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    await cart.populate("products.productId");

    return res.status(200).json({ message: "Product added to cart", cart });
  } catch (err) {
    console.error("Add to cart error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get user's cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id })
      .populate("products.productId"); // 🔥 REQUIRED

    if (!cart) {
      return res.status(200).json({ products: [] });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};


// Update product quantity
export const updateQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    cart.products[productIndex].quantity = quantity;

    await cart.save();
    await cart.populate("products.productId");

    res.status(200).json({ message: "Quantity updated", cart });
  } catch (error) {
    console.error("Update quantity error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove product from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body; // or req.params.productId

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove product from array
    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== productId
    );

    await cart.save();
    await cart.populate("products.productId");

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Clear entire cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = [];
    await cart.save();

    res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};