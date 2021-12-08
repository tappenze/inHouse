import React, { Component } from "react";
import axios from 'axios';

const Party = (props) => (
    <tr>
      <td>{props.party._id}</td>
      <td>{props.party.name}</td>
      <td>{props.party.phone}</td>
      <td>{props.party.size}</td>
      <td>{props.party.total}</td>
      <td>
        <a
          href="/"
          onClick={() => {
            props.deleteParty(props.party._id);
          }}
        >
          Delete
        </a>
      </td>
    </tr>
  );

export default class Parties extends Component {
    constructor(props) {
      super(props);
      this.state = { parties: [] };
    }

    componentDidMount() {
      axios
        .get("http://localhost:5000/party/")
        .then((response) => {
          console.log(response.data);
          this.setState({ parties: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    deleteParty(id) {
      axios.delete("http://localhost:5000/party/" + id).then((response) => {
        console.log(response.data);
      });
  
      this.setState({
        parties: this.state.parties.filter((el) => el._id !== id),
      });
    }

    partyList() {
      return this.state.parties.map((currentparty) => {
        return (
          <Party
            party={currentparty}
            deleteParty={this.deleteParty}
            key={currentparty._id}
          />
        );
      });
    }

    render() {
      return (
        <div>
          <h3>Parties</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Party ID</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Size</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>{this.partyList()}</tbody>
          </table>
        </div>
      );
    }
  }