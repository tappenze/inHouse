import React, { Component } from "react";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import trash from './delete.png';
import inhouse from './InHouse.png';

export default class Tables extends Component {
    constructor(props) {
      super(props);
      this.state = { tables: [], parties: [], tableState: {} };
    }

    componentWillMount() {
      axios
        .get("http://localhost:5000/table/")
        .then((response) => {
          console.log(response.data);
          axios
            .get("http://localhost:5000/party")
            .then((response2) => {
              console.log(response2.data);

              axios
                .get("http://localhost:5000/waiters")
                .then((response3) => {
                  console.log(response3.data);

                  let waiterDict = {};
                  for (let i = 0; i < response3.data.length; i++) {
                    waiterDict[response3.data[i]._id] = response3.data[i].name;
                  }

                  let temptables = response.data;
                  let totals = [];
                  axios.get("http://localhost:5000/tabletotals/").then((response) => {
                    totals = response.data;
                    for (let i = 0; i < temptables.length; i++) {
                      for (let j = 0; j < totals.length; j++) {
                        if (totals[j]._id == temptables[i]._id) {
                          temptables[i].total = totals[j].total
                        }
                      }
                    }
                    this.setState({ tables: temptables });
                  })

                  this.setState({ tables: temptables, parties: response2.data, waiters: waiterDict });
                })
            })
            .catch(function (error) {
              console.log(error);
            })
        })
        .catch(function (error) {
          console.log(error);
        });
      
        
    }

    deleteTable(id) {
      axios.delete("http://localhost:5000/table/" + id).then((response) => {
        console.log(response.data);
      });
  
      this.setState({
        tables: this.state.tables.filter((el) => el._id !== id),
      });
    }

    partyList() {
      return this.state.parties.map((currentparty) => {
        return (
          <option value={currentparty._id}>
            {currentparty.name} ({currentparty.phone})
          </option>
        )
      })
    }

    getParty(partyid) {
      if (!partyid || partyid === "") return "No party assigned";

      let name = "";
      let phone = "";

      for (let i = 0; i < this.state.parties.length; i++) {
        if (this.state.parties[i]._id === partyid) {
          name = this.state.parties[i].name;
          phone = this.state.parties[i].phone;
        }
      }

      return name + " (" + phone + ")";
    }

    startUpdate(tableid) {
      let newTableState = this.state.tableState;
      newTableState[tableid] = "";
      this.setState({ tableState: newTableState });
    }

    updateTableState(tableid, partyid) {
      let newState = this.state.tableState;
      newState[tableid] = partyid;
      this.setState({ tableState: newState });

      console.log(this.state);
    }

    saveTableState(table) {
      let newTable = table;
      newTable.party_id = this.state.tableState[table._id];
      if (newTable.party_id != "") {
        newTable.status = "Occupied";
      } else {
        newTable.status = "Open";
      }

      axios
        .put("http://localhost:5000/table/update/", newTable)
        .then((res) => {
          console.log(res.data);
          let newState = this.state.tableState;
          delete newState[table._id];
          this.setState({ tableState: newState });
        })
    }

    tableList() {
      return this.state.tables.map((currenttable) => {
        return (
          <tr>
            <td>{currenttable.name}</td>
            <td>
              {currenttable._id in this.state.tableState ? (
                <select id={"partySelect_" + currenttable._id} onChange={({ target: { value } }) => this.updateTableState(currenttable._id, value)}>
                  <option value="">No party</option>
                  {this.partyList()}
                </select>
              ) : this.getParty(currenttable.party_id)}
            </td>
            <td>{this.state.waiters[currenttable.waiter_id]}</td>
            <td>{currenttable.size}</td>
            <td>{currenttable.status}</td>
            <td>{currenttable.total ? currenttable.total : 0}</td>
            <td>
              {currenttable._id in this.state.tableState ? (
                <Button style={{ fontSize: 14, margin: 20 }} onClick={() => this.saveTableState(currenttable)}>Save</Button>
              ) : (
                <Button style={{ fontSize: 14, margin: 20 }} onClick={() => this.startUpdate(currenttable._id)}>Change Party</Button>
              )}
              <a
                href="/tables"
                onClick={() => {
                  this.deleteTable(currenttable._id);
                }}
              >
                <img className="trash" alt="Delete" src={trash}></img>
              </a>
            </td>
          </tr>
        )
      });
    }

    render() {
      return (
        <div style={{ marginTop: 20 }}>
          <a href="/"><img className="logo" alt="" src={inhouse}></img></a>
            <br></br>
            <br></br>
            <div style={{textAlign: "center"}}>
              <h2>Tables</h2>
              <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                  <tr>
                    <th>Table Name</th>
                    <th>Party</th>
                    <th>Waiter</th>
                    <th>Size</th>
                    <th>Status</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>{this.tableList()}</tbody>
              </table>
              <br></br>
              <a href="/createTables">
                <Button variant="primary" size="lg">
                    Add Table
                </Button>
              </a>
            </div>
        </div>
      );
    }
  }