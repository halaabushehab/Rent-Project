import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://rent-app-a210b-default-rtdb.firebaseio.com/", // رابط قاعدة البيانات
});

export default axiosInstance;