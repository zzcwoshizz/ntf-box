import React from 'react';
import { useWindowSize } from 'react-use';

const viewportContext = React.createContext({ width: 0, height: 0 });

const ViewportProvider: React.FunctionComponent = ({ children }) => {
  const [{ width, height }, setRect] = React.useState({ width: 1920, height: 1080 });
  const { width: w, height: h } = useWindowSize();

  React.useEffect(() => {
    setRect({ width: w, height: h });
  }, [w, h]);

  return <viewportContext.Provider value={{ width, height }}>{children}</viewportContext.Provider>;
};

export type SizeType = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

const useViewport = () => {
  const { width, height } = React.useContext(viewportContext);

  // identity size
  let size: SizeType = 'xxl';

  if (width > 1600) {
    size = 'xxl';
  } else if (width > 1200) {
    size = 'xl';
  } else if (width > 992) {
    size = 'lg';
  } else if (width > 768) {
    size = 'md';
  } else if (width > 576) {
    size = 'sm';
  } else {
    size = 'xs';
  }

  return { width, height, size };
};

export { ViewportProvider, useViewport };
