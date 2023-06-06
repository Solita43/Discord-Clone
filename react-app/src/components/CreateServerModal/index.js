import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { serverPost } from "../../store/servers";


function CreateServerModal() {
    const dispatch = useDispatch(); 
    const [name, setName] = useState("");
	const { closeModal } = useModal();
    const history = useHistory(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const server = dispatch(serverPost({name}))
        closeModal(); 
        history.push(`/channels/${server.id}/${server.default_channel_id}`)
    }

    return (
        <div className="create_server_form">
            <h1>Create A Server</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Server Name
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateServerModal