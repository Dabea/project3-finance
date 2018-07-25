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
    text: 'Analysis'
  }
]

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
      </nav>
    );
  }
}

function buildTabClassNames(currentPath, destinationPath) {
  return `tab${currentPath === destinationPath ? ' tab-active' : ''}`;
}

export default Nav;
