
import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { getConversationMessagesThunk } from "../../store/userConversationMessages"
import { io } from 'socket.io-client'
import "./MessageReactions.css"
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

// first install emoji mart so you can use the Picker component

export default function DirectMessageReactions() {
    let dispatch = useDispatch()
    const [emojiData, setEmojiData] = useState(null)
    const [currentEmoji, setCurrentEmoji] = useState("")

    console.log("emojiData: ", emojiData)

    return (
        <>
            <Picker data={data} onEmojiSelect={console.log} />
        </>)
}
