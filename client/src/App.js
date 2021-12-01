import React from "react";
import { Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Tables from "./components/pages/tables";
import CreateTable from "./components/pages/createTable";
import Parties from "./components/pages/parties";
import CreateParty from "./components/pages/createParty";
import Home from "./components/pages/home";

const App = () => {
  return (
    <div>
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/tables">
        <Tables />
      </Route>
      <Route path="/createTables">
        <CreateTable />
      </Route>
      <Route exact path="/parties">
        <Parties />
      </Route>
      <Route path="/createParties">
        <CreateParty />
      </Route>
    </div>
  );
};

export default App;