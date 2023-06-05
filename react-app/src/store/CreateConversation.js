import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

export default function CreateConversation() {
    let dispatch = useDispatch()
    let [username, setUsername] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username.length > 30 || username.length < 1)
    }

    return (
        <>
            < div className='create-convo-container'>
                <div className='create-convo-title-div'>
                    <h1>Find a Friend</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={userName}
                            onChange={(e) => setUsername(e.target.value)}
                        ></textarea>
                        <button>Start Conversation</button>
                    </form>
                </div>
            </div>
        </>
    )
}
