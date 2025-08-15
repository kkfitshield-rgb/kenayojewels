import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Award, Users, Gem, Shield, Truck, Clock, Settings, HeadphonesIcon } from 'lucide-react';
import SlideBackground from '@/components/SlideBackground';
import HorizontalCategoriesCarousel from '@/components/HorizontalCategoriesCarousel';
import InquiryModal from '@/components/InquiryModal';
import ApiTest from '@/components/ApiTest';
import { jewelryCategories } from '@shared/categories';
import { sampleProducts, Product } from '@shared/products';

export default function Index() {
  const heroImages = [
    'https://cdn.builder.io/api/v1/image/assets%2F5fb29789eefb45b0b7ff051660b2074e%2Ff0e262b72a0d40d6a1baf04548adaf09',
    'https://cdn.builder.io/api/v1/image/assets%2F5fb29789eefb45b0b7ff051660b2074e%2F2551d50fb85645a9a4d6f150775f8628?format=webp&width=800',
    'https://cdn.builder.io/api/v1/image/assets%2F5fb29789eefb45b0b7ff051660b2074e%2Fb05a327fbe534d37a625c38cc77b8902?format=webp&width=800',
    'https://cdn.builder.io/api/v1/image/assets%2F5fb29789eefb45b0b7ff051660b2074e%2F3a110020445f451495ffaf0e7209a7b9?format=webp&width=800'
  ];

  // Use shared categories data
  const categories = jewelryCategories.map(cat => ({
    name: cat.name,
    imageUrl: cat.imageUrl,
    designCount: cat.designCount
  }));

  // Get featured products
  const featuredProducts = sampleProducts.filter(product => product.featured);

  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden bg-gradient-to-r from-slate-800 to-slate-900">
        {/* Sliding Background Images */}
        <SlideBackground
          images={heroImages}
          interval={4000}
          className="opacity-20"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-4xl">
            <div className="text-left">
              <h1 className="text-6xl lg:text-8xl font-bold mb-6 text-white">
                <span className="font-script text-8xl lg:text-9xl font-bold text-white block mb-4" style={{ fontFamily: 'Pacifico, cursive' }}>
                  Kenayo
                </span>
                <span className="text-4xl lg:text-5xl font-light text-white">
                  JEWELS
                </span>
              </h1>

              <p className="text-2xl lg:text-3xl font-light text-gray-300 mb-4">
                DEFINING BRILLIANCE
              </p>

              <p className="text-lg text-gray-400 leading-7 mb-8 max-w-2xl">
                Professional B2B jewelry solutions for retailers worldwide. From
                custom designs to bulk orders, we craft excellence in every piece.
              </p>

              <div className="flex gap-4 text-left">
                <Link to="/catalog">
                  <Button className="bg-white text-slate-800 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-md transition-colors">
                    View Catalog
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="white" className="text-lg">
                    Request Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive collection of fine jewelry designed for B2B partners
            </p>
          </div>

          <HorizontalCategoriesCarousel
            categories={categories.map(cat => ({
              ...cat,
              onClick: () => {
                // Navigate to catalog with category filter
                window.location.href = `/catalog?category=${encodeURIComponent(cat.name)}`;
              }
            }))}
            autoSlide={true}
            slideInterval={4000}
          />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our most popular designs favored by retailers worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                <div className="aspect-square relative overflow-hidden cursor-pointer">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-slate-800 text-white text-xs px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 min-h-12 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-slate-800 text-lg font-bold mb-3">
                    As low as ${product.lowestPrice} per piece
                  </p>
                  <div className="mb-4">
                    <div className="flex items-center">
                      <span className="text-gray-600 text-sm min-w-15">
                        {Object.keys(product.variants)[0] === 'metal' ? 'Metal:' :
                         Object.keys(product.variants)[0] === 'size' ? 'Size:' :
                         Object.keys(product.variants)[0] === 'length' ? 'Length:' :
                         Object.keys(product.variants)[0] === 'stone' ? 'Stone:' :
                         'Options:'}
                      </span>
                      <div className="flex ml-2">
                        {product.variants[Object.keys(product.variants)[0]]?.slice(0, 3).map((variant, index) => (
                          Object.keys(product.variants)[0] === 'metal' ? (
                            <button
                              key={variant}
                              className={`w-6 h-6 border-2 border-gray-300 rounded-full ${index > 0 ? 'ml-1' : ''} ${
                                variant.toLowerCase().includes('white') ? 'bg-white' :
                                variant.toLowerCase().includes('yellow') ? 'bg-yellow-400' :
                                variant.toLowerCase().includes('rose') ? 'bg-pink-400' : 'bg-gray-300'
                              }`}
                              title={variant}
                            />
                          ) : (
                            <button
                              key={variant}
                              className={`w-auto h-6 px-2 bg-gray-300 border-2 border-gray-300 rounded-full text-xs ${index > 0 ? 'ml-1' : ''}`}
                              title={variant}
                            >
                              {variant}
                            </button>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                  <Link to="/catalog">
                    <button className="w-full bg-slate-800 text-white py-2 rounded-md font-medium transition-colors hover:bg-slate-700">
                      Inquiry
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/catalog">
              <Button className="bg-slate-800 text-white hover:bg-slate-700 px-8 py-3 text-lg font-medium rounded-md">
                View Full Catalog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Kenayo Jewels Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Kenayo Jewels
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional B2B solutions designed for jewelry retailers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Custom Manufacturing */}
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Custom Manufacturing
              </h3>
              <p className="text-gray-600 text-sm leading-5">
                Tailor-made designs to match your brand requirements with flexible MOQ options
              </p>
            </div>

            {/* Wholesale Pricing */}
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Wholesale Pricing
              </h3>
              <p className="text-gray-600 text-sm leading-5">
                Competitive B2B pricing with volume discounts for bulk orders
              </p>
            </div>

            {/* Global Shipping */}
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Global Shipping
              </h3>
              <p className="text-gray-600 text-sm leading-5">
                Worldwide delivery with secure packaging and comprehensive insurance
              </p>
            </div>

            {/* Quality Certified */}
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Quality Certified
              </h3>
              <p className="text-gray-600 text-sm leading-5">
                All products come with authenticity certificates and quality guarantees
              </p>
            </div>

            {/* Dedicated Support */}
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Dedicated Support
              </h3>
              <p className="text-gray-600 text-sm leading-5">
                24/7 customer service with dedicated account managers for B2B clients
              </p>
            </div>

            {/* Fast Turnaround */}
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Fast Turnaround
              </h3>
              <p className="text-gray-600 text-sm leading-5">
                Quick production times with express shipping options available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Order?
          </h2>
          <p className="text-gray-300 text-xl leading-7 mb-8 max-w-2xl mx-auto">
            Contact us today for custom quotes and wholesale pricing information
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalog">
              <Button className="bg-white text-slate-800 hover:bg-gray-100 px-8 py-3 font-medium rounded-md transition-colors">
                Browse Catalog
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="white">
                Get Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* API Test Component for debugging */}
      <ApiTest />
    </main>
  );
}
