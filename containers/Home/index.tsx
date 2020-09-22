import React from 'react'

import { AssetCell, AssetContainer } from '@/components/Asset'
import MoreLink from '@/components/Link/MoreLink'
import HotSvg from '@/icons/icon_hot.svg'
import NewSvg from '@/icons/icon_new.svg'

import AssetList from './components/AssetList'
import Help from './components/Help'
import Hero from './components/Hero'
import Intro from './components/Intro'

const Home: React.FunctionComponent = () => {
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
          extra={<MoreLink href="/" />}>
          <AssetContainer>
            <AssetCell />
            <AssetCell />
            <AssetCell />
            <AssetCell />
          </AssetContainer>
        </AssetList>
        <AssetList
          title={
            <>
              <NewSvg style={{ marginRight: 4 }} /> Newest
            </>
          }
          extra={<MoreLink href="/" />}>
          <AssetContainer>
            <AssetCell />
            <AssetCell />
            <AssetCell />
            <AssetCell />
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
