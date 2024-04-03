import React, { useEffect, useState } from "react";
import ChatBody from "../../components/doctorComponents/ChatBodyDoctor";
import ChatBar from "../../components/doctorComponents/ChatBarDoctor";
import { useLocation } from "react-router-dom";


function DoctorChatPage() {
  const { state } = useLocation();
  const chatId = state.appmtId;
  const userId = state.usrId;

  return (
    <div>
      <h1>doctor chat page</h1>
      <div className="chat">
        <ChatBar />
        <div className="chat__main">
          <ChatBody role={'doctor'} chatId= {chatId} userId={userId} />
        </div>
      </div>
    </div>
  );
}

export default DoctorChatPage;
