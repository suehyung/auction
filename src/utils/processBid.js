
function processBid (priceHistory, bid, bidder) {
  let bids = priceHistory.bids
  let bidders = priceHistory.bidders
  let bidtimestamp = priceHistory.bidtimestamp
  let closingtime = priceHistory.closingtime

  const bidIncrement = 0.20
  const minBid = 0.40

  let bidTime = new Date()
  let timestamp = bidTime.getTime()

  // Bid must be greater than min bid and current price
  if (bid < minBid || bid <= bids[0]) {
    throw new Error('Bid is too low')
  }

  // Bid must be in proper increment
  if ((bid * 10) % (bidIncrement * 10) !== 0) {
    throw new Error(`Bids must be in ${bidIncrement} increments`)
  }

  // Check if auction is closed
  if (timestamp > (closingtime * 1000)) {
    console.log('Current time: ' + timestamp + ' and closes: ' + closingtime)
    throw new Error('Player auction is closed')
  }

  // Initial bid
  if (bids.length === 0) {
    bids.unshift(minBid)
    bidders.unshift(bidder)
    bidtimestamp.unshift(timestamp)

    priceHistory.maxbid = bid
    priceHistory.maxbidder = bidder
    priceHistory.price = minBid

    return priceHistory
  }

  // Bid equals maxbid, is outbid by proxy bid
  if (bid === priceHistory.maxbid && bidder !== priceHistory.maxbidder) {
    bids.unshift(bid)
    bidders.unshift(bidder)
    bidtimestamp.unshift(timestamp)

    bids.unshift(priceHistory.maxbid)
    bidders.unshift(priceHistory.maxbidder)
    bidtimestamp.unshift(timestamp)

    priceHistory.price = bid

    return priceHistory
  } else

  // Bid beats maxbid
  if (bid > priceHistory.maxbid && bidder !== priceHistory.maxbidder) {
    bids.unshift(priceHistory.maxbid)
    bidders.unshift(priceHistory.maxbidder)
    bidtimestamp.unshift(timestamp)

    bids.unshift(priceHistory.maxbid + bidIncrement)
    bidders.unshift(bidder)
    bidtimestamp.unshift(timestamp)

    priceHistory.maxbidder = bidder
    priceHistory.maxbid = bid
    priceHistory.price = bids[0]

    return priceHistory
  } else

  // Maxbidder raises maxbid
  if (bid >= priceHistory.maxbid && bidder === priceHistory.maxbidder) {
    priceHistory.maxbid = bid

    return priceHistory
  } else

  // Bid loses to maxbid
  if (bid < priceHistory.maxbid && bidder !== priceHistory.maxbidder) {
    bids.unshift(bid)
    bidders.unshift(bidder)
    bidtimestamp.unshift(timestamp)

    bids.unshift(bid + bidIncrement)
    bidders.unshift(priceHistory.maxbidder)
    bidtimestamp.unshift(timestamp)

    priceHistory.price = bids[0]

    return priceHistory
  }
}

module.exports = processBid
