import { useState, useEffect } from 'react';
import InquiryModal from './InquiryModal';
import { sampleProducts, Product } from '@shared/products';
import { jewelryCategories } from '@shared/categories';

interface CatalogProductGridProps {
  selectedCategory?: string;
  products?: Product[];
}

// Transform shared products to catalog format
const transformProductToCatalog = (product: Product) => ({
  id: product.id,
  name: product.name,
  category: product.category,
  image: product.image,
  price: `As low as $${product.lowestPrice} per piece`,
  variants: product.variants,
  variantLabel: Object.keys(product.variants)[0] === 'metal' ? 'Metal' :
                Object.keys(product.variants)[0] === 'size' ? 'Size' :
                Object.keys(product.variants)[0] === 'length' ? 'Length' :
                Object.keys(product.variants)[0] === 'stone' ? 'Stone' :
                Object.keys(product.variants)[0] === 'cut' ? 'Cut' :
                'Options'
});

const getMetalButtonStyle = (metal: string, isSelected: boolean) => {
  const baseClasses = "appearance-button h-6 w-6 rounded-full border-2 border-gray-300 cursor-pointer transition-colors";
  
  if (metal === 'white') {
    return `${baseClasses} bg-white ${isSelected ? 'ring-2 ring-slate-800' : ''}`;
  } else if (metal === 'yellow') {
    return `${baseClasses} bg-yellow-400 ${isSelected ? 'ring-2 ring-slate-800' : ''}`;
  } else if (metal === 'pink') {
    return `${baseClasses} bg-pink-400 ${isSelected ? 'ring-2 ring-slate-800' : ''}`;
  }
  return `${baseClasses} bg-gray-300 ${isSelected ? 'ring-2 ring-slate-800' : ''}`;
};

const getVariantButtonStyle = (isSelected: boolean) => {
  return `appearance-button bg-gray-300 border-2 border-gray-300 rounded-full h-6 px-3 cursor-pointer text-xs transition-colors ${
    isSelected ? 'bg-slate-800 text-white' : 'hover:bg-gray-400'
  }`;
};

export default function CatalogProductGrid({ selectedCategory = 'All', products }: CatalogProductGridProps) {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);

  // Fetch or filter products based on category
  useEffect(() => {
    const fetchProducts = async () => {
      if (products) {
        // Use passed products
        setDisplayProducts(products);
      } else {
        // Fetch from API or use local data
        try {
          const params = new URLSearchParams();
          if (selectedCategory !== 'All') {
            params.append('category', selectedCategory);
          }

          const response = await fetch(`/api/products?${params.toString()}`);
          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              setDisplayProducts(data.products);
            }
          } else {
            // Fallback to filtered local data
            const filtered = selectedCategory === 'All'
              ? sampleProducts
              : sampleProducts.filter(p => p.category === selectedCategory);
            setDisplayProducts(filtered);
          }
        } catch (error) {
          console.error('Error fetching products:', error);
          // Fallback to filtered local data
          const filtered = selectedCategory === 'All'
            ? sampleProducts
            : sampleProducts.filter(p => p.category === selectedCategory);
          setDisplayProducts(filtered);
        }
      }
    };

    fetchProducts();
  }, [selectedCategory, products]);

  const handleVariantSelect = (productId: string, variantType: string, variant: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [`${productId}-${variantType}`]: variant
    }));
  };

  const handleInquiry = (product: CatalogProduct) => {
    setSelectedProduct(product);
    setIsInquiryModalOpen(true);
  };

  return (
    <>
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {catalogProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="relative aspect-square cursor-pointer overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105 cursor-pointer"
                  />
                  <div className="absolute top-3 right-3 cursor-pointer">
                    <span className="bg-slate-800 text-white text-xs px-2 py-1 rounded-full inline">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-gray-900 font-semibold mb-2 min-h-12 overflow-hidden">
                    {product.name}
                  </h3>
                  <p className="text-slate-800 text-lg font-bold leading-7 mb-3">
                    {product.price}
                  </p>
                  <div className="mb-4">
                    <div className="flex items-center">
                      <span className="text-gray-600 text-sm min-w-15">
                        <span>{product.variantLabel}</span>
                        <span>:</span>
                      </span>
                      <div className="flex ml-2">
                        {product.variants[Object.keys(product.variants)[0]].map((variant, index) => {
                          const variantKey = `${product.id}-${Object.keys(product.variants)[0]}`;
                          const isSelected = selectedVariants[variantKey] === variant;
                          
                          if (product.variantLabel === 'Metal') {
                            return (
                              <button
                                key={variant}
                                title={variant}
                                className={`${getMetalButtonStyle(variant, isSelected)} ${index > 0 ? 'ml-1' : ''}`}
                                onClick={() => handleVariantSelect(product.id, Object.keys(product.variants)[0], variant)}
                              />
                            );
                          } else {
                            return (
                              <button
                                key={variant}
                                title={variant}
                                className={`${getVariantButtonStyle(isSelected)} ${index > 0 ? 'ml-1' : ''}`}
                                onClick={() => handleVariantSelect(product.id, Object.keys(product.variants)[0], variant)}
                              >
                                {variant}
                              </button>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                  <button
                    className="w-full bg-slate-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-150 hover:bg-slate-700"
                    onClick={() => handleInquiry(product)}
                  >
                    Inquiry
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => {
          setIsInquiryModalOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct ? {
          id: selectedProduct.id,
          name: selectedProduct.name,
          category: selectedProduct.category,
          image: selectedProduct.image,
          lowestPrice: 0,
          priceRange: { min: 0, max: 0 },
          variants: {},
          description: '',
          minimumOrder: 1
        } : undefined}
        selectedVariants={selectedVariants}
      />
    </>
  );
}
