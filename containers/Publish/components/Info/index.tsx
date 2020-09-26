import React from 'react'

import Items from './Items'
import Sales from './Sales'
import Setting from './Setting'

const Info: React.FunctionComponent = () => {
  return (
    <div>
      <Items />
      <Sales />
      <Setting />
    </div>
  )
}

export default Info
