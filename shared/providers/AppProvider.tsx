import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import React from 'react'
import { useAsync } from 'react-use'

import { IUser, IUserPayload } from '@/api/types'

import { DEFAULT_CHAIN_ID, RPC_URLS } from '../constants'
import { useActiveWeb3React, useEagerConnect } from '../hooks'
import { useApi } from './ApiProvider'

const appContext = React.createContext<{
  balance: string
  provider: JsonRpcProvider
  user?: IUser
  logged: boolean
  setUser(user?: IUser): void
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

  const [user, setUser] = React.useState<IUser>()
  const getUserInfo = React.useCallback(() => {
    if (account) {
      setTimeout(() => {
        getUser({ address: account }).then(({ data }) => {
          if (data.address === account) {
            setUser(data)
          }
        })
      }, 0)
    }
  }, [token, account])
  React.useEffect(() => {
    getUserInfo()
  }, [account, getUserInfo])
  React.useEffect(() => {
    if (account !== user?.address) {
      setUser(undefined)
    }
  }, [account, user])

  useEagerConnect()

  const toogleUserInfo = async (payload: IUserPayload) => {
    if (account) {
      await putUser({
        email: user?.email,
        newAlert: user?.newAlert,
        tradeAlert: user?.tradeAlert,
        userName: user?.nickName,
        ...payload
      })
      getUserInfo()
    }
  }

  return (
    <appContext.Provider
      value={{
        balance,
        provider,
        user,
        setUser,
        logged: user?.address === account,
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
