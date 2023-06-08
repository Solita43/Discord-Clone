import React, { useState, useEffect, useRef } from "react";
import "./DropDownButton.css"
import ServerDropDown from "./ServerDropDown";
import CreateConversationModal from "../CreateConversationModal";
import OpenModalButton from "../OpenModalButton";
import DirectMessages from "../DirectMessages";

function DropDownButton({ serverId, title, users}) {
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (title === "Direct Messages") return
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


    const ulClassName = "server-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    
    const displayName = (name) => {
        if (name.length > 14) {
          return name.slice(0, 14) + "..."
        } else {
          return name
        }
      }

    return (
        <>
            <div className={title === "Direct Messages" ? "dm-title-div": "dropdown-title-div"} onClick={openMenu}>
                <div>
                    <h1 className="dropdown-title">{title === "Direct Messages" ? "Direct Messages": displayName(title) }</h1>
                </div>
                {title === "Direct Messages" ? <OpenModalButton buttonText={<i className="fa-solid fa-plus" id="dm-plus"></i>} className="dropdown-icon-plus" modalComponent={< CreateConversationModal users={users} />} /> :
                 (<div className="dropdown-icon">
                    <i className="fa-solid fa-chevron-down" />
                </div>)}
                {/* <div className="dropdown-icon">
                    <i className="fa-solid fa-chevron-down" />
                </div> */}
            </div>
            <div id="dropdown-container">
                <div className={ulClassName} ref={ulRef}>
                    {title === "Direct Messages" ? null : <ServerDropDown serverId={serverId} serverName={title} closeMenu={closeMenu} ulRef={ulRef} />}
                </div>
            </div>
        </>
    )
}

export default DropDownButton;