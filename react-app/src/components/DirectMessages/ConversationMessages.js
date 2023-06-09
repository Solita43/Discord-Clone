import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getConversationMessagesThunk } from "../../store/userConversationMessages";
import { getConversationsThunk } from "../../store/userconversations";
import OpenModalButton from "../OpenModalButton";
import { io } from "socket.io-client";
import "./directMessages.css";
import MessageDetails from "../MessageDetails";
import UpdateMessageModal from "../UpdateMessageModal";

// initialize socket variable outside of component
let socket;

export default function ConversationMessages({socket}) {
  let dispatch = useDispatch();
  const params = useParams();
  let { conversationId } = params;
  let conversations = useSelector((state) => state.userConversationMessages);
  let conversationList = useSelector((state) => state.userConversations);
  let currentUser = useSelector((state) => state.session.user);
  let conversation = conversations[conversationId];
  let [isLoading, setIsLoading] = useState(true);
  let [messages, setMessages] = useState([]);
  let [chatInput, setChatInput] = useState("");
  let [errors, setErrors] = useState({});
  

  let username;
  for (let key in conversationList) {
    if (
      conversationList[key] &&
      conversationList[key].conversation_id == conversationId
    ) {
      username = conversationList[key].username;
    }
  }

  useEffect(() => {
    dispatch(getConversationMessagesThunk(conversationId)).then(() =>
      setIsLoading(false)
    );
  }, [conversationId]);

  useEffect(() => {
    if (conversation && Object.keys(conversation).length)
      setMessages(conversation.messages.sort((a,b)=>{
        if (a.id < b.id){
            return -1
        }
      }));
  }, [conversations]);

  // open socket with useEffect
  useEffect(() => {
    socket.on("direct_message", (direct_message) => {
      // when we recieve a chat add to our messages array in our usestate
    //   setMessages((messages) => [...messages, direct_message]);
      // updating store
      
      dispatch(getConversationMessagesThunk(direct_message.conversationId));
      dispatch(getConversationsThunk());
    });
    socket.on("delete_direct_message", (deleted_message) => {
    //   setMessages((messages) => {
    //     return messages.filter((message) => message.id !== deleted_message.id);
    //   });
    dispatch(getConversationsThunk());
    });

    socket.on("update_direct_message", (update_direct_message) => {
      dispatch(getConversationMessagesThunk(update_direct_message.conversationId));
    });

    // when component unmount, disconnect
    return () => {
      
    };
  }, []);

  if (isLoading) return <div id="direct-messages-view"></div>;
  // send chat messages through web socket
  const sendChat = (e) => {
    e.preventDefault();

    if (chatInput.length > 255 || chatInput.length < 1) {
      setErrors({ chat: "Message must be between 1 and 255" });
      return;
    } else {
      setErrors("");
      socket.emit("direct_message", {
        message: chatInput,
        conversation_id: conversationId,
        user_id: currentUser.userId,
      });
      setChatInput("");
    }
  };
  const handleEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      sendChat(e);
    }
  };

  const deleteChat = (messageId) => {
    socket.emit("delete_direct_message", {
      messageId,
    });
  };
  if (isLoading || !conversation) {
    return <div id="direct-messages-view"></div>;
  }

  return (
    <div className="socket-container">
      {errors && <p className="errors">{errors.chat}</p>}
      <form className="channel-message-input-form" onSubmit={sendChat}>
        <textarea
          className="message-input"
          placeholder={`Message @${username}`}
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyPress={handleEnter}
        >
          {" "}
        </textarea>
      </form>

      <div id="messages-scroll">
        <div>
          {!messages.length && <h4>No messages yet...</h4>}
          <div className="test">
            {messages.map((message) => {
              return (
                <div
                  className="group-messages-buttons"
                  onMouseOver={() => {
                    const buttonbox = document.getElementById(message.id);
                    if (buttonbox) buttonbox.className = "message-update-buttons";
                  }} 
                  onMouseLeave={() => {
                    const buttonbox = document.getElementById(message.id);
                    if (buttonbox) buttonbox.className = "hidden";
                  }}
                >
                  <MessageDetails key={message.id} message={message} />
                  {message.userId === currentUser.userId && (
                    <div id={message.id} className="hidden">
                      <button
                        className="delete-message-button"
                        onClick={() => deleteChat(message.id)}
                      >
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                      <OpenModalButton
                        buttonText={<i class="fa-solid fa-gear"></i>}
                        // onItemClick={closeMenu}
                        className="update-conversation"
                        modalComponent={
                          <UpdateMessageModal message={message} socket={socket}/>
                        }
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* <div>
                {messages.map((message) => {
                    let showEmojiList = emojiList[message.id]
                    return (<div key={message.id}>
                        <div>
                            {message.UserInfo.username}
                            <img className="dm-profile-img" src={message.UserInfo.userIcon}></img>

                        </div>
                        <p>{message.createdAt}</p>
                        <div>
                            {message.message}
                            <button
                                onClick={() => buttonClick(message.id)}
                            >😊</button>
                            {showEmojiList && (
                                <ul>
                                    <li>😊</li>
                                    <li>❤️ </li>
                                    <li>👍🏻</li>
                                    <li>👀</li>
                                </ul>
                            )}

                            <DirectMessageReactions reactions={message.reactions} />
                            <div>
                                {Object.values(message.reactions).length > 0 && Object.values(message.reactions).length}
                            </div>
                        </div>
                    </div>)
                })}

            </div> */}
      </div>
    </div>
  );
}
