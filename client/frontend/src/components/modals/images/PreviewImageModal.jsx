import React, { useState, useEffect, useRef } from 'react';

const PreviewImageModal = ({ images, currentIndex, onClose, onNext, onPrev, slideDirection, setSlideDirection }) => {
  const [focusIndex, setFocusIndex] = useState(0);
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);


  
function handleTouchStart(e) {
    setTouchStart(e.targetTouches[0].clientX);
}

function handleTouchMove(e) {
    setTouchEnd(e.targetTouches[0].clientX);
}

function handleTouchEnd() {
    if (touchStart - touchEnd > 20) {
      onNext()
      setSlideDirection('left');
    }
    
    if (touchStart - touchEnd < -20) {
      onPrev()
      setSlideDirection('right');
    }
}
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      onPrev();
      setSlideDirection('right');
      setFocusIndex(focusIndex - 1); 
    } else if (event.key === 'ArrowRight') {
      onNext();
      setSlideDirection('left');
      setFocusIndex(focusIndex + 1);
    } else if (event.key === 'Escape') {
      onClose();
    } 
  };

  const handleClickOutside = (event) => {
    if (event.target.classList.contains('modal-container')) {
      onClose();
    }
  };

  
  useEffect(() => {
    if (currentIndex !== null) {
      const handleBlur = () => setFocusIndex(0);
      const handleFocus = () => setFocusIndex(currentIndex);
      const handleOutsideClick = (event) => handleClickOutside(event);
      
      window.addEventListener('keydown', handleKeyDown);      
      document.addEventListener('focusin', handleFocus);
      document.addEventListener('mousedown', handleOutsideClick);
      
      setTimeout(() => {
        
        setSlideDirection(null); 
      }, 200);
      
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('focusin', handleFocus);
        document.removeEventListener('mousedown', handleOutsideClick);
        
      };
    }
  }, [currentIndex, onPrev, onNext]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 modal-container backdrop-blur-sm"
      tabIndex={-1} 
      onFocus={() => setFocusIndex(currentIndex)} 
    >
      <div className="relative">
        <img
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          src={images && images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className={`w-[90vw] lg:w-[70vw] max-h-[90vh] mx-auto object-contain ${slideDirection ? 'slide-' + slideDirection : ''}`}
          tabIndex={focusIndex === 0 ? 0 : -1}
        />

        <button
          onClick={onPrev}
          className="absolute hidden lg:flex top-[50%] -translate-y-2/4 -left-12"
          tabIndex={focusIndex === 1 ? 0 : -1}
        >
          <img src="/icons/left.svg" alt="Previous" />
        </button>

        <button
          onClick={onNext}
          className="absolute hidden lg:flex top-[50%] -translate-y-2/4 -right-12"
          tabIndex={focusIndex === 2 ? 0 : -1}
        >
          <img src="/icons/right.svg" alt="Next" />
        </button>
      </div>
    </div>
  );
};

export default PreviewImageModal;