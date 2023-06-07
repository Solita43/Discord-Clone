import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { getConversationMessagesThunk } from "../../store/userConversationMessages"
import { getConversationsThunk } from "../../store/userconversations"
import OpenModalButton from "../OpenModalButton"
import { io } from 'socket.io-client'
import './directMessages.css'
import MessageDetails from "../MessageDetails"
import UpdateMessageModal from "../UpdateMessageModal"

// initialize socket variable outside of component
let socket;

export default function ConversationMessages() {
    let dispatch = useDispatch()
    const params = useParams()
    let { conversationId } = params
    let conversations = useSelector((state) => state.userConversationMessages)
    let conversationList = useSelector((state) => state.userConversations)
    let currentUser = useSelector((state) => state.session.user)
    let conversation = conversations[conversationId]
    let [isLoading, setIsLoading] = useState(true)
    let [messages, setMessages] = useState([]);
    let [chatInput, setChatInput] = useState("");
    let [errors, setErrors] = useState({});


    let username;
    for (let key in conversationList) {
        // console.log(conversationList[key].conversation_id);
        if (conversationList[key] && conversationList[key].conversation_id == conversationId) {
            username = conversationList[key].username
        }
    }

    // let [emojiList, setEmojiList] = useState({})

    // const buttonClick = (messageId) => {
    //     setEmojiList((prev) => {
    //         return { ...prev, [messageId]: !prev[messageId] }
    //     })
    // }


    useEffect(() => {
        dispatch(getConversationMessagesThunk(conversationId)).then(() => setIsLoading(false))
        // .then((messages) => setMessages(messages))
    }, [conversationId])

    useEffect(() => {

        if (conversation && Object.keys(conversation).length) setMessages(conversation.messages)
    }, [conversations])

    // open socket with useEffect
    useEffect(() => {
        socket = io();
        socket.on("direct_message", (direct_message) => {
            // when we recieve a chat add to our messages array in our usestate
            setMessages(messages => [...messages, direct_message])
            // updating store
            dispatch(getConversationsThunk())

        })
        socket.on("delete_direct_message", (deleted_message) => {
            setMessages(messages => {
                return messages.filter(message => message.id !== deleted_message.id)
            })
        })

        socket.on("update_direct_message", (update_direct_message) => {
            dispatch(getConversationMessagesThunk(conversationId))
            // console.log("RETURNED ID TO FIND", update_direct_message.id);
            // console.log(messages);
            // let messageIndex = messages.findIndex((message) => {
            //     console.log('indexes in messages', message.id);
            //     return message.id == update_direct_message.id
            // })

            // console.log(messageIndex);

            // setMessages(messages => {
            //     messages[messageIndex]["message"] = update_direct_message["message"]
            //     return messages
            // })

        })

        // when component unmount, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    if (isLoading) return <></>


    // let conversationMessages;
    // if (conversation) {
    //     // messages = conversation.messages
    //     setMessages(conversation.messages)
    // }
    // send chat messages through web socket
    const sendChat = (e) => {
        e.preventDefault();

        if (chatInput.length > 255 || chatInput.length < 1) {
            errors = {}
            errors.chat = "Message must be between 1 and 255"
            setErrors(errors);
            return null
        }
        else {
            socket.emit("direct_message", {
                message: chatInput,
                conversation_id: conversationId,
                user_id: currentUser.userId,
                // created_at: new Date()
            })
            setChatInput("")
        }
    }
    const handleEnter = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            sendChat(e)
        }
    }


    const deleteChat = (messageId) => {

        socket.emit("delete_direct_message", {
            messageId
        })
    }
    if (isLoading || !conversation) {
        return <div id="direct-messages-view"></div>
    }


    // let emojiListClass = "emoji-list"


    console.log("MESSAGES", messages);
    return (
        <div id="direct-messages-view">
            <div className="direct-messages-container">
                {messages.map((message) => {
                    return (<>

                        <MessageDetails key={message.id} message={message} />
                        {message.userId === currentUser.userId &&
                            (
                                <>
                                    <button
                                        onClick={() => deleteChat(message.id)}
                                    >Delete</button >
                                    <OpenModalButton
                                        buttonText="Update"
                                        // onItemClick={closeMenu}
                                        className="update-conversation"
                                        modalComponent={<UpdateMessageModal message={message} />}
                                    />
                                </>
                            )}

                    </>)
                })}

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

            </div >

            <form className="message-input-form" onSubmit={sendChat}>
                <textarea className="message-input"
                    placeholder={`Message @${username}`}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={handleEnter}
                > </textarea>


            </form>

        </div>

    )

}
