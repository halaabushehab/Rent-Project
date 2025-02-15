import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    name: "",
    description: "",
    location: "",
    price: "",
    images: "",
    thumbnail: "",
    availability: "pending",
    approve: "pending",
    payment: "pending",
  },
};

const showSlice = createSlice({
  name: "showData",
  initialState,
  reducers: {
    updateDataForm: (state, action) => {
      state.formData = { ...action.payload };
      state.formData.name = action.payload.name;
      state.formData.description = action.payload.description;
      state.formData.location = action.payload.location;
      state.formData.price = action.payload.price;
      state.formData.images = action.payload.images;
      state.formData.thumbnail = action.payload.thumbnail;
      // If house is not part of the state, remove the following line:
      // state.house = action.payload;
    },
  },
});

export const { updateDataForm } = showSlice.actions;
export default showSlice.reducer;
