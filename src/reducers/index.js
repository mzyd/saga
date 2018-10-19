import { combineReducers } from 'redux'
import users from './users'
import counter from './counter.js'

export default combineReducers({
  users,
  counter,
})
