import App, { AppContext, AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { UseWalletProvider } from 'use-wallet'

import { ViewportProvider } from '@/shared/providers/Viewport'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UseWalletProvider
      chainId={1}
      connectors={{
        walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network' }
        // walletconnect: { rpcUrl: 'https://rinkeby.eth.aragon.network/' }
      }}>
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
        <Component {...pageProps} />
      </ViewportProvider>
    </UseWalletProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  return { ...appProps }
}

export default MyApp
