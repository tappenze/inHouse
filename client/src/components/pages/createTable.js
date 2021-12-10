import React, { Component } from "react";
import axios from 'axios';
import inhouse from './InHouse.png';
 
export default class CreateTable extends Component {
  constructor(props) {
    super(props);
 
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeParty = this.onChangeParty.bind(this);
    this.onChangeWaiter = this.onChangeWaiter.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      name: "",
      party_id: "",
      waiter_id: "",
      size: "",
      status: ""
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
 
  onChangeParty(e) {
    this.setState({
      party_id: e.target.value,
    });
  }
 
  onChangeWaiter(e) {
    this.setState({
      waiter_id: e.target.value,
    });
  }
 
  onChangeSize(e) {
    this.setState({
      size: e.target.value,
    });
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const new_table = {
      name: this.state.name,
      party_id: this.state.party_id,
      waiter_id: this.state.waiter_id,
      size: parseInt(this.state.size),
      status: this.state.status
    };
    console.log(this.state.status)
 
    axios
      .post("http://localhost:5000/table", new_table)
      .then((res) => console.log(res.data));

    this.setState({
      name: "",
      party_id: "",
      table_id: "",
      size: "",
      status: ""
    });
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <a href="/"><img className="logo" alt="" src={inhouse}></img></a>
        <br></br>
        <br></br>
        <div style={{textAlign: "center"}}>
          <h2>Create New Table</h2>
          <br></br>
          <div style={{display: "inline-block", textAlign: "left"}}>
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label>Table Name: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label>Party ID: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.party_id}
                  onChange={this.onChangeParty}
                />
              </div>
              <div className="form-group">
                <label>Waiter ID: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.waiter_id}
                  onChange={this.onChangeWaiter}
                />
              </div>
              <div className="form-group">
                <label>Size: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.size}
                  onChange={this.onChangeSize}
                />
              </div>
              <div className="form-group">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="priorityOptions"
                    id="priorityLow"
                    value="Open"
                    checked={this.state.status === "Open"}
                    onChange={this.onChangeStatus}
                  />
                  <label className="form-check-label">Open</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="priorityOptions"
                    id="priorityMedium"
                    value="Occupied"
                    checked={this.state.status === "Occupied"}
                    onChange={this.onChangeStatus}
                  />
                  <label className="form-check-label">Occupied</label>
                </div>
              </div>
              <br></br>
              <div className="form-group">
                <input
                  type="submit"
                  value="Create table"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}