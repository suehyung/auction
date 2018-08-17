const { GraphQLServer } = require('graphql-yoga')

// temporarily define in memory since no database set up yet
let players = [{
  id: 0,
  name: 'Madison Bumgarner',
  team: 'SF',
  position: 'SP',
  closingtime: '',
  price: '',
  bidder: '',
  maxbid: '',
  maxbidder: ''
}]

let idCount = players.length

const resolvers = {
  Query: {
    info: () => `This is the player auction API`,
    feed: () => players,
    player: (_, {id}) => players.find(player => player.id === id)
  },

  Mutation: {
    post: (root, args) => {
      const player = {
        id: `${idCount++}`, //Fix this for unique ID
        name: args.name,
        team: args.team,
        position: args.position,
        closingtime: args.closingtime,
        price: args.price,
        bidder: args.bidder,
        maxbid: args.maxbid,
        maxbidder: args.maxbidder
      }
      players.push(player)
      return player
    },

    updatePlayer: (root, args) => {
      const player = {
        id: args.id,
        name: args.name,
        team: args.team,
        position: args.position,
        closingtime: args.closingtime,
        price: args.price,
        bidder: args.bidder,
        maxbid: args.maxbid,
        maxbidder: args.maxbidder
      }
      players.splice(args.id, 1, player)
      return player
    },

    deletePlayer: (root, args) => {
      players.splice(args.id, 1)
      return console.log(`Item ${args.id} deleted`)
      // Problem: if delete element, then index will not match id
      // Maybe make splice find indexof args.id here and in updatePlayer
    }
  }
}

const typeDefs = './src/schema.graphql'
const options = { port: 4000 }
const server = new GraphQLServer({ typeDefs, resolvers })
server.start(options, () => console.log('Server is running on localhost:' + options.port))
