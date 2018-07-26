import React, { Component } from 'react';
import {BrowserRouter, Redirect, Route, Switch, Link} from 'react-router-dom';
import TrendsTable from './trends-table';
import DailyTrendsTable from './trends-table/daily-trends/dailyTrendsTable';
import WeeklyTrendsTable from './trends-table/weekly-trends/WeeklyTrendsTable';
import MonthlyTrendsTable from './trends-table/monthly-trends/monthlyTrendsTable';
import QuarterTrendsTable from './trends-table/quarter-trends/QuarterTrendsTable';
// import Nav from "./Nav/Nav";
import TransactionTable from './transaction-table/transactionTable';
import '../../node_modules/react-vis/dist/style.css';
import Chart from "./chart/chart";
import PiChart from "./chart/piChartByCat";
import ChartByDate from "./chart/chartByDate";
import Forms from "./forms/forms";
import FormCarousel from "./FormCarousel/FormCarousel";
import LoginForm from './login/login'
import SignupForm from './login/signup'
import axios from 'axios';


function buildTabClassNames(currentPath, destinationPath) {
  return `tab${currentPath === destinationPath ? ' tab-active' : ''}`;
}

const links = [
  {
    path: '/transactions',
    text: 'Items'
  },
  {
    path: '/trends',
    text: 'Trends'
  },
  {
    path: '/chart',
    text: 'Analysis'
  }
]


const DisplayLinks = props => {
	if (props.loggedIn) {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-primary teal lighten-2">
				<div className="container">
				<a className="navbar-brand main-logo" href="/">
					iFinance
				</a>
				<ul className="right hide-on-med-and-down">
						<li className="nav-item">
							{/* <Link to="/" className="nav-link">
								Home
							</Link> */}
						</li>

						<li className="navbar-brand">
							<Link to="/transactions" className="nav-link">
								Recent
							</Link>
						</li>
						<li className="navbar-brand">
							<Link to="/trends" className="nav-link">
								Trends
							</Link>
						</li>
						<li className="navbar-brand">
							<Link to="/charts" className="nav-link">
								Insights
							</Link>
						</li>
						<li>
							<Link to="#" className="nav-link" onClick={props._logout}>
								Logout
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		)
	} else {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-primary teal lighten-2">
			<div className="container">

			<a className="navbar-brand main-logo" href="/">
				iFinance
			</a>
				<ul className="right hide-on-med-and-down">
					<li className="nav-item">
						{/* <Link to="/" className="nav-link">
							Home
						</Link> */}
					</li>
					<li className="nav-item">
						<Link to="/login" className="nav-link">
							login
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/signup" className="nav-link">
							sign up
						</Link>
					</li>
				</ul>
			</div>
			</nav>
		)
	}
}



class Router extends Component {

  constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: null
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
  }

  componentDidMount() {
		axios.get('/auth/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
  }

  _logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
  }
  
  _login(username, password) {
		axios
			.post('/auth/login', {
				username,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user
					})
				}
			})
	}

  render() {
  return (
    <BrowserRouter>
      <div>
          {/* <Nav /> */}
          <DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
          <Route
              exact
              path="/login"
              render={() =>
                <LoginForm
                  _login={this._login}
                //   _googleSignin={this._googleSignin}
                />}
          />
          <Route exact path="/signup" component={SignupForm} />

        
          {/* <Route exact path='/' component={Login}/> */}
          <Route exact path="/FormCarousel" component={FormCarousel} />
          <Route exact path="/forms" component={Forms} /> 
          <Route exact path="/transactions" component={TransactionTable} /> 
          <Route exact path="/chart" component={Chart} />
          <Route exact path="/pichart" component={PiChart} />
          <Route exact path="/chart-date" component={ChartByDate} />
          <Switch>  
          <Route exact path="/trends" component={TrendsTable} />
          <Route exact path="/trends/daily" component={ DailyTrendsTable} />
          <Route exact path="/trends/weekly" component={ WeeklyTrendsTable} />
          <Route exact path="/trends/monthly" component={ MonthlyTrendsTable} />
          <Route exact path="/trends/quarter" component={ QuarterTrendsTable} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}
}

export default Router;