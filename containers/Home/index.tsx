import { useRouter } from 'next/router'
import React from 'react'

import { IAsset } from '@/api/types'
import { AssetCell, AssetContainer } from '@/components/Asset'
// import EnableButton from '@/components/Button/EnableButton'
import MoreLink from '@/components/Link/MoreLink'
import HotSvg from '@/icons/icon_hot.svg'
import NewSvg from '@/icons/icon_new.svg'
// import useMarket from '@/shared/hooks/useMarket'
import { useApi } from '@/shared/providers/ApiProvider'
import { useLanguage } from '@/shared/providers/LanguageProvider'

import AssetList from './components/AssetList'
import Help from './components/Help'
import Hero from './components/Hero'
import Intro from './components/Intro'

const Home: React.FunctionComponent = () => {
  const { getHotGoods, getLatestGoods } = useApi()
  const router = useRouter()
  const [hot, setHot] = React.useState<IAsset[]>([])
  const [latest, setLatest] = React.useState<IAsset[]>([])
  const { t } = useLanguage()
  // const { buy } = useMarket([
  //   { contractAdd: '0x556B133528D01499E12F97821025a1d15617c301', tokenId: '1', type: 'ERC721' }
  // ])

  React.useEffect(() => {
    getHotGoods().then((res) => {
      setHot(res.data)
    })
    getLatestGoods().then((res) => {
      setLatest(res.data)
    })
  }, [])

  const jumpUrl = (asset: IAsset) => {
    if (asset.tokens.length > 1) {
      router.push(`/bundle/${asset.orderId}`)
    } else {
      router.push(`/asset/${asset.tokens[0].contractAdd}/${asset.tokens[0].tokenId}`)
    }
  }

  return (
    <div className="container">
      {/* <EnableButton
        onClick={() => {
          buy('520960623677550592')
        }}>
        Buy
      </EnableButton> */}
      <Hero />
      <div className="list">
        <AssetList
          title={
            <>
              <HotSvg style={{ marginRight: 4 }} /> {t('home.hot')}
            </>
          }
          extra={<MoreLink href="/market" />}>
          <AssetContainer>
            {hot.map((asset, index) => (
              <AssetCell
                key={index}
                asset={asset}
                onClick={() => {
                  jumpUrl(asset)
                }}
              />
            ))}
          </AssetContainer>
        </AssetList>
        <AssetList
          title={
            <>
              <NewSvg style={{ marginRight: 4 }} /> {t('home.newest')}
            </>
          }
          extra={<MoreLink href="/market" />}>
          <AssetContainer>
            {latest.map((asset, index) => (
              <AssetCell
                key={index}
                asset={asset}
                onClick={() => {
                  jumpUrl(asset)
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
