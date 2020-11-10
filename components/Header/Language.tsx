import { Dropdown, Menu } from 'antd';
import React from 'react';

import { LangType, useLanguage } from '@/shared/providers/LanguageProvider';

const Language: React.FunctionComponent = () => {
  const { supportLang, lang, toogleLang } = useLanguage();

  return (
    <>
      <Dropdown
        overlay={
          <Menu>
            {Object.keys(supportLang).map((key) => (
              <Menu.Item key={key} onClick={() => toogleLang(key as LangType)}>
                <img alt="language" src={supportLang[key as LangType].icon} />
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
