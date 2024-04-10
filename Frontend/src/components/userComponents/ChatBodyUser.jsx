import React, { useEffect, useState } from 'react';
import { useSocket } from '../../context/socket/socketProvider';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/axiosInterceptor.js';
import { FaImage } from "react-icons/fa";
import './chatCSS.css'

function ChatBodyUser(props) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = useSocket();
  const chatId = props.chatId;
  const role = props.role;

  useEffect(() => {
    axios.get(`chat/history?chatId=${chatId}`)
      .then((res) => {
        console.log("response in user Chat", res.data.messages);
        setMessages(res.data.messages);
      });

    // Scroll to the bottom when messages are updated
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatId]);

  const handleLeaveChat = () => {
    navigate("/user-home-page");
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log("message typed is -:", newMessage);
    if (messages.length > 0 && localStorage.getItem('userToken')) {
      const messageData = {
        from: props.role,
        message: newMessage,
        to: role === "user" ? "doctor" : "user",
        id: chatId,
      };
      console.log('CHAT USER=> BEFORE SentMessage: ', messageData);
      socket.emit("SentMessage", messageData);
      console.log('CHAT USER=> AFTER SentMessage: ', messageData);
      socket.on("SentUpdatedMessage", (updatedMessage) => {
        console.log('CHAT USER => ON SentUpdatedMessage: ', updatedMessage);
        setMessages(updatedMessage.messages);
      });
    }
    setNewMessage('');
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <>
      <div className=' '>
        <header className="chat__mainHeader">
          <p>Doctor name</p>
          <button className="leaveChat__btn" onClick={handleLeaveChat}>
            LEAVE CHAT
          </button>
        </header>

        <div id="chat-container" className="message__container bg-violet-50">
          {messages.map((data) => (
            <div className="message__chats" key={data.id}>
              {role === "user" ? (
                data.from === "user" ? (
                  <>
                    <p className="sender__name">You</p>
                    {data.message &&
                      typeof data.message === "string" &&
                      data.message.startsWith("https") ? (
                        <img
                          style={{
                            width: "auto",
                            height: "100px",
                            margin: "5px 0 15px 0",
                          }}
                          src={data.message}
                          alt="Image Preview"
                          className="image-preview"
                        />
                      ) : (
                        <div className="message__sender">
                          <p>{data.message}</p>
                          <p className="message__timestamp">{formatTime(data.timestamp)}</p>
                        </div>
                      )}
                  </>
                ) : (
                  <>
                    <p>{data.from}</p>
                    <div className="message__recipient">
                      {data.message &&
                        typeof data.message === "string" &&
                        data.message.startsWith("https") ? (
                          <img
                            style={{
                              width: "auto",
                              height: "100px",
                              margin: "5px 0 15px 0",
                            }}
                            src={data.message}
                            alt="Image Preview"
                            className="image-preview"
                          />
                        ) : (
                          <>
                            <p>{data.message}</p>
                            <p className="message__timestamp">{formatTime(data.timestamp)}</p>
                          </>
                        )}
                    </div>
                  </>
                )
              ) : data.from === "user" ? (
                <>
                  <p>{data.from}</p>
                  <div className="message__recipient">
                    {data.message &&
                      typeof data.message === "string" &&
                      data.message.startsWith("https") ? (
                        <img
                          style={{
                            width: "auto",
                            height: "100px",
                            margin: "5px 0 15px 0",
                          }}
                          src={data.message}
                          alt="Image Preview"
                          className="image-preview"
                        />
                      ) : (
                        <>
                          <p>{data.message}</p>
                          <p className="message__timestamp">{formatTime(data.timestamp)}</p>
                        </>
                      )}
                  </div>
                </>
              ) : (
                <>
                  <p className="sender__name">You</p>
                  <div className="message__sender">
                    {data.message &&
                      typeof data.message === "string" &&
                      data.message.startsWith("https") ? (
                        <img
                          style={{
                            width: "auto",
                            height: "100px",
                            margin: "5px 0 15px 0",
                          }}
                          src={data.message}
                          alt="Image Preview"
                          className="image-preview"
                        />
                      ) : (
                        <>
                          <p>{data.message}</p>
                          <p className="message__timestamp">{formatTime(data.timestamp)}</p>
                        </>
                      )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="chat__footer">
          <form className="form" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Write message"
              className="message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit" className="sendBtn">SEND</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChatBodyUser;
