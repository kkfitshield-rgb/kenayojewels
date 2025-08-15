import { useState, useEffect } from 'react';
import InquiryModal from './InquiryModal';
import { sampleProducts, Product } from '@shared/products';
import { jewelryCategories } from '@shared/categories';

interface CatalogProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  price: string;
  variants: {
    [key: string]: string[];
  };
  variantLabel: string;
}

const catalogProducts: CatalogProduct[] = [
  {
    id: '1',
    name: 'Classic Solitaire Diamond Ring',
    category: 'Rings',
    image: 'https://readdy.ai/api/search-image?query=classic%20solitaire%20diamond%20ring%20with%20brilliant%20cut%20center%20stone%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20engagement%20ring&width=400&height=400&seq=catalog-ring-1&orientation=squarish',
    price: 'As low as $450 per piece',
    variants: {
      metal: ['white', 'yellow', 'pink']
    },
    variantLabel: 'Metal'
  },
  {
    id: '2',
    name: 'Diamond Bangle Set',
    category: 'Bracelets',
    image: 'https://readdy.ai/api/search-image?query=diamond%20bangle%20set%20with%20multiple%20bangles%20featuring%20diamond%20accents%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20fashion%20jewelry&width=400&height=400&seq=catalog-bracelet-2&orientation=squarish',
    price: 'As low as $1,250 per set',
    variants: {
      count: ['2-Piece', '3-Piece', '4-Piece']
    },
    variantLabel: 'Count'
  },
  {
    id: '3',
    name: 'Diamond Chain Bracelet',
    category: 'Bracelets',
    image: 'https://readdy.ai/api/search-image?query=diamond%20chain%20bracelet%20with%20delicate%20chain%20and%20diamond%20accents%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20everyday%20jewelry&width=400&height=400&seq=catalog-bracelet-3&orientation=squarish',
    price: 'As low as $380 per piece',
    variants: {
      length: ['7"', '7.5"', '8"']
    },
    variantLabel: 'Length'
  },
  {
    id: '4',
    name: 'Diamond Drop Earrings',
    category: 'Earrings',
    image: 'https://readdy.ai/api/search-image?query=diamond%20drop%20earrings%20with%20elegant%20dangling%20design%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20evening%20jewelry&width=400&height=400&seq=catalog-earring-3&orientation=squarish',
    price: 'As low as $650 per pair',
    variants: {
      length: ['Short', 'Medium', 'Long']
    },
    variantLabel: 'Length'
  },
  {
    id: '5',
    name: 'Diamond Hoop Earrings',
    category: 'Earrings',
    image: 'https://readdy.ai/api/search-image?query=diamond%20hoop%20earrings%20with%20diamonds%20set%20around%20the%20hoop%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20fashion%20jewelry&width=400&height=400&seq=catalog-earring-2&orientation=squarish',
    price: 'As low as $420 per pair',
    variants: {
      size: ['Small', 'Medium', 'Large']
    },
    variantLabel: 'Size'
  },
  {
    id: '6',
    name: 'Diamond Pendant Necklace',
    category: 'Necklaces',
    image: 'https://readdy.ai/api/search-image?query=diamond%20pendant%20necklace%20with%20solitaire%20diamond%20pendant%20on%20delicate%20chain%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20bridal%20jewelry&width=400&height=400&seq=catalog-necklace-2&orientation=squarish',
    price: 'As low as $580 per piece',
    variants: {
      length: ['16"', '18"', '20"']
    },
    variantLabel: 'Length'
  },
  {
    id: '7',
    name: 'Diamond Stud Earrings',
    category: 'Earrings',
    image: 'https://readdy.ai/api/search-image?query=diamond%20stud%20earrings%20with%20brilliant%20cut%20diamonds%20in%20prong%20setting%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20bridal%20jewelry&width=400&height=400&seq=catalog-earring-1&orientation=squarish',
    price: 'As low as $280 per pair',
    variants: {
      size: ['0.5ct', '1ct', '1.5ct']
    },
    variantLabel: 'Size'
  },
  {
    id: '8',
    name: 'Diamond Tennis Bracelet',
    category: 'Bracelets',
    image: 'https://readdy.ai/api/search-image?query=diamond%20tennis%20bracelet%20with%20brilliant%20cut%20diamonds%20in%20line%20setting%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20bridal%20jewelry&width=400&height=400&seq=catalog-bracelet-1&orientation=squarish',
    price: 'As low as $850 per piece',
    variants: {
      length: ['7"', '7.5"', '8"']
    },
    variantLabel: 'Length'
  },
  {
    id: '9',
    name: 'Halo Diamond Engagement Ring',
    category: 'Rings',
    image: 'https://readdy.ai/api/search-image?query=halo%20diamond%20engagement%20ring%20with%20center%20stone%20surrounded%20by%20smaller%20diamonds%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20bridal%20ring&width=400&height=400&seq=catalog-ring-2&orientation=squarish',
    price: 'As low as $680 per piece',
    variants: {
      metal: ['white', 'yellow', 'pink']
    },
    variantLabel: 'Metal'
  },
  {
    id: '10',
    name: 'Multi-Layer Diamond Necklace',
    category: 'Necklaces',
    image: 'https://readdy.ai/api/search-image?query=multi%20layer%20diamond%20necklace%20with%20multiple%20strands%20of%20diamonds%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20statement%20jewelry&width=400&height=400&seq=catalog-necklace-3&orientation=squarish',
    price: 'As low as $1,850 per piece',
    variants: {
      layers: ['2-Layer', '3-Layer', '4-Layer']
    },
    variantLabel: 'Layers'
  },
  {
    id: '11',
    name: 'Tennis Diamond Necklace',
    category: 'Necklaces',
    image: 'https://readdy.ai/api/search-image?query=tennis%20diamond%20necklace%20with%20brilliant%20cut%20diamonds%20in%20line%20setting%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20bridal%20jewelry&width=400&height=400&seq=catalog-necklace-1&orientation=squarish',
    price: 'As low as $1,200 per piece',
    variants: {
      length: ['16"', '18"', '20"']
    },
    variantLabel: 'Length'
  },
  {
    id: '12',
    name: 'Three Stone Diamond Ring',
    category: 'Rings',
    image: 'https://readdy.ai/api/search-image?query=three%20stone%20diamond%20ring%20with%20center%20diamond%20and%20two%20side%20stones%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20engagement%20ring&width=400&height=400&seq=catalog-ring-3&orientation=squarish',
    price: 'As low as $820 per piece',
    variants: {
      metal: ['white', 'yellow', 'pink']
    },
    variantLabel: 'Metal'
  }
];

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

export default function CatalogProductGrid() {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);

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
