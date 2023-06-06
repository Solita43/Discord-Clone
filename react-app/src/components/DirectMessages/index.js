import React, { useState, useEffect } from "react"
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { getConversationsThunk, deleteConversationThunk } from "../../store/userconversations"
import { getAllUsersThunk } from "../../store/users";
import CreateConversationModal from "../CreateConversationModal";
import OpenModalButton from "../OpenModalButton";
import './directMessages.css'
export default function DirectMessages() {

    let dispatch = useDispatch()
    let userConversations = Object.values(useSelector((state) => state.userConversations))
    let [isLoading, setIsLoading] = useState(true)
    let users = useSelector((state) => state.users)
    users = Object.values(users.allUsers)

    useEffect(() => {
        dispatch(getConversationsThunk()).then(dispatch(getAllUsersThunk())).then(setIsLoading(false))
    }, [])

    const deleteConversation = (id, userId) => {
        dispatch(deleteConversationThunk(id, userId))
    }

    if (isLoading) {
        return <></>
    }
    return (
        <>
            <div id="conversations-container">
                <div className="dm-title-div">
                    <h1 className="dm-title">Direct Messages</h1>
                    <OpenModalButton
                        buttonText="+"
                        // onItemClick={closeMenu}
                        className="add-conversation"
                        modalComponent={< CreateConversationModal users={users} />}
                    />

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
                                        <i className="fa-solid fa-xmark"
                                            onClick={() => deleteConversation(conversation.conversation_id, conversation.userId)}

                                        ></i>
                                    </div>
                                </div>
                            </NavLink>
                        </div>)
                })}
            </div >

        </>
    )
}
