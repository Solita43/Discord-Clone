import React, { useEffect, useState } from "react";
import "./TitleBar.css"
import DropDownButton from "../DropDownButton";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

function TitleBar({ title, users }) {
    const { serverId, conversationId } = useParams();
    const conversationUsers = useSelector(state => state.userConversations)
    const userStatuses = useSelector((state) => state.onlineStatus.UserStatus)
    const conversation = Object.values(conversationUsers).filter(convo => {
        return convo.conversation_id === +conversationId
    })[0]
    let userId
    if (conversation) {
        userId = conversation.userId
    }
    let status = userStatuses[userId]
    let online = false;
    if (status === "online") {
        online = true
    }

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(false)

        return () => setIsLoading(true)
    }, [])

 

    if (isLoading) return (<div className="top-bar"><div id="channel-top-title"></div></div>)
    
    let header = conversation ? conversation.username : title;

    return (
        <div className="top-bar">
            <DropDownButton serverId={serverId} title={title} users={users} />
            <div id="channel-top-title">
                {conversation ? (<img className="title-profile-img" src={conversation.userIcon}
                    style={online ? { border: "2px solid green" } : {}}

                ></img>) : <i className="fa-solid fa-hashtag title-icon"></i>}
                <h1 className="top-title">{header}</h1>
            </div>
        </div>
    )
}

export default TitleBar;
