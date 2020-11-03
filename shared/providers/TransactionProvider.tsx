import { Typography } from 'antd'
import React from 'react'

import { IToken } from '@/api/types'
import Pending from '@/components/Loading/Pending'
import { DEFAULT_CHAIN_ID, SCAN_URLS } from '@/shared/constants'

import { useActiveWeb3React } from '../hooks'
import useCache from '../hooks/useCache'

const { Title } = Typography

export type TransactionInfo = {
  transactionHash: string
  status: 'pending' | 'success' | 'fail'
  type: 'buy' | 'transfer' | 'approve'
}

export type BuyTransactionInfo = {
  token: IToken
} & TransactionInfo

export type TransferTransactionInfo = {
  from: string
  to: string
} & TransactionInfo

export type ApproveTransactionInfo = {
  contract: string
  to: string
} & TransactionInfo

const transactionContext = React.createContext<{
  buyTransaction: BuyTransactionInfo[]
  transferTransaction: TransferTransactionInfo[]
  allTransaction: (BuyTransactionInfo | TransferTransactionInfo | ApproveTransactionInfo)[]
  addBuyTransaction(transaction: BuyTransactionInfo): void
  addTransferTransaction(transaction: TransferTransactionInfo): void
  addApproveTransaction(transaction: ApproveTransactionInfo): void
  toogleVisible(hash?: string): void
}>({} as any)

const TransactionProvider: React.FunctionComponent = ({ children }) => {
  const { library, chainId } = useActiveWeb3React()

  const [buyTransaction = [], setBuyTransaction] = useCache<BuyTransactionInfo[]>(
    'buyTransaction',
    []
  )
  const [transferTransaction = [], setTransferTransaction] = useCache<TransferTransactionInfo[]>(
    'transferTransaction',
    []
  )
  const [approveTransaction = [], setApproveTransaction] = useCache<ApproveTransactionInfo[]>(
    'approveTransaction',
    []
  )
  const allTransaction = React.useMemo(() => {
    return [...buyTransaction, ...transferTransaction, ...approveTransaction]
  }, [buyTransaction, transferTransaction, approveTransaction])
  const [visibleHash, setVisibleHash] = React.useState<string>()

  // 保存最新的transaction
  const buyTransactionRef = React.useRef(buyTransaction)
  React.useEffect(() => {
    buyTransactionRef.current = buyTransaction
  }, [buyTransaction])
  const transferTransactionRef = React.useRef(transferTransaction)
  React.useEffect(() => {
    transferTransactionRef.current = transferTransaction
  }, [transferTransaction])
  const approveTransactionRef = React.useRef(approveTransaction)
  React.useEffect(() => {
    approveTransactionRef.current = approveTransaction
  }, [approveTransaction])
  const allTransactionRef = React.useRef(allTransaction)
  React.useEffect(() => {
    allTransactionRef.current = allTransaction
  }, [allTransaction])

  const visibleTransaction = React.useMemo(() => {
    for (const _transaction of allTransaction) {
      if (_transaction.transactionHash === visibleHash) {
        return _transaction
      }
    }
  }, [allTransaction, visibleHash])

  const toogleVisible = (hash?: string) => {
    setVisibleHash(hash)
  }

  React.useEffect(() => {
    const hashs = allTransactionRef.current
      .filter((transaction) => transaction.status === 'pending')
      .map((transaction) => {
        let status: 'success' | 'fail' | 'pending' = 'pending'

        library
          ?.waitForTransaction(transaction.transactionHash)
          .then((result) => {
            if (result.status === 1) {
              status = 'success'
            } else {
              status = 'fail'
            }
          })
          .catch(() => {
            status = 'fail'
          })
          .finally(() => {
            if (transaction.type === 'buy') {
              transaction = transaction as BuyTransactionInfo
              setBuyTransaction(
                buyTransactionRef.current.map<BuyTransactionInfo>((_transaction) => {
                  return _transaction.transactionHash === transaction.transactionHash
                    ? {
                        ..._transaction,
                        status
                      }
                    : {
                        ..._transaction
                      }
                })
              )
            }

            if (transaction.type === 'transfer') {
              transaction = transaction as TransferTransactionInfo
              setTransferTransaction(
                transferTransactionRef.current.map<TransferTransactionInfo>((_transaction) => {
                  return _transaction.transactionHash === transaction.transactionHash
                    ? {
                        ..._transaction,
                        status
                      }
                    : {
                        ..._transaction
                      }
                })
              )
            }

            if (transaction.type === 'approve') {
              transaction = transaction as ApproveTransactionInfo
              setApproveTransaction(
                approveTransactionRef.current.map<ApproveTransactionInfo>((_transaction) => {
                  return _transaction.transactionHash === transaction.transactionHash
                    ? {
                        ..._transaction,
                        status
                      }
                    : {
                        ..._transaction
                      }
                })
              )
            }
          })
        return transaction.transactionHash
      })

    return () => {
      library?.removeAllListeners(hashs)
    }
  }, [library, allTransaction])

  const addBuyTransaction = (transaction: BuyTransactionInfo) => {
    setBuyTransaction([...buyTransactionRef.current, transaction])
  }
  const addTransferTransaction = (transaction: TransferTransactionInfo) => {
    setTransferTransaction([...transferTransactionRef.current, transaction])
  }
  const addApproveTransaction = (transaction: ApproveTransactionInfo) => {
    setApproveTransaction([...approveTransactionRef.current, transaction])
  }

  return (
    <transactionContext.Provider
      value={{
        buyTransaction,
        transferTransaction,
        allTransaction,
        addBuyTransaction,
        addTransferTransaction,
        addApproveTransaction,
        toogleVisible
      }}>
      <Pending
        visible={!!visibleTransaction}
        onCacel={() => {
          setVisibleHash(undefined)
        }}
        status={visibleTransaction?.status}>
        <Title level={4} style={{ marginTop: 20, fontWeight: 400, textAlign: 'center' }}>
          {visibleTransaction?.type === 'buy' && (
            <>
              {visibleTransaction.status === 'pending' && '购买中'}
              {visibleTransaction.status === 'success' && '购买成功'}
              {visibleTransaction.status === 'fail' && '购买失败'}
            </>
          )}
          {visibleTransaction?.type === 'transfer' && (
            <>
              {visibleTransaction.status === 'pending' && '转赠中'}
              {visibleTransaction.status === 'success' && '转赠成功'}
              {visibleTransaction.status === 'fail' && '转赠失败'}
            </>
          )}
          {visibleTransaction?.type === 'approve' && (
            <>
              {visibleTransaction.status === 'pending' && 'Approving'}
              {visibleTransaction.status === 'success' && 'Approved'}
              {visibleTransaction.status === 'fail' && 'Approve fail'}
            </>
          )}
        </Title>
        <span className="txid">
          Txid:{' '}
          <a
            href={SCAN_URLS[chainId ?? DEFAULT_CHAIN_ID] + '/tx/' + visibleHash}
            target="_blank"
            rel="noopener noreferrer">
            {visibleTransaction?.transactionHash}
          </a>
        </span>
      </Pending>
      {children}
      <style jsx>{`
        .txid {
          display: block;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}</style>
    </transactionContext.Provider>
  )
}

const useTransaction = () => {
  const context = React.useContext(transactionContext)

  return context
}

export { TransactionProvider, useTransaction }
