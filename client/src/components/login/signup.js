import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class SignupForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			redirectTo: null
		}
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
		// TODO - validate!
		axios
			.post('/auth/signup', {
				username: this.state.username,
				password: this.state.password
			})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('youre good')
					this.setState({
						redirectTo: '/login'
					})
				} else {
					console.log('duplicate')
				}
			})
	}
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (
				<div class="valign-wrapper row login-box">
					<div class="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
						<form>
							<div class="card-content">
							<span class="card-title">Sign-up form</span>
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
								<div class="input-field col s12">
								{/* Confirm Password */}
								<label htmlFor="confirmPassword">Confirm Password: </label>
								<input
									class="input-box"
									type="password"
									name="confirmPassword"
									value={this.state.confirmPassword}
									onChange={this.handleChange}
								/>
								</div>
							</div>
							</div>
							<div class="card-action right-align">
							<input onClick={this.handleSubmit} type="submit" class="btn teal waves-effect waves-light btn" value="Sign-up"/>
							</div>
						</form>
					</div>
				</div>
		)
	}
}

export default SignupForm