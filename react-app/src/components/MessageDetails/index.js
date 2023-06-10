import React, { useState, useEffect } from "react"
// import Picker from '@emoji-mart/react'
// import data from '@emoji-mart/data'
import { useSelector } from "react-redux"
import OpenModalButton from "../OpenModalButton"
import UpdateMessageModal from "../UpdateMessageModal"


export default function MessageDetails({ message, deleteChat, currentUser }) {

    let [emojiList, setEmojiList] = useState({})
    let showEmojiList = emojiList[message.id]
    // let [reactions, setReactions] = useState(Object.values(message.reactions))
    // let reactSet = new Set(reactions)
    let user = useSelector((state) => state.session.user)
    const buttonClick = (messageId) => {
        setEmojiList((prev) => {
            return { ...prev, [messageId]: !prev[messageId] }
        })
    }

    // useEffect(() => {
    //     socket = io();
    //     socket.on("add_reaction_direct", (direct_reaction) => {
    //         // when we recieve a chat add to our messages array in state
    //         setReactions(reactions => [...reactions, direct_reaction])


    //     })

    //     // when component unmount, disconnect
    //     return (() => {
    //         socket.disconnect()
    //     })
    // }, [])

    // const sendReaction = (e) => {
    //     let reaction = e.native

    //     socket.emit("add_reaction_direct", {
    //         message_id: message.id,
    //         reaction,
    //         user_id: user.userId
    //     })

    // }


    return (
        <div className="container-messages" key={message.id}>
            <div className="top-message">
                <div className="message-user-img">
                    <img className="dm-profile-img" src={message.UserInfo.userIcon}></img>
                </div>
                <div className="message-info">

                    <div className="message-user-info"

                    >
                        {message.UserInfo.username}
                        {/* changed to view date in correct time zone  */}
                        <p className="message-time-updated">{new Date(message.updatedAt + " UTC").toLocaleString()}</p>
                    </div>
                </div>
                {message.userId === currentUser.userId && (
                    <div id={message.id} className="hidden">
                        <button className="delete-message-button" onClick={() => deleteChat(message.id)}>
                            <i className="fa-solid fa-trash-can"></i>
                        </button>
                        <OpenModalButton
                            modalComponent={
                                <UpdateMessageModal
                                    isChannel={true}
                                    message={message}
                                />
                            }
                            buttonText={<i className="fa-solid fa-gear"></i>}
                            className={"update-conversation"}
                        />
                    </div>
                )}
                {/* <button
                onClick={() => buttonClick(message.id)}
            >😊</button> */}
                {/* {showEmojiList && <Picker data={data} onEmojiSelect={sendReaction} />} */}

                {/* <DirectMessageReactions reactions={reactions.emoji} /> */}
                {/* <div> */}
                {/* {Object.values(reactions).length > 0 && Object.values(reactions).length} */}
                {/* <div>
                    {reactions.map(reaction => {
                        return <span>{reaction.emoji}</span>
                    })}
                </div> */}
            </div>
            <p className="message-text">{message.message}</p>
        </div>
    )
}
