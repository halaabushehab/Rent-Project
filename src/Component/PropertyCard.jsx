import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function PropertyDetails() {
  const selecthouse = useSelector((state) => state.courtInfo.selectedCourt);
  const [property, setProperty] = useState(null);

  useEffect(() => {
    // استرجاع البيانات من `localStorage` إذا لم تكن موجودة في Redux
    const storedProperty = localStorage.getItem("selectedProperty");

    if (selecthouse) {
      setProperty(selecthouse);
      localStorage.setItem("selectedProperty", JSON.stringify(selecthouse));
    } else if (storedProperty) {
      setProperty(JSON.parse(storedProperty));
    }
  }, [selecthouse]);

  if (!property) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="relative">
          <img
            src={property.images || "https://via.placeholder.com/150"}
            alt={property.name || "No Name"}
            className="w-full h-[300px] object-cover"
          />
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-2">
            {property.name || "No Name"}
          </h3>
          <p className="text-lg text-gray-600 mb-4">
            {property.location || "No Location"}
          </p>
          <p className="text-sm text-gray-800 mb-4">
            {property.description || "No Description"}
          </p>
          <p className="text-xl font-bold text-gray-800 mb-4">
            {property.price || "N/A"} JD / Night
          </p>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500">⭐ 4.96</span>
            <span className="ml-2 text-green-500">Guest favorite</span>
          </div>
        </div>
      </div>
    </div>
  );
}
