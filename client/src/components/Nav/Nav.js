import React, { Component } from "react";
import { Link } from 'react-router-dom';

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
    path: '/chart',
    text: 'Cost By Item'
  },
  {
    path: '/pichart',
    text: 'Category Chart'
  }
]

class Nav extends Component {
  render() {
    return (
      <nav className="nav-extended grey darken-3">
        <div className="nav-wrapper black">
          <a href="" className="brand-logo">
            iFinance2
          </a>
          <ul id="nav-mobile" className="right">
            <li>
            <Link to="/forms">Add items</Link>
            </li>
            <li>
              <a href="">Log out</a>
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
      
    );
  }
}

function buildTabClassNames(currentPath, destinationPath) {
  return `tab${currentPath === destinationPath ? ' tab-active' : ''}`;
}

export default Nav;