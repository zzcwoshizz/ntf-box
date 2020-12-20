import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { utils } from 'ethers';
import React from 'react';
import { useAsync } from 'react-use';

import { getApi, getUser, putUser } from '@/api';
import { IResponse, IUser, IUserPayload } from '@/api/types';

import { DEFAULT_CHAIN_ID, RPC_URLS, SIGN_TEXT, WETH_ADDRESS } from '../constants';
import { event } from '../Events';
import { useActiveWeb3React, useEagerConnect } from '../hooks';
import useCache from '../hooks/useCache';
import useERC20 from '../hooks/useERC20';
import useServerError from '../hooks/useServerError';

const appContext = React.createContext<{
  balance: string;
  wethBalance: string;
  provider: JsonRpcProvider;
  user?: IUser;
  logged: boolean;
  token: string;
  setToken(_token: string): void;
  setUser(user?: IUser): void;
  login(): Promise<void>;
  toogleUserInfo(payload: IUserPayload): Promise<void>;
}>({} as any);

const AppProvider: React.FunctionComponent = ({ children }) => {
  const { account, library, chainId = DEFAULT_CHAIN_ID } = useActiveWeb3React();

  const { showError } = useServerError();

  const [token, setToken] = useCache<string>('token', '');
  const provider: Web3Provider | JsonRpcProvider = React.useMemo(() => {
    return library || new JsonRpcProvider({ url: RPC_URLS[chainId] });
  }, [library, chainId]);
  const { balanceOf } = useERC20(WETH_ADDRESS[chainId]);

  const { value: wethBalance = '0' } = useAsync(async () => {
    if (!account) {
      return '0';
    }

    return (await balanceOf(account)).toString();
  }, [account, balanceOf]);

  const { value: balance = '0' } = useAsync(async () => {
    if (!account || !library) {
      return '0';
    }

    return (await library.getBalance(account))?.toString();
  }, [account, library]);

  const [user, setUser] = React.useState<IUser>();

  React.useEffect(() => {
    const cb = () => {
      setUser(undefined);
      setToken('');
    };

    event.on('logout', cb);

    return () => {
      event.off('logout', cb);
    };
  }, [setToken]);

  const getUserInfo = React.useCallback(() => {
    if (account) {
      setTimeout(() => {
        getUser({ address: account, token }).then(({ data }) => {
          if (data.address === account) {
            setUser(data);
          }
        });
      }, 0);
    }
  }, [account, token]);

  const toogleUserInfo = React.useCallback(
    async (payload: IUserPayload) => {
      if (account) {
        await putUser({
          email: user?.email,
          newAlert: user?.newAlert,
          tradeAlert: user?.tradeAlert,
          userName: user?.nickName,
          ...payload
        });
        getUserInfo();
      }
    },
    [account, getUserInfo, user?.email, user?.newAlert, user?.nickName, user?.tradeAlert]
  );

  const login = React.useCallback(async () => {
    if (!library || !account) {
      return Promise.resolve();
    }

    const signature = await library.send('personal_sign', [
      utils.hexlify(utils.toUtf8Bytes(SIGN_TEXT)),
      account
    ]);

    await getApi()
      .post<IResponse<string>>('/login', {
        headers: {
          address: account,
          signature
        }
      })
      .then((data) => {
        setToken(data.data);

        return data;
      })
      .catch((e) => {
        showError(e);
      });
  }, [account, library, setToken, showError]);

  React.useEffect(() => {
    getUserInfo();
  }, [account, getUserInfo]);
  React.useEffect(() => {
    if (account !== user?.address) {
      setUser(undefined);
    }
  }, [account, user]);

  useEagerConnect();

  return (
    <appContext.Provider
      value={{
        balance,
        wethBalance,
        provider,
        user,
        setUser,
        login,
        logged: user?.address === account,
        toogleUserInfo,
        token,
        setToken
      }}
    >
      {children}
    </appContext.Provider>
  );
};

const useApp = () => {
  const context = React.useContext(appContext);

  return context;
};

export { AppProvider, useApp };
