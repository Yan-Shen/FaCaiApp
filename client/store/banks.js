import axios from 'axios'

// action.type
const GET_BANKS = 'GET_BANKS'

// action creator
const getBanks = (banks)=>{
  return {type: GET_BANKS, banks}
}

// dispatcher
export const getBanksThunk = (userId) => {
  return dispatch => {
    axios.get(`/api/institutions/${userId}`)
      .then(res=>res.data)
      .then(institutions=> {
        dispatch(getBanks(institutions))
      })
  }
}

// reducer
const reducer = (banks = [], action) => {
  switch (action.type) {
    case GET_BANKS:
      return action.banks;
    default:
      return banks;
  }
}

export default reducer;
