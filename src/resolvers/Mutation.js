const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const APP_SECRET = 'GraphQL-is-aw3some'
const processBid = require('../utils/processBid')

function getUserId (context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const user = jwt.verify(token, APP_SECRET)
    return user.id
  }

  throw new Error('Not authenticated')
}

async function signup (parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)

  const user = await context.db.mutation.createUser({
    data: { ...args, password }
  }, `{ id team }`)

  const token = jwt.sign({ id: user.id, team: user.team }, APP_SECRET)

  return {
    token,
    user
  }
}

async function login (parent, args, context, info) {
  const user = await context.db.query.user({ where: { email: args.email } }, ` { id team password } `)
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ id: user.id, team: user.team }, APP_SECRET)

  return {
    token,
    user
  }
}

async function watchlist (parent, args, context, info) {
  let userId = {}
  if (getUserId(context)) {
    userId = getUserId(context)
  } else {
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
    }}, info)
  } else {
    return context.db.mutation.createWatchlist(
      {
        data: {
          user: { connect: { id: userId } },
          player: { connect: { id: args.playerId } }
        }
      }, info
    )
  }
}

async function placebid (parent, args, context, info) {
  if (!getUserId(context)) {
    throw new Error('Must be logged in to bid')
  }

  let priceHistory = await context.db.query.player({ where: {
    id: args.playerId }}, `{ price bids bidders bidtimestamp maxbid maxbidder closingtime }`)

  priceHistory = processBid(priceHistory, args.bid, args.bidder)

  return context.db.mutation.updatePlayer(
    {
      data: {
        price: priceHistory.price,
        maxbid: priceHistory.maxbid,
        maxbidder: priceHistory.maxbidder,
        bids: { set: priceHistory.bids },
        bidders: { set: priceHistory.bidders },
        bidtimestamp: { set: priceHistory.bidtimestamp }
      },
      where: {
        id: args.playerId
      }
    }, `{ id price bids bidders }`
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
        bids: args.bids,
        bidders: args.bidders,
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
