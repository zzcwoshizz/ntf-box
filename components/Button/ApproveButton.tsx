import { ButtonProps } from 'antd/lib/button'
import { Contract } from 'ethers'
import React from 'react'

import { IToken } from '@/api/types'
import { APPROVE_ADDRESS, ERC721_ABI } from '@/shared/constants'
import { useActiveWeb3React } from '@/shared/hooks'
import useServerError from '@/shared/hooks/useServerError'
import { useTransaction } from '@/shared/providers/TransactionProvider'

import EnableButton from './EnableButton'

const ApproveButton: React.FunctionComponent<
  ButtonProps & {
    tokens: IToken[]
  }
> = ({ tokens, ...props }) => {
  const { library, account, chainId } = useActiveWeb3React()
  const { showError } = useServerError()
  const { addApproveTransaction } = useTransaction()

  const [notApprovedToken, setNotApprovedToken] = React.useState<IToken[]>([])

  const [approving, setApproving] = React.useState(false)

  React.useEffect(() => {
    if (!account || !chainId) {
      return
    }

    Promise.all(
      tokens.map((token) => {
        const contract = new Contract(token.contractAdd, ERC721_ABI, library?.getSigner())

        return (contract.functions.isApprovedForAll(
          account,
          APPROVE_ADDRESS[chainId]
        ) as unknown) as [boolean]
      })
    ).then((data) => {
      const _notApprovedToken: IToken[] = []
      data.forEach(([approved], index) => {
        if (!approved) {
          _notApprovedToken.push(tokens[index])
        }
      })
      setNotApprovedToken(_notApprovedToken)
    })
  }, [tokens, library, account, chainId])

  const allApproved = notApprovedToken.length === 0

  let text: React.ReactNode
  if (!allApproved) {
    text = 'Set Approve For All'
  } else {
    text = props.children
  }

  const approve = React.useCallback(
    async (tokens: IToken[]) => {
      if (!library || !chainId) {
        return
      }

      try {
        const hashes = await Promise.all(
          tokens.map((token) => {
            const contract = new Contract(token.contractAdd, ERC721_ABI, library?.getSigner())

            return (contract.functions.setApprovalForAll(
              APPROVE_ADDRESS[chainId],
              true
            ) as unknown) as Promise<{
              hash: string
            }>
          })
        )

        const results = await Promise.all(
          hashes.map(({ hash }, index) => {
            addApproveTransaction({
              transactionHash: hash,
              contract: tokens[index].contractAdd,
              to: APPROVE_ADDRESS[chainId],
              type: 'approve',
              status: 'pending'
            })

            return library.waitForTransaction(hash)
          })
        )

        const _notApprovedToken: IToken[] = []
        results.forEach((result, index) => {
          if (result.status !== 1) {
            _notApprovedToken.push(tokens[index])
          }
        })

        setNotApprovedToken(_notApprovedToken)
      } catch (e) {
        showError(e)
      }
    },
    [library, chainId, addApproveTransaction]
  )

  const onClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (allApproved) {
        return props.onClick?.(e)
      } else {
        e.preventDefault()
        setApproving(true)
        approve(notApprovedToken).finally(() => {
          setApproving(false)
        })
      }
    },
    [allApproved, notApprovedToken, library, account, approve]
  )

  return (
    <EnableButton {...props} loading={allApproved ? props.loading : approving} onClick={onClick}>
      {text}
    </EnableButton>
  )
}

export default ApproveButton
