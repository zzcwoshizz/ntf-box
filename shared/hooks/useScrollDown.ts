import React from 'react';

const useScrollDown = (fn: () => void) => {
  React.useEffect(() => {
    const scroll = () => {
      const footerHeight = document.getElementById('footer')?.clientHeight || 0;

      const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      const scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
      const clientHeight = Math.max(
        document.body.clientHeight,
        document.documentElement.clientHeight
      );

      if (scrollTop + clientHeight > scrollHeight - footerHeight) {
        fn();
      }
    };

    window.addEventListener('scroll', scroll);

    return () => {
      window.removeEventListener('scroll', scroll);
    };
  });
};

export default useScrollDown;
