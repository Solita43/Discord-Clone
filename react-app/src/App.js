import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
// import CreateConversation from "./components/DirectMessages/CreateConversation";
import LogoutNav from "./components/LogoutNav"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch, authenticate]);

  return (
    <>
      {isLoaded && (
        <>
          <Navigation isLoaded={isLoaded} />
            {/* <TitleBar /> */}
          <LogoutNav />
          <Switch>
            <Route exact path="/home">
              <DirectMessages />
              {/* <CreateConversation /> */}
            </Route>
            <Route exact path="/conversations">
              <DirectMessages />
            </Route>
            <Route exact path="/conversations/:conversationId">
              <DirectMessages />
              <ConversationMessages />
            </Route>
            <Route exact path="/channels/:serverId/:channelId">
              <ChannelList />
              <ChannelMessages />
              <ServerUserList />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
