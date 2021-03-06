import { Carousel, Typography } from 'antd';
import React from 'react';

import GLTF from '@/components/GLTF';
import Img from '@/components/Img';
import useTheme from '@/shared/hooks/useTheme';

const { Text } = Typography;

const Images: React.FunctionComponent<{ images?: string[] }> = ({ images }) => {
  const theme = useTheme();

  const [current, setCurrent] = React.useState(0);

  return (
    <>
      <div className="container">
        <Carousel
          afterChange={(num) => {
            setCurrent(num);
          }}
          autoplay={false}
          effect="fade"
        >
          {images?.map((image, index) => {
            const extension = image.substring(image.lastIndexOf('.') + 1);

            return (
              <div key={index}>
                {extension !== 'gltf' && <Img fit="contain" height={400} preview src={image} />}
                {extension === 'gltf' && <GLTF height={400} url={image} />}
              </div>
            );
          })}
        </Carousel>
        <span className="progress">
          <Text>
            {current + 1}/{images?.length}
          </Text>
        </span>
      </div>
      <style jsx>{`
        .container {
          position: relative;
          padding-bottom: 24px;
          background-color: ${theme['@body-background']};
        }

        .progress {
          position: absolute;
          bottom: 10px;
          right: 16px;

          text-align: right;
          font-size: 12px;
          line-height: 12px;
        }

        .container :global(.ant-carousel .slick-dots-bottom) {
          bottom: -20px;
        }

        .container :global(.ant-carousel .slick-dots li button) {
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background-color: ${theme['@primary-color']};
        }
        .container :global(.ant-carousel .slick-dots .slick-active button) {
          width: 16px;
        }
      `}</style>
    </>
  );
};

export default Images;
