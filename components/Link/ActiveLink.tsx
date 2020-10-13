import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React, { Children } from 'react'

type Props = LinkProps & {
  activeClassName?: string
}

const ActiveLink: React.FunctionComponent<Props> = ({
  children,
  activeClassName = 'active',
  ...props
}) => {
  const { pathname } = useRouter()
  const child: any = Children.only(children)
  const childClassName = child.props.className || ''

  const className =
    pathname === props.href || pathname === props.as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName

  return (
    <>
      <Link {...props}>
        {React.cloneElement(child, {
          className: className || null
        })}
      </Link>
    </>
  )
}

export default ActiveLink
