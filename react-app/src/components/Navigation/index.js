import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { userServersGet } from '../../store/servers';

function Navigation({ isLoaded }) {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const servers = useSelector(state => state.servers.AllServers);

	useEffect(() => {
		if (sessionUser) {
			dispatch(userServersGet(sessionUser.userId))
		}
	}, [sessionUser, dispatch])
	if (!servers) return null;
	return (
		<div className='nav-root'>
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
			<div className='server-nav-bar'>
				<ol>
					<li className='tooltip' data-tooltip={'Direct Messages'}>
						<a href='/conversations' className='dm-anchor-tag'>
							<div className='server-icons dm-div'>
								<img className='dm-img' src='https://img.icons8.com/?size=512&id=aqOnqIFQZ4_I&format=png' />
							</div>
						</a>
					</li>
					{Object.values(servers).map((server) => {
						return (
							<li className='tooltip' data-tooltip={server.name}>
								<img className='server-icons' src={server.imageUrl}  ></img>
							</li>
						)
					})}
					<li className='tooltip server icons' data-tooltip='Add a Server'>
						<i class="fa-solid fa-plus" id='create-a-server'></i>
					</li>

				</ol>
			</div>
		</div>
	);
}

export default Navigation;
