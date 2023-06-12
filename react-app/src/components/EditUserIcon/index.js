import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { iconEdit } from "../../store/session";


function EditUserIcon() {
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);

    const [errors, setErrors] = useState(null);
    const sessionUser = useSelector(state => state.session.user);
    const [username, setUsername] = useState(sessionUser.username);
    const [isLoading, setIsLoading] = useState(false)

    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append("image", image)
        formData.append("username", username)

        setIsLoading(true)

        dispatch(iconEdit(formData)).then((data) => {


            if (data.errors) {
                setErrors(data.errors)
                setIsLoading(false)
            } else {
                closeModal()
            }
        })


    }

    if (isLoading) {
        return (
            <div id="create-server-container" style={{width: "fit-content"}}>
                <h1 style={{color: "var(--text)", padding: ".6rem", width: "100%"}}>Loading Profile Changes...</h1>
            </div>
        )
    }


    return (
        <div id="create-server-container">
            <h1 className="create-server-title">Update Profile</h1>
            <form onSubmit={handleSubmit} className="form-box" encType="multipart/form-data">
                {errors && (
                    <p className="errors">* {errors}</p>
                )}
                <label className="image-label" id="edit-user-image">
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
                    Username
                    <input type="test"
                        value={username}
                        className="input-area"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="3"
                        maxLength="40"
                        placeholder="Username" />
                </label>
                <button id="create-server-button" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default EditUserIcon
