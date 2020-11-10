import React from 'react';

import Box from './Box';
import CameraControls from './CameraControls';
import Light from './Light';

const Scene: React.FunctionComponent<{ url: string }> = ({ url }) => {
  return (
    <>
      <CameraControls />
      <Light />
      <Box url={url} />
    </>
  );
};

export default Scene;
