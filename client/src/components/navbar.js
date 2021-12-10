import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          InHouse
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
 
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/tables">
                Tables
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/createTables">
                Add Table
              </NavLink>
              </li>
            <li>
              <NavLink className="nav-link" to="/parties">
                Parties
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/createParties">
                Add Party
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/order">
                Add Order
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/menu">
                Menu
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/createMenu">
                Add Menu Item
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/waiters">
                Waiters
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/createWaiter">
                Add Waiter
              </NavLink>
            </li>                     
          </ul>
        </div>
      </nav>
    </div>
  );
};
 
export default Navbar;