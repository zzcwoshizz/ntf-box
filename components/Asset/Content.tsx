import { Button, Col, Row, Select, Space, Spin } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

import { ItemOrder, OrderType } from '@/api/types';
import { AssetCell, AssetContainer } from '@/components/Asset';
import ProjectInfo from '@/components/Project/ProjectInfo';
import useScrollDown from '@/shared/hooks/useScrollDown';
import useTheme from '@/shared/hooks/useTheme';
import { useAsset } from '@/shared/providers/AssetProvider';
import { useConstants } from '@/shared/providers/ConstantsProvider';
import { useLanguage } from '@/shared/providers/LanguageProvider';
import { useProject } from '@/shared/providers/ProjectProvider';

import Img from '../Img';

const { Option } = Select;

const Content: React.FunctionComponent<{ canSelect?: boolean; showHead?: boolean }> = ({
  canSelect = false,
  showHead = true
}) => {
  const theme = useTheme();
  const [selected, setSelected] = React.useState<number[]>([]);
  const router = useRouter();
  const { t } = useLanguage();

  const { project } = useProject();
  const { assets, page, fetching, filter, toogleFilter, onScrollBottom } = useAsset();
  const { ORDER_TYPE, ITEM_ORDER } = useConstants();

  useScrollDown(onScrollBottom);

  const { query } = router;
  const { selType } = query as { selType?: string };

  const toogleSelected = (index: number) => {
    const hasIndex = selected.indexOf(index);

    if (hasIndex > -1) {
      setSelected(selected.slice(0, hasIndex).concat(selected.slice(hasIndex + 1)));
    } else {
      setSelected([...selected, index]);
    }
  };

  return (
    <>
      <div className="container">
        {showHead && (
          <div className="head">
            <div className="left">
              <Space>
                {project && <Img height={36} src={project.logoUrl} width={36} />}
                <span>
                  <h4>{project ? project.name : t('asset.content.title')}</h4>
                  <p>{t('asset.content.desc', { count: page.total })}</p>
                </span>
              </Space>
            </div>
            {project && (
              <div className="right">
                <ProjectInfo project={project} />
              </div>
            )}
          </div>
        )}
        <div className="select">
          <Row>
            <Col lg={{ span: 8 }} style={{ paddingRight: 16 }} xs={{ span: 12 }}>
              <Select
                onChange={(value) => {
                  toogleFilter({
                    ...filter,
                    orderType: value
                  });
                }}
                placeholder={t('asset.content.selectType')}
                value={filter.orderType}
              >
                {Object.keys(ORDER_TYPE).map((key) => (
                  <Option key={key} value={key}>
                    {ORDER_TYPE[key as OrderType]}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col lg={{ span: 8 }} xs={{ span: 12 }}>
              <Select
                onChange={(value) =>
                  toogleFilter({
                    ...filter,
                    itemOrder: value
                  })
                }
                placeholder={t('asset.content.sort')}
                value={filter.itemOrder}
              >
                {Object.keys(ITEM_ORDER).map((key) => (
                  <Option key={key} value={key}>
                    {ITEM_ORDER[key as ItemOrder]}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
        </div>
        <Spin spinning={fetching && page.page === 1}>
          <div className="list">
            <AssetContainer>
              {assets.map((asset, index) => (
                <AssetCell
                  asset={asset}
                  key={index}
                  onClick={() => {
                    if (canSelect) {
                      toogleSelected(index);
                    } else {
                      if (asset.tokens.length > 1) {
                        router.push(`/bundle/${asset.orderId}`);
                      } else {
                        router.push(
                          `/asset/${asset.tokens[0].contractAdd}/${asset.tokens[0].tokenId}`
                        );
                      }
                    }
                  }}
                  onSelect={() => {
                    toogleSelected(index);
                  }}
                  selected={selected.indexOf(index) > -1}
                  showSelect={canSelect}
                />
              ))}
            </AssetContainer>
            {canSelect && selected.length > 0 && (
              <div className="action">
                <span>{t('asset.content.selectedCount', { count: selected.length })}</span>
                <span>
                  <Space>
                    <Button onClick={() => setSelected([])}>{t('asset.content.cancel')}</Button>
                    {selected.length === 1 && selType === 'transfer' && (
                      <Button
                        onClick={() => {
                          router.push({
                            pathname: '/transfer',
                            query: {
                              address: selected.map((index) => assets[index].tokens[0].contractAdd),
                              tokenId: selected.map((index) => assets[index].tokens[0].tokenId)
                            }
                          });
                        }}
                      >
                        {t('asset.content.transfer')}
                      </Button>
                    )}
                    {selType === 'sell' && (
                      <Button
                        onClick={() => {
                          router.push({
                            pathname: '/publish',
                            query: {
                              address: selected.map((index) => assets[index].tokens[0].contractAdd),
                              tokenId: selected.map((index) => assets[index].tokens[0].tokenId)
                            }
                          });
                        }}
                        type="primary"
                      >
                        {t('asset.content.sell')}
                      </Button>
                    )}
                  </Space>
                </span>
              </div>
            )}
          </div>
        </Spin>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          border: 1px solid ${theme['@border-color-base']};
          background-color: #fff;
          border-radius: 4px;
        }
        .head {
          position: relative;
          height: 55px;
          padding: 6px 15px;

          box-shadow: 0px 2px 8px 0px rgba(60, 77, 111, 0.1);
        }
        .head > .left h4 {
          margin: 0;
          font-size: 20px;
          font-weight: 500;
          color: ${theme['@text-color']};
          line-height: 25px;
        }
        .head > .left p {
          margin: 4px 0 0 0;
          font-size: 12px;
          color: ${theme['@text-color-tertiary']};
          line-height: 14px;
        }

        .head > .right {
          position: absolute;
          right: 0;
          top: 0;
        }

        .select {
          padding: 18px 15px 0 15px;
        }
        .select :global(.ant-select) {
          width: 100%;
          height: 32px;
        }

        .list {
          padding: 16px;
        }

        .action {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;

          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 56px;
          padding: 0 16px;

          background-color: #fff;
        }
      `}</style>
    </>
  );
};

export default Content;
