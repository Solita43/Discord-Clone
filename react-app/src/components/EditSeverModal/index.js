import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { serverEdit } from "../../store/servers";


function EditServerModal({ serverId }) {
    const server = useSelector(state => state.servers.AllServers[serverId])
    const dispatch = useDispatch();
    const [name, setName] = useState(null);
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    if (server && !name) {
        setName(server.name);
    }

    const { closeModal } = useModal();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        if (image) {
            formData.append("imageURL", image)
        }
        formData.append("name", name)

        setIsLoading(true)


        dispatch(serverEdit(formData, serverId)).then((data) => {
            if (data.errors) {
                setErrors(data.errors); 
                setIsLoading(false); 
            } else {
                closeModal()
            }
        })



    }

    if (isLoading) {
        return (
            <div id="create-server-container" style={{width: "fit-content"}}>
                <h1 style={{color: "var(--text)", padding: ".6rem", width: "100%"}}>Loading Server Changes...</h1>
            </div>
        )
    }




    return (
        <div id="create-server-container">
            <h1 className="create-server-title">Edit Server</h1>
            <form onSubmit={handleSubmit} className="form-box" encType="multipart/form-data">
                <ul className="errors">
                    {Object.values(errors).map((error, idx) => (
                        <li key={idx} style={{paddingBottom: ".5rem"}}> * {error}</li>
                    ))}
                </ul>
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
                        minLength="5"
                        maxLength="25"
                    />
                </label>
                <button id="create-server-button" type="submit">Edit Server</button>
            </form>
        </div>
    );
}

export default EditServerModal
