import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { getConversationMessagesThunk } from "../../store/userConversationMessages"
import { io } from 'socket.io-client'

// initialize socket variable outside of component
let socket;

export default function ConversationMessages() {
    let dispatch = useDispatch()
    const params = useParams()
    let { conversationId } = params
    let conversations = useSelector((state) => state.userConversationMessages)
    let conversation = conversations[conversationId]
    let conversationMessages;
    if (conversation) {
        conversationMessages = conversation.messages
    }
    let [isLoading, setIsLoading] = useState(true)
    let [messages, setMessages] = useState([]);
    let [chatInput, setChatInput] = useState("");
    let [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getConversationMessagesThunk()).then(setIsLoading(false))
    }, [])

    // open socket with useEffect
    useEffect(() => {
        socket = io();
        socket.on("direct_message", (direct_message) => {
            // when we recieve a chat add to our messages arrayin state
            setMessages(messages => [...messages, direct_message])
        })

        // when component unmount, disconnect
        return (() => {
            socket.disconnect()
        })
    })

    // send chat messages through web socket
    const sendChat = (e) => {
        e.preventDefault();

        if (chatInput.length > 255 || chatInput.length < 1) {
            errors = {}
            errors.chat = "Message must be between 1 and 255"
            setErrors(errors)
        }
    }

    if (isLoading) {
        return <></>
    }

    return (
        <div>
            {conversationMessages.map((message) => {
                return (<div>
                    <p>{message.createdAt}</p>
                    {message.text}
                </div>)
            })}

        </div>

    )

}
