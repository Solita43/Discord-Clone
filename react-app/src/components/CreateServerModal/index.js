import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { serverPost, serverEdit } from "../../store/servers";


function CreateServerModal( { title, serverId } ) {
    const dispatch = useDispatch(); 
    const [name, setName] = useState("");
	const { closeModal } = useModal();
    const history = useHistory(); 
    const server = useSelector(state => state.servers.AllServers[serverId]);
    const [error, setError] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault();

            if (name.length > 30) {
                setError("Name can not be longer than 25 characters.")
                return 
            }
        
            dispatch(serverPost({name})).then((server) => {
            closeModal()
            history.push(`/channels/${server.id}/${server.default_channel_id}`)
            
        })
        
        
    }

    return (
        <div id="delete-form-container">
            <h1 className="form-title">{title}</h1>
            {error ? <p className="errors">* {error}</p> : null}
            <form onSubmit={handleSubmit} className="form-box">
                <label className="signup-labels">
                    Server Name
                    <input 
                        type="text"
                        value={name}
                        className="input-area" 
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <button id="form-button" type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateServerModal