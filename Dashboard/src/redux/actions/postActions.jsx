import axiosInstance from "../../components/axiosConfig";

// إضافة منشور جديد مع Firebase Key
export const addPost = (postData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(
      "/student_housing.json",
      postData
    );
    const firebaseKey = response.data.name; // جلب الـ Key الخاص بالمنشور الجديد
    const newPost = { firebaseKey, ...postData };

    dispatch({ type: "ADD_POST", payload: newPost });
  } catch (error) {
    console.error("Error adding post:", error);
  }
};

// جلب جميع المنشورات مع Firebase Key
export const fetchPosts = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get("/student_housing.json");
    const posts = Object.keys(response.data || {}).map((firebaseKey) => ({
      firebaseKey,
      ...response.data[firebaseKey],
    }));

    dispatch({ type: "FETCH_POSTS", payload: posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

// الموافقة على منشور باستخدام Firebase Key
export const approvePost = (firebaseKey) => async (dispatch) => {
  try {
    await axiosInstance.patch(`/student_housing/${firebaseKey}.json`, {
      approve: true,
    });

    dispatch({ type: "APPROVE_POST", payload: firebaseKey });

    console.log(`Post ${firebaseKey} approved successfully.`);
  } catch (error) {
    console.error("Error approving post:", error);
  }
};

// حذف منشور (Soft Delete) باستخدام Firebase Key
export const deletePost = (firebaseKey) => async (dispatch) => {
  try {
    await axiosInstance.patch(`/student_housing/${firebaseKey}.json`, {
      isDeleted: true,
    });

    dispatch({ type: "DELETE_POST", payload: firebaseKey });
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

// جلب جميع رسائل التواصل باستخدام Firebase Key
export const fetchContacts = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get("/contacts.json");

    const contacts = Object.keys(response.data || {}).map((firebaseKey) => ({
      firebaseKey,
      ...response.data[firebaseKey],
    }));

    dispatch({ type: "FETCH_CONTACTS", payload: contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
};
