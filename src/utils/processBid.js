
function processBid (priceHistory, bid, bidder) {
  let bids = priceHistory.bids
  let bidders = priceHistory.bidders
  let bidtimestamp = priceHistory.bidtimestamp
  let maxbid = priceHistory.maxbid
  let maxbidder = priceHistory.maxbidder
  let closingtime = priceHistory.closingtime

  const bidIncrement = 0.20

  let bidTime = new Date()
  let timestamp = bidTime.getTime()

  // Bid must be greater than min bid and current price
  if (bid <= 0.40 || bid <= bids[0]) {
    throw new Error('Bid is too low')
  }

  // Bid must be in proper increment
  if ((bid * 10) % (bidIncrement * 10) !== 0) {
    throw new Error(`Bid must be in ${bidIncrement} increments`)
  }

  // Check if auction is closed
  if (timestamp > (closingtime * 1000)) {
    console.log('Current time: ' + timestamp + ' and closes: ' + closingtime)
    throw new Error('Player auction is closed')
  }

  // Initial bid
  if (bids.length === 0) {
    bids.unshift(0.40)
    bidders.unshift(bidder)
    bidtimestamp.unshift(timestamp)
    maxbid = bid
    maxbidder = bidder

    return priceHistory
  }

  // Bid equals maxbid, is outbid by proxy bid
  if (bid === maxbid && bidder !== maxbidder) {
    bids.unshift(bid)
    bidders.unshift(bidder)
    bidtimestamp.unshift(timestamp)

    bids.unshift(maxbid)
    bidders.unshift(maxbidder)
    bidtimestamp.unshift(timestamp)

    return priceHistory
  } else

  // Bid beats maxbid
  if (bid > maxbid && bidder !== maxbidder) {
    bids.unshift(maxbid)
    bidders.unshift(maxbidder)
    bidtimestamp.unshift(timestamp)

    bids.unshift(maxbid + bidIncrement)
    bidders.unshift(bidder)
    bidtimestamp.unshift(timestamp)

    maxbidder = bidder
    maxbid = bid

    return priceHistory
  } else

  // Maxbidder raises maxbid
  if (bid >= maxbid && bidder === maxbidder) {
    maxbid = bid

    return priceHistory
  } else

  // Bid loses to maxbid
  if (bid < maxbid && bidder !== maxbidder) {
    bids.unshift(bid)
    bidders.unshift(bidder)
    bidtimestamp.unshift(timestamp)

    bids.unshift(bid + bidIncrement)
    bidders.unshift(maxbidder)
    bidtimestamp.unshift(timestamp)

    return priceHistory
  } else {
    throw new Error('Bid must exceed your maximum bid')
  }
}

module.exports = processBid
