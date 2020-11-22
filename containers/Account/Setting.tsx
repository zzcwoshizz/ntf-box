import { Button, Input, Modal } from 'antd';
import React from 'react';

import Container from '@/components/Layout/Container';
import { injected } from '@/connectors';
import FhSvg from '@/icons/icon_fh.svg';
import { useActiveWeb3React } from '@/shared/hooks';
import useAutoLogin from '@/shared/hooks/useAutoLogin';
import useStyle from '@/shared/hooks/useStyle';
import useTheme from '@/shared/hooks/useTheme';
import { useApp } from '@/shared/providers/AppProvider';
import { useLanguage } from '@/shared/providers/LanguageProvider';

const Setting: React.FunctionComponent = () => {
  const { activate, active } = useActiveWeb3React();
  const style = useStyle();
  const theme = useTheme();
  const { t } = useLanguage();

  const { user, toogleUserInfo } = useApp();
  const [email, setEmail] = React.useState('');
  const [emailVisible, setEmailVisible] = React.useState(false);
  const [name, setName] = React.useState('');
  const [nameVisible, setNameVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!active) {
      activate(injected);
    }
  }, [activate, active]);
  useAutoLogin();

  return (
    <>
      <Modal
        confirmLoading={loading}
        onCancel={() => {
          setEmailVisible(false);
        }}
        onOk={() => {
          toogleUserInfo({
            email
          }).finally(() => {
            setLoading(false);
            setEmailVisible(false);
          });
        }}
        title={t('account.emailModal.title')}
        visible={emailVisible}
      >
        <Input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder={t('account.emailModal.inputEmail')}
          type="email"
          value={email}
        />
      </Modal>
      <Modal
        confirmLoading={loading}
        onCancel={() => {
          setNameVisible(false);
        }}
        onOk={() => {
          toogleUserInfo({
            userName: name
          }).finally(() => {
            setLoading(false);
            setNameVisible(false);
          });
        }}
        title={t('account.nameModal.title')}
        visible={nameVisible}
      >
        <Input
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder={t('account.nameModal.inputName')}
          type="text"
          value={name}
        />
      </Modal>
      <Container style={{ margin: '16px auto', padding: 24, background: '#fff', borderRadius: 4 }}>
        <div className="title">
          <FhSvg style={{ marginRight: 8 }} />
          My Account
        </div>
        <div className="item">
          <span>Wallet Account</span>
        </div>
        <div className="item">
          <span>E-mail</span>
          <span style={{ color: theme['@text-color-tertiary'] }}>{t('account.emailDesc')}</span>
          <span>{user?.email}</span>
          <span style={{ textAlign: 'right' }}>
            <Button onClick={() => setEmailVisible(true)} size="small" type="link">
              {t('account.setUp')}
            </Button>
          </span>
        </div>
        <div className="item">
          <span>User Name</span>
          <span style={{ color: theme['@text-color-tertiary'] }}>{t('account.nameDesc')}</span>
          <span>{user?.nickName}</span>
          <span style={{ textAlign: 'right' }}>
            <Button onClick={() => setNameVisible(true)} size="small" type="link">
              {t('account.setUp')}
            </Button>
          </span>
        </div>
      </Container>
      {/* <div className="container">
        <div className="title">
          <FhSvg style={{ marginRight: 8 }} />
          {t('account.subscribe')}
        </div>
        <div className="item">
          <span>
            {t('account.reminder')}
            <Switch
              checked={Boolean(user?.newAlert)}
              onChange={(value) => {
                toogleUserInfo({
                  newAlert: Number(value)
                });
              }}
              style={{ marginLeft: 16 }}
            />
          </span>
        </div>
        <div className="item">
          <span>
            {t('account.security')}
            <Switch
              checked={Boolean(user?.tradeAlert)}
              onChange={(value) => {
                toogleUserInfo({
                  tradeAlert: Number(value)
                });
              }}
              style={{ marginLeft: 16 }}
            />
          </span>
        </div>
      </div> */}
      <style jsx>{`
        .title {
          display: flex;
          align-items: center;
          margin-bottom: 16px;

          font-size: 20px;
          font-weight: 500;
          color: ${theme['@text-color']};
          line-height: 20px;
        }

        .item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 0;
          border-bottom: 1px solid ${theme['@border-color-base']};
        }
        .item > span {
          white-space: nowrap;
        }
        .item > span:nth-of-type(1) {
          width: 10%;
        }
        .item > span:nth-of-type(2) {
          width: 45%;
        }
        .item > span:nth-of-type(3) {
          width: 30%;
        }
        .item > span:nth-of-type(4) {
          width: 15%;
        }
      `}</style>
      <style jsx>{`
        @media screen and (max-width: ${style.md.endpoint}px) {
          .item > span:nth-of-type(2) {
            width: 0;
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Setting;
