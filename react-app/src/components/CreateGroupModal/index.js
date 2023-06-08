import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { createChannelGroupThunk } from "../../store/servers";
import { serverDetailsGet } from "../../store/servers";

export default function CreateGroupModal({ serverId }) {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(createChannelGroupThunk({
            serverId,
            name
        }))

        
        if (data) {
            setErrors(data); 
        } else {
            
            dispatch(serverDetailsGet(serverId));
            closeModal()
        }


        // dispatch to create a group if no errors
        // close modal
        // redirect
    }

    return (
        <>
            <div id="form-container">
                <h1 className="form-title">Create a New Group!</h1>
                <form className="form-box" onSubmit={handleSubmit}>
                    <ul className="errors">
                        {Object.values(errors).map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <label className="signup-labels">
                        Group Name
                        <input type="text" className="input-area" maxLength="25" minLength="5" value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>
                    <button id="form-button" type="submit">Create Group</button>
                </form>
            </div>
        </>
    )
}
