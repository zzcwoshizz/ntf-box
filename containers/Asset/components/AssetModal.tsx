import { Modal } from 'antd';
import React from 'react';

import OrderDesc from '@/components/Order/OrderDesc';

import { useData } from '../context';

interface Props {
  visible: boolean;
  onClose(): void;
}

const AssetModal: React.FunctionComponent<Props> = ({ visible, onClose }) => {
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
    <Modal footer={null} onCancel={onClose} visible={visible}>
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
    </Modal>
  );
};

export default React.memo(AssetModal);
