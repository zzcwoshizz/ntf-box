import React from 'react'
import { useWallet } from 'use-wallet'

import { getManager, Manager } from '@/Manager'
import { getWeb3 } from '@/utils/eth'

const erc721Address = '0xC9DBa4153ce7D004c733526B4797fc13dfBD1699'

const managerContext = React.createContext<{ manager?: Manager }>({})
const ManagerProvider: React.FunctionComponent = ({ children }) => {
  const managerRef = React.useRef<Manager>()

  const wallet = useWallet()

  // 测试下单
  const test = (manager: Manager) => {
    const web3 = getWeb3(wallet.ethereum)
    manager
      .isApproved(erc721Address, wallet.account + '')
      .then((approved) => {
        if (!approved) {
          return manager.setApprove(erc721Address, wallet.account + '').then(() => {
            return true
          })
        } else {
          return true
        }
      })
      .then(async () => {
        manager.makeOrder(
          [
            {
              approval: true,
              contractAdd: '0xC9DBa4153ce7D004c733526B4797fc13dfBD1699',
              tokenId: 3
            }
          ],
          (await wallet.getBlockNumber()) + '',
          web3.utils.toWei('0.1'),
          0,
          wallet.account + ''
        )
      })
  }

  React.useEffect(() => {
    if (!wallet.ethereum) {
      return
    }
    const web3 = getWeb3(wallet.ethereum)
    const manager = getManager(web3)
    managerRef.current = manager
  }, [wallet])

  return (
    <managerContext.Provider value={{ manager: managerRef.current }}>
      {children}
    </managerContext.Provider>
  )
}

const useManager = () => {
  const { manager } = React.useContext(managerContext)

  return manager
}

export { ManagerProvider, useManager }
