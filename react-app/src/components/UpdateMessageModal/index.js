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


    return (<div id="form-container">
        <h1 className="form-title">Update message</h1>
        <form className="form-box" onSubmit={sendUpdatedMessage}>
            <label className="signup-labels">
                Message
                <textarea className="input-area"
                    onKeyPress={handleEnter}
                    // defaultValue={message.message}
                    value={newChat}
                    onChange={(e) => setNewChat(e.target.value)}
                ></textarea>

            </label>
            <button
                className="form-button"
                onClick={closeModal}
            >Cancel</button>
            <button className="form-button" type="submit"
                disabled={newChat === ''}
            >Submit</button>

        </form>
    </div>)


}
