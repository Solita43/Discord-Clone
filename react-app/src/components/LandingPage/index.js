import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import background from "../../assets/main_background.svg";
import backgroundLeft from "../../assets/main_left_background.svg";
import backgroundRight from "../../assets/main_right_background.svg";
import backgroundMain from "../../assets/discord_home_2.png";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";
import * as sessionActions from '../../store/session';

export default function LandingPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    const handleClick = () => {
        history.push("/home");
    };

    const logout = (e) => {
        e.preventDefault()
        dispatch(sessionActions.logout())
        history.push("/")
    }

    const root = window.document.getElementById("root");
    root.style.display = "block";

    return (
        <div id="landing-page-root">
            <div>
                <ul className="top-nav">
                    <li className="top-left-nav">
                        <i className={`fa-solid fa-gamepad`}></i>
                        <NavLink exact to="/" className="discordia-title">
                            Discordia
                        </NavLink>
                    </li>
                    <li className="top-right-nav">
                        {!user ? (
                            <OpenModalButton
                                buttonText="Log In"
                                // onItemClick={closeMenu}
                                className="login-button"
                                modalComponent={<LoginFormModal />}
                            />
                        ) : <button className="login-button" onClick={logout}>Log Out</button>}

                        {!user ? (
                            <OpenModalButton
                                buttonText="Sign Up"
                                // onItemClick={closeMenu}
                                className="sign-up-button"
                                modalComponent={<SignupFormModal />}
                            />
                        ) : null}

                    </li>
                    {/* {isLoaded && (
                    <li className='top-right-nav'>
                        <ProfileButton user={user} />
                        <i className={`fa-solid fa-bars`}></i>
                    </li>
                )} */}
                </ul>

                <div className="wrapper">
                    <div className="content-wrapper">

                        <div className="body">
                            <h1 className="landing-title">This is the Place for You...</h1>
                            <span className="landing-body">
                                ...Connect, Communicate, Community: Unite and Engage in
                                Togetherness. we believe in the power of togetherness,
                                meaningful conversations, and fostering a vibrant community. Our
                                platform is designed to bring people closer, allowing them to
                                belong to various groups, whether it's a school club, a gaming
                                community, or a worldwide art collective.
                            </span>
                            {user ? (
                                <button onClick={handleClick} className="open-discordia">
                                    Open Discordia in your browser
                                </button>
                            ) : (
                                <OpenModalButton
                                    buttonText="Open Discordia in your browser"
                                    // onItemClick={closeMenu}
                                    className="open-discordia"
                                    modalComponent={<LoginFormModal />}
                                />
                            )}
                        </div>
                        <div className="all-images" >
                            <img src={background} className="main-bg-image" alt="clouds"></img>
                            <img
                                src={backgroundRight}
                                className="right-bg-image"
                                alt="few cartoon people hanging out"
                            ></img>
                            <img
                                src={backgroundLeft}
                                className="left-bg-image"
                                alt="cartoon people hanging out"
                            ></img>
                        </div>



                        <div className="footer">
                            <div className="footer-container">
                                <h2 className="coder-title">Meet the Developers</h2>
                                <div className="developer-info-boxes">
                                    <div className="coder-info">
                                        <div className="coder-info-wrapper">
                                            <img
                                                src="https://res.cloudinary.com/dnzxq7dgk/image/upload/v1686271883/P2/ben-banner_vle0nz.png"
                                                className="coder-image"
                                            ></img>
                                            <div className="coder-info-right">
                                                <p className="coder-name">Benjamin Wilson</p>
                                                <div className="coder-contact-info">
                                                    <a
                                                        className="coder-link"
                                                        target="_blank"
                                                        href="https://www.linkedin.com/in/benjamin-wilson-2a39ab271/"
                                                    >
                                                        LinkedIn
                                                    </a>
                                                    <span>|</span>
                                                    <a
                                                        className="coder-link"
                                                        target="_blank"
                                                        href="https://github.com/BenjaminWilson13"
                                                    >
                                                        Git Hub
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="coder-info">
                                        <div className="coder-info-wrapper">
                                            <img
                                                className="coder-image"
                                                src="https://res.cloudinary.com/dnzxq7dgk/image/upload/v1686271951/P2/mel-banner_wjcicw.png"
                                            ></img>
                                            <div className="coder-info-right">
                                                <p className="coder-name">Melinda Cortez</p>
                                                <div className="coder-contact-info">
                                                    <a
                                                        className="coder-link"
                                                        target="_blank"
                                                        href="https://www.linkedin.com/in/melinda-cortez-3581b0139/"
                                                    >
                                                        LinkedIn
                                                    </a>
                                                    <span>|</span>
                                                    <a
                                                        className="coder-link"
                                                        href="https://github.com/Solita43"
                                                        target="_blank"
                                                    >
                                                        Git Hub
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="coder-info">
                                        <div className="coder-info-wrapper">
                                            <img
                                                src="https://res.cloudinary.com/dnzxq7dgk/image/upload/v1686271970/P2/bev-banner_ocoqn8.png"
                                                className="coder-image"
                                            ></img>
                                            <div className="coder-info-right">
                                                <p className="coder-name">Beverly Duran</p>
                                                <div className="coder-contact-info">
                                                    <a
                                                        className="coder-link"
                                                        target="_blank"
                                                        href="https://www.linkedin.com/in/beverly-duran/"
                                                    >
                                                        LinkedIn
                                                    </a>
                                                    <span>|</span>
                                                    <a
                                                        className="coder-link"
                                                        target="_blank"
                                                        href="https://github.com/duranbeverly"
                                                    >
                                                        Git Hub
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="coder-info">
                                        <div className="coder-info-wrapper">
                                            <img
                                                src="https://res.cloudinary.com/dnzxq7dgk/image/upload/v1686271920/P2/jay-banner_kcxgwe.png"
                                                className="coder-image"
                                            ></img>
                                            <div className="coder-info-right">
                                                <p className="coder-name">Jay Levin</p>
                                                <div className="coder-contact-info">
                                                    <a
                                                        className="coder-link"
                                                        target="_blank"
                                                        href="https://www.linkedin.com/in/jay-levin/"
                                                    >
                                                        LinkedIn
                                                    </a>
                                                    <span>|</span>
                                                    <a
                                                        className="coder-link"
                                                        target="_blank"
                                                        href="https://github.com/jaylevin96"
                                                    >
                                                        Git Hub
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        </div>
    );
}
