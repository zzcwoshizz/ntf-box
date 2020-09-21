import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'

import { getOrder } from '@/api'
import { getERC721 } from '@/utils/eth'

import { MANAGER_ABI, MANAGER_ADDRESS } from './data'

let manager: Manager

export class Manager {
  public web3: Web3
  public contract: Contract
  public address: string = MANAGER_ADDRESS // 平台合约地址

  constructor(web3: Web3) {
    this.web3 = web3
    this.contract = new web3.eth.Contract(MANAGER_ABI, this.address)
  }

  async isApproved(erc721Address: string, address: string) {
    const erc721Contract = getERC721(erc721Address)

    return erc721Contract.methods.isApprovedForAll(address, this.address).call()
  }

  async setApprove(erc721Address: string, address: string, approved = true) {
    const erc721Contract = getERC721(erc721Address)

    return erc721Contract.methods.setApprovalForAll(this.address, approved).send({
      from: address
    })
  }

  async makeOrder(
    entrustInfos: { approval: boolean; contractAdd: string; tokenId: number }[],
    expirationHeight: string,
    price: string,
    type: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    address: string
  ) {
    const { data } = await getOrder(entrustInfos, expirationHeight, price, type)

    const signature = await this.web3.eth.personal.sign(data.orderHash, address, '')
    const r = signature.slice(0, 66)
    const s = '0x' + signature.slice(66, 130)
    const v = '0x' + signature.slice(130, 132)

    return this.contract.methods
      .createOrder(
        data.orderId,
        data.entrustInfos.map((d: { contractAdd: any }) => d.contractAdd),
        ['0x0000000000000000000000000000000000000000', data.operator],
        data.salt,
        [data.price + '', data.price + ''],
        data.entrustInfos.map((d: { tokenId: any }) => d.tokenId),
        [data.platformFee + '', '0', '0'],
        data.orderType,
        v,
        r,
        s
      )
      .send({ from: address })
  }
}

export const getManager = (web3: Web3) => {
  if (!manager) {
    manager = new Manager(web3)
  }
  return manager
}
