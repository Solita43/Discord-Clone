import React, { useEffect } from "react";
import { NavLink, Redirect, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navigation.css";
import { userServersGet } from "../../store/servers";
import CreateServerModal from "../CreateServerModal";
import OpenModalButton from "../OpenModalButton";
import { getConversationsThunk } from '../../store/userconversations';
import { getUsersOnlineStatus, userOnlineStatusUpdate } from "../../store/onlineStatusStore";
import { socket } from "../../socket"

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const params = useParams()
  const { serverId, conversationId } = params;



  const sessionUser = useSelector(state => state.session.user);
  const servers = useSelector(state => state.servers.AllServers);
  const history = useHistory();

  const conversations = Object.values(useSelector(state => state.userConversations))
  let firstConversation = conversations.sort((a, b) => {
    return a.updated_at < b.updated_at ? 0 : -1
  })

  if (firstConversation.length) {

    firstConversation = firstConversation[0].conversation_id

  }


  useEffect(() => {
    if (isLoaded) {
      dispatch(userServersGet(sessionUser.userId))
      dispatch(getConversationsThunk())
      dispatch(getUsersOnlineStatus())
      socket.connect(); 
      socket.on("updateUser", (user) => {
        dispatch(userOnlineStatusUpdate(user))
      })
      return () => socket.disconnect()
    }
  }, [isLoaded, dispatch])

  useEffect(() => {
    const userId = sessionUser.userId;

    socket.on("updateUser", (user) => {

      dispatch(userOnlineStatusUpdate(user))
    })

    return () => socket.disconnect()

  }, [sessionUser])
  if (!isLoaded) return (<Redirect to="/" />)
  if (!servers) return null;
  const root = window.document.getElementById('root')
  root.style.display = 'flex'

  const serverList = Object.values(servers).slice(0, 9);



  return (

    <div className="nav-root">
      <div className="server-nav-bar">
        <div>
          <div className="tooltip" data-tooltip={"Direct Messages"} style={{ paddingBottom: ".3rem", borderBottom: ".1rem solid var(--center-page)" }}>
            <a className="dm-anchor-tag" >
              <div className="server-icons dm-div" style={conversationId ? { backgroundColor: "var(--main-button-blue)", borderRadius: "15px" } : {}}>
                <i className="fa-solid fa-gamepad" onClick={() => history.push(`/conversations/${firstConversation}`)} style={{ color: "var(--text)", fontSize: "1.8rem" }}></i>
                {/* <img
                  className="dm-img"
                  src="https://img.icons8.com/?size=512&id=aqOnqIFQZ4_I&format=png"
                  onClick={() => history.push(`/conversations/${firstConversation}`)}
                /> */}
              </div>
            </a>
          </div>
          {serverList.map((server) => {

            return (
              <div
                key={server.id}
                className="tooltip"
                data-tooltip={server.name}
              >
                <NavLink to={`/channels/${server.id}/${server.default_channel_id}`}>
                  <img className="server-icons" src={server.imageUrl}
                    style={serverId == server.id ? { border: "2px solid white", borderRadius: "15px" } : {}}
                  />
                </NavLink>
              </div>
            );
          })}
          <div className="tooltip server-icons" data-tooltip="Add a Server">
            <OpenModalButton id='create-a-server' modalComponent={<CreateServerModal title="Create a Server" />} buttonText={<i className="fa-solid fa-plus" id='create-a-server'></i>} />
          </div>
          <div className="tooltip explorer-icon" data-tooltip="Explore Servers">
            <NavLink to="/servers/explore">
              <button id='create-a-server'><i className="fa-solid fa-compass" id='create-a-server'></i></button>

            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );

}
export default Navigation;
