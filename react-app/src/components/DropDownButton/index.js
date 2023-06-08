import React, { useState, useEffect, useRef } from "react";
import "./DropDownButton.css"
import ServerDropDown from "./ServerDropDown";
import CreateConversationModal from "../CreateConversationModal";

function DropDownButton({ serverId, title, }) {
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const displayName = (name) => {
        if (name.length > 14) {
            return name.slice(0, 14) + "..."
        } else {
            return name
        }
    }
    const ulClassName = "server-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    return (
        <>
            <div className="dropdown-title-div" onClick={openMenu}>
                <div className="">
                    <h1 className="dropdown-title">{title}</h1>
                </div>
                <div className="dropdown-icon">
                    <i className="fa-solid fa-chevron-down" />
                </div>
            </div>
            <div id="dropdown-container">
                <div className={ulClassName} ref={ulRef}>
                    {title === "Direct Messages" ? null : <ServerDropDown serverId={serverId} serverName={title} closeMenu={closeMenu} />}
                </div>
            </div>
        </>
    )
}

export default DropDownButton;