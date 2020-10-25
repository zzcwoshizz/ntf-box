import React from 'react'

type Props = {
  left: number
}

const TimeLeft: React.FunctionComponent<Props> = ({ left }) => {
  let leftTime = <></>
  if (left < 0) {
    leftTime = <>Expired</>
  } else if (left < 60 * 1000) {
    leftTime = <>{Math.floor(left / 1000)} s</>
  } else if (left < 60 * 60 * 1000) {
    leftTime = <>{Math.floor(left / 60 / 1000)} min</>
  } else if (left < 24 * 60 * 60 * 1000) {
    leftTime = <>{Math.floor(left / 60 / 60 / 1000)} hour</>
  } else if (left < 30 * 24 * 60 * 60 * 1000) {
    leftTime = <>{Math.floor(left / 60 / 60 / 24 / 1000)} days</>
  } else if (left < 365 * 24 * 60 * 60 * 1000) {
    leftTime = <>{Math.floor(left / 60 / 60 / 24 / 30 / 1000)} mon</>
  } else if (left < 30 * 365 * 24 * 60 * 60 * 1000) {
    leftTime = <>{Math.floor(left / 60 / 60 / 24 / 365 / 1000)} years</>
  } else {
    leftTime = <>Long</>
  }

  return leftTime
}

export default TimeLeft
