import Web3 from 'web3'

export const getWeb3 = (ethereum: any) => {
  if (!ethereum) {
    throw new Error('invalid')
  }

  return new Web3(ethereum)
}
