import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, unblockUser } from "../redux/actions/userActions";
import Swal from "sweetalert2"; // استيراد SweetAlert2

const BlockedUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // تصفية المستخدمين المحظورين
  const blockedUsers = users.filter((user) => user.blocked);

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Blocked Users
        </h2>

        {blockedUsers.length > 0 ? (
          blockedUsers.map((user) => (
            <div
              key={user.id}
              className="bg-gray-100 p-4 rounded-lg mb-4 shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-gray-700">
                {user.name}
              </h3>
              <p className="text-gray-500">{user.email}</p>

              <button
                onClick={() => handleUnblock(user.id)} // استدعاء الدالة مع SweetAlert
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Unblock User
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No blocked users found.</p>
        )}
      </div>
    </div>
  );
};

export default BlockedUsers;
