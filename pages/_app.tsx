import 'react-perfect-scrollbar/dist/css/styles.css'

import App, { AppContext, AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { UseWalletProvider } from 'use-wallet'

import Footer from '@/components/Footer'
import { RPC_URLS } from '@/shared/constants'
import { AppProvider } from '@/shared/providers/AppProvider'
import { ConstantsProvider } from '@/shared/providers/ConstantsProvider'
import { LangType, LanguageProvider } from '@/shared/providers/LanguageProvider'
import { ViewportProvider } from '@/shared/providers/ViewportProvider'
import ResetCss from '@/styles/Reset'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <LanguageProvider defaultLang={pageProps.acceptLanguages[0]}>
        <ConstantsProvider>
          <UseWalletProvider
            chainId={1}
            connectors={{
              walletconnect: {
                rpcUrl: RPC_URLS['1']
              }
            }}>
            <AppProvider>
              <ViewportProvider>
                <Head>
                  <title>NTF BOX</title>
                  <link rel="icon" href="/favicon.ico" />
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
            </AppProvider>
          </UseWalletProvider>
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

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      acceptLanguages
    }
  }
}

export default MyApp
