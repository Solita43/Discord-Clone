import React, { useEffect, useState } from "react";
import { useModal } from "../../context/Modal"
import { io } from 'socket.io-client'

let socket;
export default function UpdateMessageModal({ message, isChannel }) {
    let [newChat, setNewChat] = useState(message.message)
    const { closeModal } = useModal()


    useEffect(() => {
        socket = io();

        return (() => {
            socket.disconnect()
        })
    }, [])

    const handleEnter = (e) => {


        if (e.key === "Enter" && !e.shiftKey) {
            //trigger socket here
            sendUpdatedMessage(e)
        }
    }
    const sendUpdatedMessage = (e) => {
        e.preventDefault()
        if (isChannel) {
            socket.emit("update_channel_message", {
                message: newChat,
                message_id: message.id
            })
        } else {
            socket.emit("update_direct_message", {
                message: newChat,
                messageId: message.id
            })
        }
        closeModal()

    }


    return (<div>
        <h1 className="form-title">Update message</h1>
        <form onSubmit={sendUpdatedMessage}>
            <label>
                Message
                <textarea className="message-input"
                    onKeyPress={handleEnter}
                    // defaultValue={message.message}
                    value={newChat}
                    onChange={(e) => setNewChat(e.target.value)}
                ></textarea>

            </label>
            <button
                onClick={closeModal}
            >Cancel</button>
            <button type="submit">Submit</button>

        </form>
    </div>)


}
