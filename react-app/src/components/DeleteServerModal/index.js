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
            dispatch(serverDelete(serverId)).then(() => {
                history.push('/home')
                closeModal()
            }).catch(e => {
                console.log(e);
            })
        }
    }


    return (
        <div id="delete-form-container">
            <h1 className="form-title">Delete '{serverName}'</h1>
            <p className="delete-warning">
                Are you sure you want to delete this server? This action
                cannot be undone.
            </p>
            <form className="form-box" onSubmit={handleSubmit}>
                {error && (
                    <p className="errors" >{error}</p>
                )}
                <label className="signup-labels">
                    ENTER SERVER NAME
                    <input
                        type="text"
                        className="input-area"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <button onClick={closeModal}>Cancel</button>
                <button id="delete-button" type="submit">Delete Server</button>
            </form>
        </div>
    )
}

export default DeleteServerModal;
