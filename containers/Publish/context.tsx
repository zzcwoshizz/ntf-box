import { Form } from 'antd'
import _ from 'lodash'
import { Moment } from 'moment'
import { useRouter } from 'next/router'
import React from 'react'
import { useAsync } from 'react-use'

import { getAssetDetail } from '@/api'
import { IAsset } from '@/api/types'
import useMarket from '@/shared/hooks/useMarket'
import { useApp } from '@/shared/providers/AppProvider'

const dataContext = React.createContext<{
  assets: IAsset[]
  fetching: boolean
  loading: boolean
}>({} as any)

const DataProvider: React.FunctionComponent = ({ children }) => {
  const router = useRouter()
  const { web3 } = useApp()
  const market = useMarket(
    '0x4eB7c32b63345240b11A42dD3F421bf5Ecfdab1C',
    '0xDE0cD69362be870c53429e6511990741037970b5'
  )
  const [loading, setLoading] = React.useState(false)

  const { address, tokenId } = router.query as { address: string[]; tokenId: string[] }

  const {
    value: assets = [
      {
        contractAdd: address[0],
        tokenId: tokenId[0]
      },
      {
        contractAdd: address[0],
        tokenId: tokenId[0]
      }
    ],
    loading: fetching
  } = useAsync(async () => {
    const { list } = await getAssetDetail({ contractAdd: address, tokenId })

    return list
  }, [address, tokenId])

  return (
    <dataContext.Provider value={{ assets, fetching, loading }}>
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
          await market.makeOrder(
            assets.map((asset) => ({
              approval: true,
              contractAdd: asset.contractAdd,
              tokenId: asset.tokenId
            })),
            expirationHeight,
            data.price,
            assets.length > 1 ? 3 : 0
          )
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
