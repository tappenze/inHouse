import React from "react";
import { Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Tables from "./components/pages/tables";
import CreateTable from "./components/pages/createTable";

const App = () => {
  return (
    <div>
      <Navbar />
      <Route exact path="/">
        <Tables />
      </Route>
      <Route path="/create">
        <CreateTable />
      </Route>
    </div>
  );
};

export default App;