import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory, useParams } from "react-router-dom";
import { serverPost, serverEdit } from "../../store/servers";


function EditServerModal({ serverId }) {
    const server = useSelector(state => state.servers.AllServers[serverId])
    const dispatch = useDispatch();
    const [name, setName] = useState(null);
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);
    if (server && !name) {
        setName(server.name);
    }

    const { closeModal } = useModal();
    const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        if (image) {
            formData.append("imageURL", image)
        }
        formData.append("name", name)

        const data = await dispatch(serverEdit(formData, serverId))

        if (data) {
            setErrors(data)
        } else {
            closeModal()
        }


    }



    return (
        <div id="delete-form-container">
            <h1 className="form-title">Edit Server</h1>
            <form onSubmit={handleSubmit} className="form-box" encType="multipart/form-data">
                <ul className="errors">
                    {Object.values(errors).map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label className="signup-labels">
                    Image icons
                    <input
                        type="file"
                        className="input-area"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </label>
                <label className="signup-labels">
                    Server Name
                    <input
                        type="text"
                        value={name}
                        className="input-area"
                        onChange={(e) => setName(e.target.value)}
                        required
                        minLength="5"
                        maxLength="25"
                    />
                </label>
                <button id="form-button" type="submit">Edit Server</button>
            </form>
        </div>
    );
}

export default EditServerModal
