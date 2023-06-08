import React, { useEffect, useState } from "react";
import { NavLink, Redirect, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./ChannelList.css";
import { userServersGet, serverDetailsGet } from "../../store/servers";
import OpenModalButton from "../OpenModalButton";
import EditChannelModal from "../EditChannelModal"
import MenuDropdown from "../Navigation/MenuDropdown";
import CreateChannelModal from "../CreateChannelModal";
import DropDownButton from "../DropDownButton";
import TitleBar from "../TitleBar";

export default function ChannelList() {
  const params = useParams();
  const history = useHistory();
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
    setServerDetail(serverDetails)
  }, [serverDetails]);


  if (!serverDetails[serverId]) {
    return <div id="conversations-container"></div>
  }

  const serverDisplay = serverDetails[serverId];
  const { channels, owner, users } = serverDisplay;

  const groupNames = Object.keys(channels);
  const groupIds = serverDetails[serverId].groupIds
  const defaultChannel = allServers[serverId].default_channel_id;

  const displayName = (name) => {
    if (name.length > 14) {
      return name.slice(0, 14) + "..."
    } else {
      return name
    }
  }

  return (
    <>
      <TitleBar serverId={serverId} title={displayName(allServers[serverId].name)} />
      <div id="conversations-container">
        {/* <div className="server-header"> */}
        {/* <h1 className="dm-title">{displayName(allServers[serverId].name)}</h1> */}
          {/* <DropDownButton serverId={serverId} title={displayName(allServers[serverId].name)} /> */}

        {
          groupNames.map(name => {
            return (
              <div key={name}>
                <div className="group-container" onMouseOver={(e) => {
                  const button = document.getElementById(`new-channel-button-${name}`)
                  button.className = "edit-channel-name-button"
                }} onMouseLeave={(e) => {
                  const button = document.getElementById(`new-channel-button-${name}`)
                  button.className = "hidden"
                }}>
                  {name}
                  <OpenModalButton id={`new-channel-button-${name}`} buttonText={(<i className="fa-solid fa-plus add-channel"></i>)} className={"hidden"} modalComponent={<CreateChannelModal groupId={groupIds[name]} serverId={parseInt(serverId)} defaultChannel={defaultChannel} />} />
                </div>
                {Object.keys(channels[name]).map((channelName) => {
                  return (
                    <div className="channel-container" onMouseOver={(e) => {
                      const button = document.getElementById(`channel-edit-${channelName}`)
                      button.className = "edit-channel-name-button"
                    }} onMouseLeave={(e) => {
                      const button = document.getElementById(`channel-edit-${channelName}`)
                      button.className = "hidden"
                    }} onClick={() => history.push(`/channels/${serverId}/${channels[name][channelName].id}`)}>
                      <span id="channel"><i class="fa-solid fa-hashtag"></i>{channelName}</span>
                      <OpenModalButton id={`channel-edit-${channelName}`} buttonText={(<i class="fa-solid fa-gear"></i>) }className={"hidden"} modalComponent={<EditChannelModal channels={channels} channelName={channelName} groupNames={groupNames} groupIds={groupIds} defaultChannel={defaultChannel} />} />
                    </div>
                  )
                })}
              </div>
            )
          })
        }
      </div>
    </>);


  {/* </div> */ }
  {/* <ul>
        {groupNames.map((name) => {
          return (
            <>
              <li className="channel-group-name" onMouseOver={(e) => {
                const button = document.getElementById(`new-channel-button-${name}`)
                button.className = "edit-channel-name-button"
              }} onMouseLeave={(e) => {
                const button = document.getElementById(`new-channel-button-${name}`)
                button.className = "hidden"
              }}>
                {name}
                <OpenModalButton id={`new-channel-button-${name}`} buttonText="Add Channel" className={"hidden"} modalComponent={<CreateChannelModal groupId={groupIds[name]} serverId={parseInt(serverId)} defaultChannel={defaultChannel} />} />
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
                    }} onClick={() => history.push(`/channels/${serverId}/${channels[name][channelName].id}`)}>
                      {channelName}
                      <OpenModalButton id={`channel-edit-${channelName}`} buttonText="Edit" className={"hidden"} modalComponent={<EditChannelModal channels={channels} channelName={channelName} groupNames={groupNames} groupIds={groupIds} defaultChannel={defaultChannel} />} />
                    </li>
                  )
                })}
              </ul>
            </>
          );
        })}
      </ul> */}



}
