import axiosInstance from "../../components/axiosConfig";

// جلب جميع المستخدمين
export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get("/users.json");
    const users = [];
    for (let key in response.data) {
      users.push({ id: key, ...response.data[key] });
    }
    dispatch({ type: "FETCH_USERS", payload: users });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// حظر مستخدم
export const blockUser = (userId) => async (dispatch) => {
  try {
    await axiosInstance.patch(`/users/${userId}.json`, { blocked: true });
    dispatch({ type: "BLOCK_USER", payload: userId });
  } catch (error) {
    console.error("Error blocking user:", error);
  }
};

// إضافة مستخدم جديد
export const addUser = (userData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/users.json', userData);
    const newUser = { id: response.data.name, ...userData };
    dispatch({ type: 'ADD_USER', payload: newUser });
  } catch (error) {
    console.error('Error adding user:', error);
  }
};




// إلغاء حظر مستخدم
export const unblockUser = (userId) => async (dispatch) => {
  try {
    await axiosInstance.patch(`/users/${userId}.json`, { blocked: false });
    dispatch({ type: 'UNBLOCK_USER', payload: userId });
  } catch (error) {
    console.error('Error unblocking user:', error);
  }
};


// حذف منشور
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/posts/${postId}.json`);
    dispatch({ type: 'DELETE_POST', payload: postId });
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};


//role
export const updateUserRole = (userId, newRole) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/users/${userId}/role`, {
      role: newRole,
    });
    dispatch({
      type: "UPDATE_USER_ROLE",
      payload: { userId, role: newRole },
    });
  } catch (error) {
    console.error("Error updating user role:", error);
  }
};
