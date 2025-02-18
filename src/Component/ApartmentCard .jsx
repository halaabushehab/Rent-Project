import { useState, useEffect } from "react";
import { database, ref, onValue } from "../Firebase/Configration";
import { getAuth } from "firebase/auth"; // استيراد Firebase Auth لجلب المستخدم الحالي

const ApartmentCard = () => {
  const [apartments, setApartments] = useState([]);
  const auth = getAuth(); // الحصول على المستخدم الحالي
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) return; // تأكد من أن هناك مستخدمًا مسجلًا

    const apartmentsRef = ref(database, "student_housing");
    onValue(apartmentsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("🔥 All Apartments from Firebase:", data); // ✅ طباعة جميع البيانات

        const userApprovedApartments = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .filter(
            (apartment) =>
              apartment.id === currentUser.uid && // ✅ الشقق التي أضافها المستخدم الحالي
              apartment.approve === true // ✅ الشقق التي وافق عليها الأدمن فقط
          );

        console.log(
          "🔍 Filtered User Approved Apartments:",
          userApprovedApartments
        );
        setApartments(userApprovedApartments);
      }
    });
  }, [currentUser]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto max-w-[90%]">
      {apartments.map((apartment) => (
        <div
          key={apartment.id}
          className="bg-white rounded-lg shadow-xl overflow-hidden transition-transform transform hover:scale-105 h-[550px]"
        >
          <div className="relative">
            <div
              className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold text-white uppercase rounded-lg 
                ${apartment.availability ? "bg-green-500" : "bg-red-500"}
              } bg-opacity-90 shadow-md`}
            >
              {apartment.availability ? "Available" : "Not Available"}
            </div>

            <img
              src={
                apartment.images
                  ? apartment.images
                  : "https://via.placeholder.com/150"
              }
              alt={apartment.name || "No Name"}
              className="w-full h-[300px] object-cover transition-opacity duration-500"
            />
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold">
              {apartment.location || "No Location"}
            </h3>
            <p className="text-gray-600">{apartment.name || "No Name"}</p>
            <p className="mt-2 text-gray-800 text-sm">
              {apartment.description || "No Description"}
            </p>
            <p className="mt-4 text-xl font-bold">
              {apartment.price} JD / Night
            </p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500">⭐ 4.96</span>
              <span className="ml-2 text-green-500">Guest favorite</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApartmentCard;
