import Button, { ButtonProps } from 'antd/lib/button'
import React from 'react'
import { useWallet } from 'use-wallet'

import { useApp } from '@/shared/providers/AppProvider'

const EnableButton: React.FunctionComponent<ButtonProps> = ({ ...props }) => {
  const { account, user, login } = useApp()
  const wallet = useWallet()
  const [loading, setLoading] = React.useState(false)

  let text: React.ReactNode
  if (account && user) {
    text = props.children
  } else if (!account) {
    text = loading ? 'Connecting' : 'Connect wallet'
  } else if (!user) {
    text = loading ? 'Logging in' : 'Log in'
  }

  let onClick
  if (account && user) {
    onClick = props.onClick
  } else if (!account) {
    onClick = () => {
      setLoading(true)
      wallet.connect('injected').finally(() => {
        setLoading(false)
      })
    }
  } else if (!user) {
    onClick = () => {
      setLoading(true)
      login().finally(() => {
        setLoading(false)
      })
    }
  }

  return (
    <Button {...props} loading={account && user ? props.loading : loading} onClick={onClick}>
      {text}
    </Button>
  )
}

export default EnableButton
