module.exports = {
  APP_SECRET: process.env.APP_SECRET,
  AUTH_TOKEN: process.env.AUTH_TOKEN,
  PRISMA_SECRET: process.env.PRISMA_SECRET,
  ENDPOINT: process.env.ENDPOINT
}

//  if (process.env.NODE_ENV === 'production') {
// we are in production - return the prod set of keys
//  } else {
// we are in development - return the dev keys
//  module.exports = require('./dev')
//  }
