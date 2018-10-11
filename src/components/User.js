import { AUTH_TOKEN, APP_SECRET } from '../utils'
import jwt from 'jsonwebtoken'

function removeToken () {
  return localStorage.removeItem(AUTH_TOKEN)
}

function getToken () {
  return localStorage.getItem(AUTH_TOKEN)
}

function getUser () {
  let userInfo = {}
  if (getToken()) {
    userInfo = jwt.verify(getToken(), APP_SECRET)
    return userInfo.userId
  }
}

function getUserProfile () {
  let decoded = jwt.decode(this.getToken())
  return decoded
}

export { getToken, getUser, getUserProfile, removeToken }
