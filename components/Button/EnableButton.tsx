import Button, { ButtonProps } from 'antd/lib/button'
import React from 'react'
import { useWallet } from 'use-wallet'

import { useApp } from '@/shared/providers/AppProvider'
import { useLanguage } from '@/shared/providers/LanguageProvider'

const EnableButton: React.FunctionComponent<ButtonProps> = ({ ...props }) => {
  const { account, user, login } = useApp()
  const wallet = useWallet()
  const [loading, setLoading] = React.useState(false)
  const { t } = useLanguage()

  let text: React.ReactNode
  if (account && user) {
    text = props.children
  } else if (!account) {
    text = loading ? t('common.connecting') : t('common.connectWallet')
  } else if (!user) {
    text = loading ? t('common.logging') : t('common.login')
  }

  let onClick
  if (account && user) {
    onClick = props.onClick
  } else if (!account) {
    onClick = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()
      setLoading(true)
      wallet.connect('injected').finally(() => {
        setLoading(false)
      })
    }
  } else if (!user) {
    onClick = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()
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
