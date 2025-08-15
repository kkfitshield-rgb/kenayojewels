import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import InquiryModal from './InquiryModal';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Announcement Bar */}
      <div className="bg-slate-800 text-white py-2 px-4">
        <div className="text-sm text-center max-w-7xl mx-auto">
          Professional B2B Jewelry Solutions - Custom Orders Welcome
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F6f0d9383c645489eb6c903dbc852efe9%2Fccfc48d7398540f59603391a3dfd2cd4?format=webp&width=800"
              alt="Kenayo Jewels"
              className="h-12 w-auto cursor-pointer"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
              Home
            </Link>
            <Link to="/catalog" className="text-gray-700 hover:text-gray-900 transition-colors font-medium ml-8">
              Catalog
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900 transition-colors font-medium ml-8">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-gray-900 transition-colors font-medium ml-8">
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Button
              className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
              onClick={() => setIsInquiryModalOpen(true)}
            >
              Quick Inquiry
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/catalog"
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Catalog
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Button
                className="bg-slate-800 hover:bg-slate-700 text-white w-full mt-4 rounded-md font-medium"
                onClick={() => {
                  setIsInquiryModalOpen(true);
                  setMobileMenuOpen(false);
                }}
              >
                Quick Inquiry
              </Button>
            </nav>
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />
    </header>
  );
}
