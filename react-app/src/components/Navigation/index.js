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
			<ul>
				<li>
					<NavLink exact to="/">Home</NavLink>
				</li>
				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
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