import { Input } from 'antd'
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { AssetItem } from '@/components/Asset'
import SearchSvg from '@/icons/icon_search.svg'
import useTheme from '@/shared/hooks/useTheme'

const Filter: React.FunctionComponent = () => {
  const theme = useTheme()

  return (
    <>
      <div className="container">
        <div className="title">DAPP Set</div>
        <div className="search">
          <Input prefix={<SearchSvg />} placeholder="Search" />
        </div>
        <div className="list">
          <PerfectScrollbar style={{ height: '100%' }}>
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
            <AssetItem icon="" title="ETH Town" extra="78" />
          </PerfectScrollbar>
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 240px;
          height: 605px;
          border: 1px solid ${theme['@border-color-base']};

          background: #ffffff;
          border-radius: 4px;
          border: 1px solid #f2f3f3;

          overflow: hidden;
        }

        .title {
          display: flex;
          align-items: center;
          height: 55px;
          padding: 0 15px;
          background-color: ${theme['@primary-color']};

          font-size: 16px;
          font-weight: bold;
          color: #fff;
        }

        .search {
          height: 50px;
          padding: 15px 15px 0 15px;
        }
        .search :global(.ant-input-affix-wrapper) {
          height: 35px;
          border-left: none;
          border-right: none;
          border-top: none;
          border-radius: 0;
          box-shadow: none;
        }

        .list {
          height: 500px;
        }
      `}</style>
    </>
  )
}

export default Filter
