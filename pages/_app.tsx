import 'react-perfect-scrollbar/dist/css/styles.css'

import { Web3ReactProvider } from '@web3-react/core'
import cookies from 'next-cookies'
import App, { AppContext, AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'

import Footer from '@/components/Footer'
import { ApiProvider } from '@/shared/providers/ApiProvider'
import { AppProvider } from '@/shared/providers/AppProvider'
import { ChainProvider } from '@/shared/providers/ChainProvier'
import { ConstantsProvider } from '@/shared/providers/ConstantsProvider'
import { LangType, LanguageProvider } from '@/shared/providers/LanguageProvider'
import { TransactionProvider } from '@/shared/providers/TransactionProvider'
import { ViewportProvider } from '@/shared/providers/ViewportProvider'
import ResetCss from '@/styles/Reset'
import getLibrary from '@/utils/getLibrary'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <LanguageProvider defaultLang={pageProps.defaultLang}>
        <ConstantsProvider>
          <Web3ReactProvider getLibrary={getLibrary}>
            <ApiProvider>
              <AppProvider>
                <ChainProvider>
                  <TransactionProvider>
                    <ViewportProvider>
                      <Head>
                        <title>Finannel</title>
                        <link rel="icon" href="/favicon.svg" />
                        <meta
                          name="viewport"
                          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
                        />
                        <meta httpEquiv="pragma" content="no-cache" />
                        <meta httpEquiv="Cache-Control" content="no-cache, must-revalidate" />
                        <meta httpEquiv="expires" content="0" />
                      </Head>
                      <div className="page">
                        <div>
                          <Component {...pageProps} />
                        </div>
                        <Footer />
                      </div>
                      <style jsx>{`
                        .page {
                          display: flex;
                          flex-direction: column;
                          justify-content: space-between;
                          min-height: 100vh;
                        }
                      `}</style>
                    </ViewportProvider>
                  </TransactionProvider>
                </ChainProvider>
              </AppProvider>
            </ApiProvider>
          </Web3ReactProvider>
        </ConstantsProvider>
      </LanguageProvider>
      <ResetCss />
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)
  const acceptLanguages: LangType[] = []

  appContext.ctx.req?.headers['accept-language']?.split(';').forEach((language) => {
    if (language.indexOf('zh') !== -1) {
      acceptLanguages.push('zh-CN')
    } else {
      acceptLanguages.push('en-US')
    }
  })
  const lang = cookies(appContext.ctx).lang

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      defaultLang: lang || acceptLanguages[0]
    }
  }
}

export default MyApp
