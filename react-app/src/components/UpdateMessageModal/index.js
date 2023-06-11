import React, { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { socket } from "../../socket";


export default function UpdateMessageModal({ message, isChannel }) {
    let [newChat, setNewChat] = useState(message.message)
    const { closeModal } = useModal()


    useEffect(() => {

        return (() => {

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


    return (<div id="create-server-container">
        <h1 className="create-server-title">Update message</h1>
        <form className="form-box" onSubmit={sendUpdatedMessage}>
            <label className="create-server-label">
                Message
                <textarea className="edit-message-input-area"
                    onKeyPress={handleEnter}
                    // defaultValue={message.message}
                    value={newChat}
                    onChange={(e) => setNewChat(e.target.value)}
                ></textarea>

            </label>
            <div className="delete-server-buttons">
            <button
                className="cancel-button"
                onClick={closeModal}
            >Cancel</button>
            <button id="update-message-button" type="submit"
                disabled={newChat === ''}
            >Submit</button>
            </div>

        </form>
    </div>)


}
