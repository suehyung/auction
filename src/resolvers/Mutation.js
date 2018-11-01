const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup (parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)

  const user = await context.db.mutation.createUser({
    data: { ...args, password }
  }, `{ id }`)

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user
  }
}

async function login (parent, args, context, info) {
  const user = await context.db.query.user({ where: { email: args.email } }, ` { id password } `)
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user
  }
}

async function watchlist (parent, args, context, info) {
  const userId = getUserId(context)
  if (!userId) {
    throw new Error('Must be logged in to favorite a player')
  }

  const playerExists = await context.db.exists.Watchlist({
    user: { id: userId },
    player: { id: args.playerId }
  })

  if (playerExists) {
    const watchlistId = await context.db.query.watchlists({ where: {
      user: { id: userId },
      player: { id: args.playerId }
    }}, `{ id }`)
    return context.db.mutation.deleteWatchlist({ where: {
      id: watchlistId[0].id
    }}, '')
  } else {
    return context.db.mutation.createWatchlist(
      {
        data: {
          user: { connect: { id: userId } },
          player: { connect: { id: args.playerId } }
        }
      }, `{ id }`
    )
  }
}

async function placebid (parent, args, context, info) {
  const userId = getUserId(context)
  const priceHistory = await context.db.query.players({ where: {
    id: args.playerId }}, `{ price bidder bidtimestamp }`)
  priceHistory.price.unshift(args.price)
  priceHistory.bidder.unshift(args.bidder)
  priceHistory.bidtimestamp.unshift(args.timestamp)

  return context.db.mutation.updatePlayer(
    {
      data: {
        price: { set: [priceHistory.price] },
        bidder: { set: [priceHistory.bidder] },
        bidtimestamp: { set: [priceHistory.timestamp] }
      },
      where: {
        id: args.playerId
      }
    }, `{ id price bidder bidtimestamp }`
  )
}

function post (parent, args, context, info) {
  return context.db.mutation.createPlayer(
    {
      data: {
        name: args.name,
        team: args.team,
        position: args.position,
        closingtime: args.closingtime,
        price: args.price,
        bidder: args.bidder,
        bidtimestamp: args.bidtimestamp,
        fangraphsid: args.fangraphsid,
        fantraxid: args.fantraxid
      }
    }, info
  )
}

module.exports = {
  signup,
  login,
  watchlist,
  placebid,
  post
}
