import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function PropertyDetails() {
  const selecthouse = useSelector((state) => state.courtInfo.selectedCourt);
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const storedProperty = localStorage.getItem("selectedProperty");

    if (selecthouse) {
      setProperty(selecthouse);
      localStorage.setItem("selectedProperty", JSON.stringify(selecthouse));
    } else if (storedProperty) {
      setProperty(JSON.parse(storedProperty));
    }
  }, [selecthouse]);

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  if (!property)
    return <div className="text-center text-lg p-10">Loading...</div>;

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="relative">
          <img
            src={property.images || "https://via.placeholder.com/600x400"}
            alt={property.name || "No Name"}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg">
            <span className="text-xl font-semibold text-green-600">
              Available
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-3xl font-bold text-gray-900 mb-2">
            {property.name || "No Name"}
          </h3>
          <p className="text-lg text-gray-600 mb-2">
            📍 {property.location || "No Location"}
          </p>
          <p className="text-sm text-gray-800 mb-4">
            {property.description || "A great place for students to stay."}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              Free Wi-Fi
            </span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
              Near University
            </span>
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
              Furnished
            </span>
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
              24/7 Security
            </span>
          </div>

          <p className="text-xl font-bold text-gray-800 mb-4">
            {property.price || "N/A"} JD / Month
          </p>

          <div className="flex items-center space-x-2 text-yellow-500">
            ⭐ 4.9 <span className="text-gray-600">(120 reviews)</span>
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              onClick={scrollToBottom}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg shadow-md hover:bg-gray-400"
            >
              View on Map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
