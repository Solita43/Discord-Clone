
import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { getConversationMessagesThunk } from "../../store/userConversationMessages"
import { io } from 'socket.io-client'
import './directMessages.css'

export default function DirectMessageReactions({ reactions }) {
    let dispatch = useDispatch()
    reactions = Object.values(reactions)



    return (<>

        {reactions.map((reaction, i) => {

            return (<div key={i}>
                {reaction.emoji}
            </div>)
        })}

    </>)
}
