import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import React from 'react'
import { useAsync, useAsyncRetry } from 'react-use'

import { IUser, IUserPayload } from '@/api/types'

import { DEFAULT_CHAIN_ID, RPC_URLS, SIGN_TEXT } from '../constants'
import { useActiveWeb3React, useEagerConnect } from '../hooks'
import useCache from '../hooks/useCache'
import { useApi } from './ApiProvider'

const appContext = React.createContext<{
  balance: string
  provider: JsonRpcProvider
  user?: IUser
  login(): Promise<void>
  toogleUserInfo(payload: IUserPayload): Promise<void>
}>({} as any)

const AppProvider: React.FunctionComponent = ({ children }) => {
  const { getUser, login: loginApi, putUser } = useApi()
  const { account, library, active, chainId = DEFAULT_CHAIN_ID } = useActiveWeb3React()

  const provider: Web3Provider | JsonRpcProvider = React.useMemo(() => {
    return library || new JsonRpcProvider({ url: RPC_URLS[chainId] })
  }, [library, chainId])

  const [token, setToken] = useCache<string>('token', '')

  const { value: balance = '0' } = useAsync(async () => {
    if (!account) {
      return '0'
    }

    return (await library?.getBalance(account))?.toString()
  }, [account, library])

  const loginLoading = React.useRef(false)
  // 用户信息
  const { value: user, loading: userLoding, retry } = useAsyncRetry(async () => {
    if (account && token) {
      const { data } = await getUser({ address: account })
      if (data.address !== account) {
        setToken('')
        return
      }
      setTimeout(() => {
        loginLoading.current && (loginLoading.current = false)
      })
      return data
    }
  }, [account, token])

  // 登录
  const login = async () => {
    if (!library) {
      return
    }
    if (!account) {
      return
    }

    loginLoading.current = true
    try {
      const signature = (await library.getSigner(account).signMessage(SIGN_TEXT)) ?? ''
      const { data } = await loginApi({ address: account + '', signature })
      setToken(data)
    } catch (e) {
      loginLoading.current = false
    }
  }
  React.useEffect(() => {
    ;(async () => {
      if (!active) {
        return
      }
      if (user || userLoding) {
        return
      }
      if (!account) {
        return
      }
      if (loginLoading.current) {
        return
      }
      if (token) {
        return
      }

      login()
    })()
  }, [user, account, active, token])

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
        login,
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
