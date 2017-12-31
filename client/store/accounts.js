import axios from 'axios'

// action.type
const GET_ACCOUNTS = 'GET_ACCOUNTS'

// action creator
const getAccounts = (accounts)=>{
  return {type: GET_ACCOUNTS, accounts}
}

// dispatcher
export const getAccountsThunk = (userId) => {
  return dispatch => {
    axios.get(`/api/accounts/${userId}`)
      .then(res=>res.data)
      .then(accounts=> {
        dispatch(getAccounts(accounts))
      })
  }
}

// reducer
const reducer = (accounts = [], action) => {
  switch (action.type) {
    case GET_ACCOUNTS:
      return action.accounts;
    default:
      return accounts;
  }
}

export default reducer;
