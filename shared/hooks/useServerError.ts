import { notification } from 'antd';
import React from 'react';

import { useLanguage } from '../providers/LanguageProvider';

const useServerError = () => {
  const { t } = useLanguage();

  const serverMessage: Record<string, string> = React.useMemo(
    () => ({
      N02: t('errorMessage.N02'),
      N01: t('errorMessage.N01'),
      N03: t('errorMessage.N03'),
      N04: t('errorMessage.N04'),
      N05: t('errorMessage.N05'),
      N06: t('errorMessage.N06'),
      N07: t('errorMessage.N07'),
      N08: t('errorMessage.N08'),
      N09: t('errorMessage.N09'),
      N10: t('errorMessage.N10'),
      N11: t('errorMessage.N11'),
      N12: t('errorMessage.N12'),
      N13: t('errorMessage.N13'),
      N14: t('errorMessage.N14'),
      N15: t('errorMessage.N15')
    }),
    [t]
  );

  return React.useMemo(
    () => ({
      showError(msg: { message: string } | string | any) {
        let code: string;

        if (typeof msg === 'string') {
          code = msg;
        } else {
          code = msg.message;
        }

        notification.error({
          message: serverMessage[code] ?? msg?.message ?? '未知错误',
          duration: 15
        });
      }
    }),
    [serverMessage]
  );
};

export default useServerError;
