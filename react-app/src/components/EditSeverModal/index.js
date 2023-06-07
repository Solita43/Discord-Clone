import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory, useParams } from "react-router-dom";
import { serverPost, serverEdit } from "../../store/servers";


function EditServerModal({serverId}) {
    const server = useSelector(state => state.servers.AllServers[serverId])
    const dispatch = useDispatch(); 
    const [name, setName] = useState(server.name);
	const { closeModal } = useModal();
    const history = useHistory(); 

    console.log("MODAL SERVER", server)


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const server = {
            name
        }
            
        dispatch(serverEdit(server, serverId))
        
        closeModal()
        
        
    }

    return (
        <div id="delete-form-container">
            <h1 className="form-title">Edit Server</h1>
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
                <button id="form-button" type="submit">Edit Server</button>
            </form>
        </div>
    );
}

export default EditServerModal