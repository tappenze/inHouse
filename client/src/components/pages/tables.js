import React, { Component } from "react";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import trash from './delete.png';
import inhouse from './InHouse.png';

export default class Tables extends Component {
    constructor(props) {
      super(props);
      this.state = { tables: [], parties: [], tableState: {sampleId: ""} };
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
              this.setState({ tables: response.data, parties: response2.data });
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
      newTableState[tableid] = this.state.parties[0]._id;
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
      table.party_id = this.state.tableState[table._id]
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
                  {this.partyList()}
                </select>
              ) : this.getParty(currenttable.party_id)}
            </td>
            <td>{currenttable.waiter_id}</td>
            <td>{currenttable.size}</td>
            <td>{currenttable.status}</td>
            <td>
              <a
                href="/tables"
                onClick={() => {
                  this.deleteTable(currenttable._id);
                }}
              >
                <img className="trash" alt="Delete" src={trash}></img>
              </a>
            </td>
            <td>
              {currenttable._id in this.state.tableState ? (
                <Button style={{ fontSize: 10, margin: 0 }} onClick={() => this.saveTableState(currenttable)}>Save</Button>
              ) : (
                <Button style={{ fontSize: 10, margin: 0 }} onClick={() => this.startUpdate(currenttable._id)}>Change Party</Button>
              )}
              
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