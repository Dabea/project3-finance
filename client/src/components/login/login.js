import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './login.css'
// import googleButton from './google_signin_buttons/web/1x/btn_google_signin_dark_disabled_web.png'

class LoginForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			redirectTo: null
		}
		// this.googleSignin = this.googleSignin.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		console.log('handleSubmit')
		this.props._login(this.state.username, this.state.password)
		this.setState({
			redirectTo: '/'
		})
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className="valign-wrapper row login-box">
					<div className="grey darken-1 col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
						<form>
							<div className="card-content">
							<span className="card-title ">Enter credentials</span>
							<div className="row">
								<div className="input-field col s12">
								{/* Username */}
								<label htmlFor="email">Username: </label>
								<input
									className="input-box"
									type="email"
									id="email"
									name="username"
									value={this.state.username}
									onChange={this.handleChange}
								/>
								</div>
								<div className="input-field col s12">
								{/* Password */}
								<label htmlFor="password">Password: </label>
								<input
									className="input-box"
									type="password"
									name="password"
									value={this.state.password}
									onChange={this.handleChange}
								/>
								</div>
							</div>
							</div>
							<div className="card-action right-align">
							<input onClick={this.handleSubmit} type="submit" className="btn deep-purple accent-1 waves-effect waves-light btn" value="Login"/>
							</div>
						</form>
					</div>
				</div>
			)
		}
	}
}

export default LoginForm