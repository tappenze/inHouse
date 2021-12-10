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
      <td>
        <a
          href="/"
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
          this.setState({ tables: response.data });
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

    tableList() {
      return this.state.tables.map((currenttable) => {
        return (
          <Table
            table={currenttable}
            deleteTable={this.deleteTable}
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