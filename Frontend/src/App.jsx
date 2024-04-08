import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Home from './Pages/home/Home';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import AdminLoginPage from './Pages/admin/AdminLoginPage';
import Otp from './Pages/Otp';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import DoctorHomePage from './Pages/doctor/DoctorHomePage';
import AdminBasePage from './Pages/admin/AdminBasePage';
import BaseAdminPage from './components/adminComponents/BaseAdminPage';
import RequireDoctor from './context/auth/RequireDoctor';
import UpdateDoctorProfilePage from './Pages/doctor/UpdateDoctorProfilePage';
import UserHomePage from './Pages/user/UserHomePage';
import UserUpdateProfile from './components/userComponents/UserUpdateProfile';
import DoctorListPage from './Pages/home/DoctorListPage';
import RequireUser from './context/auth/RequireUser';
import Addshedule from './components/doctorComponents/Addshedule';
import BookingAppoinmentPage from './Pages/user/BookingAppoinmentPage';
import PaymentDetails from './Pages/user/PaymentDetails';
import SuccessPage from './Pages/user/SuccessPage';
import ResetPasswordPage from './Pages/ResetPasswordPage';
import VideoCall from './components/VideoCall';
import FeedbackPage from './Pages/user/FeedbackPage';
import DocSuccessPage from './Pages/doctor/DocSuccessPage';
import ChatPage from './Pages/ChatPage';
import SpecialitiesPage from './Pages/home/SpecialitiesPage';
import DoctorsInSpecialityPage from './Pages/home/DoctorsInSpecialityPage';
import RequireAdmin from './context/auth/RequireAdmin';
import DoctorChatPage from './Pages/doctor/DoctorChatPage';
import UserChatPage from './Pages/user/UserChatPage';
import UserVideoCall from './components/userComponents/UserVideoCall';




function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/admin-login' element = { <AdminLoginPage/>}/>
          {/* <Route element={<RequireAdmin/>}> */}
          <Route path='/admin-homePage' element = {<AdminBasePage data={'dashboard'}/>}/>
          <Route path='/admin-doctors-details' element = {<AdminBasePage data = {'doctor'} />}/>
          <Route path='/admin-patient-details' element = {<AdminBasePage data = {'patient'}/>}/>
          <Route path='/department-details' element={<AdminBasePage data = {'department'}/>}/>
          {/* </Route> */}


          <Route path='/' element = {<Home/>}/>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage/>} />
          <Route path='/verify/:email' element={<Otp/>} />
          <Route path='/forgot-password' element={<ForgotPasswordPage/>} />
          <Route path='/reset-password/:email' element={<ResetPasswordPage/>}/>
          <Route path='/findDoctors' element={<DoctorListPage />}/>
          <Route path='/specialities' element={<SpecialitiesPage/>}/>
          <Route path='/doctors-department/:specialityName' element={<DoctorsInSpecialityPage/>}/>

          <Route element={<RequireUser/>}>
          
            <Route path='/user-home-page' element={<UserHomePage data= {'userProfile'}/>}/>
            <Route path='/user-appoinment' element={<UserHomePage data={'userAppoinment'}/>}/>
            <Route path='/user-prescription' element={<UserHomePage data={'userPrescription'}/>}/>
            <Route path='/update-user-profile' element={<UserUpdateProfile/>}/>
            <Route path='/booking-appoinment' element={<BookingAppoinmentPage/>}/>
            <Route path='/payment-details' element={<PaymentDetails/>}/>
            <Route path='/success-page' element={<SuccessPage/>}/>
            <Route path='/call/:room' element={<VideoCall value={'user'}/>} />
            <Route path='/feedback' element={<FeedbackPage />} />
            <Route path='/chat' element={<UserChatPage/>} />
            {/* <Route path='/user-call/:room' element={<UserVideoCall value={'user'}/>} /> */}
            <Route path='/user-call/:room' element={<VideoCall value={'user'}/>} />

            </Route>

         
          

          <Route path='/doctor-signup' element={<SignupPage value={'doctor'} />} />  
          <Route path='/doctor-login' element = {<LoginPage value = {'doctor'}/>}/> 
          <Route path='/doctor-emailVerification/:email'  element = {<Otp value = {'doctor'} />}/>  
          <Route path='/doctor-forgot-password' element={<ForgotPasswordPage value = {'doctor'}/>} />  
          <Route path='/doctor-reset-password/:email' element={<ResetPasswordPage value={'doctor'}/>}/>

          <Route element={<RequireDoctor/>}>
            <Route path='/doctor-home-page' element={<DoctorHomePage data={'home'}/>}/>
            <Route path='/doctor-profile' element={<DoctorHomePage data={'docProfile'}/>}/>
            <Route path='/doctor-appoinment' element={<DoctorHomePage data={'docAppoinment'}/>}/>
            <Route path='/doctor-patients-data' element={<DoctorHomePage data={'docPatient'}/>}/>
            <Route path='/doctor-consultation' element={<DoctorHomePage data={'docConsultation'}/>}/>
            <Route path='/doctor-timeSchedule' element={<DoctorHomePage data={'docSchedule'}/>}/>
            <Route path='/doctor-prscription' element={<DoctorHomePage data={'docPriscription'}/>}/>
            <Route path='/doctor-createPrscription' element={<DoctorHomePage data={'docNewPriscription'}/>}/>
            <Route path='/update-doctor-profile' element={<UpdateDoctorProfilePage />}/>
            <Route path='/add-schedule-timings' element={<DoctorHomePage data={'addTimings'}/>}/>
            <Route path='/doctor-call/:room' element={<VideoCall value={'doctor'} /> }/>
            <Route path='/doctor-success' element={<DocSuccessPage/>} />
            <Route path="/doctor-chat" element={<DoctorChatPage />} />
            {/* <Route path='/doctor-new-call/:room' element={<UserVideoCall value={'doctor'} /> }/> */}
            <Route path='/doctor-new-call/:room' element={<VideoCall value={'doctor'} /> }/>


          </Route>

      </Routes>
  </BrowserRouter>
  );
}

export default App;