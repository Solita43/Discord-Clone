import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='top-nav'>
			<li className='top-left-nav'>
				<i className={`fa-solid fa-comment-dots`}></i>
				<NavLink exact to="/" className="discordia-title">Discordia</NavLink>
			</li>
			{isLoaded && (
				<li className='top-right-nav'>
					<ProfileButton user={sessionUser} />
					<i className={`fa-solid fa-bars`}></i>
				</li>
			)}
		</ul>
	);
}

export default Navigation;
