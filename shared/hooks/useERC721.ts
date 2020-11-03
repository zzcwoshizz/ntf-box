import { Contract } from 'ethers'
import React from 'react'

import { ERC721_ABI } from '../constants'
import { useTransaction } from '../providers/TransactionProvider'
import { useActiveWeb3React } from '.'

const useERC721 = () => {
  const { account, library } = useActiveWeb3React()
  const { addApproveTransaction, addTransferTransaction, toogleVisible } = useTransaction()

  return React.useMemo(
    () => ({
      getMethods: (contractAddress: string) => {
        const erc721 = new Contract(contractAddress, ERC721_ABI, library?.getSigner())

        const isApprovedForAll = async (address: string): Promise<boolean> => {
          if (!account) {
            return false
          }

          return (await erc721.functions.isApprovedForAll(account, address))[0]
        }

        const setApprovalForAll = async (address: string, approved = true): Promise<any> => {
          if (!account) {
            return
          }

          const { hash } = await erc721.functions.setApprovalForAll(address, approved)
          addApproveTransaction({
            transactionHash: hash,
            to: address,
            contract: contractAddress,
            status: 'pending',
            type: 'approve'
          })
          toogleVisible(hash)
        }

        const safeTransferFrom = async (to: string, tokenId: string): Promise<any> => {
          if (!account) {
            return
          }

          const { hash } = await erc721.functions.safeTransferFrom(account, to, tokenId)
          addTransferTransaction({
            transactionHash: hash,
            from: account,
            to,
            status: 'pending',
            type: 'transfer'
          })
          addTransferTransaction(hash)
          toogleVisible(hash)
        }

        return { isApprovedForAll, setApprovalForAll, safeTransferFrom }
      }
    }),
    [account, library]
  )
}

export default useERC721
