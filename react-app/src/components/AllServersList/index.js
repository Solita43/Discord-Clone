import React, { useEffect } from "react"
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { userServersGet } from "../../store/servers";
import "./AllServersList.css"

function AllServersList() {
    const sessionUser = useSelector(state => state.session.user);
    const servers = useSelector(state => state.servers.AllServers);
    const history = useHistory();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (sessionUser) {
    //         dispatch(userServersGet(sessionUser.userId))
    //     }
    // }, [])

    if (!servers) return <div id="servers-list-container"></div>
    return (
        <div id="list-container">
            <div id="server-list-container">
                {Object.values(servers).map(server => {
                    return (
                        <div id="server-container">
                            <img src={server.imageUrl} id="server-list-icon"></img>
                            <div id="server-info">
                                <h3 id="server-list-name">{server.name}</h3>
                                <p id="user-count">{server.userCount} users</p>
                            </div>
                            <div id="server-list-edge">
                                {server.owner_id === sessionUser.userId && (<div>Owner</div>)}
                                <button className="launch-server-button" onClick={() => {
                                    return history.push(`/channels/${server.id}/${server.default_channel_id}`)
                                }}>Launch Server</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AllServersList
