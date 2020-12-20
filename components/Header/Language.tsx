import { Dropdown, Menu } from 'antd';
import React from 'react';

import { useLanguage } from '@/shared/providers/LanguageProvider';

const Language: React.FunctionComponent = () => {
  const { supportLang, lang, toogleLang } = useLanguage();

  return (
    <>
      <Dropdown
        overlay={
          <Menu>
            {Object.keys(supportLang).map((key) => (
              <Menu.Item key={key} onClick={() => toogleLang(key)}>
                <img alt="language" src={supportLang[key].icon} />
              </Menu.Item>
            ))}
          </Menu>
        }
        placement={'bottomLeft'}
        trigger={['click']}
      >
        <img alt="language" src={supportLang[lang].icon} />
      </Dropdown>
      <style jsx>{`
        img {
          width: 32px;
        }
      `}</style>
    </>
  );
};

export default Language;
