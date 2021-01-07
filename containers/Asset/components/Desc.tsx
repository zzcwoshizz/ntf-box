import { Col, Row } from 'antd';
import React from 'react';

import OrderDesc from '@/components/Order/OrderDesc';

import { useData } from '../context';
import Images from './Images';

const Desc: React.FunctionComponent = () => {
  const {
    asset,
    token,
    isMine,
    holders,
    changePrice,
    cancelOrder,
    maxOfferPrice,
    buy,
    offer,
    auctions
  } = useData();

  return (
    <>
      <div className="container">
        <Row>
          <Col lg={{ span: 8 }} style={{ padding: 20 }} xs={{ span: 24 }}>
            <Images images={token.images} />
          </Col>
          <Col lg={{ span: 16 }} style={{ padding: 20 }} xs={{ span: 24 }}>
            <OrderDesc
              asset={asset}
              buy={buy}
              cancelOrder={cancelOrder}
              changePrice={changePrice}
              holders={holders}
              isMine={isMine}
              maxOfferPrice={maxOfferPrice}
              offer={offer}
              offers={auctions}
              token={token}
            />
          </Col>
        </Row>
      </div>
      <style jsx>{`
        .container {
          padding: 20px;
          background-color: #fff;
        }
      `}</style>
    </>
  );
};

export default Desc;
