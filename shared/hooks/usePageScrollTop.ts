import { useRouter } from 'next/router';
import React from 'react';

const usePageScrollTop = () => {
  const { events } = useRouter();

  React.useEffect(() => {
    const routeChangeComplete = () => {
      setTimeout(() => {
        window.scrollTo(0, 0);
      });
    };

    events.on('routeChangeComplete', routeChangeComplete);

    return () => events.off('routeChangeComplete', routeChangeComplete);
  }, [events]);
};

export default usePageScrollTop;
