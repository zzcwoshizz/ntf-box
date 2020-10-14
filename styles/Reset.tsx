import React from 'react'

const ResetCss: React.FunctionComponent = () => {
  return (
    <>
      <style jsx global>{`
        .ant-space-item {
          display: flex;
          align-items: center;
        }

        .ant-collapse {
          border: none;
          background-color: transparent;
        }
      `}</style>
    </>
  )
}

export default ResetCss
