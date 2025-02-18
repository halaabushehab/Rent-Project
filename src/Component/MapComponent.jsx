// // import React from 'react';
// // import {APIProvider, Map} from '@vis.gl/react-google-maps';

// // const MapComponent = () => (
// //   <APIProvider apiKey={'AIzaSyChiqY4rfnRHf1dYwZDRI6OmNBcSjxzQjg'} onLoad={() => console.log('Maps API has loaded.')}>
// //    <Map
// //   defaultZoom={13}
// //   defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
// //   onCameraChanged={(ev) =>
// //     console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
// //   }
// // />
// //  </APIProvider>
// // )

// // export default MapComponent;

// import React, { useState, useEffect } from "react";
// import { GoogleMap, Marker, useLoadScript, Circle } from "@react-google-maps/api";

// const libraries = ["places"]; // تحميل مكتبة الأماكن
// const mapContainerStyle = {
//   width: '75%',
//   height: '400px',
//   margin: '0 auto', // لتوسيط الخريطة
// };const options = { disableDefaultUI: true, zoomControl: true };

// const MapComponent = () => {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: "AIzaSyChiqY4rfnRHf1dYwZDRI6OmNBcSjxzQjg", // استبدل بمفتاحك
//     libraries,
//   });

//   const [location, setLocation] = useState(null);
//   const [nearbyPlaces, setNearbyPlaces] = useState([]);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         () => alert("تعذر تحديد الموقع")
//       );
//     }
//   }, []);
//   useEffect(() => {
//     if (location) {
//       const service = new window.google.maps.places.PlacesService(
//         document.createElement("div")
//       );

//       const request = {
//         location,
//         radius: 2000, // نصف قطر البحث بالأمتار (هنا 2 كم)
//         type: ["restaurant", "cafe"], // نوع الأماكن المراد البحث عنها
//       };

//       service.nearbySearch(request, (results, status) => {
//         if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//           setNearbyPlaces(results);
//         }
//       });
//     }
//   }, [location]);

//   if (loadError) return <p>حدث خطأ أثناء تحميل الخريطة</p>;
//   if (!isLoaded) return <p>جارِ تحميل الخريطة...</p>;

//   return (
//     <GoogleMap
//       mapContainerStyle={mapContainerStyle}
//       zoom={15}
//       center={location || { lat: 32.9539, lng: 36.9106 }} // عمان، الأردن كقيمة افتراضية
//       options={options}
//     >
//       {location && <Marker position={location} label="أنت هنا" />}

//       {/* رسم دائرة لتوضيح نطاق البحث    32.05437728178327, 36.0936871678048*/}
//       {location && (
//         <Circle
//           center={location}
//           radius={2000}
//           options={{ fillColor: "#ADD8E6", strokeColor: "#0000FF" }}
//         />
//       )}

//       {/* عرض الأماكن القريبة */}
//       {nearbyPlaces.map((place) => (
//         <Marker key={place.place_id} position={place.geometry.location} />
//       ))}
//     </GoogleMap>
//   );
// };

// export default MapComponent;

import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Circle,
  InfoWindow,
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
};

const MapComponent = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyChiqY4rfnRHf1dYwZDRI6OmNBcSjxzQjg",
    libraries,
  });

  const [location, setLocation] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => console.error("Location access denied")
      );
    }
  }, []);

  useEffect(() => {
    if (isLoaded && location && window.google) {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      const request = {
        location,
        radius: 2000,
        type: ["restaurant", "cafe"],
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setNearbyPlaces(results);
        }
      });
    }
  }, [location, isLoaded]);

  if (loadError)
    return <div className="bg-red-100 p-4 rounded-lg">Error loading map</div>;
  if (!isLoaded)
    return <div className="bg-gray-100 p-4 rounded-lg">Loading map...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4">Nearby Places</h2>
      <div className="rounded-lg overflow-hidden shadow-lg">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={location || { lat: 32.9539, lng: 36.9106 }}
          options={options}
        >
          {location && (
            <>
              <Marker position={location} label="You are here" />
              <Circle
                center={location}
                radius={2000}
                options={{
                  fillColor: "#ADD8E6",
                  fillOpacity: 0.2,
                  strokeColor: "#4CAF50",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                }}
              />
            </>
          )}

          {nearbyPlaces.map((place) => (
            <Marker
              key={place.place_id}
              position={place.geometry.location}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              }}
              onClick={() => setSelectedPlace(place)}
            />
          ))}

          {selectedPlace && (
            <InfoWindow
              position={selectedPlace.geometry.location}
              onCloseClick={() => setSelectedPlace(null)}
            >
              <div>
                <h3 className="font-semibold">{selectedPlace.name}</h3>
                <p>{selectedPlace.vicinity}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapComponent;
