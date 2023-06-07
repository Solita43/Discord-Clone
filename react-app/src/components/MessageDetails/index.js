import React, { useState, useEffect } from "react"
import { io } from 'socket.io-client'
// import Picker from '@emoji-mart/react'
// import data from '@emoji-mart/data'
import { useSelector } from "react-redux"

let socket;
export default function MessageDetails({ message }) {

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


    return (<div key={message.id}>
        <div>
            {message.UserInfo.username}
            <img className="dm-profile-img" src={message.UserInfo.userIcon}></img>

        </div>
        <p>{message.updatedAt}</p>
        <div>
            {message.message}
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
            {/* </div> */}
        </div>
    </div>)
}
