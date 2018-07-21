import React, { Component } from 'react';
import { BrowserRouter as Router, Route , Switch } from "react-router-dom";
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import TrendsTable from './components/trends-table';
import DailyTrendsTable from './components/trends-table/daily-trends/dailyTrendsTable';
import WeeklyTrendsTable from './components/trends-table/weekly-trends/WeeklyTrendsTable';
import MonthlyTrendsTable from './components/trends-table/monthly-trends/monthlyTrendsTable';
import QuarterTrendsTable from './components/trends-table/quarter-trends/QuarterTrendsTable';
import Nav from "./components/Nav/Nav";
import TransactionTable from './components/transaction-table/transactionTable';
import Chart from "./components/chart/chart";
import Forms from "./components/forms/forms";
import FormCarousel from './components/FormCarousel/FormCarousel'
import Login from './components/login/login'


class App extends Component {
  render() {
    return (
<Router>
  <div>
    <Route exact path="/FormCarousel" component={FormCarousel} />/>
    <Nav/>
    {/* <Route exact path ='/' component={Login}/> */}
    <Route exact path="/forms" component={Forms} />
    <Route exact path="/transactions" component={TransactionTable} />
    <Switch> 
      <Route exact path="/chart" component={Chart} />
      <Route exact path="/trends" component={TrendsTable} />
      <Route exact path="/trends/daily" component={ DailyTrendsTable} />
      <Route exact path="/trends/weekly" component={ WeeklyTrendsTable} />
      <Route exact path="/trends/monthly" component={ MonthlyTrendsTable} />
      <Route exact path="/trends/quarter" component={ QuarterTrendsTable} />
    </Switch>
  </div>
</Router>
    );
  }
}

export default App;
