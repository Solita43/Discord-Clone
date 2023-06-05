import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css"

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  // const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };

  // useEffect(() => {
  //   if (!showMenu) return;

  // const closeMenu = (e) => {
  //   if (!ulRef.current.contains(e.target)) {
  //     setShowMenu(false);
  //   }
  // };

  //   document.addEventListener("click", closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  // const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  // const closeMenu = () => setShowMenu(false);

  return (
    <>
      {/* <button className="" onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button> */}
      {/* <ul className={ulClassName} ref={ulRef}> */}

      {user ? (
        <>
          <p className="welcome-user">Hi {user.username}</p>
          <p className="user-email">{user.email}</p>
          <button className="login-button" onClick={handleLogout}>Log Out</button>
        </>
      ) : (
        <>
          <OpenModalButton
            buttonText="Log In"
            // onItemClick={closeMenu}
            className="login-button"
            modalComponent={<LoginFormModal />}
          />

          <OpenModalButton
            buttonText="Sign Up"
            // onItemClick={closeMenu}
            className="sign-up-button"
            modalComponent={<SignupFormModal />}
          />
        </>
      )}
      {/* </ul> */}

    </>
  );
}

export default ProfileButton;
