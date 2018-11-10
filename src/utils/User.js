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

function getTeam () {
  let user = null
  if (getToken()) {
    user = jwt.verify(getToken(), APP_SECRET)
    return user.team
  }
}

export { getToken, getUser, getTeam, removeToken }
