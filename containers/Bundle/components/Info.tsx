import { Affix, Descriptions, Space } from 'antd'
import Link from 'next/link'
import React from 'react'

import EnableButton from '@/components/Button/EnableButton'
import Img from '@/components/Img'
import { useApp } from '@/shared/providers/AppProvider'
import { generateAvatar } from '@/utils'
import { shortenAddress } from '@/utils/string'

import { useData } from '../context'

const Info: React.FunctionComponent = () => {
  const { web3 } = useApp()
  const { asset, loading, buy } = useData()

  return (
    <>
      <Affix offsetTop={20}>
        <Descriptions title="Bundles" bordered>
          <Descriptions.Item label="User" span={24}>
            <Link href={`/user/${asset?.operator}`}>
              <a>
                <Space>
                  <Img width={24} src={generateAvatar(asset?.operator)} />
                  {shortenAddress(asset?.operator)}
                </Space>
              </a>
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label="Price" span={24}>
            {web3.utils.fromWei(asset?.dealPrice ?? '0')}
          </Descriptions.Item>
        </Descriptions>
        <EnableButton style={{ marginTop: 20 }} type="primary" loading={loading} onClick={buy}>
          BUY
        </EnableButton>
      </Affix>
    </>
  )
}

export default Info
