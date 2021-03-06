import React, { Component } from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import TrendsTable from './trends-table';
import DateTrendsTable from './trends-table/DateTrendsTable/DateTrendsTable';
import StoreTrendsTable from './trends-table/StoreTrendsTable/StoreTrendsTable';
import TotalTrendsTable from './trends-table/TotalTrendsTable/TotalTrendsTable';
import TransactionTable from './transaction-table/transactionTable';
import '../../node_modules/react-vis/dist/style.css';
import Chart from "./chart/chart";
import PiChart from "./chart/piChartByCat";
import ChartByDate from "./chart/chartByDate";
import Historgram from "./chart/historgram";
import Forms from "./forms/forms";
import FormCarousel from "./FormCarousel/FormCarousel";
import LoginForm from './login/login';
import SignupForm from './login/signup';
import Home from './home/home';
import axios from 'axios';
import Header from './login/header'


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
    text: 'Cost By Item'
  },
  {
    path: '/chart-date',
    text: 'Chart By Date'
  },
  {
    path: '/historgram',
    text: 'Histogram'
  },
  {
    path: '/pichart',
    text: 'Category Chart'
  }
]


const DisplayLinks = props => {
	if (props.loggedIn) {
		return (
			<nav className="nav-extended grey darken-3">
			<div className="nav-wrapper black">
				<a href="/" className="brand-logo">
					iFinance
				</a>
				<ul id="nav-mobile" className="right">
					<li>
					<Link to="/formcarousel">Add items</Link>
					</li>
					<li>
						<a href="#" onClick={props._logout}>Log out</a>
					</li>
				</ul>
			</div>
			<div className="clearfix">
				<ul>
					{links.map(link => (
						<li
							className={buildTabClassNames(window.location.pathname, link.path)}
							key={link.path}
						>
							<Link to={link.path}>
								{link.text}
							</Link>
						</li>
					))}
				</ul>
			</div>
			<div className="clearfix"></div>
			</nav>
		)
	} else {
		return (
			<nav className="nav-extended">
			<div className="nav-wrapper black">

				<a href="/" className="brand-logo">
					iFinance
				</a>
				<ul className="right hide-on-med-and-down">
					<li className="nav-item">
						<Link to="/" className="nav-link">
							Home
						</Link>
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
					<Header user={this.state.user} />
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
					{/* <Route exact path="/login" component={LoginForm} /> */}
        
					{/* <Route exact path='/' component={Login}/> */}
					<Route exact path="/home" component={Home} />
          <Route exact path="/FormCarousel" component={FormCarousel} />
          {/* <Route exact path="/forms" component={Forms} />  */}
          <Route exact path="/transactions" component={TransactionTable} /> 
          <Route exact path="/chart" component={Chart} />
          <Route exact path="/pichart" component={PiChart} />
          <Route exact path="/chart-date" component={ChartByDate} />
					<Route exact path="/historgram" component={Historgram} />
          <Switch>  
          <Route exact path="/trends" component={TrendsTable} />
          <Route exact path="/trends/date" component={ DateTrendsTable} />
          <Route exact path="/trends/store" component={ StoreTrendsTable} />
          <Route exact path="/trends/total" component={ TotalTrendsTable} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}
}

export default Router;