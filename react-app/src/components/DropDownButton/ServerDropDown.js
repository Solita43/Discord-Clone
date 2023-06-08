import React, { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import DeleteServerModal from "../DeleteServerModal"
import CreateGroupModal from "../CreateGroupModal";
import EditServerModal from "../EditSeverModal"

function ServerDropDown(serverId, serverName, closeMenu) {
    return (
        <>
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
        </>
    )
}

export default ServerDropDown;