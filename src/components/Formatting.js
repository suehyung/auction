import React from 'react'

function FormatPrice (price) {
  let num = price
  return parseFloat(num).toFixed(2)
}

function ShowPrice (props) {
  return (
    props.price
      ? <div>&#36;{FormatPrice(props.price)}</div>
      : <div></div>
  )
}

class Countdown extends React.Component {
  constructor (props) {
    super(props)
    this.state = {date: new Date()}
  }

  componentDidMount () {
    this.timerID = setInterval(
      () => this.tick(),
      60000
    )
  }

  componentWillUnmount () {
    clearInterval(this.timerID)
  }

  tick () {
    this.setState({ date: new Date() })
  }

  render () {
    let givenDate = new Date()
    givenDate.setTime(this.props.closingtime * 1000)
    let difference = givenDate.getTime() - this.state.date.getTime()
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
}

export { Countdown, ShowPrice }
