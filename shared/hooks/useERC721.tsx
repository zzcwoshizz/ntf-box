import React from 'react'

import { ERC721_ABI } from '../constants'
import { useApp } from '../providers/AppProvider'

const useERC721 = (erc721Address: string) => {
  const { web3, account } = useApp()

  const erc721 = React.useMemo(() => {
    const _erc721 = new web3.eth.Contract(ERC721_ABI, erc721Address)

    return _erc721
  }, [web3, erc721Address])

  const isApprovedForAll = async (address: string): Promise<boolean> => {
    if (!account) {
      return false
    }

    return erc721.methods.isApprovedForAll(account, address).call()
  }

  const setApprovalForAll = async (address: string, approved = true): Promise<any> => {
    if (account) {
      return
    }

    return erc721.methods.setApprovalForAll(address, approved).send({
      from: account
    })
  }

  return { isApprovedForAll, setApprovalForAll }
}

export default useERC721
