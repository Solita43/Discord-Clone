import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addServerUserThunk, getServersThunk } from "../../store/servers";
import OpenModalButton from "../OpenModalButton";

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
    }, [])
    if (!servers.length) {
        return <h2>Featured Communities</h2>
    }

    const handleClick = (server) => {
        dispatch(addServerUserThunk(server.id))
    }

    return (
        <div id="explore-container">
            <h2 id="featured-header">Featured Communities</h2>
            <div id="servers-list-container">
                {
                    servers.map((server) => {

                        return <div key={server.id} className="server-container">
                            <img className="explore-server-image" src={server.imageUrl}></img>
                            <div className="server-container-bottom">
                                <div>{server.name}</div>
                                <div>{server.userCount} users</div>


                                {!(server.id in userServers) && (<div>
                                    <OpenModalButton modalComponent={< JoinServerModal server={server} />} buttonText="Join" />
                                </div>)}

                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
