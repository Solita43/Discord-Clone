import React, { useState, useEffect } from "react"
import { NavLink, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import "./ServerUserLIst.css";

export default function ServerUserList() {
    const { channelId, serverId } = useParams();
    const serverDetails = useSelector((state) => state.servers.ServerDetails);
    const userStatuses = useSelector((state) => state.onlineStatus.UserStatus)


    if (!serverDetails[serverId] || !Object.keys(serverDetails[serverId]).length) {
        return (<div className="channels-list-box"></div>)
    }

    const allUsers = serverDetails[serverId].users;
    const users = serverDetails[serverId].userRoles.users.sort((a, b) => {
        return b - a
    });
    const admins = serverDetails[serverId].userRoles.admins.sort((a, b) => {
        return b - a
    });
    const owner = serverDetails[serverId].userRoles.owner.sort((a, b) => {
        return b - a
    });
    let ownerObj = allUsers[owner[0]]
    let ownerStatus = userStatuses[ownerObj.userId] === "online" ? true : false
    console.log("OWNER", ownerObj);
    return (
        <div id="conversations-container" className="server-user-list" style={{marginBottom: "0"}}>


            <span>Owner</span>
            <div className="conversation-user-container">
                <div className="dm-left">
                    <img className="dm-profile-img" src={allUsers[owner[0]].userIcon}
                        style={ownerStatus ? { border: "2px solid green" } : {}}
                    ></img>
                    <p className="dm-username">{allUsers[owner[0]].username}
                        {ownerStatus && (<span className="online-status">Online</span>)}
                    </p>
                </div>
            </div>




            {admins.length > 0 ? <span>Admins</span> : null}
            {admins.map((userId) => {
                let status = userStatuses[userId]
                let online = false;
                if (status === "online") {
                    online = true
                }
                return (
                    <div className="conversation-user-container">
                        <div className="dm-left">
                            <img className="dm-profile-img" src={allUsers[userId].userIcon}
                                style={online ? { border: "2px solid green" } : {}}

                            ></img>
                            <p className="dm-username">{allUsers[userId].username}
                                {online && (<span className="online-status">Online</span>)}
                            </p>
                        </div>
                    </div>
                )
            })}




            {users.length > 0 ? <span>Users</span> : null}
            {users.map((userId) => {
                let status = userStatuses[userId]
                let online = false;
                if (status === "online") {
                    online = true
                }
                return (
                    <div className="conversation-user-container">
                        <div className="dm-left">
                            <img className="dm-profile-img" src={allUsers[userId].userIcon}
                                style={online ? { border: "2px solid green" } : {}}
                            ></img>
                            <p className="dm-username">{allUsers[userId].username}
                                {online && (<span className="online-status">Online</span>)}
                            </p>
                        </div>
                    </div>
                )
            })}




        </div>
    );

}
