import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import React from 'react';
import { isMobile } from 'react-device-detect';

import { injected } from '@/connectors';

export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> {
  const context = useWeb3ReactCore<Web3Provider>();

  return context;
}

export function useEagerConnect() {
  const { activate, active } = useWeb3ReactCore();
  const [tried, setTried] = React.useState(false);

  React.useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        if (isMobile && window.ethereum) {
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          setTried(true);
        }
      }
    });
  }, [activate]);

  React.useEffect(() => {
    if (active) {
      setTried(true);
    }
  }, [active]);

  return tried;
}
