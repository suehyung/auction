function feed (parent, args, context, info) {
  return context.db.query.players({}, info)
}

module.exports = { feed }
