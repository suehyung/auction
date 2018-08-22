const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
  Query: {
    info: () => `This is the player auction API`,
    feed: (root, args, context, info) => {
      return context.db.query.players({}, info)
    }
    // player: (_, {id}) => players.find(player => player.id === id)
  },

  Mutation: {
    post: (root, args, context, info) => {
      return context.db.mutation.createPlayer({
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
      }, info)
    }
  }

    // updatePlayer: (root, args) => {
    //   const player = {
    //     id: args.id,
    //     name: args.name,
    //     team: args.team,
    //     position: args.position,
    //     closingtime: args.closingtime,
    //     price: args.price,
    //     bidder: args.bidder,
    //     maxbid: args.maxbid,
    //     maxbidder: args.maxbidder
    //   }
    //   players.splice(args.id, 1, player)
    //   return player
    // },

    // deletePlayer: (root, args) => {
    //   players.splice(args.id, 1)
    //   return console.log(`Item ${args.id} deleted`)
    //   // Problem: if delete element, then index will not match id
    //   // Maybe make splice find indexof args.id here and in updatePlayer
    // }

}

const typeDefs = './src/schema.graphql'
const options = { port: 4000 }
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://ibl02-auction.herokuapp.com/auction/dev',
      secret: 'mysecret123',
      debug: true
    })
  })
})

server.start(options, () => console.log('Server is running on localhost:' + options.port))
