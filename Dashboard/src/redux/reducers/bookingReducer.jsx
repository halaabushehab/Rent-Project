const initialState = {
  bookings: {},
  loading: false,
  error: null,
};

export const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BOOKINGS_SUCCESS":
      return { ...state, bookings: action.payload, loading: false };
    case "FETCH_BOOKINGS_FAILURE":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
