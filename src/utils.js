const jwt = require('jsonwebtoken')
const APP_SECRET = 'GraphQL-is-aw3some'
const AUTH_TOKEN = 'auth-token'

function getUserId (context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const user = jwt.verify(token, APP_SECRET)
    return user.id
  }

  throw new Error('Not authenticated')
}

module.exports = {
  APP_SECRET,
  getUserId,
  AUTH_TOKEN
}
