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

  const playerExists = await context.db.exists.Watchlist({
    user: { id: userId },
    player: { id: args.playerId }
  })

  if (playerExists) {
    const watchlistId = await context.db.query.watchlists({ where: {
      user: { id: userId },
      player: { id: args.playerId }
    }}, `{ id }`)
    return context.db.mutation.deleteWatchlist({ where:
      { id: watchlistId[0].id }
    }, '')
  } else {
    return context.db.mutation.createWatchlist(
      {
        data: {
          user: { connect: { id: userId } },
          player: { connect: { id: args.playerId } }
        }
      },
      info
    )
  }
}

function post (parent, args, context, info) {
  const userId = getUserId(context)
  return context.db.mutation.createPlayer(
    {
      data: {
        name: args.name,
        team: args.team,
        position: args.position,
        closingtime: args.closingtime,
        price: args.price,
        bidder: args.bidder,
        maxbid: args.maxbid,
        maxbidder: args.maxbidder
      }
    }, info
  )
}

module.exports = {
  signup,
  login,
  watchlist,
  post
}
