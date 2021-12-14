import React, { Component } from "react";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import trash from './delete.png';
import inhouse from './InHouse.png';

const Party = (props) => (
    <tr>
      <td>{props.party._id}</td>
      <td>{props.party.name}</td>
      <td>{props.party.phone}</td>
      <td>{props.party.size}</td>
      <td>
        <a
          href="/parties"
          onClick={() => {
            props.deleteParty(props.party._id);
          }}
        >
          <img className="trash" alt="Delete" src={trash}></img>
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
        <div style={{ marginTop: 20 }}>
          <a href="/"><img className="logo" alt="" src={inhouse}></img></a>
            <br></br>
            <br></br>
            <div style={{textAlign: "center"}}>
              <h2>Parties</h2>
              <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                  <tr>
                    <th>Party ID</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Size</th>
                  </tr>
                </thead>
                <tbody>{this.partyList()}</tbody>
              </table>
              <br></br>
              <a href="/createParties">
                <Button variant="primary" size="lg">
                    Add Party
                </Button>
              </a>
            </div>
        </div>
      );
    }
  }