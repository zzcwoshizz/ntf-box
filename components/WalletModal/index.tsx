import { Button, Modal, Spin, Typography } from 'antd';
import React from 'react';

import {
  authereum,
  fortmatic,
  injected,
  portis,
  squarelink,
  torus,
  walletconnect,
  walletlink
} from '@/connectors';
import { useActiveWeb3React } from '@/shared/hooks';
import useTheme from '@/shared/hooks/useTheme';
import { useLanguage } from '@/shared/providers/LanguageProvider';
import { hex2rgba } from '@/utils/color';

const { Title } = Typography;

const WalletModal: React.FunctionComponent<{
  visible: boolean;
  setVisible(_visible: boolean): void;
}> = ({ visible, setVisible }) => {
  const theme = useTheme();
  const { activate } = useActiveWeb3React();
  const { t } = useLanguage();
  const [loading, setLoading] = React.useState(false);
  const [select, setSelect] = React.useState(0);

  const connectors = React.useMemo(() => {
    return [
      {
        name: 'metamask',
        desc: t('wallet.metamask'),
        img: require('@/assets/wallet/metamask.png'),
        imgLong: require('@/assets/wallet/metamask-l.png'),
        connector: injected
      },
      {
        name: 'fortmatic',
        desc: t('wallet.fortmatic'),
        img: require('@/assets/wallet/fortmatic.png'),
        imgLong: require('@/assets/wallet/fortmatic-l.png'),
        connector: fortmatic
      },
      {
        name: 'walletconnect',
        desc: t('wallet.walletconnect'),
        img: require('@/assets/wallet/walletconnect.png'),
        imgLong: require('@/assets/wallet/walletconnect-l.png'),
        connector: walletconnect
      },
      {
        name: 'walletlink',
        desc: t('wallet.walletlink'),
        img: require('@/assets/wallet/walletlink.png'),
        imgLong: require('@/assets/wallet/walletlink-l.png'),
        connector: walletlink
      },
      {
        name: 'torus',
        desc: t('wallet.torus'),
        img: require('@/assets/wallet/torus.png'),
        imgLong: require('@/assets/wallet/torus-l.png'),
        connector: torus
      },
      {
        name: 'dapper',
        desc: t('wallet.dapper'),
        img: require('@/assets/wallet/dapper.png'),
        imgLong: require('@/assets/wallet/dapper-l.png'),
        connector: injected
      },
      {
        name: 'authereum',
        desc: t('wallet.authereum'),
        img: require('@/assets/wallet/authereum.png'),
        imgLong: require('@/assets/wallet/authereum-l.png'),
        connector: authereum
      },
      {
        name: 'portis',
        desc: t('wallet.portis'),
        img: require('@/assets/wallet/portis.png'),
        imgLong: require('@/assets/wallet/portis-l.png'),
        connector: portis
      },
      {
        name: 'squarelink',
        desc: t('wallet.squarelink'),
        img: require('@/assets/wallet/squarelink.png'),
        imgLong: require('@/assets/wallet/squarelink-l.png'),
        connector: squarelink
      }
    ];
  }, [t]);

  const selectConnector = React.useMemo(() => {
    return connectors[select];
  }, [connectors, select]);

  return (
    <>
      <Modal
        closable={true}
        footer={null}
        onCancel={() => {
          setVisible(false);
          setLoading(false);
        }}
        title={null}
        visible={visible}
        width={400}
      >
        <>
          <Spin spinning={loading}>
            <div className="title">
              <Title level={3}>We support Ethereum wallet</Title>
            </div>
            <div className="desc">
              <img alt={selectConnector.name} src={selectConnector.imgLong} />
              <p>{selectConnector.desc}</p>
              <Button
                onClick={() => {
                  setLoading(true);
                  activate(selectConnector.connector).finally(() => {
                    setLoading(false);
                    setVisible(false);
                  });
                }}
                style={{ marginTop: 20 }}
                type="primary"
              >
                Connect to {selectConnector.name}
              </Button>
            </div>
            <p style={{ margin: '20px 0 10px 0', textAlign: 'center' }}>Other Ethereum Wallet</p>
            <div className="container">
              {connectors.map(({ name, img }, index) => (
                <div
                  className={index === select ? 'cell cell-select' : 'cell'}
                  key={name}
                  onClick={() => setSelect(index)}
                >
                  <img alt={name} src={img} />
                </div>
              ))}
            </div>
            <style jsx>{`
              .title {
                text-align: center;
                margin: 30px 0;
              }

              .desc {
                padding: 20px;

                text-align: center;

                background-color: ${hex2rgba(theme['@primary-color'], 0.06)};
              }
              .desc p {
                margin-top: 20px;
              }
              .desc img {
                width: 220px;
              }

              .container {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                max-width: 300px;
                margin: 0 auto;
              }
              .cell {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 68px;
                height: 68px;
                border-radius: 34px;
                margin: 10px;

                box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.5);
                background-color: #fff;

                cursor: pointer;
              }
              .cell-select {
                box-shadow: 0 3px 6px -4px ${hex2rgba(theme['@primary-color'], 0.24)},
                  0 6px 16px 0 ${hex2rgba(theme['@primary-color'], 0.16)},
                  0 9px 28px 8px ${hex2rgba(theme['@primary-color'], 0.12)};
              }
              .container img {
                width: 40px;
                height: 40px;
                object-position: center;
                object-fit: contain;
              }
            `}</style>
          </Spin>
        </>
      </Modal>
    </>
  );
};

export default WalletModal;
