import React from 'react'

import useTheme from '@/shared/hooks/useTheme'

interface Props {
  value: any
  options: { value: any; title: React.ReactNode }[]
}

const Select: React.FunctionComponent<Props> = ({ value, options }) => {
  const theme = useTheme()

  return (
    <>
      <div className="select-wrapper">
        {options.map(({ value: _value, title }) => (
          <div key={_value} className={'select' + (_value === value ? ' selected' : '')}>
            {title}
          </div>
        ))}
      </div>
      <style jsx>{`
        .select-wrapper {
          display: flex;
          justify-content: space-between;
          align-sales: center;
        }
        .select {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 48%;
          height: 62px;

          font-size: 16px;
          font-weight: 500;
          color: ${theme['@text-color-tertiary']};

          background: ${theme['@body-background']};
          border-radius: 4px;

          cursor: pointer;
        }
        .selected {
          border: 2px solid #99bbff;
          color: ${theme['@primary-color']};
          background-color: #f0f5ff;
        }
      `}</style>
    </>
  )
}

export default Select
