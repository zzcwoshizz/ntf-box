import CommingSoon from '@containers/CommingSoon'
import { GetStaticProps } from 'next'
import React from 'react'

import { getBanner } from '@/api'
import { IBanner } from '@/api/types'
export const Home: React.FunctionComponent<{
  banner: IBanner[]
}> = (props) => <CommingSoon banner={props.banner} />

export const getStaticProps: GetStaticProps = async () => {
  const res = await getBanner()
  return { props: { banner: res.data } }
}

export default Home
