import { useRouter } from 'next/router'
import React from 'react'

import { getHotGoods, getLatestGoods } from '@/api'
import { IAsset } from '@/api/types'
import { AssetCell, AssetContainer } from '@/components/Asset'
import MoreLink from '@/components/Link/MoreLink'
import HotSvg from '@/icons/icon_hot.svg'
import NewSvg from '@/icons/icon_new.svg'

import AssetList from './components/AssetList'
import Help from './components/Help'
import Hero from './components/Hero'
import Intro from './components/Intro'

const Home: React.FunctionComponent = () => {
  const router = useRouter()
  const [hot, setHot] = React.useState<IAsset[]>([])
  const [latest, setLatest] = React.useState<IAsset[]>([])
  React.useEffect(() => {
    getHotGoods().then((res) => {
      setHot(res.data)
    })
    getLatestGoods().then((res) => {
      setLatest(res.data)
    })
  }, [])

  return (
    <div className="container">
      <Hero />
      <div className="list">
        <AssetList
          title={
            <>
              <HotSvg style={{ marginRight: 4 }} /> Hot
            </>
          }
          extra={<MoreLink href="/market" />}>
          <AssetContainer>
            {hot.map((asset, index) => (
              <AssetCell
                key={index}
                asset={asset}
                onClick={() => {
                  router.push({
                    pathname: '/asset',
                    query: {
                      orderId: asset.orderId
                    }
                  })
                }}
              />
            ))}
          </AssetContainer>
        </AssetList>
        <AssetList
          title={
            <>
              <NewSvg style={{ marginRight: 4 }} /> Newest
            </>
          }
          extra={<MoreLink href="/market" />}>
          <AssetContainer>
            {latest.map((asset, index) => (
              <AssetCell
                key={index}
                asset={asset}
                onClick={() => {
                  router.push({
                    pathname: '/asset',
                    query: {
                      orderId: asset.orderId
                    }
                  })
                }}
              />
            ))}
          </AssetContainer>
        </AssetList>
      </div>
      <Intro />
      <Help />
      <style jsx>{`
        .list {
          padding: 100px 0;
          background-color: #fff;
        }
      `}</style>
    </div>
  )
}

export default Home
