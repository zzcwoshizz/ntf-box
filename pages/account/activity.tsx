import React from 'react'

import ActivityContainer from '@/containers/Account/Activity'
import AccountTop from '@/containers/Account/Top'

const Activity: React.FunctionComponent = () => {
  return (
    <>
      <AccountTop />
      <ActivityContainer />
    </>
  )
}

export default Activity
