import { Carousel } from 'antd'
import React from 'react'

import { IBanner } from '@/api/types'
import theme from '@/styles/antd-custom.json'

type Props = {
  banner: IBanner[]
}

const Banner: React.FunctionComponent<Props> = (props) => {
  const { banner } = props

  const arrArr: IBanner[][] = []

  for (let i = 0; i < banner.length; i++) {
    const index = i % Math.ceil(banner.length / 5)
    arrArr[index] ? arrArr[index].push(banner[i]) : (arrArr[index] = [banner[i]])
  }

  return (
    <>
      <div className="container">
        <Carousel dotPosition="left">
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
        .slick-list {
          width: 1200px;
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
      `}</style>
    </>
  )
}

export default Banner
