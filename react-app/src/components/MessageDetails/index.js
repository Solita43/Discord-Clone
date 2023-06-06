import React, { useState, useEffect } from "react"
import DirectMessageReactions from "../DirectMessages/DirectMessageReactions"


export default function MessageDetails({ message }) {

    let [emojiList, setEmojiList] = useState({})
    let showEmojiList = emojiList[message.id]

    const buttonClick = (messageId) => {
        setEmojiList((prev) => {
            return { ...prev, [messageId]: !prev[messageId] }
        })
    }


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
}
