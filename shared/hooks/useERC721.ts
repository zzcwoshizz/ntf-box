import { Contract } from 'ethers'
import React from 'react'

import { ERC721_ABI } from '../constants'
import { useActiveWeb3React } from '.'

const useERC721 = () => {
  const { account, library } = useActiveWeb3React()

  return React.useMemo(
    () => ({
      getMethods: (contractAddress: string) => {
        const erc721 = new Contract(contractAddress, ERC721_ABI, library)

        const isApprovedForAll = async (address: string): Promise<boolean> => {
          if (!account) {
            return false
          }

          return erc721.isApprovedForAll(account, address).call()
        }

        const setApprovalForAll = async (address: string, approved = true): Promise<any> => {
          if (!account) {
            return
          }

          return erc721.setApprovalForAll(address, approved).send({
            from: account
          })
        }

        const safeTransferFrom = async (to: string, tokenId: string): Promise<any> => {
          if (!account) {
            return
          }

          return erc721.safeTransferFrom(account, to, tokenId).send({
            from: account
          })
        }

        return { isApprovedForAll, setApprovalForAll, safeTransferFrom }
      }
    }),
    [account, library]
  )
}

export default useERC721
