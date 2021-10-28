import React, { Component } from "react";
import axios from 'axios';

const Table = (props) => (
    <tr>
      <td>{props.table._id}</td>
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
          Delete
        </a>
      </td>
    </tr>
  );

export default class Tables extends Component {
    constructor(props) {
      super(props);
      // this.deleteRecord = this.deleteRecord.bind(this);
      this.state = { tables: [] };
    }
  
    // This method will get the data from the database.
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
  
    // This method will delete a record based on the method
    deleteTable(id) {
      axios.delete("http://localhost:5000/table/" + id).then((response) => {
        console.log(response.data);
      });
  
      this.setState({
        tables: this.state.tables.filter((el) => el._id !== id),
      });
    }
  
    // This method will map out the users on the table
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
        <div>
          <h3>Tables</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Table ID</th>
                <th>Party</th>
                <th>Waiter</th>
                <th>Size</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{this.tableList()}</tbody>
          </table>
        </div>
      );
    }
  }