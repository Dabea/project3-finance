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
				<div class="valign-wrapper row login-box">
					<div class="grey darken-1 col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
						<form>
							<div class="card-content">
							<span class="card-title">Enter credentials</span>
							<div class="row">
								<div class="input-field col s12">
								{/* Username */}
								<label htmlFor="email">Username: </label>
								<input
									class="input-box"
									type="email"
									id="email"
									name="username"
									value={this.state.username}
									onChange={this.handleChange}
								/>
								</div>
								<div class="input-field col s12">
								{/* Password */}
								<label htmlFor="password">Password: </label>
								<input
									class="input-box"
									type="password"
									name="password"
									value={this.state.password}
									onChange={this.handleChange}
								/>
								</div>
							</div>
							</div>
							<div class="card-action right-align">
							<input onClick={this.handleSubmit} type="submit" class="btn teal waves-effect waves-light btn" value="Login"/>
							</div>
						</form>
					</div>
				</div>
			)
		}
	}
}

export default LoginForm