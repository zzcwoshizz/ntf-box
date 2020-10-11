import React from 'react'

import { ERC721_ABI } from '../constants'
import { useApp } from '../providers/AppProvider'

const useERC721 = () => {
  const { web3, account } = useApp()

  return React.useMemo(
    () => ({
      getMethods: (contractAddress: string) => {
        const erc721 = new web3.eth.Contract(ERC721_ABI, contractAddress)

        const isApprovedForAll = async (address: string): Promise<boolean> => {
          if (!account) {
            return false
          }

          return erc721.methods.isApprovedForAll(account, address).call()
        }

        const setApprovalForAll = async (address: string, approved = true): Promise<any> => {
          if (!account) {
            return
          }

          return erc721.methods.setApprovalForAll(address, approved).send({
            from: account
          })
        }

        return { isApprovedForAll, setApprovalForAll }
      }
    }),
    [account, web3]
  )
}

export default useERC721
