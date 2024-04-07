import { useEffect } from 'react';

const useNoScroll = (shouldAddClass = false) => {
  // Effect goes here
  useEffect(() => {
    if (!shouldAddClass) return;

    const htmlElem = document.querySelector('html');
    const bodyElem = document.querySelector('body');

    if (!htmlElem || !bodyElem) return;

    bodyElem.classList.add('no-scroll');

    return () => {
      bodyElem.classList.remove('no-scroll');
    };
  }, [shouldAddClass]);
};

export default useNoScroll;
