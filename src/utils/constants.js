const APP_SECRET = process.env.APP_SECRET
const AUTH_TOKEN = process.env.AUTH_TOKEN
const PRISMA_SECRET = process.env.PRISMA_SECRET
const ENDPOINT = process.env.ENDPOINT

module.exports = {
  APP_SECRET,
  AUTH_TOKEN,
  PRISMA_SECRET,
  ENDPOINT
}

// check ES6 for FE and BE, maybe split into two. Also verify environment variables
