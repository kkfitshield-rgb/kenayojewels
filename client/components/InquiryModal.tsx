import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Product } from '@shared/products';
import { useToast } from '@/hooks/use-toast';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  selectedVariants?: Record<string, string>;
}

export default function InquiryModal({ 
  isOpen, 
  onClose, 
  product, 
  selectedVariants = {} 
}: InquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    quantity: '',
    urgency: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const inquiryData = {
        ...formData,
        product: product ? {
          id: product.id,
          name: product.name,
          category: product.category,
          selectedVariants
        } : null,
        timestamp: new Date().toISOString(),
        type: product ? 'product' : 'general'
      };

      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiryData),
      });

      if (response.ok) {
        toast({
          title: 'Inquiry Sent Successfully',
          description: 'We will get back to you within 24 hours.',
        });
        
        // Reset form
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          quantity: '',
          urgency: '',
          message: ''
        });
        
        onClose();
      } else {
        throw new Error('Failed to send inquiry');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send inquiry. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {product ? 'Product Inquiry' : 'General Inquiry'}
          </DialogTitle>
          <DialogDescription>
            {product 
              ? `Get a quote for ${product.name}. Fill out the form below and we'll get back to you with pricing and availability.`
              : 'Send us your inquiry and we\'ll get back to you within 24 hours.'
            }
          </DialogDescription>
        </DialogHeader>

        {product && (
          <div className="bg-secondary/30 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{product.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                {Object.keys(selectedVariants).length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Selected Options:</p>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(selectedVariants).map(([key, value]) => (
                        <span
                          key={key}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                        >
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                placeholder="Your full name"
              />
            </div>
            <div>
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                required
                placeholder="Your company name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                placeholder="your.email@company.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          {product && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quantity">Quantity Needed</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  placeholder="100"
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="urgency">Urgency</Label>
                <Select onValueChange={(value) => handleInputChange('urgency', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - No rush</SelectItem>
                    <SelectItem value="medium">Medium - Within 2 weeks</SelectItem>
                    <SelectItem value="high">High - Within 1 week</SelectItem>
                    <SelectItem value="urgent">Urgent - ASAP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder={product 
                ? "Tell us about your requirements, preferred timeline, or any specific customizations..."
                : "How can we help you?"
              }
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="luxury-gradient text-white" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
