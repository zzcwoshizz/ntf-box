import React from 'react'

const Light: React.FunctionComponent = () => {
  const shadowResolution = 1024 * 4

  return (
    <>
      <spotLight
        position={[-10, 5, 10]}
        angle={0.9}
        penumbra={1}
        intensity={1.5}
        castShadow={true}
        shadow-mapSize-width={shadowResolution}
        shadow-mapSize-height={shadowResolution}
      />

      <spotLight
        position={[10, -5, -10]}
        angle={0.9}
        penumbra={1}
        intensity={0.5}
        castShadow={true}
        shadow-mapSize-width={shadowResolution}
        shadow-mapSize-height={shadowResolution}
      />

      <hemisphereLight intensity={0.3} />
      <pointLight position={[-30, 10, -30]} intensity={0.5} />
    </>
  )
}

export default Light
