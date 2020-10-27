import React from 'react'
import { useAsyncRetry, useInterval } from 'react-use'

import { useApp } from './AppProvider'

const chainContext = React.createContext<{
  block?: number
}>({} as any)

const ChainProvider: React.FunctionComponent = ({ children }) => {
  const { provider } = useApp()

  const { value: block, retry: retryBlock } = useAsyncRetry(async () => {
    return await provider.getBlockNumber()
  }, [])

  // 获取当前区块号
  useInterval(() => {
    retryBlock()
  }, 13000)

  return (
    <chainContext.Provider
      value={{
        block
      }}>
      {children}
    </chainContext.Provider>
  )
}

const useChain = () => {
  const context = React.useContext(chainContext)

  return context
}

export { ChainProvider, useChain }
