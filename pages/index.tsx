import { Button } from 'antd'
import { GetStaticProps } from 'next'
import React from 'react'

export const Home: React.FunctionComponent = () => (
  <div className="container">
    <Button type="primary">Antd</Button>
  </div>
)

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

export default Home
