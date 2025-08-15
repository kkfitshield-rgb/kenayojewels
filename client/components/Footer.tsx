import { Link } from 'react-router-dom';
import { Diamond, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F5fb29789eefb45b0b7ff051660b2074e%2F098deeebb10540e9b4b58bfbd28f50e6"
                alt="Kenayo Jewels"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-300 text-sm leading-5 mb-4">
              Professional B2B jewelry manufacturer specializing in custom designs and bulk orders for retailers worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="text-sm space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-gray-300 hover:text-white transition-colors">
                  Catalog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="text-sm space-y-2">
              <li>
                <span className="text-gray-300">Rings</span>
              </li>
              <li>
                <span className="text-gray-300">Necklaces</span>
              </li>
              <li>
                <span className="text-gray-300">Earrings</span>
              </li>
              <li>
                <span className="text-gray-300">Bracelets</span>
              </li>
              <li>
                <span className="text-gray-300">Custom Designs</span>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="text-gray-300 text-sm space-y-2">
              <div className="flex items-start">
                <MapPin className="w-3.5 h-3.5 mt-1 mr-2 flex-shrink-0" />
                <span>
                  123 Jewelry District<br />
                  Business Center, NY 10001
                </span>
              </div>

              <div className="flex items-center">
                <Phone className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>

              <div className="flex items-center">
                <Mail className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
                <span>info@kenayojewels.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-slate-800 mt-8 pt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © 2024 Kenayo Jewels. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm hover:text-white cursor-pointer transition-colors">
                Privacy Policy
              </span>
              <span className="text-gray-400 text-sm hover:text-white cursor-pointer transition-colors">
                Terms of Service
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
