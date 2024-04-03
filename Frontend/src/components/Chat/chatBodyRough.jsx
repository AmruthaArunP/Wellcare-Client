import React from 'react'

function chatBodyRough() {
  return (
    <div>
       <div>
          <header className="chat__mainHeader">
            <p>{chattingWith}</p> {/* Chatting with */}
            <button className="leaveChat__btn" onClick={handleLeaveChat}>
              LEAVE CHAT
            </button>
          </header>

          <div>
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
                <button
                  type="button"
                  className="file-btn"
                  onClick={handleFileButtonClick}
                >
                  <FaImage style={{ fontSize: "28px" }} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg, .jpeg, .png, .gif"
                  onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                    const imageFileList = e.target.files;
                    if (imageFileList && imageFileList.length > 0) {
                      const image = imageFileList[0];
                      const foldername = "Chat Image";
                      setImage(image);
                      setLoading(true);
                      const imageUrl = await uploadImage(image, foldername);
                      setViewImage(imageUrl);
                      setLoading(false);

                      // Storing the image URL in setNewMessage
                      setNewMessage(imageUrl);
                    }
                  }}
                  style={{ display: "none" }}
                />
                {loading && <div>Uploading...</div>}
                <div>
                  {image && (
                    <img
                      style={{
                        width: "auto",
                        height: "100px",
                        margin: "5px 0 15px 0",
                      }}
                      src={viewImage}
                      className="profile-image"
                    />
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Write message"
                  className="message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="sendBtn bg-lime-500">
                  SEND
                </button>
              </form>
            </div>
          </div>
        </div>
    </div>
  )
}

export default chatBodyRough
