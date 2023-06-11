import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { serverPost } from "../../store/servers";
import "./CreateServerModal.css"


function CreateServerModal({ title, serverId }) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [image, setImage] = useState(null)
    const { closeModal } = useModal();
    const history = useHistory();
    const [error, setError] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.length > 30) {
            setError("Name can not be longer than 25 characters.")
            return
        }
        const formData = new FormData();
        formData.append("imageURL", image);
        formData.append("name", name)

        const data = await dispatch(serverPost(formData))
        // const data = await dispatch(serverPost({ name }))
        if (data.error) {
            setError(data.error)
        } else {
            history.push(`/channels/${data.id}/${data.default_channel_id}`)
            closeModal();
        }


    }

    return (
        <div id="create-server-container">
            <h1 className="create-server-title">{title}</h1>
            {error ? <p className="errors">* {error}</p> : null}
            <form onSubmit={handleSubmit} className="form-box" encType="multipart/form-data">
                <label className="image-label">
                    <div className="image-upload">
                        {image ? <p className="upload-name">{image.name}</p> : (
                            <>
                                <i className="fa-regular fa-image"></i>
                                <p>Upload</p>
                            </>
                        )}
                        <div className="image-dot"><p>+</p></div>
                    </div>
                    <input
                        type="file"
                        className="image-upload-input"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </label>
                <label className="create-server-label">
                    Server Name
                    <input
                        type="text"
                        value={name}
                        className="input-area"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <button id="create-server-button" type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateServerModal
