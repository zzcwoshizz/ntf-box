import 'react-perfect-scrollbar/dist/css/styles.css'

import App, { AppContext, AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { UseWalletProvider } from 'use-wallet'

import Footer from '@/components/Footer'
import { AuthProvider } from '@/shared/providers/AuthProvider'
import { ManagerProvider } from '@/shared/providers/ManagerProvider'
import { ViewportProvider } from '@/shared/providers/ViewportProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UseWalletProvider
      chainId={process.env.NODE_ENV === 'production' ? 1 : 4}
      connectors={{
        walletconnect: {
          rpcUrl:
            process.env.NODE_ENV === 'production'
              ? 'https://mainnet.eth.aragon.network'
              : 'https://rinkeby.eth.aragon.network/'
        }
      }}>
      <ManagerProvider>
        <AuthProvider>
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
        </AuthProvider>
      </ManagerProvider>
    </UseWalletProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  return { ...appProps }
}

export default MyApp
