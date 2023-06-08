import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { addServerUserThunk, serverDetailsGet, userServersGet } from "../../store/servers";

export default function JoinServerModal({ server }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state) => state.session.user)
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()
        let body = { userId: user.userId, "role": "user" }
        await dispatch(addServerUserThunk(server.id, body))
        await dispatch(serverDetailsGet(server.id))
        await dispatch(userServersGet(user.userId))
        history.push(`/channels/${server.id}/${server.default_channel_id}`)
        closeModal()
    }

    return (<div id="delete-form-container">
        <h1 className="form-title">Join Server</h1>
        <h2>{server.name}</h2>
        <div>
            <img src={server.imageUrl}></img>
        </div>
        <div>
            <button
                onClick={closeModal}
            >Cancel</button>
            <button onClick={handleSubmit}>Join</button>
        </div>
    </div>)
}
