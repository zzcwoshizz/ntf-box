import { Card } from 'antd';
import Link from 'next/link';
import React from 'react';

import Img from '@/components/Img';
import Features from '@/components/Token/Features';

import { useData } from '../context';

const { Meta } = Card;

const BundleList: React.FunctionComponent = () => {
  const { tokens } = useData();

  return (
    <>
      <div>
        {tokens?.map((token, index) => (
          <Card
            cover={<Img preview src={token.images?.[0]} />}
            key={index}
            style={{ width: '100%' }}
          >
            <Meta
              description={
                <>
                  <p>{token.des}</p>
                  <Features size={2} token={token} />
                </>
              }
              title={
                <Link href={`/asset/${token.contractAdd}/${token.tokenId}`}>
                  <a>{token.name}</a>
                </Link>
              }
            />
          </Card>
        ))}
      </div>
    </>
  );
};

export default BundleList;
