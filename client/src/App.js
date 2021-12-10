import React from "react";
import { Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

// import Navbar from "./components/navbar";
import Tables from "./components/pages/tables";
import CreateTable from "./components/pages/createTable";
import Parties from "./components/pages/parties";
import CreateParty from "./components/pages/createParty";
import Home from "./components/pages/home";
import CreateOrder from "./components/pages/createOrder";
import Menu from "./components/pages/menus";
import CreateMenu from "./components/pages/createMenu"
import Waiters from "./components/pages/waiters";
import CreateWaiter from "./components/pages/createWaiter";

const App = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/tables">
        <Tables />
      </Route>
      <Route exact path="/createTables">
        <CreateTable />
      </Route>
      <Route exact path="/parties">
        <Parties />
      </Route>
      <Route exact path="/createParties">
        <CreateParty />
      </Route>
      <Route path="/order">
        <CreateOrder />
      </Route>
      <Route exact path="/menu">
        <Menu />
      </Route>
      <Route exact path="/createMenu">
        <CreateMenu />
      </Route>
      <Route exact path="/waiters">
        <Waiters />
      </Route>  
      <Route exact path="/createWaiter">
        <CreateWaiter />
      </Route>      
    </div>
  );
};

export default App;