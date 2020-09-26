import React from 'react'

const ResetCss: React.FunctionComponent = () => {
  return (
    <>
      <style jsx global>{`
        .ant-space-item {
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  )
}

export default ResetCss
