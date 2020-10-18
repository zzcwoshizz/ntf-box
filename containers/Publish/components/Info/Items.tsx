import { Carousel, Space } from 'antd'
import React from 'react'

import Img from '@/components/Img'
import RightArrow from '@/icons/icon_right.svg'
import useTheme from '@/shared/hooks/useTheme'
import { useLanguage } from '@/shared/providers/LanguageProvider'
import { generateAvatar } from '@/utils'

import { useData } from '../../context'
import Content from './Content'

const Cell: React.FunctionComponent<{ icon: string; name: string; price?: string }> = ({
  icon,
  name,
  price
}) => {
  const theme = useTheme()
  const { t } = useLanguage()

  return (
    <>
      <div className="cell">
        <Space>
          <Img width={40} height={40} style={{ overflow: 'hidden', borderRadius: 20 }} src={icon} />
          <div>
            <h6>{name}</h6>
            <p>
              {t('publish.price')}: <span>{price ?? '--'}</span>
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
  const { tokens } = useData()

  return (
    <Content title="Items on the shelf" extra={tokens.length + ' piece'}>
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
            {tokens.map((t, index) => (
              <Cell
                key={index}
                icon={t.images?.[0] || generateAvatar(t.contractAdd + t.tokenId)}
                name={t.name || '- -'}
                price=""
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
