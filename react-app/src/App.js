import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import DirectMessages from "./components/DirectMessages";
import ConversationMessages from "./components/DirectMessages/ConversationMessages";
import LandingPage from "./components/LandingPage";
import ChannelList from "./components/ChannelList";
import ChannelMessages from "./components/ChannelMessages";
import ServerUserList from "./components/ServerUserList";
import TitleBar from "./components/TitleBar"
import ExploreServers from "./components/ExploreServers";
// import CreateConversation from "./components/DirectMessages/CreateConversation";
import LogoutNav from "./components/LogoutNav"
import { io } from "socket.io-client";
import { createNewSocket } from "./store/onlineStatusStore";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch, authenticate]);

  return (
    <>
      {isLoaded && (
        <>
          {/* <Navigation isLoaded={isLoaded} /> */}
          {/* <TitleBar /> */}

          <Switch>
            <Route exact path="/home">
              <Navigation isLoaded={isLoaded} />
              <DirectMessages />
              <LogoutNav />
              {/* <CreateConversation /> */}
            </Route>
            <Route exact path="/conversations">
              <Navigation isLoaded={isLoaded} />
              <DirectMessages />
              <LogoutNav />
            </Route>
            <Route exact path="/conversations/:conversationId">
              <Navigation isLoaded={isLoaded} />
              <DirectMessages />
              <ConversationMessages />
              <LogoutNav />
            </Route>
            <Route exact path="/channels/:serverId/:channelId">
              <Navigation isLoaded={isLoaded} />
              <ChannelList />
              <ChannelMessages />
              <ServerUserList />
              <LogoutNav />
            </Route>
            <Route exact path='/servers/explore'>
              <Navigation isLoaded={isLoaded} />
              <ExploreServers />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
