import React, { Component } from 'react';
import {BrowserRouter, Redirect, Route, Switch, Link} from 'react-router-dom';
import TrendsTable from './trends-table';
import DateTrendsTable from './trends-table/DateTrendsTable/DateTrendsTable';
import StoreTrendsTable from './trends-table/StoreTrendsTable/StoreTrendsTable';
import TotalTrendsTable from './trends-table/TotalTrendsTable/TotalTrendsTable';
import Nav from "./Nav/Nav";
import TransactionTable from './transaction-table/transactionTable';
import '../../node_modules/react-vis/dist/style.css';
import Chart from "./chart/chart";
import PiChart from "./chart/piChartByCat";
import ChartByDate from "./chart/chartByDate";
import Forms from "./forms/forms";
import FormCarousel from "./FormCarousel/FormCarousel";
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
        <Route exact path="/trends/daily" component={ DailyTrendsTable} />
        <Route exact path="/trends/weekly" component={ WeeklyTrendsTable} />
        <Route exact path="/trends/monthly" component={ MonthlyTrendsTable} />
        <Route exact path="/trends/quarter" component={ QuarterTrendsTable} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default Router;