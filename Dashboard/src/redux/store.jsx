import { createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from "redux-thunk";
import  authReducer  from "./reducers/authReducer";
import  postReducer from "./reducers/postReducer";
import  userReducer from "./reducers/userReducer";
import contactsReducer from "./reducers/contact";
import { bookingsReducer } from "./reducers/bookingReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  users: userReducer,
  contacts: contactsReducer,
  bookings: bookingsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
