function players (parent, args, context, info) {
  let currentTime = Math.floor(Date.now() / 1000)
  console.log(currentTime)

  return context.db.query.players(
    { where: { closingtime_gte: currentTime }, orderBy: args.orderBy }, info)
}

function closedplayers (parent, args, context, info) {
  let currentTime = Math.floor(Date.now() / 1000)
  console.log(currentTime)

  return context.db.query.players(
    { where: { closingtime_lte: currentTime }, orderBy: args.orderBy }, info)
}

function player (parent, args, context, info) {
  return context.db.query.player({ where: { id: args.id } }, info)
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

module.exports = { players, closedplayers, users, player, getuser }
