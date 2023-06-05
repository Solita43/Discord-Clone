
import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { getConversationMessagesThunk } from "../../store/userConversationMessages"
import { io } from 'socket.io-client'
import './directMessages.css'

export default function DirectMessageReactions({ reactions }) {
    let dispatch = useDispatch()
    reactions = Object.values(reactions)
    console.log("EMOJIS", reactions);


    return (<>
        {reactions.map((reaction, i) => {
            <div key={i}>
                {reaction.emoji}
            </div>
        })}

    </>)
}
