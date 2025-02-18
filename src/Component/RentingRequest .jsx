import { useState, useEffect } from "react";
import { database, ref, onValue, update } from "../Firebase/Configration";
import { getAuth } from "firebase/auth";

const RentingRequest = () => {
  const [requests, setRequests] = useState([]);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) return;

    const bookingsRef = ref(database, "bookings");
    onValue(bookingsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("🔥 All Bookings from Firebase:", data);

        const userRequests = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .filter((request) => request._uid === currentUser.uid);

        console.log("🔍 Filtered User Requests:", userRequests);
        setRequests(userRequests);
      }
    });
  }, [currentUser]);

  const handleStatusChange = (id, status) => {
    const bookingRef = ref(database, `bookings/${id}`);
    update(bookingRef, { accept: status });
    alert(`Booking has been ${status ? "Accepted" : "Rejected"}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-[90%]">
      {requests.map((request) => (
        <div
          key={request.id}
          className="bg-white rounded-lg shadow-xl overflow-hidden transition-transform transform hover:scale-105 p-6 border-l-4 text-[#EC8305]"
        >
          <h3 className="text-lg font-bold text-[#EC8305] text-lg">
            {request.name || "No Name"}
          </h3>
          <br></br>
          <p className="text-gray-500 text-lg">
            📧 {request.email || "No Email"}
          </p>
          <p className="text-gray-600 text-lg">
            📞 {request.contactNumber || "No Contact"}
          </p>
          <p className="text-gray-700 font-semibold text-lg">
            🏠 {request.roomType || "N/A"}
          </p>
          <p className="text-gray-800  font-semibold text-lg">
            🎯 Purpose:{" "}
            <span className="font-normal"> {request.purpose || "N/A"}</span>
          </p>
          <p className="text-gray-800 font-semibold text-lg">
            📅 Start Date:
            <span className="font-normal"> {request.startDate || "N/A"}</span>
          </p>
          <p className="text-gray-800 font-semibold text-lg">
            📅 End Date:{" "}
            <span className="font-normal"> {request.endDate || "N/A"}</span>
          </p>
          <p className="text-gray-800 font-semibold text-lg">
            👥 Tenants:
            <span className="font-normal"> {request.tenants || "N/A"}</span>
          </p>
          <div className="mt-6 flex  space-x-4">
            <button
              onClick={() => handleStatusChange(request.id, true)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
            >
              ✅ Accept
            </button>
            <button
              onClick={() => handleStatusChange(request.id, false)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
            >
              ❌ Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RentingRequest;
