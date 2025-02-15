import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  blockUser,
  unblockUser,
  updateUserRole, // تأكد من أن هذه الدالة مضافة في الأكشن
} from "../redux/actions/userActions";
import Swal from "sweetalert2"; // استيراد SweetAlert2

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleBlock = (userId) => {
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
        dispatch(unblockUser(userId)); // تأكد من أنك قد أنشأت إجراء unblockUser في أكشن
        Swal.fire("Unblocked!", "The user has been unblocked.", "success");
      }
    });
  };

  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUserRole(userId, newRole)); // تأكد من أنك قد أنشأت إجراء updateUserRole في أكشن
    Swal.fire("Role Updated!", `User role changed to ${newRole}.`, "success");
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        User List
      </h2>

      <ul className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center p-4 border-b dark:border-gray-600 last:border-b-0 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {user.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {user.email}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {!user.blocked ? (
                <button
                  onClick={() => handleBlock(user.id)}
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
