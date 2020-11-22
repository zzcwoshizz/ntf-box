import { Web3ReactProvider } from '@web3-react/core';
import cookies from 'next-cookies';
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import Footer from '@/components/Footer';
import { AppProvider } from '@/shared/providers/AppProvider';
import { ChainProvider } from '@/shared/providers/ChainProvier';
import { ConstantsProvider } from '@/shared/providers/ConstantsProvider';
import { LangType, LanguageProvider } from '@/shared/providers/LanguageProvider';
import { TransactionProvider } from '@/shared/providers/TransactionProvider';
import { ViewportProvider } from '@/shared/providers/ViewportProvider';
import ResetCss from '@/styles/Reset';
import getLibrary from '@/utils/getLibrary';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <LanguageProvider defaultLang={pageProps.defaultLang}>
        <ConstantsProvider>
          <Web3ReactProvider getLibrary={getLibrary}>
            <AppProvider>
              <ChainProvider>
                <TransactionProvider>
                  <ViewportProvider>
                    <Head>
                      <title>Finannel.com ｜ 在这里你可以购买以太坊、波卡链上的加密收藏品</title>
                      <meta
                        content="一个稀有数字物品和加密收藏品的点对点市场.购买,出售,拍卖,和发现Dego,CryptoKitties,加密猫,Sandbox,Axie infinity, Decentraland,区块链游戏物品等等。超过15000件收藏品正在出售"
                        name="description"
                      />
                      <meta
                        content="nft交易所，nft交易平台，Non-Fungible Token，非同质化代币，nft是什么，nft概念币有哪些，nft币怎么挖，nft收藏品，nft画，nft域名，nft市场，nft代币有哪些，nft交易所，加密猫，mana，sandbox，dego，Axie infinity，Decentraland，sandbox游戏。"
                        name="keywords"
                      />
                      <link href="/favicon.svg" rel="icon" />
                      <meta
                        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
                        name="viewport"
                      />
                      <meta content="no-cache" httpEquiv="pragma" />
                      <meta content="no-cache, must-revalidate" httpEquiv="Cache-Control" />
                      <meta content="0" httpEquiv="expires" />
                      <script
                        src="https://js.users.51.la/20991843.js"
                        type="text/javascript"
                      ></script>
                    </Head>
                    <div className="page">
                      <Component {...pageProps} />
                    </div>
                    <Footer />
                    <style jsx>{`
                      .page {
                        min-height: 100vh;
                      }
                    `}</style>
                  </ViewportProvider>
                </TransactionProvider>
              </ChainProvider>
            </AppProvider>
          </Web3ReactProvider>
        </ConstantsProvider>
      </LanguageProvider>
      <ResetCss />
    </>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const acceptLanguages: LangType[] = [];

  appContext.ctx.req?.headers['accept-language']?.split(';').forEach((language) => {
    if (language.indexOf('zh') !== -1) {
      acceptLanguages.push('zh-CN');
    } else {
      acceptLanguages.push('en-US');
    }
  });
  const lang = cookies(appContext.ctx).lang;

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      defaultLang: lang || acceptLanguages[0]
    }
  };
};

export default MyApp;
