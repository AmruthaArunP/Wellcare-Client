import { createSlice } from "@reduxjs/toolkit";

const selectedDoctorSlice = createSlice({
    name : "selectedDoctor",
    initialState : {
        doc : '',
    },
    reducers : {
        setDoc : (state, action) => {
            state.doc = action.payload;
        },
    },
});

export const {setDoc} = selectedDoctorSlice.actions;
export default selectedDoctorSlice.reducer;