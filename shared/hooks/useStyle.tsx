const useStyle = () => {
  const xxl = {
    endpoint: 99999,
    containerWidth: '1440px'
  };
  const xl = {
    endpoint: 1600,
    containerWidth: '1160px'
  };
  const lg = {
    endpoint: 1200,
    containerWidth: '900px'
  };
  const md = {
    endpoint: 992,
    containerWidth: '720px'
  };
  const sm = {
    endpoint: 768,
    containerWidth: '520px'
  };
  const xs = {
    endpoint: 576,
    containerWidth: '92%'
  };

  return {
    xxl,
    xl,
    lg,
    md,
    sm,
    xs
  };
};

export default useStyle;
