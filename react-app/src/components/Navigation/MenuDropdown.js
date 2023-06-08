import React, { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import "./Navigation.css"
import DeleteServerModal from "../DeleteServerModal"
import CreateGroupModal from "../CreateGroupModal";
import EditServerModal from "../EditSeverModal"

function MenuDropdown({ serverId, serverName }) {
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
      <div className="server-menu" onClick={openMenu}>
        <div className="server-header">
          <h1 className="server-title">{displayName(serverName)}</h1>
        </div>
        <div className="icon">
          <i className="fa-solid fa-chevron-down" />
        </div>
      </div>
      <div id="dropdown-container">
        <div className={ulClassName} ref={ulRef}>
          <OpenModalButton
            buttonText="Edit Server"
            className="server-menu-buttons"
            onItemClick={closeMenu}
            modalComponent={<EditServerModal serverId={serverId} />}
          />
          <OpenModalButton
            buttonText="Create Group"
            className="server-menu-buttons"
            onItemClick={closeMenu}
            modalComponent={<CreateGroupModal title="Create Group" serverId={serverId} />}
          />
          <OpenModalButton
            buttonText="Delete Server"
            className="server-menu-buttons"
            onItemClick={closeMenu}
            modalComponent={<DeleteServerModal serverId={serverId} serverName={serverName} />}
          />
        </div>
      </div>
    </>
  );
}

export default MenuDropdown;
