
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getDatabase, ref, get, set } from "firebase/database"; // وظائف Realtime Database
import { getAuth } from "firebase/auth"; // وظائف Auth
import { Link } from "react-router-dom";


export default function PropertyBooking() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    tenants: "",
    tenantNames: "",
    gender: "",
    roomType: "",
    purpose: "",
    startDate: "",
    endDate: "",
    clearanceDocument: null,
    termsAccepted: false,
  });

  const [bookingInfo, setBookingInfo] = useState({
    bookingName: "",
    recentBookings: "",
    daysUntilResponse: "",
    features: [
      "Instant Booking",
      "Lowest Price Guaranteed",
      "Verified Properties",
      "24/7 Personal Assistance",
      "5.8K+ Reviews",
    ],
  });

  // جلب بيانات المستخدم من Realtime Database من مجموعة "users" باستخدام uid
  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userRef = ref(db, "users/" + user.uid);
        get(userRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              setFormData((prev) => ({
                ...prev,
                name: userData.name || "",
                email: userData.email || "",
              }));
            } else {
              console.log("No user data available in Realtime Database");
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      clearanceDocument: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // حساب عدد الأيام بين تاريخ البداية والنهاية
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysUntilResponse = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // تحديث معلومات الحجز
    setBookingInfo({
      bookingName: formData.name,
      recentBookings:
        "Your rental application has been submitted. Please wait for our response.",
      daysUntilResponse: `We will get back to you in ${daysUntilResponse} day${
        daysUntilResponse > 1 ? "s" : ""
      }.`,
      features: bookingInfo.features,
    });

    // حفظ البيانات في Realtime Database
    const db = getDatabase();
    const bookingsRef = ref(db, "bookings/" + formData.name);
    await set(bookingsRef, {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      tenants: formData.tenants,
      tenantNames: formData.tenantNames,
      gender: formData.gender,
      roomType: formData.roomType,
      purpose: formData.purpose,
      startDate: formData.startDate,
      endDate: formData.endDate,
      clearanceDocument: formData.clearanceDocument
        ? formData.clearanceDocument.name
        : "",
    });

    // عرض تنبيه النجاح
    await Swal.fire({
      title: "Application Submitted!",
      text: "Your rental application has been submitted successfully. Please wait for our response.",
      icon: "success",
      background: "#ffcc00",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK",
    });

    // إعادة تعيين النموذج وإغلاق النافذة
    setFormData({
      name: "",
      email: "",
      contactNumber: "",
      tenants: "",
      tenantNames: "",
      gender: "",
      roomType: "",
      purpose: "",
      startDate: "",
      endDate: "",
      clearanceDocument: null,
      termsAccepted: false,
    });
    setIsVisible(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-10">
  

      {/* نموذج التطبيق */}
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-xl w-full shadow-2xl transform transition-all">
            <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
              Rental Application Form
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              {/* الاسم (مسترجع من مجموعة users في Realtime Database) */}
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                readOnly={!!formData.name}
                className="w-full p-4 border border-orange-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
              {/* البريد الإلكتروني */}
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                readOnly={!!formData.email}
                className="w-full p-4 border border-orange-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
              {/* رقم الاتصال */}
              <input
                type="tel"
                name="contactNumber"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                pattern="^[0-9]{10}$"
                title="Please enter a valid 10-digit mobile number"
                className="w-full p-4 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="tenants"
                  placeholder="Number of Tenants"
                  value={formData.tenants}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <textarea
                name="tenantNames"
                placeholder="Tenant Names (comma separated)"
                value={formData.tenantNames}
                onChange={handleChange}
                required
                className="w-full p-4 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
              <div className="grid grid-cols-2 gap-4">
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
                >
                  <option value="" disabled>
                    Select Room Type
                  </option>
                  <option value="Single Room">Single Room</option>
                  <option value="Double Room">Double Room</option>
                </select>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
                >
                  <option value="" disabled>
                    Purpose
                  </option>
                  <option value="Student">Student</option>
                  <option value="Work">Work</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split("T")[0]}  // لا يسمح باختيار تواريخ سابقة
                  className="w-full p-4 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split("T")[0]}  // لا يسمح باختيار تواريخ سابقة
                  className="w-full p-4 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
              </div>
              <input
                type="file"
                name="clearanceDocument"
                accept="application/pdf"
                onChange={handleFileChange}
                required
                className="w-full p-4 border border-orange-300 rounded-lg"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  required
                  className="h-5 w-5 text-orange-600"
                />
               <label className="text-orange-600">
  I accept the{" "}
  <Link to="/Condetion" className="underline">
    terms and conditions
  </Link>
</label>
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsVisible(false)}
                  className="w-full md:w-auto px-6 py-3 border border-orange-00 text-orange-600 rounded-md hover:bg-orange-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 bg-orange-300 text-white rounded-md shadow hover:bg-orange-700 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Rental Application Information Card */}
      <div className="bg-white border border-orange-300 rounded-xl shadow-lg p-6 w-full max-w-lg mt-10">
        <h3 className="text-2xl font-bold text-orange-600">
          iQ Great Newton House, Liverpool
        </h3>
          {/* زر فتح النموذج */}
  <button
        onClick={() => setIsVisible(true)}
        className="mt-4 w-full px-6 py-3  bg-orange-400 text-white font-bold text-xl rounded-md shadow-lg hover:bg-orange-700 transition transform hover:scale-105"
      >
        Rental Application
      </button>
        
        <p className="mt-4 text-gray-700">
          {bookingInfo.recentBookings || "No applications yet."}
        </p>
        <p className="mt-2 text-gray-700">
          {bookingInfo.daysUntilResponse ||
            "Your application will be reviewed shortly."}
        </p>
        <div className="mt-4">
          <h4 className="text-xl font-semibold text-orange-600">
            Property Features:
          </h4>
          <ul className="list-disc ml-5 text-gray-700">
            {bookingInfo.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
