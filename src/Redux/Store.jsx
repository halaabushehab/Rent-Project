
// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../Redux/authSlice";
// import showReducer from './ShowSlice.jsx';
// import courtReducer from "./propertySlice.jsx";


// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     showData: showReducer,
//     courtInfo: courtReducer,
//   },
// });
// export default store;


// ✅ استيراد مكتبة Redux
import { configureStore } from "@reduxjs/toolkit";

// ✅ استيراد الـ reducers
import authReducer from "../Redux/authSlice";
import showReducer from './ShowSlice.jsx';
import { courtReducer } from "./propertySlice.jsx"; // استيراد الـ reducer باستخدام التصدير المسمى

// ✅ إعداد الـ Redux Store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    showData: showReducer,
    courtInfo: courtReducer, // استخدام الـ reducer هنا
  },
});

export default store;
