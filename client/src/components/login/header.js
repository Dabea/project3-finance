import React from 'react'
import './header.css'
// TODO - add proptypes

const Header = props => {
	let Greeting;
	if (props.user === null) {
		Greeting = <p>Hello guest, please login or signup</p>
	} else if (props.user.firstName) {
		Greeting = (
			<p>
				Welcome, <strong>{props.user.firstName}</strong>
			</p>
		)
	} else if (props.user.local.username) {
		Greeting = (
			<p>
				Welcome, <strong>{props.user.local.username} </strong>
			</p>
		)
	}
	return (
		<div className="Header">
			{Greeting}
		</div>
	)
}

export default Header
