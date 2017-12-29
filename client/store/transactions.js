import axios from 'axios'

// action.type
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'

// action creator
const getTransactions = (transactions)=>{
  return {type: GET_TRANSACTIONS, transactions}
}

// dispatcher
export const getTransactionsThunk = (userId) => {
  return dispatch => {
    axios.get(`/api/transactions/${userId}`)
      .then(res=>res.data)
      .then(transactions=> {
        console.log('transactions are -------------', transactions)
        dispatch(getTransactions(transactions))
      })
  }
}

// reducer
const reducer = (transactions = [], action) => {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.transactions;
    default:
      return transactions;
  }
}

export default reducer;
