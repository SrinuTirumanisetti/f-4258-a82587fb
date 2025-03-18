
import React, { useRef, useEffect } from 'react';
import { useScrollAnimation } from '@/lib/animations';

// Mock product data
const products = [
  {
    title: "Precision Watch Series 7",
    description: "Seamlessly integrates into your life with thoughtful interactions and perfect attention to detail.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1399&auto=format&fit=crop",
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "AudioPure Headphones",
    description: "Experience sound with absolute clarity. Perfectly balanced, incredibly comfortable.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470&auto=format&fit=crop",
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "Essence Wireless Speaker",
    description: "Powerful sound in a minimal form factor. Designed to blend seamlessly into any space.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1336&auto=format&fit=crop",
    color: "from-amber-500 to-pink-500",
  }
];

const ProductShowcase = () => {
  const { ref, isVisible } = useScrollAnimation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Automatic product rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Scroll to active product
  useEffect(() => {
    if (scrollContainerRef.current && isVisible) {
      const container = scrollContainerRef.current;
      const targetElement = container.children[activeIndex] as HTMLElement;
      
      if (targetElement) {
        container.scrollTo({
          left: targetElement.offsetLeft - (container.offsetWidth - targetElement.offsetWidth) / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [activeIndex, isVisible]);

  return (
    <section 
      id="products" 
      ref={ref}
      className="py-24 px-4 overflow-hidden bg-secondary"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Products that Inspire
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Elegantly designed with a focus on simplicity, functionality, and user experience.
          </p>
        </div>

        {/* Products showcase */}
        <div 
          ref={scrollContainerRef}
          className={`flex space-x-8 overflow-x-auto pb-10 snap-x hide-scrollbar transition-opacity duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {products.map((product, index) => (
            <div 
              key={index}
              className={`snap-center flex-shrink-0 w-full md:w-[600px] bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ${
                activeIndex === index 
                  ? 'scale-100 opacity-100' 
                  : 'scale-95 opacity-80'
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="relative aspect-video overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${product.color} mix-blend-multiply opacity-20`}></div>
                <img 
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-muted-foreground">{product.description}</p>
                <button className="mt-6 text-sm font-medium text-foreground inline-flex items-center py-2">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Product indicator dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {products.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? 'w-8 bg-foreground' : 'bg-foreground/30'
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`View product ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
