import { providers } from 'ethers'
;(async () => {
  const provider = new providers.JsonRpcProvider('http://47.240.250.149:30304')
  const signer = provider.getSigner('0x0F1F132c67422EBeaCCe6Db17b28e01FF81f062a')
  signer
    .signMessage('0x9efc7fc64aba18246868c8074096138d4cc6aeabbbbfe5cbed1bb4ac7048df8a')
    .then(console.log)
})()
