import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { getChannelMessagesThunk } from "../../store/channels"
import { io } from "socket.io-client"
import UpdateMessageModal from "../UpdateMessageModal"
import MessageDetails from "../MessageDetails"
import OpenModalButton from "../OpenModalButton"

let socket;

export default function ChannelMessages() {
    let dispatch = useDispatch()
    let params = useParams()

    let { channelId, serverId } = params



    let channels = useSelector((state) => state.channels)
    let servers = useSelector((state) => state.servers.ServerDetails)
    let server = servers[serverId]
    let channelName;
    if (server) {

        channelName = server["channelIds"][channelId]
    }

    let currentUser = useSelector((state) => state.session.user)
    let [isLoading, setIsLoading] = useState(true)
    let [messages, setMessages] = useState([])
    let [chatInput, setChatInput] = useState("")
    let [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(getChannelMessagesThunk(channelId)).then(() => setIsLoading(false))


    }, [channelId])
    useEffect(() => {
        if (channels[channelId]) {
            setMessages(channels[channelId])
        }
    }, [channels])



    useEffect(() => {
        socket = io();

        socket.on("channel_message", (channel_message) => {

            if (channelId == channel_message.channelId) {
                setMessages(messages => [...messages, channel_message])

            }
        })
        socket.on("delete_channel_message", (deleted_message) => {
            setMessages((messages) => {
                return messages.filter(message => message.id !== deleted_message.id)
            })
        })

        socket.on("update_channel_message", (channel_message) => {
            dispatch(getChannelMessagesThunk(channelId))

        })

        return (() => {
            socket.disconnect()
        })
    }, [])

    const handleEnter = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            sendChat(e)
        }
    }

    // send messages through web socket
    const sendChat = (e) => {
        e.preventDefault()
        if (chatInput.length > 255 || chatInput < 1) {
            setErrors({ chat: "Message must be between 1 and 255" })
        }
        else {
            socket.emit("channel_message", {
                message: chatInput,
                user_id: currentUser.userId,
                channel_id: channelId
            })
        }

        setChatInput("")
    }

    const deleteChat = (messageId) => {
        socket.emit("delete_channel_message", {
            message_id: messageId
        })

    }

    if (isLoading) return (<div style={{width: "100%"}}></div>)

    return (
        <div style={{width: "100%"}}>
            <div>
                {messages && messages.map((message) => {
                    return (
                        <>

                            <MessageDetails key={message.id} message={message} />

                            {message.userId === currentUser.userId && (
                                <>
                                    <button onClick={() => deleteChat(message.id)}>Delete</button>
                                    <OpenModalButton modalComponent={<UpdateMessageModal isChannel={true} message={message} />} buttonText={"Update"} className={"update-conversation"} />

                                </>
                            )}
                        </>)
                })}
            </div>
            <form className="message-input-form" onSubmit={sendChat}>
                <textarea className="message-input"
                    placeholder={`Message #${channelName ? channelName : ''}`}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={handleEnter}
                ></textarea>
            </form>
        </div>
    )
}
