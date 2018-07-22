import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <nav className="nav-extended">
        <div className="nav-wrapper black">
          <a href="#" className="brand-logo">
            iFinance
          </a>
          <ul id="nav-mobile" className="right">
            <li>
              <a href="">Log out</a>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="tab"><Link to="/transactions">Items</Link></li>
            <li className="tab"><Link to="/trends">Trends</Link></li>
            <li className="tab"><a href="/chart">Analysis</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
