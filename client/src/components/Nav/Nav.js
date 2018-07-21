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

export default Nav;
