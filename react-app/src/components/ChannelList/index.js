import React, { useEffect, useState } from "react";
import { NavLink, Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./ChannelList.css";
import { userServersGet, serverDetailsGet } from "../../store/servers";

export default function ChannelList() {
  const params = useParams();
  console.log(params);
  const { serverId, channelId } = params;
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const serverDetails = useSelector((state) => state.servers.ServerDetails);
  const allServers = useSelector((state) => state.servers.AllServers);
  const [serverDetail, setServerDetail] = useState(null);

  useEffect(() => {
    if (!Object.keys(allServers).length) {
      dispatch(userServersGet(sessionUser.userId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (
      (Object.keys(allServers) && !serverDetails) ||
      !serverDetails[serverId]
    ) {
      dispatch(serverDetailsGet(serverId));
    }
  }, [dispatch, serverId]);

  useEffect(() => {
    setServerDetail(serverDetails);
  }, [serverDetails]);

  if (!serverDetails[serverId]) return null;

  const serverDisplay = serverDetails[serverId];
  const { channels, owner, users } = serverDisplay;
  console.log(channels, owner, users);

  const groupNames = Object.keys(channels);

  console.log("groupNames: ", groupNames);

  console.log("serverDetails", serverDisplay);
  return (
    <div className="channel-list-wrapper">
      <div className="channels-list-box">
        <ul>
          {groupNames.map((name) => {
            return (
              <>
                <li className="channel-group-name">{name}</li>
                <ul>
                    {Object.keys(channels[name]).map((channelName) => {
                        return (<li className="channel-name"> {channelName} </li>)
                    }) }
                </ul>
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
