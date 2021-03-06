import React, { Component, useState } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import trash from './delete.png';
import inhouse from './InHouse.png';

const Waiter = (props) => (
    <tr>
      <td>{props.waiter._id}</td>
      <td>{props.waiter.name}</td>
      <td>{props.waiter.tips}</td>
      <td>{props.waiter.expectedtips ? props.waiter.expectedtips : 0}</td>
      <td>{props.waiter.numtables ? props.waiter.numtables : 0}</td>
      <td>
      <Link to={{
        pathname: "/editWaiter",
        state: {_id: props.waiter._id, name: props.waiter.name, tips: props.waiter.tips}
      }}>
      <Button variant="secondary" size="sm">
          Update
      </Button>
      </Link>
        <a
          href="/waiters"
          onClick={() => {
            props.deleteWaiter(props.waiter._id);
          }}
        >
          <img className="trash" alt="Delete" src={trash}></img>
        </a>
      </td>
    </tr>
  );

export default class Waiters extends Component {
    constructor(props) {
      super(props);
      this.state = { waiters: [] };
    }

    onSubmit = () => {
      console.log(this.state.val)
    };

    componentDidMount() {
      axios
        .get("http://localhost:5000/waiters/")
        .then((response) => {
          console.log(response.data);
          let tempwaiters = response.data;
          let totals = [];
                  axios.get("http://localhost:5000/waiters/expectedtips").then((response) => {
                    totals = response.data;
                    console.log(totals)
                    for (let i = 0; i < tempwaiters.length; i++) {
                      for (let j = 0; j < totals.length; j++) {
                        if (totals[j]._id == tempwaiters[i]._id) {
                          tempwaiters[i].expectedtips = totals[j].total*.2
                        }
                      }
                    }

                    axios.get("http://localhost:5000/waiters/tables").then((response2) => {
                      let tablecounts = response2.data;
                      for (let i = 0; i < tempwaiters.length; i++) {
                        for (let j = 0; j < tablecounts.length; j++) {
                          if (tablecounts[j]._id == tempwaiters[i]._id) {
                            tempwaiters[i].numtables = tablecounts[j].count
                          }
                        }
                      }

                      this.setState({ waiters: tempwaiters });
                    })
                  })
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    deleteWaiter(id) {
      axios.delete("http://localhost:5000/waiters/" + id).then((response) => {
        console.log(response.data);
        console.log("fired");
      });
  
      this.setState({
        waiters: this.state.waiters.filter((el) => el._id !== id),
      });
 
    }
 

    waiterList() {
      return this.state.waiters.map((currentwaiter) => {
        return (
          <Waiter
            waiter={currentwaiter}
            deleteWaiter={this.deleteWaiter}
            key={currentwaiter._id}
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
              <h2>Waiters</h2>
              <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                  <tr>
                    <th>Waiter ID</th>
                    <th>Name</th>
                    <th>Total Tips</th>
                    <th>Expected tip amount</th>
                    <th>Number of Tables</th>
                  </tr>
                </thead>
                <tbody>{this.waiterList()}</tbody>
              </table>
              <br></br>
              <a href="/createWaiter">
                <Button variant="primary" size="lg">
                    Add Waiter
                </Button>
              </a>
            </div>
        </div>
      );
    }
  }