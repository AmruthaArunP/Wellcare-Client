import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userData';
import doctorReducer from './doctorData';
import scheduleReducer from "./doctorSchedule";
import selectedDocReducer from './selectedDoctor'
import appointmentReducer from './appoinmentData'
import consultReducer from './consult'
import prescriptionData from './prescriptionData'
import chatSlice from './chatSlice'

export default configureStore({
    reducer : {
        user : userReducer,
        doctor : doctorReducer,
        docSchedule: scheduleReducer,
        selectedDoctor : selectedDocReducer,
        appointment: appointmentReducer,
        consult: consultReducer,
        prescription: prescriptionData,
        chatRoomId: chatSlice
    }
});