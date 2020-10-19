import { Card } from 'antd'
import Link from 'next/link'
import React from 'react'

import Img from '@/components/Img'
import Features from '@/components/Token/Features'

import { useData } from '../context'

const { Meta } = Card

const BundleList: React.FunctionComponent = () => {
  const { tokens } = useData()

  return (
    <>
      <div>
        {tokens?.map((token, index) => (
          <Card key={index} style={{ width: '100%' }} cover={<Img src={token.images?.[0]} />}>
            <Meta
              title={
                <Link href={`/asset/${token.contractAdd}/${token.tokenId}`}>
                  <a>{token.name}</a>
                </Link>
              }
              description={
                <>
                  <p>{token.des}</p>
                  <Features token={token} size={2} />
                </>
              }
            />
          </Card>
        ))}
      </div>
    </>
  )
}

export default BundleList
