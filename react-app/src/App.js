import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import DirectMessages from "./components/DirectMessages";
import ConversationMessages from "./components/DirectMessages/ConversationMessages";
import LandingPage from "./components/LandingPage";
import ChannelList from "./components/ChannelList";
import ChannelMessages from "./components/ChannelMessages";
import ServerUserList from "./components/ServerUserList";
import ExploreServers from "./components/ExploreServers";
import LogoutNav from "./components/LogoutNav";
import DeveloperList from "./components/DeveloperList"
import AllServersList from "./components/AllServersList";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <>
          {/* <Navigation isLoaded={isLoaded} /> */}
          {/* <TitleBar /> */}

          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <ProtectedRoute exact path="/home">

              <Navigation isLoaded={isLoaded} />
              <DirectMessages />
              <AllServersList />
              <DeveloperList />
              <LogoutNav />
              {/* <CreateConversation /> */}
            </ProtectedRoute>
            <ProtectedRoute exact path="/conversations">
              <Navigation isLoaded={isLoaded} />
              <DirectMessages />
              <DeveloperList />
              <LogoutNav />
            </ProtectedRoute>
            <ProtectedRoute exact path="/conversations/:conversationId">
              <Navigation isLoaded={isLoaded} />
              <DirectMessages />
              <ConversationMessages />
              <DeveloperList />
              <LogoutNav />
            </ProtectedRoute>
            <ProtectedRoute exact path="/channels/:serverId/:channelId">
              <Navigation isLoaded={isLoaded} />
              <ChannelList />
              <ChannelMessages />
              <ServerUserList />
              <LogoutNav />
            </ProtectedRoute>
            <ProtectedRoute exact path="/servers/explore">
              <Navigation isLoaded={isLoaded} />
              <ExploreServers />
            </ProtectedRoute>
            <Route>
              <Redirect to='/home' />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
