import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateDataForm } from "../Redux/ShowSlice";

export default function PropertyList() {
  const userId = useSelector((state) => state.auth.user?.id);

  const dispatch = useDispatch();
  // const userId = useSelector(state => state.authSlice.user);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    location: "",
    price: "",
    images: "", // تخزين الصورة باستخدام Base64
    video: "",
    thumbnail: "",
    approve: false,
    booking_duration: "",
    daily_booking: " ",
    payment: false,
    availability: false,
    room_types: {},
  });

  const dbUrl =
    "https://rent-app-a210b-default-rtdb.firebaseio.com/student_housing.json";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, images: reader.result }); // حفظ Base64 للصورة
      };
      reader.readAsDataURL(file);
    }
  };
  const handlethumbChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, thumbnail: reader.result }); // حفظ Base64 للصورة
      };
      reader.readAsDataURL(file);
    }
  };


  async function sendDataToFirebase() {
    if (!userId) {
      alert("❌ User ID is missing. Please log in first.");
      return;
    }
    try {
      const response = await axios.post(dbUrl, {
        ...formData,
        id: userId, // إضافة userId للبيانات
      });
      console.log("Data sent successfully:", response.data);
      alert("✅ Data sent successfully ");
    } catch (error) {
      console.error("Error sending data:", error);
      alert("❌ Failed to send data to Firebase");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDataForm(formData));
    sendDataToFirebase();
    console.log("Entered Data:", ...formData);
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{ backgroundColor: "#F7F7F7" }}
    >
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: "#091057" }}
        >
          Add New Property
        </h2>

        <div className="space-y-4">
          <div className="col-span-2">
            <label
              className="block font-medium mb-1"
              style={{ color: "#091057" }}
            >
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="col-span-2">
            <label
              className="block font-medium mb-1"
              style={{ color: "#091057" }}
            >
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              rows={4}
              className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label
              className="block font-medium mb-1"
              style={{ color: "#091057" }}
            >
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label
              className="block font-medium mb-1"
              style={{ color: "#091057" }}
            >
              Price *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="mt-4">
          <label
            className="block font-medium mb-1"
            style={{ color: "#091057" }}
          >
            Upload Images *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <div className="mt-4">
          <label
            className="block font-medium mb-1"
            style={{ color: "#091057" }}
          >
            Upload Ownership document *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handlethumbChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="py-3 px-6 rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#EC8305" }}
          >
            SUBMIT YOUR REQUEST
          </button>
        </div>
      </form>

      {formData.images && (
        <img
          src={formData.images}
          alt="Preview"
          className="mt-4 w-32 h-32 object-cover"
        />
      )}
      {formData.thumbnail && (
        <img
          src={formData.thumbnail}
          alt="Preview"
          className="mt-4 w-32 h-32 object-cover"
        />
      )}
    </div>
  );
}
