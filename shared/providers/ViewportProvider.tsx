import React from 'react'
import { useWindowSize } from 'react-use'

const viewportContext = React.createContext({ width: 0, height: 0 })

const ViewportProvider: React.FunctionComponent = ({ children }) => {
  const { width, height } = useWindowSize()

  return <viewportContext.Provider value={{ width, height }}>{children}</viewportContext.Provider>
}

const useViewport = () => {
  const { width, height } = React.useContext(viewportContext)

  // identity size
  let size = 'default'
  if (width > 1680) {
    size = 'default'
  } else if (width > 1280) {
    size = 'xlarge'
  } else if (width > 980) {
    size = 'large'
  } else if (width > 736) {
    size = 'medium'
  } else if (width > 480) {
    size = 'small'
  } else {
    size = 'xsmall'
  }

  return { width, height, size }
}

export { ViewportProvider, useViewport }
