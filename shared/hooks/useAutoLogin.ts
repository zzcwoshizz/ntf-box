import React from 'react'

import { useApi } from '../providers/ApiProvider'
import { useApp } from '../providers/AppProvider'
import { useActiveWeb3React } from '.'

let loginLoading = false

const useAutoLogin = () => {
  const { account } = useActiveWeb3React()
  const { login } = useApi()
  const { user } = useApp()

  React.useEffect(() => {
    if (user && user.address === account) {
      return
    }

    if (loginLoading) {
      return
    }

    loginLoading = true
    login().finally(() => {
      loginLoading = false
    })
  }, [login, user, account])
}

export default useAutoLogin
