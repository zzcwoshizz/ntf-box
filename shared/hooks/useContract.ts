import { Contract } from 'ethers'
import React from 'react'

import { useActiveWeb3React } from '.'

const useContract = (address: string, abi: any[]) => {
  const { library } = useActiveWeb3React()

  const contract = React.useMemo(() => new Contract(address, abi, library?.getSigner()), [
    address,
    abi,
    library
  ])

  return contract
}

export default useContract
