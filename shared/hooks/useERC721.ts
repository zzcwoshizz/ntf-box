import React from 'react'

import { ERC721_ABI } from '../constants'
import { useTransaction } from '../providers/TransactionProvider'
import { useActiveWeb3React } from '.'
import useContract from './useContract'

const useERC721 = (contractAddress: string) => {
  const { account } = useActiveWeb3React()
  const { addApproveTransaction, addTransferTransaction, toogleVisible } = useTransaction()
  const contract = useContract(contractAddress, ERC721_ABI)

  const isApprovedForAll = React.useCallback(
    async (address: string): Promise<boolean> => {
      if (!account) {
        return false
      }

      return (await contract.functions.isApprovedForAll(account, address))[0]
    },
    [account, contract]
  )

  const setApprovalForAll = React.useCallback(
    async (address: string, approved = true): Promise<string | undefined> => {
      if (!account) {
        return
      }

      const { hash } = await contract.functions.setApprovalForAll(address, approved)
      addApproveTransaction({
        transactionHash: hash,
        to: address,
        contract: contractAddress,
        status: 'pending',
        type: 'approve'
      })
      toogleVisible(hash)

      return hash
    },
    [account, contract, addApproveTransaction, toogleVisible]
  )

  const safeTransferFrom = React.useCallback(
    async (to: string, tokenId: string): Promise<any> => {
      if (!account) {
        return
      }

      const { hash } = await contract.functions.safeTransferFrom(account, to, tokenId)
      addTransferTransaction({
        transactionHash: hash,
        from: account,
        to,
        status: 'pending',
        type: 'transfer'
      })
      toogleVisible(hash)
    },
    [account, contract, addTransferTransaction, toogleVisible]
  )

  return { isApprovedForAll, setApprovalForAll, safeTransferFrom }
}

export default useERC721
