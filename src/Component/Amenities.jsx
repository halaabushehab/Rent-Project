// import React, { useState } from "react";

// const amenities = {
//   Bathroom: [
//     { icon: "🚱", label: "Bathtub" },
//     { icon: "🛈", label: "Hair dryer" },
//     { icon: "🦴", label: "Cleaning products" },
//     { icon: "🚿", label: "Shampoo" },
//     { icon: "🫄", label: "Nivea body soap" },
//     { icon: "🔥", label: "Hot water" },
//     { icon: "🦴", label: "Shower gel" },
//   ],
//   Bedroom: [
//     { icon: "🔒", label: "Lock on bedroom door" },
//     { icon: "💻", label: "Dedicated workspace" },
//     { icon: "🚗", label: "Elevator" },
//   ],
//   Others: [
//     { icon: "📶", label: "Wifi" },
//     { icon: "📺", label: "32 inch HDTV with standard cable" },
//     { icon: "❄️", label: "Air conditioning" },
//     { icon: "🧊", label: "Refrigerator" },
//   ]
// };

// const Amenities = () => {
//   const [showPopup, setShowPopup] = useState(false);

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md w-full mt-6"> 
//       <h2 className="text-lg font-semibold mb-4">What this place offers</h2>
//       <div className="grid grid-cols-2 gap-4">
//         {amenities.Bedroom.map((amenity, index) => (
//           <div key={index} className="flex items-center space-x-2">
//             <span className="text-xl">{amenity.icon}</span>
//             <span className="text-gray-700">{amenity.label}</span>
//           </div>
//         ))}
//       </div>
//       <button 
//         className="mt-4 w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
//         onClick={() => setShowPopup(true)}
//       >
//         Show all 27 amenities
//       </button>
      
//       {showPopup && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[70vh] overflow-y-auto">
//             <h2 className="text-lg font-semibold mb-4">All Amenities</h2>
//             {Object.entries(amenities).map(([category, items], idx) => (
//               <div key={idx} className="mb-4">
//                 <h3 className="text-md font-semibold mb-2">{category}</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   {items.map((amenity, index) => (
//                     <div key={index} className="flex items-center space-x-2">
//                       <span className="text-xl">{amenity.icon}</span>
//                       <span className="text-gray-700">{amenity.label}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//             <button 
//               className="mt-4 w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
//               onClick={() => setShowPopup(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Amenities;




import React, { useState } from "react";

const amenities = {
  Bathroom: [
    { icon: "🚱", label: "Bathtub" },
    { icon: "🛈", label: "Hair dryer" },
    { icon: "🦴", label: "Cleaning products" },
    { icon: "🚿", label: "Shampoo" },
    { icon: "🫄", label: "Nivea body soap" },
    { icon: "🔥", label: "Hot water" },
    { icon: "🦴", label: "Shower gel" },
  ],
  Bedroom: [
    { icon: "🔒", label: "Lock on bedroom door" },
    { icon: "💻", label: "Dedicated workspace" },
    { icon: "🚗", label: "Elevator" },
  ],
  Others: [
    { icon: "📶", label: "Wifi" },
    { icon: "📺", label: "32 inch HDTV with standard cable" },
    { icon: "❄️", label: "Air conditioning" },
    { icon: "🧊", label: "Refrigerator" },
  ]
};

const Amenities = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setShowPopup(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4">What this place offers</h2>
      <div className="grid grid-cols-2 gap-4">
        {amenities.Bedroom.map((amenity, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="text-xl">{amenity.icon}</span>
            <span className="text-gray-700">{amenity.label}</span>
          </div>
        ))}
      </div>
      <button 
        className="mt-4 w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        onClick={() => setShowPopup(true)}
      >
        Show all 27 amenities
      </button>
      
      {showPopup && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleClose}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto relative">
            <div className="sticky top-0 bg-white z-10 pb-4 border-b mb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">All Amenities</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700 p-2"
                  onClick={() => setShowPopup(false)}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </button>
              </div>
            </div>
            {Object.entries(amenities).map(([category, items], idx) => (
              <div key={idx} className="mb-6">
                <h3 className="text-md font-semibold mb-3">{category}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {items.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-xl">{amenity.icon}</span>
                      <span className="text-gray-700">{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="sticky bottom-0 bg-white pt-4 border-t mt-4">
              <button
                className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Amenities;
