import { useViewport } from '../providers/ViewportProvider';

const useContainer = () => {
  const { width } = useViewport();

  let containerWidth = 1200;

  if (width > 1600) {
    containerWidth = 1200;
  } else if (width > 1200) {
    containerWidth = 1200;
  } else if (width > 992) {
    containerWidth = 840;
  } else if (width > 768) {
    containerWidth = 660;
  } else if (width > 576) {
    containerWidth = 480;
  } else {
    containerWidth = 280;
  }

  return { containerWidth };
};

export default useContainer;
