import { Button, Input, Modal, Switch } from 'antd'
import React from 'react'

import FhSvg from '@/icons/icon_fh.svg'
import useContainer from '@/shared/hooks/useContainer'
import useTheme from '@/shared/hooks/useTheme'
import { useApp } from '@/shared/providers/AppProvider'

const Setting: React.FunctionComponent = () => {
  const { containerWidth } = useContainer()
  const theme = useTheme()
  const { user, toogleUserInfo } = useApp()
  const [email, setEmail] = React.useState('')
  const [emailVisible, setEmailVisible] = React.useState(false)
  const [name, setName] = React.useState('')
  const [nameVisible, setNameVisible] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  return (
    <>
      <Modal
        visible={emailVisible}
        title="Set Email"
        confirmLoading={loading}
        onOk={() => {
          toogleUserInfo({
            email
          }).finally(() => {
            setLoading(false)
            setEmailVisible(false)
          })
        }}
        onCancel={() => {
          setEmailVisible(false)
        }}>
        <Input
          type="email"
          placeholder="Please input your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
      </Modal>
      <Modal
        visible={nameVisible}
        title="Set Nickname"
        confirmLoading={loading}
        onOk={() => {
          toogleUserInfo({
            userName: name
          }).finally(() => {
            setLoading(false)
            setNameVisible(false)
          })
        }}
        onCancel={() => {
          setNameVisible(false)
        }}>
        <Input
          type="text"
          placeholder="Please input your nickname"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
      </Modal>
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
          <span>{user?.email}</span>
          <span style={{ textAlign: 'right' }}>
            <Button type="link" size="small" onClick={() => setEmailVisible(true)}>
              Set up
            </Button>
          </span>
        </div>
        <div className="item">
          <span>User Name</span>
          <span style={{ color: theme['@text-color-tertiary'] }}>
            Convenient for transaction inquiry
          </span>
          <span>{user?.nickName}</span>
          <span style={{ textAlign: 'right' }}>
            <Button type="link" size="small" onClick={() => setNameVisible(true)}>
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
            <Switch
              style={{ marginLeft: 16 }}
              checked={Boolean(user?.newAlert)}
              onChange={(value) => {
                toogleUserInfo({
                  newAlert: Number(value)
                })
              }}
            />
          </span>
        </div>
        <div className="item">
          <span>
            Security information
            <Switch
              style={{ marginLeft: 16 }}
              checked={Boolean(user?.tradeAlert)}
              onChange={(value) => {
                toogleUserInfo({
                  tradeAlert: Number(value)
                })
              }}
            />
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
