import { RequestHandler } from "express";
import { jewelryCategories, getCategoryById } from "../../shared/categories";
import { sampleProducts, Product } from "../../shared/products";

export const handleGetCategories: RequestHandler = (req, res) => {
  try {
    res.json({
      success: true,
      categories: jewelryCategories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch categories",
    });
  }
};

export const handleGetProducts: RequestHandler = (req, res) => {
  try {
    const { category, featured, search, sortBy } = req.query;

    let filteredProducts = [...sampleProducts];

    // Filter by category
    if (category && category !== "All") {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.category === category || product.categoryId === category,
      );
    }

    // Filter by featured
    if (featured === "true") {
      filteredProducts = filteredProducts.filter((product) => product.featured);
    }

    // Filter by search term
    if (search && typeof search === "string") {
      const searchTerm = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm),
      );
    }

    // Sort products
    if (sortBy) {
      switch (sortBy) {
        case "price-low":
          filteredProducts.sort((a, b) => a.lowestPrice - b.lowestPrice);
          break;
        case "price-high":
          filteredProducts.sort((a, b) => b.lowestPrice - a.lowestPrice);
          break;
        case "name":
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "featured":
        default:
          filteredProducts.sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return 0;
          });
          break;
      }
    }

    res.json({
      success: true,
      products: filteredProducts,
      total: filteredProducts.length,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch products",
    });
  }
};

export const handleGetProductsByCategory: RequestHandler = (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = getCategoryById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        error: "Category not found",
      });
    }

    const categoryProducts = sampleProducts.filter(
      (product) =>
        product.categoryId === categoryId || product.category === category.name,
    );

    res.json({
      success: true,
      category: category,
      products: categoryProducts,
      total: categoryProducts.length,
    });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch products by category",
    });
  }
};

export const handleGetProduct: RequestHandler = (req, res) => {
  try {
    const { productId } = req.params;
    const product = sampleProducts.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    res.json({
      success: true,
      product: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch product",
    });
  }
};
