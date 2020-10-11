import { Form } from 'antd'
import _ from 'lodash'
import { Moment } from 'moment'
import { useRouter } from 'next/router'
import React from 'react'
import { useAsync } from 'react-use'

import { getToken } from '@/api'
import { IToken } from '@/api/types'
import useMarket from '@/shared/hooks/useMarket'
import { useApp } from '@/shared/providers/AppProvider'

const dataContext = React.createContext<{
  tokens: IToken[]
  fetching: boolean
  loading: boolean
  disabled: boolean
}>({} as any)

const DataProvider: React.FunctionComponent = ({ children }) => {
  const router = useRouter()
  const { web3 } = useApp()
  const [loading, setLoading] = React.useState(false)

  const { address, tokenId } = router.query

  const { value: tokens = [], loading: fetching } = useAsync(async () => {
    if (!address || !tokenId) {
      return []
    }

    if (Array.isArray(address) && Array.isArray(tokenId)) {
      const res = await Promise.all(
        address.map((add, index) => getToken({ contractAdd: add, tokenId: tokenId[index] }))
      )
      return res.map(({ data }) => data)
    }

    if (!Array.isArray(address) && !Array.isArray(tokenId)) {
      const res = await getToken({ contractAdd: address, tokenId })
      return [res.data]
    }
  }, [address, tokenId])

  const disabled = React.useMemo(() => {
    let disabled = false
    tokens.forEach((token) => {
      if (token.orderIds && token.orderIds.length > 0) {
        disabled = true
      }
    })
    return disabled
  }, [JSON.stringify(tokens)])

  const market = useMarket(tokens)

  return (
    <dataContext.Provider value={{ tokens, fetching, loading, disabled }}>
      <Form
        onFinish={async (data: { price: string; expiredTime: Moment }) => {
          setLoading(true)
          const blockNumber = await web3.eth.getBlockNumber()
          let expirationHeight: string
          if (data.expiredTime) {
            expirationHeight =
              blockNumber + Math.ceil((data.expiredTime.valueOf() - Date.now()) / 1000 / 15) + ''
          } else {
            expirationHeight = '999999999999999999'
          }
          await market.makeOrder(expirationHeight, data.price, tokens.length > 1 ? 3 : 0)
          setLoading(false)
        }}>
        {children}
      </Form>
    </dataContext.Provider>
  )
}

const useData = () => {
  const context = React.useContext(dataContext)

  return context
}

export { DataProvider, useData }
