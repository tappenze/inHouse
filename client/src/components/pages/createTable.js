import React, { Component } from "react";
import axios from 'axios';
 
export default class CreateTable extends Component {
  constructor(props) {
    super(props);
 
    this.onChangeParty = this.onChangeParty.bind(this);
    this.onChangeWaiter = this.onChangeWaiter.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      party_id: "",
      waiter_id: "",
      size: "",
      status: ""
    };
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
      party_id: "",
      table_id: "",
      size: "",
      status: ""
    });
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create New Table</h3>
        <form onSubmit={this.onSubmit}>
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
                checked={this.state.person_level === "Occupied"}
                onChange={this.onChangeStatus}
              />
              <label className="form-check-label">Occupied</label>
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create table"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}