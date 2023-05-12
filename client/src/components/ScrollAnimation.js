import React, { useEffect, useRef, useState } from 'react';
import '../assets/css/scroll-animation.css'; // Import your CSS file for styling

const ScrollAnimation = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  const handleScroll = () => {
    if (componentRef.current) {
      const componentPosition = componentRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (componentPosition.top <= windowHeight * 0.75) {
        setIsVisible(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`scroll-animation ${isVisible ? 'visible' : ''}`}
      ref={componentRef}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;
