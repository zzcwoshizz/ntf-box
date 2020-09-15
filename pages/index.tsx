import CommingSoon from '@containers/CommingSoon'
import { GetStaticProps } from 'next'
import React from 'react'

export const Home: React.FunctionComponent = () => <CommingSoon />

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} }
}

export default Home
