import React from "react";
import "./TitleBar.css"
import DropDownButton from "../DropDownButton";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

function TitleBar({ serverId, title, users }) {
    const {conversationId} = useParams();
    const conversationUsers = useSelector(state => state.userConversations)
    const conversation = Object.values(conversationUsers).filter(convo => {
        return convo.conversation_id === +conversationId
    })[0]


    const header = conversationId ? conversation.username : title;
    return (
        <div className="top-bar">
                <DropDownButton serverId={serverId} title={title} />
                <div id="channel-top-title">
                    {conversationId ?(<img className="title-profile-img" src={conversation.userIcon}></img>) : null }
                    <h1 className="top-title">{header}</h1>
                </div>
        </div>
    )
}

export default TitleBar;