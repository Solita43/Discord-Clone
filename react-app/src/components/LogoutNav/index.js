import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton'
import * as sessionActions from '../../store/session'
import { useHistory } from "react-router-dom"
import "./LogoutNav.css"

export default function LogoutNav() {
    const history = useHistory();
    const dispatch = useDispatch();
    const logout = (e) => {
        e.preventDefault()
        dispatch(sessionActions.logout())
        history.push("/")
    }
    const sessionUser = useSelector(state => state.session.user)

    return (
        <>
            <div className="bottom-nav">
                <div className="left-nav-bar">
                    <img className="nav-user-profile-img" src={sessionUser.userIcon} />
                    <p className="nav-username">{sessionUser.username}</p>
                </div>
                <button className="nav-button" onClick={logout}>Log Out</button>
            </div>

        </>
    )
}
