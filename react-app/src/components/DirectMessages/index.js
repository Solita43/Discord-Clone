import React, { useState, useEffect } from "react"
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { getConversationsThunk } from "../../store/userconversations"
import './directMessages.css'
export default function DirectMessages() {

    let dispatch = useDispatch()
    let userConversations = Object.values(useSelector((state) => state.userConversations))
    let [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        dispatch(getConversationsThunk()).then(setIsLoading(false))
    }, [])

    if (isLoading) {
        return <></>
    }
    return <div id="conversations-container">
        {userConversations.map(conversation => {
            return (
                <div key={conversation.conversation_id} >
                    <NavLink to={`/conversations/${conversation['conversation_id']}`}>
                        <div className="conversation-user-container">
                            <img src={conversation.userIcon}></img>
                            <p>{conversation.username}</p>
                        </div>
                    </NavLink>
                </div>)
        })}
    </div>
}
