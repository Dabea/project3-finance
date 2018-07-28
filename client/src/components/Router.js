import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import TrendsTable from './trends-table';
<<<<<<< HEAD
import DateTrendsTable from './trends-table/DateTrendsTable/DateTrendsTable';
import StoreTrendsTable from './trends-table/StoreTrendsTable/StoreTrendsTable';
import TotalTrendsTable from './trends-table/TotalTrendsTable/TotalTrendsTable';
=======
// import DateTrendsTable from './trends-table/DateTrendsTable/DateTrendsTable';
// import StoreTrendsTable from './trends-table/StoreTrendsTable/StoreTrendsTable';
// import TotalTrendsTable from './trends-table/TotalTrendsTable/TotalTrendsTable';
import Nav from "./Nav/Nav";
>>>>>>> 9fb20f94ff7ac0d6c769a6818c775dc9d1caa111
import TransactionTable from './transaction-table/transactionTable';
import '../../node_modules/react-vis/dist/style.css';
import Chart from "./chart/chart";
import PiChart from "./chart/piChartByCat";
import ChartByDate from "./chart/chartByDate";
import Forms from "./forms/forms";
import FormCarousel from "./FormCarousel/FormCarousel";
<<<<<<< HEAD
import LoginForm from './login/login';
import SignupForm from './login/signup';
import home from './home/home';
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
			<nav className="nav-extended grey darken-3">
			<div className="nav-wrapper black">
				<a href="#" className="brand-logo">
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

				<a href="#" className="brand-logo">
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
          <Route exact path="/" component={LoginForm} />

        
          {/* <Route exact path='/' component={Login}/> */}
          <Route exact path="/FormCarousel" component={FormCarousel} />
          <Route exact path="/forms" component={Forms} /> 
          <Route exact path="/transactions" component={TransactionTable} /> 
          <Route exact path="/chart" component={Chart} />
          <Route exact path="/pichart" component={PiChart} />
          <Route exact path="/chart-date" component={ChartByDate} />
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
=======
import Login from './login/login'
import historgram from './chart/historgram';

const Router = () => (
  <BrowserRouter>
    <div>
        <Nav />
      
        <Route exact path='/' component={Login}/>
        <Route exact path="/FormCarousel" component={FormCarousel} />
        <Route exact path="/forms" component={Forms} /> 
        <Route exact path="/transactions" component={TransactionTable} /> 
        <Route exact path="/chart" component={Chart} />
        <Route exact path="/pichart" component={PiChart} />
        <Route exact path="/chart-date" component={ChartByDate} />
        <Route exact path="/historgram" component={historgram} />
        <Switch>  
        <Route exact path="/trends" component={TrendsTable} />
        {/* <Route exact path="/trends/daily" component={ DailyTrendsTable} />
        <Route exact path="/trends/weekly" component={ WeeklyTrendsTable} />
        <Route exact path="/trends/monthly" component={ MonthlyTrendsTable} />
        <Route exact path="/trends/quarter" component={ QuarterTrendsTable} /> */}
      </Switch>
    </div>
  </BrowserRouter>
)
>>>>>>> 9fb20f94ff7ac0d6c769a6818c775dc9d1caa111

export default Router;