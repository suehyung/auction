import React from 'react'

function FormatPrice (price) {
  let num = price[price.length - 1]
  return parseFloat(num).toFixed(2)
}

function ShowPrice (props) {
  return (
    props.price[0]
      ? <div>&#36;{FormatPrice(props.price)}</div>
      : <div></div>
  )
}

export default ShowPrice

// add interval to update prices or GraphQL subscription?
