import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory, useParams } from "react-router-dom";
import { serverPost, serverEdit } from "../../store/servers";
import { iconEdit } from "../../store/session";


function EditUserIcon() {
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState(null);
    const { closeModal } = useModal();
    const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            setErrors("Please upload a valid image file.")
            return
        }

        const formData = new FormData()
        formData.append("image", image)

        dispatch(iconEdit(formData)).then((data) => {
            if (data.errors) {
                setErrors(data.errors)
            } else {
                closeModal()
            }
        })


    }



    return (
        <div id="create-server-container">
            <h1 className="create-server-title">Update Profile Image</h1>
            <form onSubmit={handleSubmit} className="form-box" encType="multipart/form-data">
                {errors && (
                    <p className="erros">* {errors}</p>
                )}
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
                <button id="create-server-button" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default EditUserIcon
