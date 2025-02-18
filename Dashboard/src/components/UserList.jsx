import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  blockUser,
  unblockUser,
  updateUserRole,
} from "../redux/actions/userActions";
import Swal from "sweetalert2";
import emailjs from "emailjs-com"; // استيراد EmailJS
import { Link } from "react-router-dom";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // إرسال بريد إلكتروني عند حظر المستخدم
  const sendBlockEmail = (userEmail) => {
    emailjs
      .send(
        "service_d1ubtmb", // Service ID من EmailJS
        "template_v686jvu", // Template ID من EmailJS
        {
          to_email: userEmail,
          message:
            "Your account has been blocked. Please contact support for more information.",
        },
        "f9sMHN6WlNLQOhP1T" // User ID من EmailJS
      )
      .then(
        (response) => {
          console.log("Email sent successfully!", response);
        },
        (error) => {
          console.error("Failed to send email:", error);
        }
      );
  };

  const handleBlock = (userId, userEmail) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, block it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(blockUser(userId));
        sendBlockEmail(userEmail); // إرسال بريد إلكتروني
        Swal.fire("Blocked!", "The user has been blocked.", "success");
      }
    });
  };

  const handleUnblock = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, unblock it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(unblockUser(userId));
        Swal.fire("Unblocked!", "The user has been unblocked.", "success");
      }
    });
  };

  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUserRole(userId, newRole));
    Swal.fire("Role Updated!", `User role changed to ${newRole}.`, "success");
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 hover:text-blue-600 transition duration-300">
        <Link to="/UserList">User List</Link>
      </h2>
      <ul className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center p-4 border-b last:border-b-0 hover:bg-gray-100 transition-all"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {user.name}
              </h3>
              <p className="text-gray-600 text-sm">{user.email}</p>
              <p className="text-gray-600 text-sm">
                Phone: {user.phone || "N/A"}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {!user.blocked ? (
                <button
                  onClick={() => handleBlock(user.id, user.email)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200 ease-in-out"
                >
                  Block
                </button>
              ) : (
                <button
                  onClick={() => handleUnblock(user.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200 ease-in-out"
                >
                  Unblock
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
