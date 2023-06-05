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
    return (
        <div id="conversations-container">
            <div className="dm-title-div">
                <h1 className="dm-title">Direct Messages</h1>
            </div>
            {userConversations.map(conversation => {
                return (
                    <div key={conversation.conversation_id} >
                        <NavLink to={`/conversations/${conversation['conversation_id']}`}>
                            <div className="conversation-user-container">
                                <div className="dm-left">
                                    <img className="dm-profile-img" src={conversation.userIcon}></img>
                                    <p className="dm-username">{conversation.username}</p>
                                </div>
                                <div className="dm-right">
                                    <i className="fa-solid fa-xmark"></i>
                                </div>
                            </div>
                        </NavLink>
                    </div>)
            })}
        </div>
    )
}
