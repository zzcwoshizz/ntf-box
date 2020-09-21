import React from 'react'
import { useWindowSize } from 'react-use'

const viewportContext = React.createContext({ width: 0, height: 0 })

const ViewportProvider: React.FunctionComponent = ({ children }) => {
  const { width, height } = useWindowSize()

  return <viewportContext.Provider value={{ width, height }}>{children}</viewportContext.Provider>
}

export type SizeType = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'

const useViewport = () => {
  const { width, height } = React.useContext(viewportContext)

  // identity size
  let size: SizeType = 'xxl'
  let containerWidth = 1200

  if (width > 1600) {
    size = 'xxl'
    containerWidth = 1120
  } else if (width > 1200) {
    size = 'xl'
    containerWidth = 980
  } else if (width > 992) {
    size = 'lg'
    containerWidth = 840
  } else if (width > 768) {
    size = 'md'
    containerWidth = 660
  } else if (width > 576) {
    size = 'sm'
    containerWidth = 480
  } else {
    size = 'xs'
    containerWidth = 300
  }

  return { width, height, size, containerWidth }
}

export { ViewportProvider, useViewport }
