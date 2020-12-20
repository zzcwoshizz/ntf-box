import { useRouter } from 'next/dist/client/router';
import React from 'react';

import en_US from '@/locales/en-US';
import zh_CN from '@/locales/zh-CN';

type TextType = string | number;

const languageContext = React.createContext<{
  lang: string;
  supportLang: { [key: string]: any };
  messages: any;
  message: any;
  toogleLang(lang: string): void;
  getMessage<T>(
    id: string,
    message: any,
    params: { [key in TextType]: T },
    defaultMessage: any
  ): (T | TextType)[];
  t(id: string, params?: { [key in TextType]?: TextType }, defaultMessage?: any): string;
  tc(
    id: string,
    params?: { [key in TextType]?: React.ReactNode },
    defaultMessage?: any
  ): React.ReactNode[];
}>({} as any);

const LanguageProvider: React.FunctionComponent = ({ children }) => {
  const router = useRouter();

  // const [lang, setLang] = React.useState<LangType>();
  const lang = router.locale ?? 'en';
  const supportLang = {
    zh: {
      name: '中文',
      icon: require('@/icons/icon_cn.png')
    },
    en: {
      name: 'English',
      icon: require('@/icons/icon_en.png')
    }
  };
  const messages: any = React.useMemo(
    () => ({
      zh: zh_CN,
      en: en_US
    }),
    []
  );

  const message: any = React.useMemo(() => {
    return messages[lang];
  }, [messages, lang]);

  const toogleLang = (lang: string) => {
    if (Object.keys(supportLang).indexOf(lang) > -1) {
      // setLang(lang);
      router.replace(router.pathname, undefined, { locale: lang });
    }
  };

  function getMessage<T>(
    id: string,
    message: any,
    params?: { [key in TextType]: T },
    defaultMessage?: any
  ): (T | TextType)[] {
    let text: any = message[id] as string;

    if (text) {
      return [text];
    }

    id.split('.').forEach((key) => {
      text = text ? text[key] : message[key];
    });

    if (!text) {
      text = defaultMessage || id;
    }

    // 判断是否包含{.}
    if (!/{[^}]+}/g.test(text)) {
      return [text];
    }

    // 使用传入的参数[params]替换{...}
    const strs = text.split(/{[^}]+}/g);
    const keys = text.match(/{[^}]+}/g);
    const returns: (T | TextType)[] = [];
    let i = 0;

    strs.forEach((str: string, index: number) => {
      if (str !== '') {
        returns.push(str);
      }

      if (index === strs.length - 1) {
        return;
      }

      const key = keys[i++].replace(/{|}/g, '');

      const element: T | string = params?.[key] ?? key;

      if (React.isValidElement(element)) {
        returns.push((React.cloneElement(element, { key: index }) as unknown) as T);
      } else {
        returns.push(element);
      }
    });

    return returns;
  }

  const t = (id: string, params?: { [key in TextType]: TextType }, defaultMessage?: any) => {
    return getMessage<TextType>(id, message, params, defaultMessage)?.join('');
  };

  const tc = (
    id: string,
    params?: { [key in TextType]: React.ReactNode },
    defaultMessage?: any
  ) => {
    return getMessage<React.ReactNode>(id, message, params, defaultMessage);
  };

  return (
    <languageContext.Provider
      value={{ lang, supportLang, messages, message, toogleLang, getMessage, t, tc }}
    >
      {children}
    </languageContext.Provider>
  );
};

const useLanguage = () => {
  const context = React.useContext(languageContext);

  return context;
};

export { LanguageProvider, useLanguage };
