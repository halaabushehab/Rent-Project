


import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
  
    selectedCourt: []
};




const stadiumsSlice = createSlice({
    name: 'courtInfo',
    initialState, // Fixed typo
    reducers: {
    
        fetchselectedCourt:(state,action)=>{
            state.selectedCourt=[];
            state.selectedCourt=action.payload;
        }
       
  


       
    }
});

// Correctly export actions

export const { fetchselectedCourt } = stadiumsSlice.actions;

export default stadiumsSlice.reducer;