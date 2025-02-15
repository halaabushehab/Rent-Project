// import React, { useState } from "react";

// const offers = [
//   { id: 1, text: "Snag £200 Cashback On Select Rooms!", details: "Book your accommodation at East Court, London, for the 2025-26 academic year and enjoy £200 cashback! ..." },
//   { id: 2, text: "Snag £200 Cashback On Select Rooms!", details: "Book your accommodation at East Court, London, for the 2025-26 academic year and enjoy £200 cashback! ..." },
//   { id: 3, text: "Snag £200 Cashback On Select Rooms!", details: "Book your accommodation at East Court, London, for the 2025-26 academic year and enjoy £200 cashback! ..." },
//   { id: 4, text: "Snag £200 Cashback On Select Rooms!", details: "Book your accommodation at East Court, London, for the 2025-26 academic year and enjoy £200 cashback! ..." },
// ];

// const OffersList = () => {
//   const [visibleOffers, setVisibleOffers] = useState(2);
//   const [selectedOffer, setSelectedOffer] = useState(null);

//   return (
//     <div className={`max-w-md mx-auto p-6 bg-gray-50 rounded-lg shadow-lg ${selectedOffer ? 'overflow-hidden h-screen fixed inset-0' : ''}`}>
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">Offers ({offers.length})</h2>
//       <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
//         {offers.slice(0, visibleOffers).map((offer, index) => (
//           <div
//             key={offer.id}
//             className="flex items-center justify-between p-4 hover:bg-gray-100 cursor-pointer transition-all duration-200"
//             onClick={() => setSelectedOffer(offer)}
//           >
//             <div className="flex items-center space-x-3">
//               <span className="text-yellow-500 text-lg">💰</span>
//               <p className="text-sm font-medium text-gray-700">{offer.text}</p>
//             </div>
//             <span className="text-gray-400 text-lg">&gt;</span>
//           </div>
//         ))}
//       </div>
//       <button
//         className="mt-4 text-red-600 text-sm font-medium flex items-center hover:underline"
//         onClick={() => setVisibleOffers(visibleOffers === 2 ? offers.length : 2)}
//       >
//         {visibleOffers === 2 ? "View more offers" : "View less offers"} <span className="ml-1">&#9660;</span>
//       </button>
      
//       {selectedOffer && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
//           <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-xl relative">
//             <h3 className="text-lg font-bold mb-3 text-gray-800">{selectedOffer.text}</h3>
//             <p className="text-sm text-gray-600">{selectedOffer.details}</p>
//             <button
//               className="mt-5 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
//               onClick={() => setSelectedOffer(null)}
//             >
//               Got it
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OffersList;
import React, { useState, useEffect } from "react";

const offers = [
  { id: 1, text: "Snag £200 Cashback On Select Rooms!", details: "Book your accommodation at East Court, London, for the 2025-26 academic year and enjoy £200 cashback! ..." },
  { id: 2, text: "Snag £200 Cashback On Select Rooms!", details: "Book your accommodation at East Court, London, for the 2025-26 academic year and enjoy £200 cashback! ..." },
  { id: 3, text: "Snag £200 Cashback On Select Rooms!", details: "Book your accommodation at East Court, London, for the 2025-26 academic year and enjoy £200 cashback! ..." },
  { id: 4, text: "Snag £200 Cashback On Select Rooms!", details: "Book your accommodation at East Court, London, for the 2025-26 academic year and enjoy £200 cashback! ..." },
  { id: 5, text: "Snag £200 Cashback On Select Rooms!", details: "Book your accommodation at East Court, London, for the 2025-26 academic year and enjoy £200 cashback! ..." },
  { id: 6, text: "Snag £200 Cashback On Select Rooms!", details: "Book your accommodation at East Court, London, for the 2025-26 academic year and enjoy £200 cashback! ..." },

];

const OffersList = () => {
  const [visibleOffers, setVisibleOffers] = useState(4);
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    if (selectedOffer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedOffer]);

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Offers ({offers.length})</h2>
      <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
        {offers.slice(0, visibleOffers).map((offer, index) => (
          <div
            key={offer.id}
            className="flex items-center justify-between p-4 hover:bg-gray-100 cursor-pointer transition-all duration-200"
            onClick={() => setSelectedOffer(offer)}
          >
            <div className="flex items-center space-x-3">
              <span className="text-yellow-500 text-lg">💰</span>
              <p className="text-sm font-medium text-gray-700">{offer.text}</p>
            </div>
            <span className="text-gray-400 text-lg">&gt;</span>
          </div>
        ))}
      </div>
      <button
        className="mt-4 text-red-600 text-sm font-medium flex items-center hover:underline"
        onClick={() => setVisibleOffers(visibleOffers === 4 ? offers.length : 4)}
      >
        {visibleOffers === 4 ? "View more offers" : "View less offers"} <span className="ml-1">&#9660;</span>
      </button>
      
      {selectedOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-xl relative">
            <h3 className="text-lg font-bold mb-3 text-gray-800">{selectedOffer.text}</h3>
            <p className="text-sm text-gray-600">{selectedOffer.details}</p>
            <button
              className="mt-5 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
              onClick={() => setSelectedOffer(null)}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OffersList;

