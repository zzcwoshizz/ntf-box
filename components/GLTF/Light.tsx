import React from 'react';

const Light: React.FunctionComponent = () => {
  const shadowResolution = 1024 * 4;

  return (
    <>
      <spotLight
        angle={0.9}
        castShadow={true}
        intensity={1.5}
        penumbra={1}
        position={[-10, 5, 10]}
        shadow-mapSize-height={shadowResolution}
        shadow-mapSize-width={shadowResolution}
      />

      <spotLight
        angle={0.9}
        castShadow={true}
        intensity={0.5}
        penumbra={1}
        position={[10, -5, -10]}
        shadow-mapSize-height={shadowResolution}
        shadow-mapSize-width={shadowResolution}
      />

      <hemisphereLight intensity={0.3} />
      <pointLight intensity={0.5} position={[-30, 10, -30]} />
    </>
  );
};

export default Light;
