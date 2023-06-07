import React, { useEffect, useState } from "react";
import { NavLink, Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./ChannelList.css";
import { userServersGet, serverDetailsGet } from "../../store/servers";
import OpenModalButton from "../OpenModalButton";
import EditChannelModal from "../EditChannelModal"
import MenuDropdown from "../Navigation/MenuDropdown";
import CreateChannelModal from "../CreateChannelModal";

export default function ChannelList() {
  const params = useParams();
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

  const displayName = (name) => {
    if (name.length > 12) {
      return name.slice(0, 11) + "..."
    }
  }


  if (!serverDetails[serverId]) return null;

  const serverDisplay = serverDetails[serverId];
  const { channels, owner, users } = serverDisplay;

  const groupNames = Object.keys(channels);
  const groupIds = serverDetails[serverId].groupIds
  const defaultChannel = allServers[serverId].default_channel_id;


  return (
    <div className="channel-list-wrapper">
      <div className="channels-list-box">
        {/* <div className="server-header"> */}
        {/* <h1 className="dm-title">{displayName(allServers[serverId].name)}</h1> */}
        <div className="server-menu">
          <MenuDropdown serverId={serverId} serverName={allServers[serverId].name} />
        </div>
        {/* </div> */}
        <ul>
          {groupNames.map((name) => {
            return (
              <>
                <li className="channel-group-name"onMouseOver={(e) => {
                        const button = document.getElementById(`new-channel-button-${name}`)
                        button.className = "edit-channel-name-button"
                      }} onMouseLeave={(e) => {
                        const button = document.getElementById(`new-channel-button-${name}`)
                        button.className = "hidden"
                      }}>
                  {name}
                  <OpenModalButton id={`new-channel-button-${name}`} buttonText="Add Channel" className={"hidden"} modalComponent={<CreateChannelModal groupId={groupIds[name]} serverId={parseInt(serverId)} defaultChannel={defaultChannel}  />} />
                </li>
                <ul>
                  {Object.keys(channels[name]).map((channelName) => {
                    return (
                      <li className="channel-name" onMouseOver={(e) => {
                        const button = document.getElementById(`channel-edit-${channelName}`)
                        button.className = "edit-channel-name-button"
                      }} onMouseLeave={(e) => {
                        const button = document.getElementById(`channel-edit-${channelName}`)
                        button.className = "hidden"
                      }}>
                        {channelName}
                        <OpenModalButton id={`channel-edit-${channelName}`} buttonText="Edit" className={"hidden"} modalComponent={<EditChannelModal channels={channels} channelName={channelName} groupNames={groupNames} groupIds={groupIds} defaultChannel={defaultChannel} />} />
                      </li>
                    )
                  })}
                </ul>
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
