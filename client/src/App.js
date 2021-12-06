import React from "react";
import { Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Tables from "./components/pages/tables";
import Orders from "./components/pages/orders";
import CreateTable from "./components/pages/createTable";
import CreateOrder from "./components/pages/createOrder";
// import CreateOrder from "./components/pages/createOrder";

const App = () => {
  return (
    <div>
      <Navbar />
      <Route exact path="/">
        <Tables />
        <Orders />
      </Route>
      <Route path="/addtable">
        <CreateTable />
      </Route>
      <Route path="/order">
        <CreateOrder />
      </Route>
    </div>
  );
};

export default App;