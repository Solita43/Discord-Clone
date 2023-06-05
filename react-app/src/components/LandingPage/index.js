import React, { useState } from "react"
import { useSelector } from "react-redux";
import background from "../../assets/main_background.svg"
import backgroundLeft from "../../assets/main_left_background.svg"
import backgroundRight from "../../assets/main_right_background.svg"
import backgroundMain from "../../assets/discord_home_2.png"
import { useHistory } from "react-router-dom"
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import './index.css'

export default function LandingPage() {
    const history = useHistory();
    const user = useSelector((state) => state.session.user)
    console.log("this is state now/ user: ", user)

    const handleClick = () => {
        history.push("/home")
    }

    return (
        <>
            <div className="wrapper">
                <div className="body-wrapper">
                    < div className="body">
                        <h1 className="landing-title">This is the Place for You...</h1>
                        <span className="landing-body">...Connect, Communicate, Community: Unite and Engage in Togetherness. we believe in the power of togetherness, meaningful conversations, and fostering a vibrant community. Our platform is designed to bring people closer, allowing them to belong to various groups, whether it's a school club, a gaming community, or a worldwide art collective.</span>
                        {user ? (
                            <button onClick={handleClick} className="open-discordia">Open Discordia in your browser</button>

                        ) : (
                            <OpenModalButton
                                buttonText="Open Discordia in your browser"
                                // onItemClick={closeMenu}
                                className="open-discordia"
                                modalComponent={<LoginFormModal />}
                            />
                        )
                        }
                    </div>
                </div>
                <div className="all-images">
                    <img src={background} className="main-bg-image" alt="clouds"></img>"
                    <img src={backgroundRight} className="right-bg-image" alt="few cartoon people hanging out" ></img>"
                    <img src={backgroundLeft} className="left-bg-image" alt="cartoon people hanging out"></img>"

                    {/* <img src={backgroundMain} className="main-bg-image" ></img>" */}
                </div>

                <div className="footer"></div>

            </div>
        </>
    )
}
