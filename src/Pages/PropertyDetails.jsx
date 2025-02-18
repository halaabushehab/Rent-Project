// // import React, { useEffect, useState } from "react";
// // import { useSelector } from "react-redux";
// // import PropertyCard from "../Component/PropertyCard";
// // import Amenities from "../Component/Amenities";
// // import DateRangePicker from "../Component/DateRangePicker";
// // import OffersList from "../Component/OffersList";
// // import MapComponent from "../Component/MapComponent";
// // import PropertyBooking from "../Component/PropertyBooking";

// // function PropertyDetails() {
// //   const selectedProperty = useSelector((state) => state.courtInfo.selectedCourt);
// //   const [property, setProperty] = useState(() => {
// //     const storedProperty = localStorage.getItem("selectedProperty");
// //     return storedProperty ? JSON.parse(storedProperty) : null;
// //   });

// //   useEffect(() => {
// //     if (selectedProperty) {
// //       setProperty(selectedProperty);
// //       localStorage.setItem("selectedProperty", JSON.stringify(selectedProperty));
// //     }
// //   }, [selectedProperty]);

// //   if (!property) return <div className="text-center py-10 text-xl font-semibold text-gray-600">Loading...</div>;

// //   return (
// //     <div className="container mx-auto p-8 flex flex-col lg:flex-row gap-8 bg-gray-50 min-h-screen">
// //       <main className="w-full lg:w-3/4 space-y-8">
// //         {/* Property Info */}
// //         <section className="bg-white p-8 rounded-3xl shadow-xl transition-all transform hover:scale-105">
// //           <PropertyCard {...property} />
// //         </section>

// //         {/* Amenities */}
// //         <section className="bg-white p-8 rounded-3xl shadow-xl transition-all transform hover:scale-105">
// //           <Amenities amenities={property.amenities} />
// //         </section>

// //         {/* Offers & Date Picker */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //           <section className="bg-white p-8 rounded-3xl shadow-xl transition-all transform hover:scale-105">
// //             <OffersList offers={property.offers} />
// //           </section>
// //           <section className="bg-white p-8 rounded-3xl shadow-xl transition-all transform hover:scale-105">
// //             <DateRangePicker />
// //           </section>
// //         </div>

// //         {/* Map */}
// //         <section className="bg-white p-8 rounded-3xl shadow-xl transition-all transform hover:scale-105">
// //           <MapComponent location={property.location} />
// //         </section>
// //       </main>

// //       {/* Booking Sidebar */}
// //       <aside className="w-full lg:w-1/4 sticky top-24 h-fit p-8 bg-white rounded-3xl shadow-xl transition-all transform hover:scale-105">
// //         <PropertyBooking property={property} />
// //       </aside>
// //     </div>
// //   );
// // }

// // export default PropertyDetails;

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import PropertyCard from "../Component/PropertyCard";
// import Amenities from "../Component/Amenities";
// import DateRangePicker from "../Component/DateRangePicker";
// import OffersList from "../Component/OffersList";
// import MapComponent from "../Component/MapComponent";
// import PropertyBooking from "../Component/PropertyBooking";

// function PropertyDetails() {
//   const selectedProperty = useSelector(
//     (state) => state.courtInfo.selectedCourt
//   );
//   const [property, setProperty] = useState(() => {
//     const storedProperty = localStorage.getItem("selectedProperty");
//     return storedProperty ? JSON.parse(storedProperty) : null;
//   });

//   useEffect(() => {
//     if (selectedProperty) {
//       setProperty(selectedProperty);
//       localStorage.setItem(
//         "selectedProperty",
//         JSON.stringify(selectedProperty)
//       );
//     }
//   }, [selectedProperty]);

//   if (!property)
//     return (
//       <div className="text-center py-10 text-xl font-semibold text-gray-600">
//         Loading...
//       </div>
//     );

//   return (
//     <div className="container mx-auto p-8 flex flex-col lg:flex-row gap-8 bg-gray-50 min-h-screen">
//       <main className="w-full lg:w-3/4 space-y-8">
//         {/* Property Info */}
//         <section className="bg-white p-8 rounded-3xl shadow-xl">
//           <PropertyCard {...property} />
//         </section>

//         {/* Amenities */}
//         <section className="bg-white p-8 rounded-3xl shadow-xl">
//           <Amenities amenities={property.amenities} />
//         </section>

//         {/* Offers & Date Picker */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <section className="bg-white p-8 rounded-3xl shadow-xl">
//             <OffersList offers={property.offers} />
//           </section>
//           <section className="bg-white p-8 rounded-3xl shadow-xl">
//             <DateRangePicker />
//           </section>
//         </div>

//         {/* Map */}
//         <section className="bg-white p-8 rounded-3xl shadow-xl">
//           <MapComponent location={property.location} />
//         </section>
//       </main>

//       {/* Booking Sidebar */}
//       <aside className="w-full lg:w-1/4 sticky top-24 h-fit p-8 bg-white rounded-3xl shadow-xl">
//         <PropertyBooking property={property} />
//       </aside>
//     </div>
//   );
// }

// export default PropertyDetails;


// ✅ استيراد مكتبات Redux و React
import { useSelector } from "react-redux";
import React from "react";
import PropertyCard from "../Component/PropertyCard";
import Amenities from "../Component/Amenities";
import DateRangePicker from "../Component/DateRangePicker";
import OffersList from "../Component/OffersList";
import MapComponent from "../Component/MapComponent";
import PropertyBooking from "../Component/PropertyBooking";
import Reviews from './../Component/Reviews';

// ✅ تعريف الـ React Component `PropertyDetails`
export function PropertyDetails() {
  const selectedProperty = useSelector((state) => state.courtInfo.selectedCourt);

  if (!selectedProperty) return <div>Loading...</div>;

  return (
    <div className="flex">
      {/* Main Content */}
      <main className="w-[70%] ml-6 px-6 py-10 space-y-6 bg-gray-50 rounded-2xl shadow-lg overflow-y-auto">
        <section className="bg-white p-4 rounded-xl shadow-md">
          <PropertyCard {...selectedProperty} />
          <Reviews productId={selectedProperty.id} />
        </section>
        <section className="bg-white p-4 rounded-xl shadow-md">
          <Amenities amenities={selectedProperty.amenities} />
        </section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section className="bg-white p-4 rounded-xl shadow-md">
            <OffersList offers={selectedProperty.offers} />
          </section>
          <section className="bg-white p-4 rounded-xl shadow-md">
            <DateRangePicker />
          </section>
        </div>
        <section className="bg-white p-4 rounded-xl shadow-md">
          <MapComponent location={selectedProperty.location} />
        </section>
      </main>

      {/* Sidebar */}
      <aside className="w-[25%] px-6 py-25 mr-6 h-[calc(150vh-10px)] p-4 fixed right-0 top-[0px] overflow-y-auto">
        <PropertyBooking
          property={selectedProperty}
          price={selectedProperty.price}
          id={selectedProperty.id}
        />
      </aside>
    </div>
  );
}
