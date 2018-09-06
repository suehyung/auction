import React from 'react'

function Countdown (props) {
  let givenDate = new Date()
  givenDate.setTime(props.closingtime * 1000)
  let now = new Date()
  let difference = givenDate.getTime() - now.getTime()
  let seconds = Math.floor(difference / 1000)
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)
  let days = Math.floor(hours / 24)

  hours %= 24
  minutes %= 60
  seconds %= 60

  return (
    <div>
      { days > 0 &&
        <span>{days}d </span>
      }
      { hours > 0 &&
        <span>{hours}h </span>
      }
      { minutes >= 1 && 
        <span>{minutes}m</span>
      }
      { difference < 60000 &&
        <span>&lt;1m</span>
      }
    </div>
  )
}

export default Countdown
