import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import InquiryModal from "@/components/InquiryModal";
import CatalogProductGrid from "@/components/CatalogProductGrid";
import WholesaleInfo from "@/components/WholesaleInfo";
import { jewelryCategories, getCategoryDisplayNames } from "@shared/categories";
import { sampleProducts, Product } from "@shared/products";

// Use shared categories data
const categories = getCategoryDisplayNames();
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name", label: "Name A-Z" },
  { value: "newest", label: "Newest First" },
];

export default function Catalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(() => {
    // Get category from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");
    return categoryParam && categories.includes(categoryParam)
      ? categoryParam
      : "All";
  });
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch products when category changes
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedCategory !== "All") {
          params.append("category", selectedCategory);
        }
        if (searchTerm) {
          params.append("search", searchTerm);
        }
        if (sortBy) {
          params.append("sortBy", sortBy);
        }

        const response = await fetch(`/api/products?${params.toString()}`);

        if (response.ok) {
          const text = await response.text();

          // Check if response is JSON
          if (text.startsWith("{") || text.startsWith("[")) {
            const data = JSON.parse(text);
            if (data.success && Array.isArray(data.products)) {
              setProducts(data.products);
              return;
            }
          }
        }

        // If we get here, API failed or returned invalid data
        console.warn("API returned invalid data, falling back to local data");
        throw new Error("Invalid API response");
      } catch (error) {
        console.error("Error fetching products:", error);

        // Fallback to local data with filtering
        let filtered = [...sampleProducts];

        // Apply category filter
        if (selectedCategory !== "All") {
          filtered = filtered.filter(
            (product) =>
              product.category === selectedCategory ||
              product.categoryId ===
                selectedCategory.toLowerCase().replace(/\s+/g, "-"),
          );
        }

        // Apply search filter
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          filtered = filtered.filter(
            (product) =>
              product.name.toLowerCase().includes(searchLower) ||
              product.description.toLowerCase().includes(searchLower) ||
              product.category.toLowerCase().includes(searchLower),
          );
        }

        // Apply sorting
        if (sortBy === "price-low") {
          filtered.sort((a, b) => a.lowestPrice - b.lowestPrice);
        } else if (sortBy === "price-high") {
          filtered.sort((a, b) => b.lowestPrice - a.lowestPrice);
        } else if (sortBy === "name") {
          filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "featured") {
          filtered.sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return 0;
          });
        }

        setProducts(filtered);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchTerm, sortBy]);

  const filteredAndSortedProducts = useMemo(() => {
    // Products are already filtered and sorted by the backend
    return products;
  }, [products]);

  const handleProductInquiry = (
    product: Product,
    variants: Record<string, string>,
  ) => {
    setSelectedProduct(product);
    setSelectedVariants(variants);
    setIsInquiryModalOpen(true);
  };

  const handleQuickView = (product: Product) => {
    // In a real app, this would open a detailed product modal
    console.log("Quick view for:", product.name);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold leading-10 mb-4">
              Product Catalog
            </h1>
            <p className="text-gray-300 text-xl leading-7 max-w-2xl mx-auto">
              Explore our complete collection of fine jewelry designed for
              wholesale partners
            </p>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar Layout */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            {/* Left Sidebar - Category Filters */}
            <div className="w-80 flex-shrink-0 bg-gray-50 border-r border-gray-200 min-h-screen p-6">
              <div className="sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Categories
                </h3>

                {/* Category Filter List */}
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? "bg-slate-800 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                  <button
                    onClick={() => setSelectedCategory("Custom")}
                    className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                      selectedCategory === "Custom"
                        ? "bg-slate-800 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Custom
                  </button>
                </div>

                {/* Search Filter */}
                <div className="mt-8">
                  <h4 className="text-md font-medium text-gray-900 mb-4">
                    Search
                  </h4>
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 min-w-0">
              {/* Top Bar with Sort and Product Count */}
              <div className="flex items-center justify-between py-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {selectedCategory === "All"
                      ? "All Products"
                      : selectedCategory}
                  </h2>
                  <span className="text-gray-600 text-sm">
                    {filteredAndSortedProducts.length} products
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm"
                  >
                    <option value="featured">Sort by Featured</option>
                    <option value="name">Sort by Name</option>
                    <option value="price-low">
                      Sort by Price: Low to High
                    </option>
                    <option value="price-high">
                      Sort by Price: High to Low
                    </option>
                  </select>
                </div>
              </div>

              {/* Product Grid */}
              <div className="py-8">
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="text-gray-600">Loading products...</div>
                  </div>
                ) : (
                  <CatalogProductGrid
                    selectedCategory={selectedCategory}
                    products={filteredAndSortedProducts}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wholesale Information */}
      <WholesaleInfo />

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => {
          setIsInquiryModalOpen(false);
          setSelectedProduct(null);
          setSelectedVariants({});
        }}
        product={selectedProduct || undefined}
        selectedVariants={selectedVariants}
      />
    </div>
  );
}
