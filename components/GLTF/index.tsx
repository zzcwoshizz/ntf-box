import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'

import Scene from './Scene'

const GLTF: React.FunctionComponent<{
  url: string
  height?: number | string
  width?: number | string
}> = ({ url, width, height }) => {
  return (
    <Canvas style={{ width, height }} camera={{ position: [1, 1, 1] }}>
      <Suspense fallback={null}>
        <Scene url={url} />
      </Suspense>
    </Canvas>
  )
}

export default GLTF
