import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateDataForm } from "../Redux/ShowSlice";

export default function PropertyList() {
  const userId = useSelector((state) => state.auth.user?.id);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(true); // المودال مفتوح تلقائياً
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    price: "",
    images: [],
    thumbnail: "",
  });

  const dbUrl =
    "https://rent-app-a210b-default-rtdb.firebaseio.com/student_housing.json";

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ...newImages],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleThumbChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, thumbnail: reader.result }));
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
      await axios.post(dbUrl, { ...formData, id: userId });
      alert("✅ Data sent successfully");
      setIsOpen(false); // إغلاق المودال بعد الإرسال
    } catch (error) {
      alert("❌ Failed to send data");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDataForm(formData));
    sendDataToFirebase();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative overflow-y-auto max-h-[85vh] border-2 border-[#FF6900]">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">
              Add New Property
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-1 text-blue-900">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1 text-blue-900">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block font-medium mb-1 text-blue-900">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-blue-900">
                    Price *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block font-medium mb-1 text-blue-900">
                  Upload Images *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500"
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block font-medium mb-1 text-blue-900">
                  Upload Ownership Document *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-orange-500"
                  required
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-4 p-2">
                {formData.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Preview ${index + 1}`}
                    className="w-32 h-32 object-cover rounded shadow-lg"
                  />
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="py-3 px-6 rounded-lg text-white bg-orange-500 hover:opacity-90"
                >
                  SUBMIT YOUR REQUEST
                </button>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl"
              >
                &times;
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
