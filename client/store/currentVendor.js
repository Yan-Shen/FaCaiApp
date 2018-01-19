
// action.type
const GET_CURRENTVENDOR = 'GET_CURRENTVENDOR'

// action creator
export const getCurrentVendor = (vendor) => {
  return {type: GET_CURRENTVENDOR, vendor}
}

// dispatcher
export const getCurrentVendorThunk = (vendor) => {
  return dispatch => {
    dispatch(getCurrentVendor(vendor))
  }
}

// reducer
const reducer = (currentVendor = '', action) => {
  switch (action.type) {
    case GET_CURRENTVENDOR:
      return action.vendor;
    default:
      return currentVendor;
  }
}

export default reducer;
