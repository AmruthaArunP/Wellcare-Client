import React from "react";
import ChatBody from "../components/userComponents/ChatBodyUser"
import ChatBar from '../components/userComponents/ChatBarUser'
function ChatPage({ value }) {
  return (
    <>
        <div>
        <h1> chat page</h1>
        <div className="chat">
          <ChatBar />
          <div className="chat__main">
            {value === 'user' ? <ChatBody user={"user"} />: <ChatBody user={"doctor"} />}
            
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatPage;
