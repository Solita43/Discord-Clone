import React, { useState } from "react"
import { useSelector } from "react-redux";
import LoginFormModal from "../LoginFormModal"

function LandingPage() {

    return (
        <>
            <div className="top-page">
                <p><i class="fa-solid fa-message-bot" style="color: #414148;"></i></p>
            </div>
            < div className="body">
                <h1>This is the Place for You...</h1>
                <span>...Connect, Communicate, Community: Unite and Engage in Togetherness. we believe in the power of togetherness, meaningful conversations, and fostering a vibrant community. Our platform is designed to bring people closer, allowing them to belong to various groups, whether it's a school club, a gaming community, or a worldwide art collective.</span>
                <button>Open Discordia in your browser</button>
            </div>
            <div className="background-images"></div>
        </>
    )
}
