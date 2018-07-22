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
        <div className="nav-content grey darken-3">
          <ul>
            <li className="tab"><Link to="/transactions">Test 1</Link></li>
            <li className="tab"><Link to="/trends">Test 2</Link></li>
            <li className="tab disabled"><a href="#test3">Disabled Tab</a></li>
            <li className="tab"><a href="#test4">Test 4</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
