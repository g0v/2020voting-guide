import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
        // Argument of type '() => false | (() => void)' is not assignable to parameter of type 'EffectCallback'.
        return;
    }
    
    const handleResize = () => setWindowSize(getSize());
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // empty array: effect runs only on mount, cleans up on unmount

  return windowSize;
}

export default useWindowSize;