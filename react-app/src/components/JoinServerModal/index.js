import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import {
    addServerUserThunk,
    serverDetailsGet,
    userServersGet,
} from "../../store/servers";
import "./JoinServerModal.css";

export default function JoinServerModal({ server }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const { closeModal } = useModal();

    const handleSubmit = async e => {
        e.preventDefault();
        let body = { userId: user.userId, role: "user" };
        await dispatch(addServerUserThunk(server.id, body));
        await dispatch(serverDetailsGet(server.id));
        await dispatch(userServersGet(user.userId));
        history.push(`/channels/${server.id}/${server.default_channel_id}`);
        closeModal();
    };

    return (
        <div id="delete-form-container">
            <h1 className="form-title">Join Server</h1>
            <h2 className="image-label server-name">{server.name}</h2>
            <div className="form-box server-image-box">
                <img alt="" className="sign-up-form-server-img" src={server.imageUrl}></img>
            </div>
            <div className="delete-server-buttons">
                <button id="delete-edit-button" onClick={closeModal}>
                    Cancel
                </button>
                <button id="submit-edit-channel" onClick={handleSubmit}>
                    Join
                </button>
            </div>
        </div>
    );
}
