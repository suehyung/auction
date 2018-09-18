import React from 'react'

function FormatPrice (price) {
  let num = price[price.length - 1]
  return parseFloat(num).toFixed(2)
}

function ShowPrice (props) {
  return (
    props.price
      ? <div>&#36;{FormatPrice(props.price)}</div>
      : <div></div>
  )
}

export default ShowPrice

// add interval like Countdown to update prices
