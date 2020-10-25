import React from 'react'

const transactionContext = React.createContext<{
  transactions: string[]
}>({} as any)

const TransactionProvider: React.FunctionComponent = ({ children }) => {
  return (
    <transactionContext.Provider value={{ transactions: [] }}>
      {children}
    </transactionContext.Provider>
  )
}

export default { TransactionProvider }
