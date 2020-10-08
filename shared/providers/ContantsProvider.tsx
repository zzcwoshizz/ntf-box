import React from 'react'

import { ActivityType } from '@/api/types'

const constantsContext = React.createContext<{
  ACTIVITY_TYPES: { [key in ActivityType]: string }
}>({} as any)

const ConstantsProvider: React.FunctionComponent = ({ children }) => {
  const ACTIVITY_TYPES = {
    0: '全部',
    1: '上架物品',
    2: '定价出售',
    3: '拍卖出售',
    4: '转赠'
  }

  return (
    <constantsContext.Provider value={{ ACTIVITY_TYPES }}>{children}</constantsContext.Provider>
  )
}

const useConstants = () => {
  const context = React.useContext(constantsContext)

  return context
}

export { ConstantsProvider, useConstants }
