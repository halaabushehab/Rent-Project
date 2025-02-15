const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "ADD_USER":
      return {
        ...state,
        users: [action.payload, ...state.users],
      };
    case "BLOCK_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload ? { ...user, blocked: true } : user
        ),
      };
    case "UNBLOCK_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload ? { ...user, blocked: false } : user
        ),
      };

    case "UPDATE_USER_ROLE":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.userId
            ? { ...user, role: action.payload.role }
            : user
        ),
      };

    default:
      return state;
  }
};





export default userReducer;
