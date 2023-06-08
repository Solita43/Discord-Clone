import React, { useState, useEffect } from "react"
import { NavLink, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import "./ServerUserLIst.css";

export default function ServerUserList() {
    const { channelId, serverId } = useParams();
    const serverDetails = useSelector((state) => state.servers.ServerDetails);



    if (!serverDetails[serverId] || !Object.keys(serverDetails[serverId]).length) {
        return (<div className="channels-list-box"></div>)
    }

    const allUsers = serverDetails[serverId].users;
    const users = serverDetails[serverId].userRoles.users;
    const admins = serverDetails[serverId].userRoles.admins;
    const owner = serverDetails[serverId].userRoles.owner;
    console.log(users, admins, owner)


    return (
        <div id="conversations-container" className="server-user-list">


            <span>Owner</span>
            <div className="conversation-user-container">
                <div className="dm-left">
                    <img className="dm-profile-img" src={allUsers[owner[0]].userIcon}></img>
                    <p className="dm-username">{allUsers[owner[0]].username}</p>
                </div>
            </div>




            {admins.length > 0 ? <span>Admins</span> : null}
            {admins.map((userId) => {
                return (
                    <div className="conversation-user-container">
                        <div className="dm-left">
                            <img className="dm-profile-img" src={allUsers[userId].userIcon}></img>
                            <p className="dm-username">{allUsers[userId].username}</p>
                        </div>
                    </div>
                )
            })}




            {users.length > 0 ? <span>Users</span> : null}
            {users.map((userId) => {
                return (
                    <div className="conversation-user-container">
                        <div className="dm-left">
                            <img className="dm-profile-img" src={allUsers[userId].userIcon}></img>
                            <p className="dm-username">{allUsers[userId].username}</p>
                        </div>
                    </div>
                )
            })}




        </div>
    );

}