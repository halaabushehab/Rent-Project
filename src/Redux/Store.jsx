
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/authSlice";
import showReducer from './ShowSlice.jsx';
import courtReducer from "./propertySlice.jsx";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    showData: showReducer,
    courtInfo: courtReducer,
  },
});
export default store;
