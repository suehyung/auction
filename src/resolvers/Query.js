function players (parent, args, context, info) {
  const where = args.filter
    ? {
      OR: [
        { name_contains: args.filter },
        { position_contains: args.filter }
      ]
    }
    : {}

  return context.db.query.players({ where, orderBy: args.orderBy }, info)
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

function player (parent, args, context, info) {
  return context.db.query.player({ where: { id: args.id } }, info)
}

module.exports = { players, users, player }
