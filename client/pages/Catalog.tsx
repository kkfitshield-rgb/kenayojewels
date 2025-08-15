import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import InquiryModal from '@/components/InquiryModal';
import CatalogProductGrid from '@/components/CatalogProductGrid';
import WholesaleInfo from '@/components/WholesaleInfo';
import { jewelryCategories, getCategoryDisplayNames } from '@shared/categories';
import { sampleProducts } from '@shared/products';

// Use shared categories data
const categories = getCategoryDisplayNames();
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' },
  { value: 'newest', label: 'Newest First' }
];

export default function Catalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(() => {
    // Get category from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    return categoryParam && categories.includes(categoryParam) ? categoryParam : 'All';
  });
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch products when category changes
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedCategory !== 'All') {
          params.append('category', selectedCategory);
        }
        if (searchTerm) {
          params.append('search', searchTerm);
        }
        if (sortBy) {
          params.append('sortBy', sortBy);
        }

        const response = await fetch(`/api/products?${params.toString()}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setProducts(data.products);
          }
        } else {
          // Fallback to local data if API fails
          setProducts(sampleProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to local data
        setProducts(sampleProducts);
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

  const handleProductInquiry = (product: Product, variants: Record<string, string>) => {
    setSelectedProduct(product);
    setSelectedVariants(variants);
    setIsInquiryModalOpen(true);
  };

  const handleQuickView = (product: Product) => {
    // In a real app, this would open a detailed product modal
    console.log('Quick view for:', product.name);
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
              Explore our complete collection of fine jewelry designed for wholesale partners
            </p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="bg-gray-50 border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-slate-800 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
              <button
                onClick={() => setSelectedCategory('Custom')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'Custom'
                    ? 'bg-slate-800 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Custom
              </button>
            </div>

            {/* Product Count and Sort */}
            <div className="flex items-center gap-4">
              <span className="text-gray-600 text-sm">
                {filteredAndSortedProducts.length} products
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm"
              >
                <option value="featured">Sort by Featured</option>
                <option value="name">Sort by Name</option>
                <option value="price-low">Sort by Price: Low to High</option>
                <option value="price-high">Sort by Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Product Grid */}
      {isLoading ? (
        <section className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="text-gray-600">Loading products...</div>
          </div>
        </section>
      ) : (
        <CatalogProductGrid
          selectedCategory={selectedCategory}
          products={filteredAndSortedProducts}
        />
      )}

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
