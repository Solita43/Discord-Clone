import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getChannelMessagesThunk } from "../../store/channels";
import UpdateMessageModal from "../UpdateMessageModal";
import MessageDetails from "../MessageDetails";
import OpenModalButton from "../OpenModalButton";
import { socket } from "../../socket";



const videoGrid = React.forwardRef((props, ref) => {
    return <div ref={ref} id="video-grid"></div>
})

// const myVideo = React.forwardRef((props, ref) => {
//     return <video ref={ref} ></video>
// })
export default function VoiceChannels() {
    let dispatch = useDispatch();
    const { channelId, serverId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const channels = useSelector((state) => state.channels);
    const servers = useSelector((state) => state.servers.serverDetails);
    console.log("Session User", sessionUser)

    const addVideoStream = (video, stream) => {
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', () => video.play())
        videoGrid.current.append(video)
    }

    const connectToNewUser = (userId, stream) => {
        // const call = 
    }
    
    useEffect(() => {
        socket.emit("joinVoiceChannel", [sessionUser.userId, channelId])
        socket.on("userConnect", (data) => {
            console.log(data)
            
        })

        const myVideo = document.createElement('video')
        myVideo.muted = true;
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(stream => {
            addVideoStream(myVideo, stream) 
        })
    }, [])
    
    console.log(videoGrid)




    return (
        <div className="socket-container">
            {sessionUser.id}
            <videoGrid ref={videoGrid} />
            {/* <myVideo ref={myVideo} /> */}
        </div>
    )
}