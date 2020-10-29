import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import React from 'react'
import { useAsync, useAsyncRetry } from 'react-use'

import { IUser, IUserPayload } from '@/api/types'

import { DEFAULT_CHAIN_ID, RPC_URLS } from '../constants'
import { useActiveWeb3React, useEagerConnect } from '../hooks'
import { useApi } from './ApiProvider'

const appContext = React.createContext<{
  balance: string
  provider: JsonRpcProvider
  user?: IUser
  toogleUserInfo(payload: IUserPayload): Promise<void>
}>({} as any)

const AppProvider: React.FunctionComponent = ({ children }) => {
  const { getUser, putUser, token } = useApi()
  const { account, library, chainId = DEFAULT_CHAIN_ID } = useActiveWeb3React()

  const provider: Web3Provider | JsonRpcProvider = React.useMemo(() => {
    return library || new JsonRpcProvider({ url: RPC_URLS[chainId] })
  }, [library, chainId])

  const { value: balance = '0' } = useAsync(async () => {
    if (!account || !library) {
      return '0'
    }

    return (await library.getBalance(account))?.toString()
  }, [account, library])

  // 用户信息
  const { value: user, retry } = useAsyncRetry(async () => {
    if (account && token) {
      const { data } = await getUser({ address: account })
      if (data.address !== account) {
        return
      }
      return data
    }
  }, [account, token])

  useEagerConnect()

  const toogleUserInfo = async (payload: IUserPayload) => {
    if (account && token) {
      await putUser({
        email: user?.email,
        newAlert: user?.newAlert,
        tradeAlert: user?.tradeAlert,
        userName: user?.nickName,
        ...payload
      })
      retry()
    }
  }

  return (
    <appContext.Provider
      value={{
        balance,
        provider,
        user,
        toogleUserInfo
      }}>
      {children}
    </appContext.Provider>
  )
}

const useApp = () => {
  const context = React.useContext(appContext)

  return context
}

export { AppProvider, useApp }
