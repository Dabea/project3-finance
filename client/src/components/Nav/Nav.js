import React from "react";
import './Nav.css';

const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <a className="navbar-brand" href="/">
      iFinance
    </a>

<a className="navbar-brand" href="/transactions">
      Recent
    </a>

    <a className="navbar-brand" href="/trends">
      Trends
    </a>
    
    <a className="navbar-brand" href="/chart">
      Insights
    </a>
  </nav>
);

export default Nav;
