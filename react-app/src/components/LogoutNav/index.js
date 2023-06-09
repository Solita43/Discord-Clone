import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton'
import * as sessionActions from '../../store/session'
import { useHistory } from "react-router-dom"
import "./LogoutNav.css"
import EditUserIcon from "../EditUserIcon";

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
                    <img alt="Your user icon" className="nav-user-profile-img" src={sessionUser.userIcon} />
                    <p className="nav-username">{sessionUser.username}</p>
                </div>
                <OpenModalButton
                    modalComponent={<EditUserIcon />}
                    buttonText={<i className="fa-solid fa-gear"></i>}
                    className={"update-conversation"}
                />
                <button className="nav-button" onClick={logout}>Log Out</button>
            </div>

        </>
    )
}
