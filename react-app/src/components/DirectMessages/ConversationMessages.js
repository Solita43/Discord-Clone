import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { getConversationMessagesThunk } from "../../store/userConversationMessages"
import DirectMessageReactions from "./DirectMessageReactions"
import { io } from 'socket.io-client'
import './directMessages.css'

// initialize socket variable outside of component
let socket;

export default function ConversationMessages() {
    let dispatch = useDispatch()
    const params = useParams()
    let { conversationId } = params
    let conversations = useSelector((state) => state.userConversationMessages)
    let currentUser = useSelector((state) => state.session.user)
    let conversation = conversations[conversationId]
    let [isLoading, setIsLoading] = useState(true)
    let [messages, setMessages] = useState([]);
    let [chatInput, setChatInput] = useState("");
    let [errors, setErrors] = useState({});
    let [emojiList, setEmojiList] = useState({})

    const buttonClick = (messageId) => {
        setEmojiList((prev) => {
            return { ...prev, [messageId]: !prev[messageId] }
        })
    }


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
            // when we recieve a chat add to our messages array in state
            setMessages(messages => [...messages, direct_message])

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
    if (isLoading || !conversation) {
        return <></>
    }


    let emojiListClass = "emoji-list"



    return (
        <>

            <div>
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

            </div>
            <div>
                <form onSubmit={sendChat}>
                    <textarea
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                    > </textarea>
                    <button type='submit'>Send</button>

                </form>
            </div>
        </>

    )

}
