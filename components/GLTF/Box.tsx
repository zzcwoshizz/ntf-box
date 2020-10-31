/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

const Box: React.FunctionComponent<{ url: string }> = ({ url }) => {
  const { GLTFLoader } = require('three/examples/jsm/loaders/GLTFLoader')
  const gltf: GLTF = useLoader(GLTFLoader, url)

  return (
    <mesh position={[0, -1.5, 0]} scale={[0.025, 0.025, 0.025]} rotation={[0, -Math.PI, 0]}>
      <primitive object={gltf.scene} />
    </mesh>
  )
}

export default Box
