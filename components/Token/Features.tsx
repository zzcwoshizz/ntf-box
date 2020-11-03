import { Carousel } from 'antd'
import React from 'react'

import { IToken } from '@/api/types'
import RightArrow from '@/icons/icon_right.svg'
import useTheme from '@/shared/hooks/useTheme'
import { hex2rgba } from '@/utils/color'

const Features: React.FunctionComponent<{ token: IToken; size?: number }> = ({
  token,
  size = 6
}) => {
  const theme = useTheme()

  return (
    <>
      <div className="container">
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
          slidesToShow={size}
          slidesToScroll={size}
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
          {Object.keys(token.propertys ?? {}).map((key) => {
            return (
              <div className="item-wrapper" key={key}>
                <div className="item">
                  <div className="title">{key}</div>
                  <div className="desc">{token.propertys?.[key]}</div>
                </div>
              </div>
            )
          })}
        </Carousel>
      </div>
      <style jsx>{`
        .container {
          padding: 0 36px;
        }

        .container :global(.ant-carousel .slick-arrow) {
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
        .container :global(.ant-carousel .slick-prev) {
          left: -36px;
          transform: rotateZ(180deg);
        }
        .container :global(.ant-carousel .slick-next) {
          right: -36px;
        }
        .container :global(.ant-carousel .slick-disabled) {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .item-wrapper {
          padding: 0 4px;
        }
        .item {
          border: 1px solid ${theme['@border-color-base']};
          border-radius: 4px;
          text-align: center;
        }
        .item .title {
          height: 30px;
          border-bottom: 1px solid ${theme['@border-color-base']};
          line-height: 30px;
          font-size: 14px;
          font-weight: bold;
          color: ${theme['@primary-color']};
          background-color: ${hex2rgba(theme['@heading-color'], 0.02)};
        }
        .item .desc {
          padding: 10px;

          font-size: 14px;
          color: ${theme['@text-color']};
          line-height: 14px;
          word-break: break-all;
        }
      `}</style>
    </>
  )
}

export default Features
