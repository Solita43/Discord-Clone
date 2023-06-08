import React, { useEffect } from "react";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navigation.css";
import { userServersGet } from "../../store/servers";
import CreateServerModal from "../CreateServerModal";
import OpenModalButton from "../OpenModalButton";
import { getConversationsThunk } from '../../store/userconversations';

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
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
    if (sessionUser) {
      dispatch(userServersGet(sessionUser.userId))
      dispatch(getConversationsThunk())
    }
  }, [sessionUser, dispatch])
  if (!isLoaded) return (<Redirect to="/" />)
  if (!servers) return null;
  const root = window.document.getElementById('root')
  root.style.display = 'flex'


  return (
  
    <div className="nav-root">
      <div className="server-nav-bar">
        <div>
          <div className="tooltip" data-tooltip={"Direct Messages"}>
            <a className="dm-anchor-tag">
              <div className="server-icons dm-div">
                <img
                  className="dm-img"
                  src="https://img.icons8.com/?size=512&id=aqOnqIFQZ4_I&format=png"
                  onClick={() => history.push(`/conversations/${firstConversation}`)}
                />
              </div>
            </a>
          </div>
          {Object.values(servers).map((server) => {
            return (
              <div
                key={server.id}
                className="tooltip"
                data-tooltip={server.name}
              >
                <NavLink to={`/channels/${server.id}/${server.default_channel_id}`}>
                  <img className="server-icons" src={server.imageUrl} />
                </NavLink>
              </div>
            );
          })}
          <div className="tooltip server icons" data-tooltip="Add a Server">
            <OpenModalButton id='create-a-server' modalComponent={<CreateServerModal title="Create a Server" />} buttonText={<i className="fa-solid fa-plus" id='create-a-server'></i>} />
          </div>
          <div className="tooltip server icons" data-tooltip="Explore Servers">
            <NavLink to="/servers/explore">
              <button><i className="fa-solid fa-plus" id='create-a-server'></i></button>

            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );

}
export default Navigation;
