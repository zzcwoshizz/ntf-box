import { ButtonProps } from 'antd/lib/button'
import React from 'react'

import { useApp } from '@/shared/providers/AppProvider'

import EnableButton from './EnableButton'

const LoggedButton: React.FunctionComponent<ButtonProps> = ({ ...props }) => {
  const { user, login } = useApp()
  const [loading, setLoading] = React.useState(false)

  return (
    <EnableButton
      {...props}
      loading={user ? props.loading : loading}
      onClick={(e) => {
        if (user) {
          props.onClick?.(e)
        } else {
          setLoading(true)
          login().then(() => {
            setLoading(false)
          })
        }
      }}>
      {user ? props.children : loading ? 'Logging' : 'Login'}
    </EnableButton>
  )
}

export default LoggedButton
