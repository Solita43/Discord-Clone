import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import DirectMessages from "./components/DirectMessages";
import ConversationMessages from "./components/DirectMessages/ConversationMessages";
import LandingPage from "./components/LandingPage";
import ChannelList from "./components/ChannelList";
import ChannelMessages from "./components/ChannelMessages";
import ServerUserList from "./components/ServerUserList";
import TitleBar from "./components/TitleBar";
import ExploreServers from "./components/ExploreServers";
import LogoutNav from "./components/LogoutNav";
import DeveloperList from "./components/DeveloperList"
// // import { createNewSocket } from "./store/onlineStatusStore";
import VoiceChannels from "./components/VoiceChannels";
import AllServersList from "./components/AllServersList";

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
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/home">
              <Navigation isLoaded={isLoaded} />
              <DirectMessages />
              <AllServersList />
              <DeveloperList />
              <LogoutNav />
              {/* <CreateConversation /> */}
            </Route>
            <Route exact path="/conversations">
              <Navigation isLoaded={isLoaded} />
              <DirectMessages />
              <DeveloperList />
              <LogoutNav />
            </Route>
            <Route exact path="/conversations/:conversationId">
              <Navigation isLoaded={isLoaded} />
              <DirectMessages />
              <ConversationMessages />
              <DeveloperList /> 
              <LogoutNav />
            </Route>
            <Route exact path="/voiceChannel/:serverId/:channelId">
              <Navigation isLoaded={isLoaded} />
              <ChannelList />
              <VoiceChannels />
              <ServerUserList />
              <LogoutNav />
            </Route>
            <Route exact path="/voiceChannel/:serverId/:channelId">
              <Navigation isLoaded={isLoaded} />
              <ChannelList />
              <VoiceChannels />
              <ServerUserList />
              <LogoutNav />
            </Route>
            <Route exact path="/voiceChannel/:serverId/:channelId">
              <Navigation isLoaded={isLoaded} />
              <ChannelList />
              <VoiceChannels />
              <ServerUserList />
              <LogoutNav />
            </Route>
            <Route exact path="/voiceChannel/:serverId/:channelId">
              <Navigation isLoaded={isLoaded} />
              <ChannelList />
              <VoiceChannels />
              <ServerUserList />
              <LogoutNav />
            </Route>
            <Route exact path="/channels/:serverId/:channelId">
              <Navigation isLoaded={isLoaded} />
              <ChannelList />
              <ChannelMessages />
              <ServerUserList />
              <LogoutNav />
            </Route>
            <Route exact path="/servers/explore">
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
