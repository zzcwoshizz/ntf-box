import { Carousel } from 'antd'
import React from 'react'

import { IBanner } from '@/api/types'
import { useViewport } from '@/shared/providers/ViewportProvider'
import theme from '@/styles/antd-custom.json'

type Props = {
  banner: IBanner[]
}

const Banner: React.FunctionComponent<Props> = (props) => {
  const { banner } = props

  const { size, width } = useViewport()

  const arrArr = React.useMemo(() => {
    const _arrArr: IBanner[][] = []

    let count = 5
    switch (size) {
      case 'default':
        count = 5
        break
      case 'xlarge':
        count = 4
        break
      case 'large':
        count = 3
        break
      case 'medium':
        count = 2
        break
      case 'small':
        count = 1
        break
      case 'xsmall':
        count = 1
        break
      default:
        count = 5
        break
    }

    for (let i = 0; i < banner.length; i++) {
      const index = Math.floor(i / count)
      _arrArr[index] ? _arrArr[index].push(banner[i]) : (_arrArr[index] = [banner[i]])
    }

    return _arrArr
  }, [size])

  return (
    <>
      <div className="container">
        <Carousel dotPosition="left" key={size} autoplay={width <= 736 ? true : false}>
          {arrArr.map((arr, index) => (
            <div key={index}>
              <div className="cell">
                {arr.map((banner) => (
                  <a target="_blank" rel="noopener noreferrer" key={banner.id}>
                    <img src={banner.imageUrl} alt={banner.imageUrl} />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      <style jsx>{`
        .cell {
          display: flex;
          align-items: center;
          width: 1130px;
          padding: 20px 0;
        }

        @media screen and (max-width: 1680px) {
          .cell {
            width: 900px;
          }
        }

        @media screen and (max-width: 1280px) {
          .cell {
            width: 700px;
          }
        }

        @media screen and (max-width: 980px) {
          .cell {
            width: 420px;
          }
        }

        @media screen and (max-width: 736px) {
          .cell {
            width: 210px;
          }
        }

        @media screen and (max-width: 480px) {
          .cell {
            width: 150px;
          }
          .cell img {
            width: 150px !important;
            height: 100px !important;
          }
        }
        .cell a {
          margin-right: 20px;
        }
        .cell img {
          width: 210px;
          height: 140px;
          box-shadow: 0 24px 10px -15px rgba(0, 0, 0, 0.3);
        }
      `}</style>
      <style jsx global>{`
        .slick-slider {
          padding-left: 70px;
        }

        @media screen and (max-width: 736px) {
          .slick-slider {
            padding-left: 70px;
          }
        }
        .slick-list {
          width: 1200px;
        }

        @media screen and (max-width: 1680px) {
          .slick-list {
            width: 970px;
          }
        }

        @media screen and (max-width: 1280px) {
          .slick-list {
            width: 770px;
          }
        }

        @media screen and (max-width: 980px) {
          .slick-list {
            width: 490px;
          }
        }

        @media screen and (max-width: 736px) {
          .slick-list {
            width: 280px;
          }
        }

        @media screen and (max-width: 480px) {
          .slick-list {
            width: 220px;
          }
        }
        .ant-carousel .slick-dots li.slick-active button {
          width: 10px;
          height: 20px;
          border-radius: 5px;
          background-color: ${theme['@primary-color']};
          opacity: 1;
        }
        .ant-carousel .slick-dots li button {
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: ${theme['@primary-color']};
          opacity: 0.2;
        }

        @media screen and (max-width: 736px) {
          .ant-carousel .slick-dots {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}

export default Banner
