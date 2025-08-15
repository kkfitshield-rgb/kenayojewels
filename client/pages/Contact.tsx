import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Users,
  Globe,
  Send
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    businessType: '',
    interests: [] as string[],
    orderVolume: '',
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
        timestamp: new Date().toISOString(),
        type: 'general'
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
          title: 'Message Sent Successfully',
          description: 'We will get back to you within 24 hours.',
        });

        // Reset form
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          businessType: '',
          interests: [],
          orderVolume: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-slate-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-white text-4xl font-bold leading-10 mb-4 text-center">
              Contact Us
            </h1>
            <p className="text-gray-300 text-xl leading-7 max-w-2xl mx-auto text-center">
              Ready to start your partnership? Get in touch with our team
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-gray-900 text-2xl font-bold leading-8 mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-gray-700 text-sm font-medium leading-5 mb-2 block">
                      Company Name *
                    </label>
                    <input
                      required
                      placeholder="Your Company Name"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 text-sm font-medium leading-5 mb-2 block">
                      Contact Person *
                    </label>
                    <input
                      required
                      placeholder="Your Full Name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-gray-700 text-sm font-medium leading-5 mb-2 block">
                      Email Address *
                    </label>
                    <input
                      required
                      placeholder="your@email.com"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 text-sm font-medium leading-5 mb-2 block">
                      Phone Number
                    </label>
                    <input
                      placeholder="+1 (555) 000-0000"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-sm"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="text-gray-700 text-sm font-medium leading-5 mb-2 block">
                    Business Type
                  </label>
                  <div className="relative w-full">
                    <select
                      name="businessType"
                      className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 pr-8 text-sm appearance-none"
                    >
                      <option value="">
                        Select your business type
                      </option>
                      <option value="jewelry-retailer">
                        Jewelry Retailer
                      </option>
                      <option value="online-store">
                        Online Store
                      </option>
                      <option value="department-store">
                        Department Store
                      </option>
                      <option value="boutique">
                        Boutique
                      </option>
                      <option value="wholesaler">
                        Wholesaler
                      </option>
                      <option value="other">
                        Other
                      </option>
                    </select>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="text-gray-700 text-sm font-medium leading-5 mb-2 block">
                    Products of Interest
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className="flex items-center">
                      <input type="checkbox" value="Rings" name="interests" className="mr-2" />
                      <span className="text-gray-700 text-sm leading-5">
                        Rings
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" value="Necklaces" name="interests" className="mr-2" />
                      <span className="text-gray-700 text-sm leading-5">
                        Necklaces
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" value="Earrings" name="interests" className="mr-2" />
                      <span className="text-gray-700 text-sm leading-5">
                        Earrings
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" value="Bracelets" name="interests" className="mr-2" />
                      <span className="text-gray-700 text-sm leading-5">
                        Bracelets
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" value="Custom Designs" name="interests" className="mr-2" />
                      <span className="text-gray-700 text-sm leading-5">
                        Custom Designs
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" value="All Products" name="interests" className="mr-2" />
                      <span className="text-gray-700 text-sm leading-5">
                        All Products
                      </span>
                    </label>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="text-gray-700 text-sm font-medium leading-5 mb-2 block">
                    Expected Order Volume
                  </label>
                  <div className="relative w-full">
                    <select
                      name="orderVolume"
                      className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 pr-8 text-sm appearance-none"
                    >
                      <option value="">
                        Select order volume
                      </option>
                      <option value="50-100">
                        50-100 pieces
                      </option>
                      <option value="100-500">
                        100-500 pieces
                      </option>
                      <option value="500-1000">
                        500-1000 pieces
                      </option>
                      <option value="1000+">
                        1000+ pieces
                      </option>
                    </select>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="text-gray-700 text-sm font-medium leading-5 mb-2 block">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    maxLength={500}
                    placeholder="Tell us about your business needs, preferred timeline, or any specific requirements..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-slate-800 text-white font-medium py-3 px-6 rounded-md transition-colors duration-150 hover:bg-slate-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-gray-900 text-2xl font-bold leading-8 mb-6">
                Get in Touch
              </h2>
              <div className="mb-8">
                <div className="flex items-start mb-6">
                  <div className="flex items-center justify-center bg-slate-800 rounded-full w-10 h-10 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-900 font-semibold mb-1">
                      Address
                    </h3>
                    <p className="text-gray-600">
                      <span>123 Jewelry District</span><br />
                      <span>Business Center, Suite 456</span><br />
                      <span>New York, NY 10001</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-start mb-6">
                  <div className="flex items-center justify-center bg-slate-800 rounded-full w-10 h-10 flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-900 font-semibold mb-1">
                      Phone
                    </h3>
                    <p className="text-gray-600">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>
                <div className="flex items-start mb-6">
                  <div className="flex items-center justify-center bg-slate-800 rounded-full w-10 h-10 flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-900 font-semibold mb-1">
                      Email
                    </h3>
                    <p className="text-gray-600">
                      info@kenayojewels.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start mb-6">
                  <div className="flex items-center justify-center bg-slate-800 rounded-full w-10 h-10 flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-900 font-semibold mb-1">
                      Business Hours
                    </h3>
                    <p className="text-gray-600">
                      <span>Monday - Friday: 9:00 AM - 6:00 PM EST</span><br />
                      <span>Saturday: 10:00 AM - 4:00 PM EST</span><br />
                      <span>Sunday: Closed</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.687!2d-73.9857!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjIiTiA3M8KwNTknMDguNSJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                  width="100%"
                  height="250"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kenayo Jewels Location"
                  className="border-0"
                />
              </div>
              <div className="mt-8">
                <h3 className="text-gray-900 font-semibold mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="flex items-center justify-center bg-slate-800 rounded-full w-10 h-10 text-white transition-colors duration-150 hover:bg-slate-700"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center bg-slate-800 rounded-full w-10 h-10 text-white transition-colors duration-150 hover:bg-slate-700"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center bg-slate-800 rounded-full w-10 h-10 text-white transition-colors duration-150 hover:bg-slate-700"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center bg-slate-800 rounded-full w-10 h-10 text-white transition-colors duration-150 hover:bg-slate-700"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.752-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-gray-900 text-3xl font-bold leading-9 mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-center">
              Common questions from our B2B partners
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-gray-900 font-semibold mb-2">
                What is your minimum order quantity?
              </h3>
              <p className="text-gray-600">
                Our minimum order quantity starts at 50 pieces per design. For
                custom designs, the MOQ may vary depending on complexity.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 mt-6">
              <h3 className="text-gray-900 font-semibold mb-2">
                What are your payment terms?
              </h3>
              <p className="text-gray-600">
                We offer flexible payment terms including 30% deposit with balance
                on completion, or net 30 terms for established customers.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 mt-6">
              <h3 className="text-gray-900 font-semibold mb-2">
                Do you provide certificates for your jewelry?
              </h3>
              <p className="text-gray-600">
                Yes, all our jewelry comes with authenticity certificates and
                detailed specifications for diamonds and precious metals.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 mt-6">
              <h3 className="text-gray-900 font-semibold mb-2">
                What is your typical lead time?
              </h3>
              <p className="text-gray-600">
                Standard lead time is 2-4 weeks for existing designs and 4-6 weeks
                for custom pieces, depending on order volume.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 mt-6">
              <h3 className="text-gray-900 font-semibold mb-2">
                Do you offer custom packaging?
              </h3>
              <p className="text-gray-600">
                Yes, we provide custom packaging solutions including branded
                boxes, pouches, and display materials for our B2B partners.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
