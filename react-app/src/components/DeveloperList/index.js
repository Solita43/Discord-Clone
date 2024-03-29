import React from "react"
import "../ServerUserList/ServerUserLIst.css"

export default function DeveloperList() {
    return (
        <div id="conversations-container" className="server-user-list" style={{ marginBottom: "0px" }}>
            <span>Developers</span>
            <div className="conversation-user-container">
                <div className="dm-left">
                    <img alt="" className="dm-profile-img"
                        src="https://res.cloudinary.com/dnzxq7dgk/image/upload/v1693003787/P2/mel_t3x8gh.png"
                    />
                    <p className="dm-username">
                        Melinda Cortez
                        <span className="online-status coder-contact-info">
                            <a
                                className="coder-link"
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.linkedin.com/in/melinda-cortez-3581b0139/"
                            >
                                LinkedIn
                            </a>
                            <span>|</span>
                            <a
                                className="coder-link"
                                target="_blank"
                                href="https://github.com/Solita43"
                                rel="noreferrer"
                            >
                                Git Hub
                            </a>
                        </span>
                    </p>
                </div>
            </div>
            <div className="conversation-user-container">
                <div className="dm-left">
                    <img alt="" className="dm-profile-img"
                        src="https://res.cloudinary.com/dnzxq7dgk/image/upload/v1693003989/P2/Bev_wgwj5y.png"
                    />
                    <p className="dm-username">
                        Beverly Duran
                        <span className="online-status coder-contact-info">
                            <a
                                className="coder-link"
                                target="_blank"
                                href="https://www.linkedin.com/in/beverly-duran/"
                                rel="noreferrer"
                            >
                                LinkedIn
                            </a>
                            <span>|</span>
                            <a
                                className="coder-link"
                                target="_blank"
                                href="https://github.com/duranbeverly"
                                rel="noreferrer"
                            >
                                Git Hub
                            </a>
                        </span>
                    </p>
                </div>
            </div>
            <div className="conversation-user-container">
                <div className="dm-left">
                    <img alt="" className="dm-profile-img"
                        src="https://res.cloudinary.com/dnzxq7dgk/image/upload/v1693004328/P2/Jay_a6jfqo.png"
                    />
                    <p className="dm-username">
                        Jay Levin
                        <span className="online-status coder-contact-info">
                            <a
                                className="coder-link"
                                target="_blank"
                                href="https://www.linkedin.com/in/jay-levin/"
                                rel="noreferrer"
                            >
                                LinkedIn
                            </a>
                            <span>|</span>
                            <a
                                className="coder-link"
                                target="_blank"
                                href="https://github.com/jaylevin96"
                                rel="noreferrer"
                            >
                                Git Hub
                            </a>
                        </span>
                    </p>
                </div>
            </div>
            <div className="conversation-user-container">
                <div className="dm-left">
                    <img alt="" className="dm-profile-img"
                        src="https://res.cloudinary.com/dnzxq7dgk/image/upload/v1693003871/P2/Ben_deqlf3.png"
                    />
                    <p className="dm-username">
                        Benjamin Wilson
                        <span className="online-status coder-contact-info">
                            <a
                                className="coder-link"
                                target="_blank"
                                href="https://www.linkedin.com/in/benjamin-wilson-2a39ab271/"
                                rel="noreferrer"
                            >
                                LinkedIn
                            </a>
                            <span>|</span>
                            <a
                                className="coder-link"
                                target="_blank"
                                href="https://github.com/BenjaminWilson13"
                                rel="noreferrer"
                            >
                                Git Hub
                            </a>
                        </span>
                    </p>

                </div>
            </div>
        </div>
    )
}
