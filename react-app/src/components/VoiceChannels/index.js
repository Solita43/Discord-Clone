import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getChannelMessagesThunk } from "../../store/channels";
import UpdateMessageModal from "../UpdateMessageModal";
import MessageDetails from "../MessageDetails";
import OpenModalButton from "../OpenModalButton";
import socketio from "socket.io-client";



export default function VoiceChannels() {
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    }

    const { serverId, channelId } = useParams();
    const localUsername = getRandomIntInclusive(1, 100);
    const roomName = channelId;
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    
    const socket = socketio({
        autoConnect: false,
    });

    let pc; // For RTCPeerConnection Object

    const sendData = (data) => {
        socket.emit("data", {
            username: localUsername,
            room: roomName,
            data: data,
        });
    };

    const startConnection = () => {
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
                video: false,
            })
            .then((stream) => {
                console.log("Local Stream found");
                localVideoRef.current.srcObject = stream;
                socket.connect();
                socket.emit("join", { username: localUsername, room: roomName });
            })
            .catch((error) => {
                console.error("Stream not found: ", error);
            });
    };

    const onIceCandidate = (event) => {
        if (event.candidate) {
            console.log("Sending ICE candidate");
            sendData({
                type: "candidate",
                candidate: event.candidate,
            });
        }
    };

    const onTrack = (event) => {
        console.log("Adding remote track");
        remoteVideoRef.current.srcObject = event.streams[0];
    };

    const createPeerConnection = () => {
        try {
            pc = new RTCPeerConnection({});
            pc.onicecandidate = onIceCandidate;
            pc.ontrack = onTrack;
            const localStream = localVideoRef.current.srcObject;
            for (const track of localStream.getTracks()) {
                pc.addTrack(track, localStream);
            }
            console.log("PeerConnection created");
        } catch (error) {
            console.error("PeerConnection failed: ", error);
        }
    };

    const setAndSendLocalDescription = (sessionDescription) => {
        pc.setLocalDescription(sessionDescription);
        console.log("Local description set");
        sendData(sessionDescription);
    };

    const sendOffer = () => {
        console.log("Sending offer");
        pc.createOffer().then(setAndSendLocalDescription, (error) => {
            console.error("Send offer failed: ", error);
        });
    };

    const sendAnswer = () => {
        console.log("Sending answer");
        pc.createAnswer().then(setAndSendLocalDescription, (error) => {
            console.error("Send answer failed: ", error);
        });
    };

    const signalingDataHandler = (data) => {
        if (data.type === "offer") {
            createPeerConnection();
            pc.setRemoteDescription(new RTCSessionDescription(data));
            sendAnswer();
        } else if (data.type === "answer") {
            pc.setRemoteDescription(new RTCSessionDescription(data));
        } else if (data.type === "candidate") {
            pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        } else {
            console.log("Unknown Data");
        }
    };

    socket.on("ready", () => {
        console.log("Ready to Connect!");
        createPeerConnection();
        sendOffer();
    });

    socket.on("data", (data) => {
        console.log("Data received: ", data);
        signalingDataHandler(data);
    });

    useEffect(() => {
        startConnection();
        return function cleanup() {
            pc?.close();
        };
    }, []);

    return (
        <div>
            <label>{"Username: " + localUsername}</label>
            <label>{"Room Id: " + roomName}</label>
            <audio autoPlay muted playsInline ref={localVideoRef} />
            <audio autoPlay playsInline ref={remoteVideoRef} />
        </div>
    );
}
