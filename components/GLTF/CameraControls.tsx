/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useState } from 'react';
import { useFrame, useThree } from 'react-three-fiber';

const CameraControls: React.FunctionComponent = () => {
  const { OrbitControls } = React.useMemo(
    () => require('three/examples/jsm/controls/OrbitControls'),
    []
  );
  const three = useThree();
  const [controls, setControls] = useState<any>();

  useFrame(() => {
    controls['update']();
  });

  useEffect(() => {
    const controls = new OrbitControls(three.camera, three.gl.domElement);

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableKeys = false;
    // controls.enableZoom = false
    controls.rotateSpeed = 0.8;

    setControls(controls);

    return () => {
      controls.dispose();
    };
  }, [OrbitControls, three, three.camera]);

  return null;
};

export default CameraControls;
