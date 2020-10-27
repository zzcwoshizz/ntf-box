import { Dropdown, Menu } from 'antd'
import React from 'react'

import { LangType, useLanguage } from '@/shared/providers/LanguageProvider'

const Language: React.FunctionComponent = () => {
  const { supportLang, lang, toogleLang } = useLanguage()
  return (
    <>
      <Dropdown
        placement={'bottomLeft'}
        trigger={['click']}
        overlay={
          <Menu>
            {Object.keys(supportLang).map((key) => (
              <Menu.Item key={key} onClick={() => toogleLang(key as LangType)}>
                <img src={supportLang[key as LangType].icon} alt="language" />
              </Menu.Item>
            ))}
          </Menu>
        }>
        <img src={supportLang[lang].icon} alt="language" />
      </Dropdown>
      <style jsx>{`
        img {
          width: 32px;
        }
      `}</style>
    </>
  )
}

export default Language
