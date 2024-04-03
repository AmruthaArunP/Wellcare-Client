import React, {useEffect, useState, useRef} from 'react'
import { useSocket } from '../../context/socket/socketProvider';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../services/axiosInterceptor.js';
import { FaImage } from "react-icons/fa";


function ChatBodyUser(props) {

  const navigate = useNavigate()
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [viewImage, setViewImage] = useState('');
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [docData, setDocData] = useState([]);
  const socket = useSocket()
  const chatId = props.chatId;
  const doctorId = props.doctorId;
  const role = props.role;

  useEffect(() => {
    axios.get(`chat/history?chatId=${chatId}`)
    .then((res) => {
      console.log("response in user Chat",res.data.messages);
      setMessages(res.data.messages)
    })
        // Scroll to the bottom when messages are updated
        const chatContainer = document.getElementById("chat-container");
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
  },[])

  const handleLeaveChat = () => {
    navigate("/user-home-page");
  };

  
  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log("message typed is -:",newMessage);
    if(messages && localStorage.getItem('userToken')){
      const messageData = {
        from: props.role,
        message: newMessage,
        to: role === "user" ? "doctor" : "user",
        id: chatId,
      };
      socket.emit("SentMessage", messageData);
      socket.on("SentUpdatedMessage", (updatedMessage) => {
        setMessages(updatedMessage.messages);
        // Closing the image preview after sending the image
        setViewImage(undefined);
        setImage(undefined);
      });
    }
    setNewMessage('');
  };

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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

      {/*This shows messages sent from you*/}
      {/* <div className="message__container">
        <div className="message__chats">
          <p className="sender__name">You</p>
          <div className="message__sender">
            <p>Hello there</p>
          </div>
        </div> */}

        {/*This shows messages received by you*/}
        {/* <div className="message__chats">
          <p>Other</p>
          <div className="message__recipient">
            <p>Hey, I'm good, you?</p>
          </div>
        </div> */}
        

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
                            <p>{data.message}</p>
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
                          <p>{data.message}</p>
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
                          <p>{data.message}</p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>



      
      <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
      {/* <button
                  type="button"
                  className="file-btn"
                  onClick={handleFileButtonClick}
                >
                  <FaImage style={{ fontSize: "28px" }} />
                </button> */}
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="sendBtn" >SEND</button>
      </form>
    </div>
</div>


      
    </>
  )
}

export default ChatBodyUser
