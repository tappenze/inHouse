import React, { Component } from "react";
import axios from 'axios';
import inhouse from './InHouse.png';

const Walkin = (props) => (
    <tr>
      <td>{props.walkin.name} ({props.walkin.phone})</td>
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
            axios.get("http://localhost:5000/party/")
              .then((response2) => {
                  let walkins = response.data.map((r) => {
                      let name = "";
                      let phone = "";
                      for (const r2 of response2.data) {
                          if (r2._id == r.party_id) {
                              name = r2.name;
                              phone = r2.phone;
                          }
                      }
                      return {
                          _id: r._id,
                          party_id: r.party_id,
                          time: r.time,
                          name: name,
                          phone: phone
                      }
                  })
                  console.log(response.data)
                  console.log(response2.data)
                  console.log(walkins)
                  this.setState({ walkins: walkins });
              })
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
                    <th>Party</th>
                  </tr>
                </thead>
                <tbody>{this.walkinList()}</tbody>
              </table>
            </div>
        </div>
      );
    }
  }