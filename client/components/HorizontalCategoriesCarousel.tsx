import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Category {
  name: string;
  imageUrl: string;
  designCount: string;
}

interface HorizontalCategoriesCarouselProps {
  categories: Category[];
  autoSlide?: boolean;
  slideInterval?: number;
}

export default function HorizontalCategoriesCarousel({ 
  categories, 
  autoSlide = true, 
  slideInterval = 3000 
}: HorizontalCategoriesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const itemsPerView = 4; // Show 4 categories at a time
  const maxIndex = Math.max(0, categories.length - itemsPerView);

  useEffect(() => {
    if (!autoSlide || isUserInteracting || categories.length <= itemsPerView) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, slideInterval);

    return () => clearInterval(timer);
  }, [autoSlide, isUserInteracting, categories.length, itemsPerView, maxIndex, slideInterval]);

  const goToPrevious = () => {
    setIsUserInteracting(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
    setTimeout(() => setIsUserInteracting(false), 5000);
  };

  const goToNext = () => {
    setIsUserInteracting(true);
    setCurrentIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsUserInteracting(false), 5000);
  };

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      {categories.length > itemsPerView && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Previous categories"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Next categories"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </>
      )}

      {/* Categories Container */}
      <div 
        ref={containerRef}
        className="overflow-hidden"
        onMouseEnter={() => setIsUserInteracting(true)}
        onMouseLeave={() => setIsUserInteracting(false)}
      >
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            width: `${(categories.length / itemsPerView) * 100}%`
          }}
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / categories.length}%` }}
            >
              <div className="text-center cursor-pointer group">
                <div className="aspect-square bg-white border border-gray-200 rounded-lg mb-4 overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:border-gray-300">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-xs lg:text-sm">
                  {category.designCount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      {categories.length > itemsPerView && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsUserInteracting(true);
                setTimeout(() => setIsUserInteracting(false), 5000);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-slate-800' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
