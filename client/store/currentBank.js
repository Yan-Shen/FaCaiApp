import axios from 'axios'

// action.type
const GET_CURRENTBANK = 'GET_CURRENTBANK'

// action creator
export const getCurrentBank = (bank) => {
  return {type: GET_CURRENTBANK, bank}
}

// // dispatcher
// export const getBanksThunk = (userId) => {
//   return dispatch => {
//     axios.get(`/api/institutions/${userId}`)
//       .then(res=>res.data)
//       .then(institutions=> {
//         dispatch(getBanks(institutions))
//       })
//   }
// }

// reducer
const reducer = (currentBank = {}, action) => {
  switch (action.type) {
    case GET_CURRENTBANK:
      return action.bank;
    default:
      return currentBank;
  }
}

export default reducer;
