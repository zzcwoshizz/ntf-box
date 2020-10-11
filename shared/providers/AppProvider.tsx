import React from 'react'
import { useAsync, useInterval } from 'react-use'
import { Connectors, useWallet, Wallet } from 'use-wallet'
import Web3 from 'web3'

import { getUser, login as loginApi, putUser } from '@/api'
import { IUser, IUserPayload } from '@/api/types'

import { RPC_URLS, SIGN_TEXT } from '../constants'
import useCache from '../hooks/useCache'

const appContext = React.createContext<{
  account?: string
  balance: string
  web3: Web3
  blockNumber: number
  user?: IUser
  connect(type: keyof Connectors): Promise<void>
  login(): Promise<void>
  toogleUserInfo(payload: IUserPayload): Promise<void>
}>({} as any)

const AppProvider: React.FunctionComponent = ({ children }) => {
  const wallet = useWallet<any>()

  const [account, setAccount] = useCache<string>('account')
  const [balance, setBalance] = React.useState('')
  const web3 = React.useMemo(() => {
    if (wallet.status === 'connected') {
      return new Web3(wallet.ethereum)
    } else {
      return new Web3(RPC_URLS[wallet.chainId + ''])
    }
  }, [wallet])
  const [blockNumber, setBlockNumber] = React.useState(0)
  const [token, setToken] = useCache<string>('token', '')
  // 更新用户变量
  const [updateUser, setUpdateUser] = React.useState(1)

  React.useEffect(() => {
    if (wallet.status === 'connected') {
      wallet.account && setAccount(wallet.account)
      setBalance(wallet.balance + '')
    }
  }, [wallet])

  const connect = async (type: keyof Connectors): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        wallet.connect(type).then(resolve, reject)
      }, 200)
    })
  }

  React.useEffect(() => {
    if (account) {
      connect('injected')
    }
  }, [])

  // 获取当前区块号
  useInterval(() => {
    if (web3) {
      web3.eth.getBlockNumber().then((blockNumber) => {
        setBlockNumber(blockNumber)
      })
    }
  }, 10000)

  // 登录
  const login = async () => {
    const signature = await web3.eth.personal.sign(SIGN_TEXT, account + '', '')
    const { data } = await loginApi({ address: account + '', signature })
    setToken(data)
  }

  // 用户信息
  const { value: user } = useAsync(async () => {
    if (account && token) {
      const { data } = await getUser({ address: account })
      return data
    }
  }, [account, token, updateUser])

  const toogleUserInfo = async (payload: IUserPayload) => {
    if (account && token) {
      await putUser({
        email: user?.email,
        newAlert: user?.newAlert,
        tradeAlert: user?.tradeAlert,
        userName: user?.nickName,
        ...payload
      })
      setUpdateUser(updateUser + 1)
    }
  }

  return (
    <appContext.Provider
      value={{
        account,
        balance,
        web3,
        blockNumber,
        user,
        connect,
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
