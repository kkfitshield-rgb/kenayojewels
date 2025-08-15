import { useState, useEffect } from 'react';

interface SlideBackgroundProps {
  images: string[];
  interval?: number; // milliseconds
  className?: string;
}

export default function SlideBackground({ 
  images, 
  interval = 5000, 
  className = "" 
}: SlideBackgroundProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {images.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out"
          style={{
            backgroundImage: `url('${image}')`,
            transform: `translateX(${(index - currentIndex) * 100}%)`,
            backgroundRepeat: 'no-repeat',
          }}
        />
      ))}
    </div>
  );
}
