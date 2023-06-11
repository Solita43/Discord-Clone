import React from "react"
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux"
import "./AllServersList.css"

function AllServersList() {
    const sessionUser = useSelector(state => state.session.user);
    const servers = useSelector(state => state.servers.AllServers);
    const history = useHistory();

    const serverList = Object.values(servers).sort((a, b) => {
        if (a.owner_id === sessionUser.userId) {
            return - 1
        } else if (b.owner_id === sessionUser.userId) {
            return 1
        } else {
            return 0
        }
    })

    if (!serverList) return (
        <div id="list-container"></div>
    )

    return (
        <div id="list-container">
            <div id="server-list-container">
                {serverList && serverList.length > 0 ? (<h1 id="home-title">Welcome back to Discordia!</h1>) : (
                    <div id="new-user-home">
                        <h1>Welcome to Discordia! Join a server to begin...</h1>
                        <button className="launch-server-button" id="server-list-explore" onClick={() => history.push('/servers/explore')}>Explore Servers</button>
                    </div>
                )}
                {serverList.map(server => {
                    return (
                        <div key={server.id} id="server-container" onClick={() => history.push(`/channels/${server.id}/${server.default_channel_id}`)
                        }>
                            <img src={server.imageUrl} id="server-list-icon" alt={server.name}></img>
                            <div id="server-info">
                                <h3 id="server-list-name">{server.name}</h3>
                                <p id="user-count">{server.userCount} {server.userCount <= 1 ? "user" : "users"}</p>
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
