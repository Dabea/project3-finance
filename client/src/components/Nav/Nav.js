<<<<<<< HEAD
import React, { Component } from "react";

class Nav extends Component {
  render() {
    return (
      <nav class="nav-extended">
        <div class="nav-wrapper black">
          <a href="#" class="brand-logo">
            iFinance
          </a>
          <ul id="nav-mobile" class="right">
            <li>
              <a href="">Log out</a>
            </li>
          </ul>
        </div>
        <div class="nav-content grey darken-3">
          <ul class="tabs tabs-transparent">
            <li class="tab blue-text text-darken-2"><a href="#test1">Test 1</a></li>
            <li class="tab"><a class="active" href="#test2">Test 2</a></li>
            <li class="tab"><a href="#test4">Test 4</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}
=======
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
    
    <a className="navbar-brand" href="/">
      Insights
    </a>
  </nav>
);
>>>>>>> 6a8490e2b44baf5d5f00d23e6875716c2bfd41ea

export default Nav;
