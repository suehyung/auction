import { AUTH_TOKEN, APP_SECRET } from '../utils'
import jwt from 'jsonwebtoken'

function removeToken () {
  return localStorage.removeItem(AUTH_TOKEN)
}

function getToken () {
  return localStorage.getItem(AUTH_TOKEN)
}

function getUser () {
  let user = null
  if (getToken()) {
    user = jwt.verify(getToken(), APP_SECRET)
    return user.id
  }
}

function getUserProfile () {
  let decoded = jwt.decode(this.getToken())
  return decoded
}

export { getToken, getUser, getUserProfile, removeToken }
