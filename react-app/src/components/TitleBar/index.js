import React, { useEffect, useState } from "react";
import "./TitleBar.css"
import DropDownButton from "../DropDownButton";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

function TitleBar({ title, users }) {
    const { serverId, conversationId } = useParams();
    const conversationUsers = useSelector(state => state.userConversations)
    const conversation = Object.values(conversationUsers).filter(convo => {
        return convo.conversation_id === +conversationId
    })[0]

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(false)
    }, [])



    if (isLoading) return (<div className="top-bar"><div id="channel-top-title"></div></div>)
    const header = conversationId ? conversation.username : title;
    return (
        <div className="top-bar">
            <DropDownButton serverId={serverId} title={title} users={users} />
            <div id="channel-top-title">
                {conversationId ? (<img className="title-profile-img" src={conversation.userIcon}></img>) : <i className="fa-solid fa-hashtag title-icon"></i>}
                <h1 className="top-title">{header}</h1>
            </div>
        </div>
    )
}

export default TitleBar;