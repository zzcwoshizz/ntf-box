import { useRouter } from 'next/router';
import React from 'react';

import { getHotGoods, getLatestGoods } from '@/api';
import { IAsset } from '@/api/types';
import { AssetCell, AssetContainer } from '@/components/Asset';
import Container from '@/components/Layout/Container';
import MoreLink from '@/components/Link/MoreLink';
import HotSvg from '@/icons/icon_hot.svg';
import NewSvg from '@/icons/icon_new.svg';
import { useLanguage } from '@/shared/providers/LanguageProvider';

import AssetList from './components/AssetList';
import Help from './components/Help';
import Hero from './components/Hero';
import Intro from './components/Intro';

const Home: React.FunctionComponent = () => {
  const router = useRouter();
  const [hot, setHot] = React.useState<IAsset[]>([]);
  const [latest, setLatest] = React.useState<IAsset[]>([]);
  const { t } = useLanguage();

  React.useEffect(() => {
    getHotGoods().then((res) => {
      setHot(res.data);
    });
    getLatestGoods().then((res) => {
      setLatest(res.data);
    });
  }, []);

  const jumpUrl = (asset: IAsset) => {
    if (asset.tokens.length > 1) {
      router.push(`/bundle/${asset.orderId}`);
    } else {
      router.push(`/asset/${asset.tokens[0].contractAdd}/${asset.tokens[0].tokenId}`);
    }
  };

  return (
    <div>
      <Hero />
      <div className="list">
        <AssetList
          extra={<MoreLink href="/market" />}
          title={
            <>
              <HotSvg style={{ marginRight: 4 }} /> {t('home.hot')}
            </>
          }
        >
          <AssetContainer>
            {hot.map((asset, index) => (
              <AssetCell
                asset={asset}
                key={index}
                onClick={() => {
                  jumpUrl(asset);
                }}
              />
            ))}
          </AssetContainer>
        </AssetList>
        <AssetList
          extra={<MoreLink href="/market" />}
          title={
            <>
              <NewSvg style={{ marginRight: 4 }} /> {t('home.newest')}
            </>
          }
        >
          <AssetContainer>
            {latest.map((asset, index) => (
              <AssetCell
                asset={asset}
                key={index}
                onClick={() => {
                  jumpUrl(asset);
                }}
              />
            ))}
          </AssetContainer>
        </AssetList>
      </div>
      <Intro />
      <Help />
      <style jsx>{`
        .list {
          padding: 100px 0;
          background-color: #fff;
        }
      `}</style>
    </div>
  );
};

export default Home;
