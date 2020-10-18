import { ConfigProvider } from 'antd'
import ant_en_US from 'antd/lib/locale/en_US'
import ant_zh_CN from 'antd/lib/locale/zh_CN'
import React from 'react'

import en_US from '@/locales/en-US'
import zh_CN from '@/locales/zh-CN'

export type LangType = 'zh-CN' | 'en-US'

type SupportType = { [key in LangType]: { name: string } }
type TextType = string | number

const languageContext = React.createContext<{
  lang: LangType
  supportLang: SupportType
  messages: any
  message: any
  toogleLang(lang: LangType): void
  getMessage(id: string, message: any, params: any, defaultMessage: any): string
  t(id: string, params?: any, defaultMessage?: any): string
}>({} as any)

const LanguageProvider: React.FunctionComponent<{ defaultLang?: LangType }> = ({
  children,
  defaultLang = 'zh-CN'
}) => {
  const [lang, setLang] = React.useState<LangType>(defaultLang)
  const supportLang: SupportType = {
    'zh-CN': {
      name: '中文'
    },
    'en-US': {
      name: 'English'
    }
  }
  const messages: any = {
    'zh-CN': zh_CN,
    'en-US': en_US
  }
  const antMessages = {
    'zh-CN': ant_zh_CN,
    'en-US': ant_en_US
  }

  const message: any = React.useMemo(() => {
    return messages[lang]
  }, [messages, lang])

  const toogleLang = (lang: LangType) => {
    if (Object.keys(supportLang).indexOf(lang) > -1) {
      setLang(lang)
    }
  }

  const getMessage = (
    id: string,
    message: any,
    params?: { [key in TextType]: TextType },
    defaultMessage?: any
  ): string => {
    let text: any = message[id]
    if (text) {
      return text
    }

    id.split('.').forEach((key) => {
      text = text ? text[key] : message[key]
    })
    if (!text) {
      text = defaultMessage || id
    }

    // 判断是否包含{.}
    if (!/{[^}]+}/g.test(text)) {
      return text
    }

    // 使用传入的参数[params]替换{.}
    const strs = text.split(/{[^}]+}/g)
    const keys = text.match(/{[^}]+}/g)
    const returns: string[] = []
    let i = 0
    strs.forEach((str: string, index: number) => {
      if (str !== '') {
        returns.push(str)
      }

      if (index === strs.length - 1) {
        return
      }
      const key = keys[i++].replace(/{|}/g, '')

      const element = params?.[key] ?? key
      returns.push(element)
    })
    return returns.join('')
  }

  const t = (id: string, params?: any, defaultMessage?: any) => {
    return getMessage(id, message, params, defaultMessage)
  }

  return (
    <languageContext.Provider
      value={{ lang, supportLang, messages, message, toogleLang, getMessage, t }}>
      <ConfigProvider locale={antMessages[lang]}>{children}</ConfigProvider>
    </languageContext.Provider>
  )
}

const useLanguage = () => {
  const context = React.useContext(languageContext)

  return context
}

export { LanguageProvider, useLanguage }
