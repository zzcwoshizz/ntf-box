import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import React from 'react'

const AsyncButton: React.FunctionComponent<ButtonProps> = ({ ...props }) => {
  const [loading, setLoading] = React.useState(false)

  const onClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const returns = props.onClick?.(e)

    setLoading(true)
    Promise.resolve(returns).finally(() => {
      setLoading(false)
    })
  }

  return <Button {...props} loading={loading} onClick={onClick} />
}

export default AsyncButton
