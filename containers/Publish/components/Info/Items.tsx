import { Carousel, Space } from 'antd';
import React from 'react';

import Img from '@/components/Img';
import Jdenticon from '@/components/Jdenticon';
import RightArrow from '@/icons/icon_right.svg';
import useTheme from '@/shared/hooks/useTheme';
import { useLanguage } from '@/shared/providers/LanguageProvider';

import { useData } from '../../context';
import Content from './Content';

const Cell: React.FunctionComponent<{ icon: React.ReactNode; name: string; price?: string }> = ({
  icon,
  name,
  price
}) => {
  const theme = useTheme();
  const { t } = useLanguage();

  return (
    <>
      <div className="cell">
        <Space>
          {icon}
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
  );
};

const Items: React.FunctionComponent = () => {
  const theme = useTheme();
  const { tokens } = useData();

  return (
    <Content extra={tokens.length + ' piece'} title="Items on the shelf">
      <div className="items" style={{ width: '100%', padding: '0 32px 0 48px' }}>
        <div style={{ width: '100%' }}>
          <Carousel
            arrows
            autoplay={false}
            dots={false}
            infinite={false}
            nextArrow={
              <div>
                <RightArrow />
              </div>
            }
            prevArrow={
              <div>
                <RightArrow />
              </div>
            }
            responsive={[
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]}
            slidesToScroll={2}
            slidesToShow={2}
          >
            {tokens.map((t, index) => (
              <Cell
                icon={
                  t.images?.[0] ? (
                    <Img height={40} preview src={t.images[0]} width={40} />
                  ) : (
                    <Jdenticon size={40} value={t.contractAdd + t.tokenId} />
                  )
                }
                key={index}
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
  );
};

export default Items;
