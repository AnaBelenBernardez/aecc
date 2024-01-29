import { useEffect } from 'react';

const BlockScroll = ({ isModalOpen }) => {
  useEffect(() => {
    const body = document.querySelector('body');
    if (isModalOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
    return () => {
      body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  return null;
};

export default BlockScroll;