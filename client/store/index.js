import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import accounts from './accounts'
import banks from './banks'
import transactions from './transactions'
import currentBank from './currentBank'
import currentVendor from './currentVendor'

const reducer = combineReducers({user, accounts, banks, transactions, currentBank, currentVendor})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './accounts'
export * from './banks';
export * from './transactions';
export * from './currentBank';
export * from './currentVendor';
