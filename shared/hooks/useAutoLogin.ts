import React from 'react'

import { useApi } from '../providers/ApiProvider'

let loginLoading = false

const useAutoLogin = () => {
  const { login, token } = useApi()

  React.useEffect(() => {
    if (token || loginLoading) {
      return
    }

    loginLoading = true
    login().finally(() => {
      loginLoading = false
    })
  }, [login, token])
}

export default useAutoLogin
