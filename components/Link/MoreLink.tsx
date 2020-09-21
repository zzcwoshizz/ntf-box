import Link, { LinkProps } from 'next/link'
import React from 'react'

import MoreSvg from '@/icons/icon_more.svg'
import useTheme from '@/shared/hooks/useTheme'

const MoreLink: React.FunctionComponent<LinkProps> = (props) => {
  const theme = useTheme()

  return (
    <>
      <Link {...props}>
        <a>
          <MoreSvg /> More
        </a>
      </Link>
      <style jsx>{`
        a {
          display: inline-flex;
          align-items: center;

          color: ${theme['@text-color-secondary']};
        }
        a > :global(svg) {
          margin-right: 4px;
        }
      `}</style>
    </>
  )
}

export default MoreLink
