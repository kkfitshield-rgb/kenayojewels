import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import {
  Award,
  Users,
  Globe,
  Shield,
  Clock,
  Gem,
  Factory,
  Heart,
  CheckCircle
} from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-slate-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-white text-4xl font-bold leading-10 mb-4 text-center">
              About Kenayo Jewels
            </h1>
            <p className="text-gray-300 text-xl leading-7 max-w-2xl mx-auto text-center">
              Crafting excellence in fine jewelry for over two decades
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-gray-900 text-3xl font-bold leading-9 mb-6">
                  Our Story
                </h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2001, Kenayo Jewels has established itself as a
                  leading manufacturer of fine jewelry, specializing in B2B
                  solutions for retailers worldwide. Our journey began with a
                  simple mission: to create exceptional jewelry that combines
                  traditional craftsmanship with modern design.
                </p>
                <p className="text-gray-600 mb-4">
                  Over the years, we have built strong partnerships with jewelry
                  retailers across the globe, providing them with high-quality
                  products, competitive pricing, and exceptional service. Our
                  commitment to excellence has made us a trusted name in the
                  jewelry industry.
                </p>
                <p className="text-gray-600">
                  Today, we continue to innovate and expand our offerings,
                  ensuring that our partners have access to the latest trends and
                  timeless classics that their customers desire.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=modern%20jewelry%20manufacturing%20workshop%20with%20skilled%20craftsmen%20working%20on%20fine%20jewelry%20pieces%20professional%20lighting%20clean%20organized%20workspace%20luxury%20jewelry%20production%20environment&width=600&height=400&seq=about-story&orientation=landscape"
                  alt="Our Workshop"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-gray-900 text-3xl font-bold leading-9 mb-4 text-center">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-center">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="flex items-center justify-center bg-slate-800 rounded-full w-12 h-12 mx-auto mb-4">
                <Gem className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-gray-900 font-semibold mb-2 text-center">
                Quality Excellence
              </h3>
              <p className="text-gray-600 text-sm leading-5 text-center">
                We never compromise on quality. Every piece is meticulously
                crafted to meet the highest standards.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="flex items-center justify-center bg-slate-800 rounded-full w-12 h-12 mx-auto mb-4">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-gray-900 font-semibold mb-2 text-center">
                Partnership Focus
              </h3>
              <p className="text-gray-600 text-sm leading-5 text-center">
                We build long-term relationships with our clients, supporting
                their growth and success.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="flex items-center justify-center bg-slate-800 rounded-full w-12 h-12 mx-auto mb-4">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-gray-900 font-semibold mb-2 text-center">
                Innovation
              </h3>
              <p className="text-gray-600 text-sm leading-5 text-center">
                We continuously evolve our designs and processes to stay ahead of
                market trends.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="flex items-center justify-center bg-slate-800 rounded-full w-12 h-12 mx-auto mb-4">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-gray-900 font-semibold mb-2 text-center">
                Trust & Integrity
              </h3>
              <p className="text-gray-600 text-sm leading-5 text-center">
                Transparency and honesty form the foundation of all our business
                relationships.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="flex items-center justify-center bg-slate-800 rounded-full w-12 h-12 mx-auto mb-4">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-gray-900 font-semibold mb-2 text-center">
                Customer Service
              </h3>
              <p className="text-gray-600 text-sm leading-5 text-center">
                Our dedicated team provides personalized support throughout the
                entire process.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="flex items-center justify-center bg-slate-800 rounded-full w-12 h-12 mx-auto mb-4">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-gray-900 font-semibold mb-2 text-center">
                Global Reach
              </h3>
              <p className="text-gray-600 text-sm leading-5 text-center">
                We serve clients worldwide with reliable shipping and consistent
                quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-gray-900 text-3xl font-bold leading-9 mb-4 text-center">
              Our Leadership Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-center">
              Meet the experts behind Kenayo Jewels
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-48 h-48 rounded-lg overflow-hidden mb-4 mx-auto text-center">
                <img
                  src="https://readdy.ai/api/search-image?query=professional%20business%20woman%20CEO%20portrait%20in%20elegant%20attire%20confident%20smile%20modern%20office%20background%20corporate%20headshot%20jewelry%20industry%20executive&width=300&height=300&seq=team-ceo&orientation=squarish"
                  alt="Sarah Johnson"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <h3 className="text-gray-900 text-lg font-semibold leading-7 mb-1 text-center">
                Sarah Johnson
              </h3>
              <p className="text-slate-600 font-medium mb-2 text-center">
                CEO & Founder
              </p>
              <p className="text-gray-600 text-sm leading-5 text-center">
                With over 25 years in the jewelry industry, Sarah leads Kenayo
                Jewels with vision and expertise.
              </p>
            </div>
            <div className="text-center">
              <div className="w-48 h-48 rounded-lg overflow-hidden mb-4 mx-auto text-center">
                <img
                  src="https://readdy.ai/api/search-image?query=professional%20jewelry%20designer%20man%20portrait%20creative%20workspace%20with%20jewelry%20sketches%20and%20tools%20modern%20artistic%20environment%20design%20expert&width=300&height=300&seq=team-designer&orientation=squarish"
                  alt="Michael Chen"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <h3 className="text-gray-900 text-lg font-semibold leading-7 mb-1 text-center">
                Michael Chen
              </h3>
              <p className="text-slate-600 font-medium mb-2 text-center">
                Head of Design
              </p>
              <p className="text-gray-600 text-sm leading-5 text-center">
                Michael brings innovative design concepts to life, blending
                traditional techniques with modern aesthetics.
              </p>
            </div>
            <div className="text-center">
              <div className="w-48 h-48 rounded-lg overflow-hidden mb-4 mx-auto text-center">
                <img
                  src="https://readdy.ai/api/search-image?query=professional%20business%20woman%20operations%20manager%20portrait%20in%20manufacturing%20environment%20quality%20control%20expert%20confident%20professional&width=300&height=300&seq=team-operations&orientation=squarish"
                  alt="Elena Rodriguez"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <h3 className="text-gray-900 text-lg font-semibold leading-7 mb-1 text-center">
                Elena Rodriguez
              </h3>
              <p className="text-slate-600 font-medium mb-2 text-center">
                VP of Operations
              </p>
              <p className="text-gray-600 text-sm leading-5 text-center">
                Elena ensures our production processes maintain the highest
                quality standards and efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-slate-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="text-white text-center">
              <div className="text-white text-3xl font-bold leading-9 mb-2 text-center">
                20+
              </div>
              <div className="text-gray-300 text-center">
                Years Experience
              </div>
            </div>
            <div className="text-white text-center">
              <div className="text-white text-3xl font-bold leading-9 mb-2 text-center">
                500+
              </div>
              <div className="text-gray-300 text-center">
                Retail Partners
              </div>
            </div>
            <div className="text-white text-center">
              <div className="text-white text-3xl font-bold leading-9 mb-2 text-center">
                50+
              </div>
              <div className="text-gray-300 text-center">
                Countries Served
              </div>
            </div>
            <div className="text-white text-center">
              <div className="text-white text-3xl font-bold leading-9 mb-2 text-center">
                10,000+
              </div>
              <div className="text-gray-300 text-center">
                Designs Created
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner With Us Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-gray-900 text-3xl font-bold leading-9 mb-4 text-center">
            Partner With Us
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-center">
            Join hundreds of successful retailers who trust Kenayo Jewels for
            their jewelry needs
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/catalog"
              className="bg-slate-800 text-white font-medium py-3 px-8 rounded-md hover:bg-slate-700 transition-colors duration-150 whitespace-nowrap"
            >
              View Catalog
            </Link>
            <Link
              to="/contact"
              className="border border-slate-800 text-slate-800 font-medium py-3 px-8 rounded-md hover:bg-slate-800 hover:text-white transition-colors duration-150 whitespace-nowrap"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>





    </div>
  );
}
