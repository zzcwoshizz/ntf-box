import { MenuOutlined } from '@ant-design/icons';
import { Affix, Modal } from 'antd';
import React from 'react';

import useStyle from '@/shared/hooks/useStyle';
import useTheme from '@/shared/hooks/useTheme';

interface Props {
  left: React.ReactNode;
  right: React.ReactNode;
}

const LRContainer: React.FunctionComponent<Props> = ({ left, right }) => {
  const style = useStyle();
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <span className="menu" onClick={() => setVisible(true)}>
        <MenuOutlined />
      </span>
      <div className="modal">
        <Modal
          bodyStyle={{ height: '75vh', paddingTop: 60 }}
          centered
          footer={null}
          onCancel={() => setVisible(false)}
          visible={visible}
        >
          {left}
        </Modal>
      </div>
      <div className="container">
        <div className="left">
          <Affix offsetTop={0}>
            <div style={{ height: 'calc(100vh - 120px)' }}>{left}</div>
          </Affix>
        </div>
        <div className="right">{right}</div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
        }
        .menu {
          display: none;
        }
        .left {
          position: relative;
          flex: 0 0 auto;
          width: 240px;
        }
        .modal {
          display: none;
        }
        .right {
          flex: 1 1 auto;
          margin-left: 16px;
        }
      `}</style>
      <style jsx>{`
        @media screen and (max-width: ${style.md.endpoint}px) {
          .container {
            flex-direction: column;
          }

          .menu {
            z-index: 1;
            position: fixed;
            left: 0;
            bottom: 44px;

            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px 0;
            width: 44px;
            height: 44px;

            background-color: #fff;
            box-shadow: ${theme['@shadow-2']};
          }
          .left {
            display: none;
            width: 100%;
          }
          .modal {
            display: block;
          }

          .right {
            margin-left: 0;
          }
        }
      `}</style>
    </>
  );
};

export default LRContainer;
