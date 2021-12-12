import React, { Component } from "react";
import axios from 'axios';
import inhouse from './InHouse.png';

const Walkin = (props) => (
    <tr>
      <td>{props.walkin.party_id}</td>
    </tr>
  );

export default class Walkins extends Component {
    constructor(props) {
      super(props);
      this.state = { walkins: [] };
    }

    componentDidMount() {
      axios
        .get("http://localhost:5000/walkins/")
        .then((response) => {
          console.log(response.data);
          this.setState({ walkins: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    walkinList() {
      return this.state.walkins.map((currentwalkin) => {
        return (
          <Walkin
            walkin={currentwalkin}
            key={currentwalkin._id}
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
              <h2>Walk-Ins</h2>
              <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                  <tr>
                    <th>Party ID</th>
                  </tr>
                </thead>
                <tbody>{this.walkinList()}</tbody>
              </table>
            </div>
        </div>
      );
    }
  }