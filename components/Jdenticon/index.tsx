import { update } from 'jdenticon';
import React, { useEffect, useRef } from 'react';

const Jdenticon: React.FunctionComponent<{ value?: string; size?: number | string }> = ({
  value = 'default',
  size = '100%'
}) => {
  const icon = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (icon.current) {
      update(icon.current, value);
    }
  }, [value]);

  return <svg data-jdenticon-value={value} height={size} ref={icon} width={size} />;
};

export default Jdenticon;
