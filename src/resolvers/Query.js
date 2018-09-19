function feed (parent, args, context, info) {
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

module.exports = { feed }
