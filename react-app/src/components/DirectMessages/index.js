import React, { useState, useEffect } from "react"
import { NavLink, useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { getConversationsThunk, deleteConversationThunk } from "../../store/userconversations"
import { getAllUsersThunk } from "../../store/users";
import CreateConversationModal from "../CreateConversationModal";
import ConversationMessages from "./ConversationMessages";
import OpenModalButton from "../OpenModalButton";
import './directMessages.css'
import DropDownButton from "../DropDownButton";
import TitleBar from "../TitleBar";

export default function DirectMessages() {
    let dispatch = useDispatch()
    let params = useParams()
    let { conversationId } = params
    let userConversations = Object.values(useSelector((state) => state.userConversations))
    const userStatuses = useSelector((state) => state.onlineStatus.UserStatus)
    userConversations = userConversations.sort((a, b) => {
        return a.updated_at < b.updated_at ? 0 : -1
    })
    let [isLoading, setIsLoading] = useState(true)
    let users = useSelector((state) => state.users)
    users = Object.values(users.allUsers)
    const history = useHistory()

    useEffect(() => {
        dispatch(getConversationsThunk()).then(dispatch(getAllUsersThunk())).then(() => setIsLoading(false))
    }, [])

    const deleteConversation = (id, userId) => {
        dispatch(deleteConversationThunk(id, userId)).then(() => {
            if(conversationId == id){
                history.push("/home");
            }
            
        })
    }

    if (isLoading) {
        return <div id="conversations-container"></div>
    }
    return (
        <>
            <TitleBar title="Direct Messages" users={users} />
            <div id="conversations-container">
                {/* <DropDownButton title="Direct Messages" users={users} /> */}




                {userConversations.map(conversation => {
                    let userId = conversation.userId
                    let status = userStatuses[userId]
                    let online = false;
                    if (status === "online") {
                        online = true
                    }
                    return (
                        <div key={conversation.conversation_id} >
                            <NavLink to={`/conversations/${conversation['conversation_id']}`}>
                                <div className="conversation-user-container">
                                    <div className="dm-left">
                                        <img className="dm-profile-img" src={conversation.userIcon}
                                            // style={conversation.conversation_id == conversationId ? { border: "2px solid white", borderRadius: "15px" } : {}}
                                            // style={conversation.conversation_id == conversationId ? { borderRadius: "15px" } : {}}
                                            style={online ? { border: "2px solid green" } : {}}
                                        ></img>
                                        <p className="dm-username">{conversation.username}
                                            {online && (<span className="online-status">Online</span>)}
                                        </p>
                                    </div>
                                    <div className="dm-right">
                                        <i id="delete-convo" className="fa-solid fa-xmark"
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
