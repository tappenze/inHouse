import React, { Component } from "react";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import trash from './delete.png';
import inhouse from './InHouse.png';

const Table = (props) => (
    <tr>
      <td>{props.table.name}</td>
      <td>{props.table.party_id}</td>
      <td>{props.table.waiter_id}</td>
      <td>{props.table.size}</td>
      <td>{props.table.status}</td>
      <td>{props.table.total}</td>
      <td>
        <a
          href="/tables"
          onClick={() => {
            props.deleteTable(props.table._id);
          }}
        >
          <img className="trash" alt="Delete" src={trash}></img>
        </a>
      </td>
    </tr>
  );

export default class Tables extends Component {
    constructor(props) {
      super(props);
      this.state = { tables: [] };
    }

    componentDidMount() {
      axios
        .get("http://localhost:5000/table/")
        .then((response) => {
          console.log(response.data);
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

    calculateTotal(id) {
      //aggregate orders with the table id that corresponds to id, and sum the total value
      // of each item's value from the menu
      
    }

    tableList() {
      return this.state.tables.map((currenttable) => {
        return (
          <Table
            table={currenttable}
            deleteTable={this.deleteTable}
            calculateTotal={this.calculateTotal}
            key={currenttable._id}
          />
        );
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