import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
    name : 'doctor',
    initialState : {
        data : {} 
    },
    reducers: {
        
        setDoctorData : (state , action) => {
            console.log("before...",action.payload);
            state.data = action.payload;
            console.log("after update....",action.payload);
        }
    }
})


export const { setDoctorData } = doctorSlice.actions;

export default doctorSlice.reducer;