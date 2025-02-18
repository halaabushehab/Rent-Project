// // Redux Slice (stadiumsSlice.js)
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   selectedCourt: null, // Changed to null for better conditional checks
// };

// const stadiumsSlice = createSlice({
//   name: "courtInfo",
//   initialState,
//   reducers: {
//     fetchSelectedCourt: (state, action) => {
//       state.selectedCourt = action.payload;
//     },
//   },
// });

// export const { fetchSelectedCourt } = stadiumsSlice.actions;
// export default stadiumsSlice.reducer; 

// // React Component (PropertyDetails.js)
// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import PropertyCard from "../Component/PropertyCard";
// import Amenities from "../Component/Amenities";
// import DateRangePicker from "../Component/DateRangePicker";
// import OffersList from "../Component/OffersList";
// import MapComponent from "../Component/MapComponent";
// import PropertyBooking from "../Component/PropertyBooking";

// function PropertyDetails() {
//   const selectedProperty = useSelector((state) => state.courtInfo.selectedCourt);

//   if (!selectedProperty) return <div>Loading...</div>;

//   return (
//     <div className="flex">
//       {/* Main Content */}
//       <main className="w-[70%] ml-6 px-6 py-10 space-y-6 bg-gray-50 rounded-2xl shadow-lg overflow-y-auto">
//         <section className="bg-white p-4 rounded-xl shadow-md">
//           <PropertyCard {...selectedProperty} />
//         </section>
//         <section className="bg-white p-4 rounded-xl shadow-md">
//           <Amenities amenities={selectedProperty.amenities} />
//         </section>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <section className="bg-white p-4 rounded-xl shadow-md">
//             <OffersList offers={selectedProperty.offers} />
//           </section>
//           <section className="bg-white p-4 rounded-xl shadow-md">
//             <DateRangePicker />
//           </section>
//         </div>
//         <section className="bg-white p-4 rounded-xl shadow-md">
//           <MapComponent location={selectedProperty.location} />
//         </section>
//       </main>

//       {/* Sidebar */}
//       <aside className="w-[25%] px-6 py-25 mr-6 h-[calc(150vh-10px)] p-4 fixed right-0 top-[0px] overflow-y-auto">
//         <PropertyBooking property={selectedProperty} price={selectedProperty.price} id={selectedProperty.id} />
//       </aside>
//     </div>
//   );
// }

// export default PropertyDetails;


// // ✅ استيراد مكتبات Redux و React
// import { createSlice } from "@reduxjs/toolkit";
// import React from "react";
// import { useSelector } from "react-redux";
// import PropertyCard from "../Component/PropertyCard";
// import Amenities from "../Component/Amenities";
// import DateRangePicker from "../Component/DateRangePicker";
// import OffersList from "../Component/OffersList";
// import MapComponent from "../Component/MapComponent";
// import PropertyBooking from "../Component/PropertyBooking";

// // ✅ 1️⃣ إنشاء Redux Slice لإدارة بيانات العقارات
// const initialState = {
//   selectedCourt: null, // القيمة الافتراضية
// };

// const stadiumsSlice = createSlice({
//   name: "courtInfo",
//   initialState,
//   reducers: {
//     fetchSelectedCourt: (state, action) => {
//       state.selectedCourt = action.payload;
//     },
//   },
// });

// // ✅ تصدير الـ Action لاستخدامه في باقي المشروع
// export const { fetchSelectedCourt } = stadiumsSlice.actions;

// // ✅ تصدير الـ Reducer لاستخدامه في Redux Store
// export const stadiumsReducer = stadiumsSlice.reducer;

// // ✅ 2️⃣ تعريف الـ React Component `PropertyDetails`
// export function PropertyDetails() {
//   const selectedProperty = useSelector((state) => state.courtInfo.selectedCourt);

//   if (!selectedProperty) return <div>Loading...</div>;

//   return (
//     <div className="flex">
//       {/* Main Content */}
//       <main className="w-[70%] ml-6 px-6 py-10 space-y-6 bg-gray-50 rounded-2xl shadow-lg overflow-y-auto">
//         <section className="bg-white p-4 rounded-xl shadow-md">
//           <PropertyCard {...selectedProperty} />
//         </section>
//         <section className="bg-white p-4 rounded-xl shadow-md">
//           <Amenities amenities={selectedProperty.amenities} />
//         </section>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <section className="bg-white p-4 rounded-xl shadow-md">
//             <OffersList offers={selectedProperty.offers} />
//           </section>
//           <section className="bg-white p-4 rounded-xl shadow-md">
//             <DateRangePicker />
//           </section>
//         </div>
//         <section className="bg-white p-4 rounded-xl shadow-md">
//           <MapComponent location={selectedProperty.location} />
//         </section>
//       </main>

//       {/* Sidebar */}
//       <aside className="w-[25%] px-6 py-25 mr-6 h-[calc(150vh-10px)] p-4 fixed right-0 top-[0px] overflow-y-auto">
//         <PropertyBooking property={selectedProperty} price={selectedProperty.price} id={selectedProperty.id} />
//       </aside>
//     </div>
//   );
// }


// ✅ استيراد مكتبة Redux
import { createSlice } from "@reduxjs/toolkit";

// ✅ 1️⃣ إنشاء Redux Slice لإدارة بيانات العقارات
const initialState = {
  selectedCourt: null, // القيمة الافتراضية
};

const stadiumsSlice = createSlice({
  name: "courtInfo",
  initialState,
  reducers: {
    fetchSelectedCourt: (state, action) => {
      state.selectedCourt = action.payload;
    },
  },
});

// ✅ تصدير الـ Action لاستخدامه في باقي المشروع
export const { fetchSelectedCourt } = stadiumsSlice.actions;

// ✅ تصدير الـ Reducer باستخدام التصدير المسمى
export const courtReducer = stadiumsSlice.reducer;
