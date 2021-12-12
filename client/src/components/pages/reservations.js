import React, { Component } from "react";
import axios from 'axios';
import inhouse from './InHouse.png';

const Reservation = (props) => (
    <tr>
      <td>{props.reservation.name} ({props.reservation.phone})</td>
      <td>{props.reservation.time}</td>
    </tr>
  );

export default class Reservations extends Component {
    constructor(props) {
      super(props);
      this.state = { reservations: [] };
    }

    componentDidMount() {
      axios
        .get("http://localhost:5000/reservations/")
        .then((response) => {
          axios.get("http://localhost:5000/party/")
            .then((response2) => {
                
                let reservations = response.data.map((r) => {
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
                console.log(reservations)
                this.setState({ reservations: reservations });
            })
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    reservationList() {
      return this.state.reservations.map((currentreservation) => {
        return (
          <Reservation
            reservation={currentreservation}
            key={currentreservation._id}
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
              <h2>Reservations</h2>
              <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                  <tr>
                    <th>Party</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>{this.reservationList()}</tbody>
              </table>
            </div>
        </div>
      );
    }
  }