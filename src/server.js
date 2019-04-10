const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')

const resolvers = {
  Query,
  Mutation,
  AuthPayload
}

const typeDefs = './src/schema.graphql'
const options = { port: 4000 }
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: './src/generated/prisma.graphql',
      endpoint: process.env.PRISMA_ENDPOINT,
      secret: process.env.PRISMA_SECRET,
      debug: true
    })
  })
})

server.start(options, () => console.log('Server is running on localhost:' + options.port))

//  endpoint: process.env.PRISMA_ENDPOINT,
//  secret: process.env.PRISMA_SECRET,
