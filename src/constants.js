const APP_SECRET = process.env.APP_SECRET
// old one is 'GraphQL-is-aw3some'

const AUTH_TOKEN = process.env.AUTH_TOKEN
// old one is 'auth-token'

const PRISMA_SECRET = process.env.PRISMA_SECRET
// old one is 'mysecret123'

const ENDPOINT = process.env.PRISMA_ENDPOINT
// old one is 'https://ibl02-auction.herokuapp.com/auction/dev'

module.exports = {
  APP_SECRET,
  AUTH_TOKEN,
  PRISMA_SECRET,
  ENDPOINT
}
