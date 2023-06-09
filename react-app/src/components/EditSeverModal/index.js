import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory, useParams } from "react-router-dom";
import { serverPost, serverEdit } from "../../store/servers";


function EditServerModal({serverId}) {
    const server = useSelector(state => state.servers.AllServers[serverId])
    const dispatch = useDispatch(); 
    const [name, setName] = useState(null);
    const [errors, setErrors] = useState([]); 
    if (server && !name) {
        setName(server.name)
    }
	const { closeModal } = useModal();
    const history = useHistory(); 


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const updated = {
            name
        }
            
        const data = await dispatch(serverEdit(updated, serverId))

        if (data) {
            setErrors(data)
        } else {
            closeModal()
        }
        
        
    }

    

    return (
        <div id="delete-form-container">
            <h1 className="form-title">Edit Server</h1>
            <form onSubmit={handleSubmit} className="form-box">
            <ul className="errors">
                        {Object.values(errors).map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
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