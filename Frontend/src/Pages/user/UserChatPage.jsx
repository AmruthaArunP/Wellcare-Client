import React from 'react'
import ChatBody from "../../components/userComponents/ChatBodyUser"
import ChatBar from '../../components/userComponents/ChatBarUser'
import { useLocation } from "react-router-dom";

function UserChatPage() {
  const { state } = useLocation();
  const chatId = state.appmtId;
  const doctorId = state.docId;

  return (
        <div>
        <h1>user chat page</h1>
        <div className="chat">
          <ChatBar />
          <div className="chat__main">
            <ChatBody role={"user"} chatId= {chatId} doctorId={doctorId} />
          </div>
        </div>
      </div>
  )
}

export default UserChatPage
