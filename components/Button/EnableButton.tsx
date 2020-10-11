import Button, { ButtonProps } from 'antd/lib/button'
import React from 'react'
import { useWallet } from 'use-wallet'

import { useApp } from '@/shared/providers/AppProvider'

const EnableButton: React.FunctionComponent<ButtonProps> = ({ ...props }) => {
  const { account } = useApp()
  const wallet = useWallet()
  const [loading, setLoading] = React.useState(false)

  return (
    <Button
      {...props}
      loading={account ? props.loading : loading}
      onClick={(e) => {
        if (account) {
          props.onClick?.(e)
        } else {
          setLoading(true)
          wallet.connect('injected').then(() => {
            setLoading(false)
          })
        }
      }}>
      {account ? props.children : loading ? 'Connecting' : 'Connect wallet'}
    </Button>
  )
}

export default EnableButton
