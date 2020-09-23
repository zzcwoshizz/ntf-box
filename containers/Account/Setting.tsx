import { Button, Switch } from 'antd'
import React from 'react'

import FhSvg from '@/icons/icon_fh.svg'
import useContainer from '@/shared/hooks/useContainer'
import useTheme from '@/shared/hooks/useTheme'

const Setting: React.FunctionComponent = () => {
  const { containerWidth } = useContainer()
  const theme = useTheme()

  return (
    <>
      <div className="container">
        <div className="title">
          <FhSvg style={{ marginRight: 8 }} />
          My Account
        </div>
        <div className="item">
          <span>Wallet Account</span>
        </div>
        <div className="item">
          <span>E-mail</span>
          <span style={{ color: theme['@text-color-tertiary'] }}>
            Exception alert, subscribe to the latest news, etc
          </span>
          <span>kartafpo@dirhog.bm</span>
          <span style={{ textAlign: 'right' }}>
            <Button type="link" size="small">
              Set up
            </Button>
          </span>
        </div>
        <div className="item">
          <span>User Name</span>
          <span style={{ color: theme['@text-color-tertiary'] }}>
            Convenient for transaction inquiry
          </span>
          <span>Hunter Pena</span>
          <span style={{ textAlign: 'right' }}>
            <Button type="link" size="small">
              Set up
            </Button>
          </span>
        </div>
      </div>
      <div className="container">
        <div className="title">
          <FhSvg style={{ marginRight: 8 }} />
          Subscribe
        </div>
        <div className="item">
          <span>
            New reminder
            <Switch style={{ marginLeft: 16 }} defaultChecked />
          </span>
        </div>
        <div className="item">
          <span>
            Security information
            <Switch style={{ marginLeft: 16 }} />
          </span>
        </div>
      </div>
      <style jsx>{`
        .container {
          width: ${containerWidth}px;
          margin: 16px auto;
          padding: 24px;

          background: #ffffff;
          border-radius: 4px;
        }
        .title {
          display: flex;
          align-items: center;
          margin-bottom: 16px;

          font-size: 20px;
          font-weight: 500;
          color: ${theme['@text-color']};
          line-height: 20px;
        }

        .item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 0;
          border-bottom: 1px solid ${theme['@border-color-base']};
        }
        .item > span {
          white-space: nowrap;
        }
        .item > span:nth-of-type(1) {
          width: 15%;
        }
        .item > span:nth-of-type(2) {
          width: 45%;
        }
        .item > span:nth-of-type(3) {
          width: 25%;
        }
        .item > span:nth-of-type(4) {
          width: 15%;
        }
      `}</style>
    </>
  )
}

export default Setting
