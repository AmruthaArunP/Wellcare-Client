import { createSlice } from "@reduxjs/toolkit";

const scheduleSlice = createSlice({
    name : "schedule",
    initialState: {
        schedule: "",
      },
      reducers: {
        setScheduleData : (state, action) =>{
            state.schedule = action.payload
        },
      },
});

export const { setScheduleData } = scheduleSlice.actions;
export default scheduleSlice.reducer;
