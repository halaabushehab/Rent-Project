import React, { useEffect, useState } from "react";
import PropertyCard from "../Component/PropertyCard";
import Amenities from "../Component/Amenities";
import DateRangePicker from "../Component/DateRangePicker";
import OffersList from "../Component/OffersList";
import MapComponent from "../Component/MapComponent";
import PropertyBooking from "../Component/PropertyBooking";
import { useSelector } from "react-redux";

function PropertyDetails() {
  const selectedProperty = useSelector(
    (state) => state.courtInfo.selectedCourt
  );
  const [property, setProperty] = useState(() => {
    // استرجاع البيانات من `localStorage` عند التهيئة
    const storedProperty = localStorage.getItem("selectedProperty");
    return storedProperty ? JSON.parse(storedProperty) : null;
  });

  useEffect(() => {
    // تخزين البيانات في `localStorage` عند تغيير `selectedProperty`
    if (selectedProperty) {
      setProperty(selectedProperty);
      localStorage.setItem(
        "selectedProperty",
        JSON.stringify(selectedProperty)
      );
    }
  }, [selectedProperty]);

  if (!property) return <div>Loading...</div>;

  return (
    <div className="flex">
      {/* المحتوى الرئيسي */}
      <main className="w-[70%] ml-6 px-6 py-10 space-y-6 bg-gray-50 rounded-2xl shadow-lg overflow-y-auto">
        <section className="bg-white p-4 rounded-xl shadow-md">
          <PropertyCard
            name={property.name}
            location={property.location}
            description={property.description}
            price={property.price}
            images={property.images}
          />
        </section>
        <section className="bg-white p-4 rounded-xl shadow-md">
          <Amenities amenities={property.amenities} />
        </section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section className="bg-white p-4 rounded-xl shadow-md">
            <OffersList offers={property.offers} />
          </section>
          <section className="bg-white p-4 rounded-xl shadow-md">
            <DateRangePicker />
          </section>
        </div>
        <section className="bg-white p-4 rounded-xl shadow-md">
          <MapComponent location={property.location} />
        </section>
      </main>

      {/* الشريط الجانبي */}
      <aside className="w-[25%] px-6 py-25 mr-6 h-[calc(150vh-10px)] p-4 fixed right-0 top-[0px] overflow-y-auto">
        <PropertyBooking property={property} />
      </aside>
    </div>
  );
}

export default PropertyDetails;
