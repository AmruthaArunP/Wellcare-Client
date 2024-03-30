<>
{docData.name || usrData.userName ? ( // Check if doctor's name or user's name is available
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-full max-w-lg">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="font-bold text-xl">
            {user === 'user' ? (
              <div className="user-info">
                <div className="user-avatar">
                  {/* <img src={`images/${docData.image}`} alt={docData.name} className="w-12 h-12 rounded-full" /> */}
                </div>
                <div className="chat-head-txt">{docData.name ? docData.name : 'Loading'}</div>
              </div>
            ) : (
              <div className="user-info">
                <div className="user-avatar">
                  {/* <img src={usrData.image?usrData.image:usrData.picture} alt={usrData.name} className="w-12 h-12 rounded-full" /> */}
                </div>
                <div className="chat-head-txt">{usrData.userName ? usrData.userName : 'Loading'}</div>
              </div>
            )}
          </div>
          <button className="chat-end-butt" onClick={closeChat}>Close</button>
        </div>
        <div className="chat-body" style={{ minHeight: '40vh' }}>
          {chatHistory.map((e, index) => {
            const isOutgoing = !e.send;
            return (
              <div className={`message ${isOutgoing ? 'outgoing' : 'incoming'}`} key={index}>
                <div className="message-content">
                  <p>{e.message}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="chat-footer mt-4">
          <input onChange={(e) => { setMessage(e.target.value) }} className="border border-gray-300 rounded-md p-2 w-full" placeholder="Type your message" value={message} type="text" />
          <button className="chat-send-button ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={SendMessage}>
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  </div>
) : (
  <div>Loading...</div>
)}
</>