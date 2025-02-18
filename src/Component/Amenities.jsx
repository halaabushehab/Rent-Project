import React, { useState } from "react";
import axios from "axios";

const firebaseUrl =
  "https://rent-app-a210b-default-rtdb.firebaseio.com/amenities.json";

const amenities = {
  Bathroom: [
    { icon: "🚿", label: "Shower" },
    { icon: "🛁", label: "Bathtub" },
    { icon: "🧴", label: "Toiletries" },
    { icon: "🧼", label: "Soap" },
    { icon: "🧻", label: "Toilet Paper" },
    { icon: "🔥", label: "Hot Water" },
    { icon: "🧽", label: "Cleaning Supplies" },
    { icon: "🧴", label: "Shampoo" },
  ],
  Bedroom: [
    { icon: "🔒", label: "Lock on Bedroom Door" },
    { icon: "🛏️", label: "Comfortable Bed" },
    { icon: "💻", label: "Dedicated Workspace" },
    { icon: "🌙", label: "Blackout Curtains" },
    { icon: "🧸", label: "Toys for Kids" },
  ],
  Kitchen: [
    { icon: "🍽️", label: "Fully Equipped Kitchen" },
    { icon: "🧊", label: "Refrigerator" },
    { icon: "🍳", label: "Cooking Essentials" },
    { icon: "☕", label: "Coffee Maker" },
    { icon: "🥤", label: "Microwave" },
  ],
  LivingRoom: [
    { icon: "📺", label: "Flat Screen TV" },
    { icon: "🛋️", label: "Cozy Sofa" },
    { icon: "📶", label: "High-Speed WiFi" },
    { icon: "📚", label: "Bookshelf" },
  ],
  Others: [
    { icon: "🚗", label: "Parking Available" },
    { icon: "🌳", label: "Outdoor Space" },
    { icon: "💧", label: "Air Conditioning" },
    { icon: "🧳", label: "Luggage Storage" },
  ],
};

// دالة لإضافة البيانات بدون حذف القديم
async function addAmenities() {
  try {
    // الحصول على البيانات الحالية
    const response = await axios.get(firebaseUrl);
    const existingData = response.data || {};

    // دمج البيانات الجديدة مع البيانات الحالية
    const mergedData = { ...existingData, ...amenities };

    // رفع البيانات الجديدة مع الاحتفاظ بالقديم
    await axios.put(firebaseUrl, mergedData);
    console.log("Amenities added successfully!");
  } catch (error) {
    console.error("Error adding amenities:", error);
  }
}

addAmenities();
////////////////////////////////////////////

//popup
const Amenities = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4 text-orange-600">
        What This Place Offers
      </h2>
      <h2 className="text-lg font-semibold mb-4 text-orange-600">ba</h2>

      <div className="grid grid-cols-2 gap-4">
        {amenities.Bathroom.slice(0, 4).map((amenity, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="text-xl text-blue-700">{amenity.icon}</span>
            <span className="text-gray-700">{amenity.label}</span>
          </div>
        ))}
        {amenities.Bedroom.slice(0, 4).map((amenity, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="text-x ">{amenity.icon}</span>
            <span className="text-gray-700">{amenity.label}</span>
          </div>
        ))}
      </div>
      <button
        className="mt-4 w-full py-2 px-4 bg-white border-2 border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition-all"
        onClick={() => setShowPopup(true)}
      >
        Show All Amenities
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-white flex flex-col justify-center items-center p-8 rounded-lg shadow-2xl w-full max-w-3xl h-auto relative z-50 overflow-hidden">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-2"
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
            <h2 className="text-lg font-semibold text-center mb-6 text-orange-600">
              All Amenities
            </h2>
            <div className="overflow-y-auto max-h-[75vh] px-4 w-full">
              {Object.entries(amenities).map(([category, items], idx) => (
                <div key={idx} className="mb-6">
                  <h3 className="text-md font-semibold mb-3 border-b pb-2 text-gray-800">
                    {category}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {items.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-xl text-blue-700">
                          {amenity.icon}
                        </span>
                        <span className="text-gray-700">{amenity.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all mt-4"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Amenities;
