import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Award, Users, Gem, Shield, Truck, Clock, Settings, HeadphonesIcon } from 'lucide-react';
import SlideBackground from '@/components/SlideBackground';
import HorizontalCategoriesCarousel from '@/components/HorizontalCategoriesCarousel';
import { jewelryCategories } from '@shared/categories';
import { sampleProducts } from '@shared/products';

export default function Index() {
  const heroImages = [
    'https://cdn.builder.io/api/v1/image/assets%2F5fb29789eefb45b0b7ff051660b2074e%2Ff0e262b72a0d40d6a1baf04548adaf09',
    'https://cdn.builder.io/api/v1/image/assets%2F5fb29789eefb45b0b7ff051660b2074e%2F2551d50fb85645a9a4d6f150775f8628?format=webp&width=800',
    'https://cdn.builder.io/api/v1/image/assets%2F5fb29789eefb45b0b7ff051660b2074e%2Fb05a327fbe534d37a625c38cc77b8902?format=webp&width=800',
    'https://cdn.builder.io/api/v1/image/assets%2F5fb29789eefb45b0b7ff051660b2074e%2F3a110020445f451495ffaf0e7209a7b9?format=webp&width=800'
  ];

  const categories = [
    {
      name: "Diamond Ring",
      imageUrl: "https://readdy.ai/api/search-image?query=collection%20of%20various%20elegant%20diamond%20rings%20including%20solitaire%20engagement%20rings%20wedding%20bands%20and%20fashion%20rings%20professional%20jewelry%20photography%20clean%20background&width=300&height=300&seq=cat-rings&orientation=squarish",
      designCount: "150+ Designs"
    },
    {
      name: "Diamond Necklace",
      imageUrl: "https://readdy.ai/api/search-image?query=collection%20of%20various%20elegant%20diamond%20necklaces%20including%20tennis%20necklaces%20pendants%20and%20chain%20necklaces%20professional%20jewelry%20photography%20clean%20background&width=300&height=300&seq=cat-necklaces&orientation=squarish",
      designCount: "120+ Designs"
    },
    {
      name: "Diamond Earring",
      imageUrl: "https://readdy.ai/api/search-image?query=collection%20of%20various%20elegant%20diamond%20earrings%20including%20studs%20hoops%20and%20drop%20earrings%20professional%20jewelry%20photography%20clean%20background&width=300&height=300&seq=cat-earrings&orientation=squarish",
      designCount: "90+ Designs"
    },
    {
      name: "Diamond Bracelet",
      imageUrl: "https://readdy.ai/api/search-image?query=collection%20of%20various%20elegant%20diamond%20bracelets%20including%20tennis%20bracelets%20bangles%20and%20chain%20bracelets%20professional%20jewelry%20photography%20clean%20background&width=300&height=300&seq=cat-bracelets&orientation=squarish",
      designCount: "80+ Designs"
    },
    {
      name: "Diamond Band",
      imageUrl: "https://readdy.ai/api/search-image?query=collection%20of%20elegant%20diamond%20wedding%20bands%20and%20eternity%20bands%20in%20various%20styles%20professional%20jewelry%20photography%20clean%20background&width=300&height=300&seq=cat-bands&orientation=squarish",
      designCount: "65+ Designs"
    },
    {
      name: "Diamond Bangles",
      imageUrl: "https://readdy.ai/api/search-image?query=collection%20of%20luxury%20diamond%20bangles%20and%20cuff%20bracelets%20in%20gold%20and%20platinum%20professional%20jewelry%20photography%20clean%20background&width=300&height=300&seq=cat-bangles&orientation=squarish",
      designCount: "45+ Designs"
    },
    {
      name: "Diamond Belt Buckle",
      imageUrl: "https://readdy.ai/api/search-image?query=luxury%20diamond%20belt%20buckles%20and%20designer%20accessories%20with%20precious%20stones%20professional%20jewelry%20photography%20clean%20background&width=300&height=300&seq=cat-buckles&orientation=squarish",
      designCount: "25+ Designs"
    },
    {
      name: "Diamond Chain",
      imageUrl: "https://readdy.ai/api/search-image?query=collection%20of%20diamond%20chains%20and%20luxury%20necklace%20chains%20in%20various%20styles%20professional%20jewelry%20photography%20clean%20background&width=300&height=300&seq=cat-chains&orientation=squarish",
      designCount: "75+ Designs"
    },
    {
      name: "Diamond Chain With Pendant",
      imageUrl: "https://readdy.ai/api/search-image?query=elegant%20diamond%20pendant%20necklaces%20with%20chains%20featuring%20various%20pendant%20designs%20professional%20jewelry%20photography%20clean%20background&width=300&height=300&seq=cat-pendant-chains&orientation=squarish",
      designCount: "95+ Designs"
    },
    {
      name: "Diamond Grillz",
      imageUrl: "https://readdy.ai/api/search-image?query=luxury%20diamond%20grillz%20and%20dental%20jewelry%20with%20custom%20designs%20professional%20jewelry%20photography%20clean%20background&width=300&height=300&seq=cat-grillz&orientation=squarish",
      designCount: "30+ Designs"
    },
    {
      name: "Diamond Hip Hop Ring",
      imageUrl: "https://readdy.ai/api/search-image?query=collection%20of%20hip%20hop%20diamond%20rings%20with%20bold%20designs%20and%20bling%20style%20professional%20jewelry%20photography%20clean%20background&width=300&height=300&seq=cat-hiphop&orientation=squarish",
      designCount: "55+ Designs"
    },
    {
      name: "Loose Diamond",
      imageUrl: "https://readdy.ai/api/search-image?query=collection%20of%20loose%20diamonds%20in%20various%20cuts%20and%20sizes%20brilliant%20round%20princess%20emerald%20cuts%20professional%20jewelry%20photography%20clean%20background&width=300&height=300&seq=cat-loose&orientation=squarish",
      designCount: "200+ Pieces"
    },
    {
      name: "Diamond Pendant",
      imageUrl: "https://readdy.ai/api/search-image?query=collection%20of%20diamond%20pendants%20in%20various%20shapes%20and%20designs%20without%20chains%20professional%20jewelry%20photography%20clean%20background&width=300&height=300&seq=cat-pendants&orientation=squarish",
      designCount: "110+ Designs"
    },
    {
      name: "Diamond Watches",
      imageUrl: "https://readdy.ai/api/search-image?query=luxury%20diamond%20watches%20and%20timepieces%20with%20diamond%20bezels%20and%20dials%20professional%20jewelry%20photography%20clean%20background&width=300&height=300&seq=cat-watches&orientation=squarish",
      designCount: "40+ Designs"
    },
    {
      name: "Diamond Sunglasses",
      imageUrl: "https://readdy.ai/api/search-image?query=luxury%20diamond%20encrusted%20sunglasses%20and%20designer%20eyewear%20with%20precious%20stones%20professional%20jewelry%20photography%20clean%20background&width=300&height=300&seq=cat-sunglasses&orientation=squarish",
      designCount: "20+ Designs"
    }
  ];

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
            categories={categories}
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
            {/* Ring Product */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg">
              <div className="aspect-square relative overflow-hidden cursor-pointer">
                <img
                  src="https://readdy.ai/api/search-image?query=elegant%20diamond%20solitaire%20ring%20with%20brilliant%20cut%20center%20stone%20on%20white%20gold%20band%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20engagement%20ring&width=400&height=400&seq=ring-1&orientation=squarish"
                  alt="Elegant Diamond Solitaire Ring"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-slate-800 text-white text-xs px-2 py-1 rounded-full">
                    Rings
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 min-h-12 line-clamp-2">
                  Elegant Diamond Solitaire Ring
                </h3>
                <p className="text-slate-800 text-lg font-bold mb-3">
                  As low as $450 per piece
                </p>
                <div className="mb-4">
                  <div className="flex items-center">
                    <span className="text-gray-600 text-sm min-w-15">Metal:</span>
                    <div className="flex ml-2">
                      <button className="w-6 h-6 bg-white border-2 border-gray-300 rounded-full" title="White"></button>
                      <button className="w-6 h-6 bg-yellow-400 border-2 border-gray-300 rounded-full ml-1" title="Yellow"></button>
                      <button className="w-6 h-6 bg-pink-400 border-2 border-gray-300 rounded-full ml-1" title="Rose"></button>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-slate-800 text-white py-2 rounded-md font-medium transition-colors hover:bg-slate-700">
                  Inquiry
                </button>
              </div>
            </div>

            {/* Necklace Product */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg">
              <div className="aspect-square relative overflow-hidden cursor-pointer">
                <img
                  src="https://readdy.ai/api/search-image?query=tennis%20diamond%20necklace%20with%20brilliant%20cut%20diamonds%20in%20white%20gold%20setting%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20bridal%20jewelry&width=400&height=400&seq=necklace-1&orientation=squarish"
                  alt="Tennis Diamond Necklace"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-slate-800 text-white text-xs px-2 py-1 rounded-full">
                    Necklaces
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 min-h-12 line-clamp-2">
                  Tennis Diamond Necklace
                </h3>
                <p className="text-slate-800 text-lg font-bold mb-3">
                  As low as $1,200 per piece
                </p>
                <div className="mb-4">
                  <div className="flex items-center">
                    <span className="text-gray-600 text-sm min-w-15">Length:</span>
                    <div className="flex ml-2">
                      <button className="w-6 h-6 bg-gray-300 border-2 border-gray-300 rounded-full text-xs" title="16&quot;"></button>
                      <button className="w-6 h-6 bg-gray-300 border-2 border-gray-300 rounded-full ml-1 text-xs" title="18&quot;"></button>
                      <button className="w-6 h-6 bg-gray-300 border-2 border-gray-300 rounded-full ml-1 text-xs" title="20&quot;"></button>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-slate-800 text-white py-2 rounded-md font-medium transition-colors hover:bg-slate-700">
                  Inquiry
                </button>
              </div>
            </div>

            {/* Earrings Product */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg">
              <div className="aspect-square relative overflow-hidden cursor-pointer">
                <img
                  src="https://readdy.ai/api/search-image?query=diamond%20stud%20earrings%20with%20brilliant%20cut%20diamonds%20in%20white%20gold%20setting%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20bridal%20jewelry&width=400&height=400&seq=earring-1&orientation=squarish"
                  alt="Diamond Stud Earrings"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-slate-800 text-white text-xs px-2 py-1 rounded-full">
                    Earrings
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 min-h-12 line-clamp-2">
                  Diamond Stud Earrings
                </h3>
                <p className="text-slate-800 text-lg font-bold mb-3">
                  As low as $280 per pair
                </p>
                <div className="mb-4">
                  <div className="flex items-center">
                    <span className="text-gray-600 text-sm min-w-15">Size:</span>
                    <div className="flex ml-2">
                      <button className="w-6 h-6 bg-gray-300 border-2 border-gray-300 rounded-full text-xs" title="0.5ct"></button>
                      <button className="w-6 h-6 bg-gray-300 border-2 border-gray-300 rounded-full ml-1 text-xs" title="1ct"></button>
                      <button className="w-6 h-6 bg-gray-300 border-2 border-gray-300 rounded-full ml-1 text-xs" title="1.5ct"></button>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-slate-800 text-white py-2 rounded-md font-medium transition-colors hover:bg-slate-700">
                  Inquiry
                </button>
              </div>
            </div>

            {/* Bracelet Product */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg">
              <div className="aspect-square relative overflow-hidden cursor-pointer">
                <img
                  src="https://readdy.ai/api/search-image?query=diamond%20tennis%20bracelet%20with%20brilliant%20cut%20diamonds%20in%20white%20gold%20setting%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20bridal%20jewelry&width=400&height=400&seq=bracelet-1&orientation=squarish"
                  alt="Diamond Tennis Bracelet"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-slate-800 text-white text-xs px-2 py-1 rounded-full">
                    Bracelets
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 min-h-12 line-clamp-2">
                  Diamond Tennis Bracelet
                </h3>
                <p className="text-slate-800 text-lg font-bold mb-3">
                  As low as $850 per piece
                </p>
                <div className="mb-4">
                  <div className="flex items-center">
                    <span className="text-gray-600 text-sm min-w-15">Length:</span>
                    <div className="flex ml-2">
                      <button className="w-6 h-6 bg-gray-300 border-2 border-gray-300 rounded-full text-xs" title="7&quot;"></button>
                      <button className="w-6 h-6 bg-gray-300 border-2 border-gray-300 rounded-full ml-1 text-xs" title="7.5&quot;"></button>
                      <button className="w-6 h-6 bg-gray-300 border-2 border-gray-300 rounded-full ml-1 text-xs" title="8&quot;"></button>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-slate-800 text-white py-2 rounded-md font-medium transition-colors hover:bg-slate-700">
                  Inquiry
                </button>
              </div>
            </div>
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
    </main>
  );
}
