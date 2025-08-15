import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Eye, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Product } from '@shared/products';

interface ProductCardProps {
  product: Product;
  onInquiry: (product: Product, selectedVariants: Record<string, string>) => void;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onInquiry, onQuickView }: ProductCardProps) {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [isHovered, setIsHovered] = useState(false);

  const handleVariantChange = (type: string, value: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleInquiry = () => {
    onInquiry(product, selectedVariants);
  };

  return (
    <Card 
      className="group overflow-hidden bg-white jewelry-shadow hover:shadow-lg transition-all duration-300 border-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        {/* Product Image */}
        <div className="aspect-square bg-secondary/20 relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Overlay Actions */}
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 text-foreground hover:bg-white"
                onClick={() => onQuickView?.(product)}
              >
                <Eye className="w-4 h-4 mr-1" />
                Quick View
              </Button>
            </div>
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {product.featured && (
              <Badge className="bg-accent text-accent-foreground">Featured</Badge>
            )}
            <Badge variant="secondary" className="bg-white/90 text-foreground">
              {product.category}
            </Badge>
          </div>
          
          {/* Wishlist */}
          <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <Heart className="w-4 h-4 text-muted-foreground hover:text-red-500" />
          </button>
        </div>
        
        <CardContent className="p-4">
          {/* Product Info */}
          <div className="mb-4">
            <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
              {product.description}
            </p>
            
            
            {product.minimumOrder && (
              <p className="text-xs text-muted-foreground mb-3">
                Min. Order: {product.minimumOrder} pieces
              </p>
            )}
          </div>
          
          {/* Variant Selectors */}
          <div className="space-y-3 mb-4">
            {product.variants.metal && product.variants.metal.length > 0 && (
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Metal Type
                </label>
                <Select onValueChange={(value) => handleVariantChange('metal', value)}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Select metal" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.variants.metal.map((metal) => (
                      <SelectItem key={metal} value={metal}>
                        {metal}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {product.variants.size && product.variants.size.length > 0 && (
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Size
                </label>
                <Select onValueChange={(value) => handleVariantChange('size', value)}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.variants.size.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {product.variants.stone && product.variants.stone.length > 0 && (
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Stone Type
                </label>
                <Select onValueChange={(value) => handleVariantChange('stone', value)}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Select stone" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.variants.stone.map((stone) => (
                      <SelectItem key={stone} value={stone}>
                        {stone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button 
              className="flex-1 luxury-gradient text-white hover:opacity-90"
              onClick={handleInquiry}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Inquiry
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
