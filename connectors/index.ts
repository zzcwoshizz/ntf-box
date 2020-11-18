import { AuthereumConnector } from '@web3-react/authereum-connector';
import { FortmaticConnector } from '@web3-react/fortmatic-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { PortisConnector } from '@web3-react/portis-connector';
import { SquarelinkConnector } from '@web3-react/squarelink-connector';
import { TorusConnector } from '@web3-react/torus-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

import { RPC_URLS } from '@/shared/constants';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 4]
});

export const fortmatic = new FortmaticConnector({
  apiKey: 'pk_live_531C22B14DF9987A',
  chainId: 1
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    1: RPC_URLS[1]
  }
});

export const walletlink = new WalletLinkConnector({
  url: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://finannel.com',
  appName: 'Finannel'
});

export const torus = new TorusConnector({ chainId: 1 });

export const authereum = new AuthereumConnector({ chainId: 1 });

export const portis = new PortisConnector({
  dAppId: '6155f5cd-4109-4e27-81dc-8522ba5f6520',
  networks: [1, 4]
});

export const squarelink = new SquarelinkConnector({
  clientId: '3e8b1f0ed5610fad8c76',
  networks: [1, 4]
});
