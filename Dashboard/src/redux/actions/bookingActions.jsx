import axiosInstance from "../../components/axiosConfig"; // استيراد axiosInstance

export const fetchBookings = () => async (dispatch) => {
  try {
    // استدعاء API لجلب الحجوزات من Firebase
    const response = await axiosInstance.get("/bookings.json"); // أضف .json لنقطة النهاية
    const bookingsData = response.data; // البيانات المرجعة من Firebase

    dispatch({ type: "FETCH_BOOKINGS_SUCCESS", payload: bookingsData });
  } catch (error) {
    dispatch({ type: "FETCH_BOOKINGS_FAILURE", payload: error.message });
  }
};
