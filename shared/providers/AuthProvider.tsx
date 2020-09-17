import React from 'react'
import { useWallet } from 'use-wallet'

import { login as loginApi } from '@/api'
import { SIGN_TEXT } from '@/shared/constants'
import { getWeb3 } from '@/utils/eth'

type loginType = () => Promise<string | null>
type getTokenType = () => string | null

const tokenContext = React.createContext<{ login: loginType; getToken: getTokenType }>({} as any)
const AuthProvider: React.FunctionComponent = ({ children }) => {
  const wallet = useWallet()

  const login = async () => {
    if (wallet.status === 'connected') {
      const web3 = getWeb3(wallet.ethereum)

      const signature = await web3.eth.personal.sign(SIGN_TEXT, wallet.account + '', '')

      const { data } = await loginApi({ signature, address: wallet.account + '' })

      localStorage.setItem('token', data)

      return data
    } else {
      return null
    }
  }

  const getToken = () => {
    return localStorage.getItem('token')
  }

  return <tokenContext.Provider value={{ login, getToken }}>{children}</tokenContext.Provider>
}

const useAuth = () => {
  const values = React.useContext(tokenContext)

  return values
}

export { AuthProvider, useAuth }
