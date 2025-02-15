import { useState, useEffect } from "react";
import axios from "axios";
import { auth, onAuthStateChanged } from "../Firebase/Configration";

const UserProfile = () => {
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "male",
    });

    const [userId, setUserId] = useState(null);
    const [rentedProperties, setRentedProperties] = useState([]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                fetchUserData(user.uid);
                fetchRentedProperties();
            }
        });
    }, []);

    const fetchUserData = async (uid) => {
        try {
            const response = await axios.get(
                `https://rent-app-a210b-default-rtdb.firebaseio.com/users/${uid}.json`
            );
            if (response.data) {
                setFormData({
                    name: response.data.name || "",
                    email: response.data.email || "",
                    phone: response.data.phone || "",  
                    gender: response.data.gender || "male",
                });
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const fetchRentedProperties = async () => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
            const fakeData = response.data.slice(0, 5).map((item, index) => ({
                id: item.id,
                title: item.title,
                totalPayment: (index + 1) * 500,
                isPaid: index % 2 === 0,
            }));
            setRentedProperties(fakeData);
        } catch (error) {
            console.error("Error fetching rented properties:", error);
        }
    };

    // ✅ تحديث البيانات عند تغيير المستخدم لمعلوماته
    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // ✅ تحديث القيم في Firebase عند تغيير `gender` أو `phone`
        if ((name === "gender" || name === "phone") && userId) {
            try {
                // ✅ التحقق من رقم الهاتف إذا كان الإدخال يخصه
                if (name === "phone") {
                    const phoneRegex = /^07\d{8}$/; // تحقق من تنسيق الهاتف الأردني
                    if (!phoneRegex.test(value)) {
                        alert("The phone number must be 10 digits long and start with 07.");
                        return;
                    }
                }

                // ✅ تحديث القيمة في Firebase
                await axios.patch(
                    `https://rent-app-a210b-default-rtdb.firebaseio.com/users/${userId}.json`,
                    { [name]: value }
                );
            } catch (error) {
                console.error(`Error updating ${name} in Firebase:`, error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userId) {
            try {
                await axios.put(
                    `https://rent-app-a210b-default-rtdb.firebaseio.com/users/${userId}.json`,
                    formData
                );
                alert("Profile updated successfully!");
            } catch (error) {
                console.error("Error updating profile:", error);
            }
        }
    };

    return (
        <div className="bg-gradient-to-b from-[#F7F7F7] to-[#EDE7FD] min-h-screen py-10 flex flex-col items-center">
            
            {/* Profile Picture Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center w-full max-w-5xl mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Profile Picture</h2>
                <img
                    className="w-40 h-40 mx-auto rounded-full object-cover mb-4"
                    src={formData.gender === "female"
                        ? "https://i.pinimg.com/736x/f4/fa/fa/f4fafaf122d00f0775aa586b8a061d0b.jpg" 
                        : "https://i.pinimg.com/736x/1a/5c/27/1a5c272b9fbd51bf655c44e1c5c2fb7f.jpg"} 
                    alt="Profile Picture"
                />
                <select
                    name="gender"
                    className="w-full border border-gray-300 rounded-md p-2"
                    value={formData.gender}
                    onChange={handleChange}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            {/* Sections Grid */}
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                {/* Account Details */}
                <div className="bg-white shadow-lg rounded-lg p-6 min-h-[400px] flex flex-col justify-between">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Account Details</h2>
                    <hr />

                    <form onSubmit={handleSubmit} className="flex-grow flex flex-col justify-between">
                        <div>
                            <div className="mt-4">
                                <label className="block text-gray-600 font-medium">Username</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mt-4">
                                <label className="block text-gray-600 font-medium">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled
                                />
                            </div>

                            <div className="mt-4">
                                <label className="block text-gray-600 font-medium">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button type="submit" className="mt-6 w-full bg-[#EC8305] hover:bg-[#d97305] text-white font-bold py-2 px-4 rounded">
                            Save Changes
                        </button>
                    </form>
                </div>

                {/* Show Your Properties */}
                <div className="bg-white shadow-lg rounded-lg p-6 min-h-[400px] flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Show Your Properties</h2>
                    <hr />
                    {rentedProperties.length > 0 ? (
                        <ul className="mt-4">
                            {rentedProperties.map((property) => (
                                <li key={property.id} className="border-b py-2">
                                    <h3 className="text-md font-semibold">{property.title}</h3>
                                    <p>Total Payment: ${property.totalPayment}</p>
                                    <p>Status: {property.isPaid ? <span className="text-green-500">Paid</span> : <span className="text-red-500">Unpaid</span>}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 mt-4">No properties rented yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
