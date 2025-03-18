
import { useEffect, useState, useRef } from 'react';

export function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element enters the viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once it's visible, we no longer need to observe it
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Trigger when at least 10% is visible
      }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);
  
  return { ref, isVisible };
}

export function useSequentialAnimation(items: any[], delay = 100) {
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setVisibleItems(new Array(items.length).fill(false));
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let timer: ReturnType<typeof setTimeout>;
          
          // Reveal items one by one with delay
          items.forEach((_, index) => {
            timer = setTimeout(() => {
              setVisibleItems(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * delay);
          });
          
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
          
          return () => clearTimeout(timer);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [items, delay]);
  
  return { containerRef, visibleItems };
}

// For smooth parallax effect
export function useParallax() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const scrollY = window.scrollY;
      const element = ref.current;
      const elementTop = element.getBoundingClientRect().top + scrollY;
      const elementHeight = element.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate how far the element is from the viewport center
      const distanceFromCenter = (elementTop + elementHeight / 2) - (scrollY + viewportHeight / 2);
      
      // Apply transform based on distance (adjust speed as needed)
      const translateY = distanceFromCenter * 0.05; // Adjust for more/less movement
      
      element.style.transform = `translateY(${translateY}px)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return ref;
}

// For mouse hover tracking effect
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setPosition({ x, y });
    };
    
    const element = ref.current;
    element.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);
  
  return { ref, position };
}
