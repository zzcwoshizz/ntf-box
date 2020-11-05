import { Form, notification } from 'antd'
import { Moment } from 'moment'
import { useRouter } from 'next/router'
import React from 'react'
import { useAsync } from 'react-use'

import { IToken } from '@/api/types'
import { useActiveWeb3React } from '@/shared/hooks'
import useMarket from '@/shared/hooks/useMarket'
import useServerError from '@/shared/hooks/useServerError'
import { useApi } from '@/shared/providers/ApiProvider'
import { delay } from '@/utils/time'

type FormData = { price: string; expiredTime: Moment }

const dataContext = React.createContext<{
  tokens: IToken[]
  fetching: boolean
  loading: boolean
  disabled: boolean
  price: string
  expiredTime?: Moment
}>({} as any)

const DataProvider: React.FunctionComponent = ({ children }) => {
  const { library } = useActiveWeb3React()
  const { getToken } = useApi()
  const { showError } = useServerError()

  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [price, setPrice] = React.useState('')
  const [expiredTime, setExpiredTime] = React.useState<Moment>()

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
    <dataContext.Provider value={{ tokens, fetching, loading, disabled, price, expiredTime }}>
      <Form<FormData>
        onValuesChange={(values) => {
          setPrice(values.price)
          setExpiredTime(values.expiredTime)
        }}
        onFinish={async (data) => {
          if (!library) {
            return
          }

          setLoading(true)
          try {
            const blockNumber = await library?.getBlockNumber()
            let expirationHeight: string
            if (data.expiredTime) {
              expirationHeight =
                blockNumber + Math.ceil((data.expiredTime.valueOf() - Date.now()) / 1000 / 13) + ''
            } else {
              expirationHeight = '999999999999999999'
            }
            const orderId = await market.makeOrder(
              expirationHeight,
              data.price,
              tokens.length > 1 ? 3 : 0
            )
            notification.success({ message: 'Transaction success!' })
            await delay(1000)
            if (tokens.length > 1) {
              router.push(`/bundle/${orderId}`)
            } else {
              router.push(`/asset/${tokens[0].contractAdd}/${tokens[0].tokenId}`)
            }
          } catch (e) {
            showError(e)
          } finally {
            setLoading(false)
          }
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
