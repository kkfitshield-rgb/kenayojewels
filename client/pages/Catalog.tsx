import { useState, useMemo } from 'react';
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
import ProductCard, { Product } from '@/components/ProductCard';
import InquiryModal from '@/components/InquiryModal';
import CatalogProductGrid from '@/components/CatalogProductGrid';
import WholesaleInfo from '@/components/WholesaleInfo';

// Sample product data - in a real app, this would come from an API
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Diamond Tennis Necklace',
    category: 'Necklaces',
    image: '/api/placeholder/400/400',
    lowestPrice: 2500,
    priceRange: { min: 2500, max: 8500 },
    variants: {
      metal: ['14K Gold', '18K Gold', 'Platinum'],
      size: ['16"', '18"', '20"'],
      stone: ['0.5ct', '1ct', '2ct', '3ct']
    },
    description: 'Elegant tennis necklace featuring brilliant cut diamonds in a classic setting.',
    minimumOrder: 5,
    featured: true
  },
  {
    id: '2',
    name: 'Solitaire Engagement Ring',
    category: 'Rings',
    image: '/api/placeholder/400/400',
    lowestPrice: 1800,
    priceRange: { min: 1800, max: 15000 },
    variants: {
      metal: ['14K White Gold', '14K Yellow Gold', '18K White Gold', 'Platinum'],
      size: ['5', '5.5', '6', '6.5', '7', '7.5', '8'],
      stone: ['0.5ct', '1ct', '1.5ct', '2ct']
    },
    description: 'Timeless solitaire engagement ring with premium diamond and expert craftsmanship.',
    minimumOrder: 3
  },
  {
    id: '3',
    name: 'Pearl Drop Earrings',
    category: 'Earrings',
    image: '/api/placeholder/400/400',
    lowestPrice: 450,
    priceRange: { min: 450, max: 1200 },
    variants: {
      metal: ['Sterling Silver', '14K Gold', '18K Gold'],
      stone: ['Freshwater', 'Akoya', 'South Sea']
    },
    description: 'Elegant pearl drop earrings perfect for formal occasions and bridal collections.',
    minimumOrder: 10
  },
  {
    id: '4',
    name: 'Men\'s Signet Ring',
    category: 'Rings',
    image: '/api/placeholder/400/400',
    lowestPrice: 680,
    priceRange: { min: 680, max: 2200 },
    variants: {
      metal: ['14K Gold', '18K Gold', 'Sterling Silver'],
      size: ['8', '9', '10', '11', '12']
    },
    description: 'Classic men\'s signet ring with customizable engraving options.',
    minimumOrder: 5,
    featured: true
  },
  {
    id: '5',
    name: 'Sapphire Halo Pendant',
    category: 'Necklaces',
    image: '/api/placeholder/400/400',
    lowestPrice: 1200,
    priceRange: { min: 1200, max: 4500 },
    variants: {
      metal: ['14K White Gold', '14K Yellow Gold', '18K Gold'],
      stone: ['Blue Sapphire', 'Pink Sapphire', 'Yellow Sapphire']
    },
    description: 'Stunning sapphire pendant surrounded by brilliant diamonds.',
    minimumOrder: 3
  },
  {
    id: '6',
    name: 'Wedding Band Set',
    category: 'Rings',
    image: '/api/placeholder/400/400',
    lowestPrice: 890,
    priceRange: { min: 890, max: 3200 },
    variants: {
      metal: ['14K Gold', '18K Gold', 'Platinum'],
      size: ['His & Hers Set']
    },
    description: 'Matching wedding band set with intricate detailing and comfort fit.',
    minimumOrder: 2
  }
];

const categories = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'];
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' },
  { value: 'newest', label: 'Newest First' }
];

export default function Catalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = sampleProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.lowestPrice - b.lowestPrice;
        case 'price-high':
          return b.lowestPrice - a.lowestPrice;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'featured':
        default:
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

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
      <CatalogProductGrid />

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
