import { Carousel, Space } from 'antd'
import React from 'react'

import RightArrow from '@/icons/icon_right.svg'
import { AVATAR_URL } from '@/shared/constants'
import useTheme from '@/shared/hooks/useTheme'

import { useData } from '../../context'
import Content from './Content'

const Cell: React.FunctionComponent<{ icon: string; name: string; price?: string }> = ({
  icon,
  name,
  price
}) => {
  const theme = useTheme()

  return (
    <>
      <div className="cell">
        <Space>
          <img src={icon} alt={name} />
          <div>
            <h6>{name}</h6>
            <p>
              Last price: <span>{price}</span>
            </p>
          </div>
        </Space>
      </div>
      <style jsx>{`
        .cell {
          display: flex;
          align-items: center;
          height: 72px;
          margin-right: 16px;
          padding: 16px 24px;
          border: 1px solid ${theme['@border-color-base']};

          background: #ffffff;
          border-radius: 4px;
        }

        img {
          width: 40px;
          height: 40px;
        }

        h6 {
          margin-bottom: 10px;

          font-size: 16px;
          font-weight: 500;
          color: ${theme['@text-color']};
          line-height: 14px;
        }

        p {
          margin: 0;

          font-size: 14px;
          color: ${theme['@text-color-secondary']};
          line-height: 14px;
        }
      `}</style>
    </>
  )
}

const Items: React.FunctionComponent = () => {
  const theme = useTheme()
  const { assets } = useData()

  return (
    <Content title="Items on the shelf" extra="12 piece">
      <div className="items" style={{ width: '100%', padding: '0 32px 0 48px' }}>
        <div style={{ width: '100%' }}>
          <Carousel
            arrows
            prevArrow={
              <div>
                <RightArrow />
              </div>
            }
            nextArrow={
              <div>
                <RightArrow />
              </div>
            }
            infinite={false}
            dots={false}
            slidesToShow={2}
            slidesToScroll={2}
            autoplay={false}
            responsive={[
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]}>
            {assets.map((asset, index) => (
              <Cell
                key={index}
                icon={AVATAR_URL + asset.contractAdd + asset.tokenId}
                name="Item name"
                price={asset.dealPrice}
              />
            ))}
          </Carousel>
        </div>
      </div>
      <style jsx>{`
        .items {
          position: relative;
          display: flex;
          align-items: stretch;
        }
        .items :global(.ant-carousel .slick-arrow) {
          position: absolute;
          top: 0;

          display: flex !important;
          justify-content: center;
          align-items: center;
          width: 32px;
          height: 100%;
          margin-top: 0;
          border-radius: 4px;
          border: 1px solid ${theme['@border-color-base']};
          cursor: pointer;
        }
        .items :global(.ant-carousel .slick-prev) {
          left: -48px;
          transform: rotateZ(180deg);
        }
        .items :global(.ant-carousel .slick-next) {
          right: -32px;
        }
        .items :global(.ant-carousel .slick-disabled) {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </Content>
  )
}

export default Items
