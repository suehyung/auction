const jwt = require('jsonwebtoken')
const { APP_SECRET } = require('../utils/constants')

// Returns user object
function getUserId (context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const user = jwt.verify(token, APP_SECRET)
    return user.id
  } else {
    throw new Error('Not authenticated')
  }
}

// Query resolvers are below:
function players (parent, args, context, info) {
  let currentTime = Math.floor(Date.now() / 1000)

  return context.db.query.players(
    { where: { closingtime_gte: currentTime }, orderBy: args.orderBy }, info)
}

function closedplayers (parent, args, context, info) {
  let currentTime = Math.floor(Date.now() / 1000)

  return context.db.query.players(
    { where: { closingtime_lte: currentTime }, orderBy: args.orderBy }, info)
}

function watchplayers (parent, args, context, info) {
  let currentTime = Math.floor(Date.now() / 1000)
  const where =
    {
      AND: [
        { watchlist_some: {user: {id: getUserId(context)}} },
        { closingtime_gte: currentTime }
      ]
    }

  return context.db.query.players({ where, orderBy: args.orderBy }, info)
}

function getplayer (parent, args, context, info) {
  return context.db.query.players({ where: { name_contains: args.name } }, info)
}

function users (parent, args, context, info) {
  const where = args.filter
    ? {
      OR: [
        { team_contains: args.filter },
        { email_contains: args.filter }
      ]
    }
    : {}

  return context.db.query.users({ where, orderBy: args.orderBy }, info)
}

function getuser (parent, args, context, info) {
  return context.db.query.user({ where: { id: args.id } }, `{ team }`)
}

module.exports = {
  players,
  closedplayers,
  watchplayers,
  users,
  getplayer,
  getuser
}
