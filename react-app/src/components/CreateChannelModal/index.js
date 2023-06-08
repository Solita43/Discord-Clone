import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./CreateChannelModal.css";
import { channelEdit, deleteChannel, serverDetailsGet, createChannel } from "../../store/servers";

export default function CreateChannelModal(props) {
    const { groupId, serverId, defaultChannel } = props
    console.log(groupId, serverId)
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    const { closeModal } = useModal();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            serverId,
            groupId,
            name,
            isPrivate: false
        }
        const data = await dispatch(createChannel(body));
        // if (data) {
        //     setErrors(data);
        // } else {
        console.log(data)
        if (typeof data.name !== "string") {
            setErrors(data)
        } else {
            dispatch(serverDetailsGet(serverId));
            closeModal();
            history.push(`/channels/${serverId}/${data.id}`)
        }
        // }
    }


    return (
        <>
            <div id="form-container">
                <h1 className="form-title">Create a New Channel!</h1>
                <form className="form-box" onSubmit={handleSubmit}>
                    <ul className="errors">
                        {Object.values(errors).map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <label className="signup-labels">
                        Channel Name
                        <input type="text" className="input-area" maxLength="25" minLength="5" value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>
                    <button id="form-button" type="submit">Create Channel</button>
                </form>
            </div>
        </>
    )
}
