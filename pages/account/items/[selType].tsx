import React from 'react';

import ItemsContainer from '@/containers/Account/Items';
import AccountTop from '@/containers/Account/Top';

const Items: React.FunctionComponent = () => {
  return (
    <>
      <AccountTop />
      <ItemsContainer />
    </>
  );
};

export default Items;
