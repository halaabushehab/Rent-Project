import axiosInstance from "../../components/axiosConfig"; // تأكد من المسار الصحيح

export const fetchContacts = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get("/contacts.json");

    // تحويل البيانات إلى مصفوفة
    const contacts = Object.keys(response.data || {}).map((key) => ({
      id: key,
      ...response.data[key],
    }));

    dispatch({ type: "FETCH_CONTACTS", payload: contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
};
