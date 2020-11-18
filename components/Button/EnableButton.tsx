import Button, { ButtonProps } from 'antd/lib/button';
import React from 'react';

import { useActiveWeb3React } from '@/shared/hooks';
import { useApp } from '@/shared/providers/AppProvider';
import { useLanguage } from '@/shared/providers/LanguageProvider';

import WalletModal from '../WalletModal';

const EnableButton: React.FunctionComponent<ButtonProps> = ({ ...props }) => {
  const { user } = useApp();
  const { login } = useApp();
  const { account } = useActiveWeb3React();
  const [loading, setLoading] = React.useState(false);
  const { t } = useLanguage();
  const [visible, setVisible] = React.useState(false);

  let text: React.ReactNode;

  if (account && user) {
    text = props.children;
  } else if (!account) {
    text = loading ? t('common.connecting') : t('common.connectWallet');
  } else if (!user) {
    text = loading ? t('common.logging') : t('common.login');
  }

  return (
    <>
      <Button
        {...props}
        loading={account && user ? props.loading : loading}
        onClick={(e) => {
          if (account && user) {
            props.onClick?.(e);
          } else if (!account) {
            e.preventDefault();
            setVisible(true);
          } else if (!user) {
            e.preventDefault();
            setLoading(true);
            login().finally(() => {
              setLoading(false);
            });
          }
        }}
      >
        {text}
      </Button>
      <WalletModal setVisible={setVisible} visible={visible} />
    </>
  );
};

export default EnableButton;
