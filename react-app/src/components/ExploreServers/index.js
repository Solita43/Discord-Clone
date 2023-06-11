import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getServersThunk } from "../../store/servers";
import OpenModalButton from "../OpenModalButton";
import Background2 from "../../assets/discord_home_2.png"
import './exploreServers.css'
import JoinServerModal from "../JoinServerModal";
export default function ExploreServers() {
    const dispatch = useDispatch()
    const history = useHistory()
    let servers = Object.values(useSelector((state) => state.servers.ServerList))
    let userServers = useSelector((state) => state.servers.AllServers)
    // let userServerIds = Object.keys(userServers)

    useEffect(() => {
        dispatch(getServersThunk())
    }, [dispatch])
    if (!servers.length) {
        return <div id="explore-container"></div>
    }



    const displayName = (name) => {
        for (let word of name.split(" ")) {

            if (word.length > 9) {
                return name.slice(0, 9) + "..."
            }
        }
        return name
    }

    return (
        <div id="explore-container">
            <div className="server-discover-banner">
                <div className="discover-title-area">
                    <h1 className="discover-title">Find your community</h1>
                    <p className="discover-motto">From gaming to music, to learning there's a place for you.</p>
                </div>
                <img alt="" className="discover-banner-img" src={Background2} />
            </div>

            <h2 id="featured-header">Featured Communities</h2>
            <div id="servers-list-container">
                {
                    servers.map((server) => {

                        return <div key={server.id} className="server-container">
                            <img alt={`Display icon for ${server.name}`} className="explore-server-image" src={server.imageUrl}></img>
                            <div className="server-container-bottom">
                                <div className="top-server-info">
                                    <div className="server-username">{displayName(server.name)}</div>
                                    {!(server.id in userServers) && (<div>
                                        <OpenModalButton modalComponent={< JoinServerModal server={server} />} className="launch-server-button" buttonText="Join" />
                                    </div>)}
                                    {server.id in userServers &&

                                        (<button className="launch-server-button" onClick={() => {
                                            return history.push(`/channels/${server.id}/${server.default_channel_id}`)
                                        }}
                                        >Launch Server</button>)}

                                </div>
                                <div className="server-users">{server.userCount} {server.userCount > 1 ? "users" : "user"}</div>



                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
