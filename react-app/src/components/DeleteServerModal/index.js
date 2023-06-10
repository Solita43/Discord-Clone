import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { serverDelete } from "../../store/servers"
import "./DeleteServerModal.css"


function DeleteServerModal({ serverId, serverName }) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const { closeModal } = useModal();
    const history = useHistory();
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        if (name !== serverName) {
            setError("Field must match server name exactly.")
            return
        } else {
            dispatch(serverDelete(serverId)).then((data) => {
                if (data.errors) {
                    setError(data.errors)
                    return
                }
                history.push('/home')
                closeModal()
            })
        }
    }


    return (
        <div id="delete-form-container">
            <h1 className="delete-form-title">Delete '{serverName}'?</h1>
            <p className="delete-warning">
                Are you sure you want to delete this server? This action
                cannot be undone.
            </p>
            {error ? (<p className="errors">* {error}</p>) : null}
            <form className="form-box" onSubmit={handleSubmit}>
                <label className="delete-server-label">
                    ENTER SERVER NAME
                    <input
                        type="text"
                        className="input-area"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <div className="delete-server-buttons">
                    <button className="cancel-button" onClick={closeModal}>Cancel</button>
                    <button id="delete-button" type="submit">Delete Server</button>
                </div>
            </form>
        </div>
    )
}

export default DeleteServerModal;
