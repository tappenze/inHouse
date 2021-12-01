import React, { Component } from "react";
import axios from 'axios';
 
export default class CreateParty extends Component {
  constructor(props) {
    super(props);
 
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      name: "",
      phone: "",
      size: ""
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
 
  onChangePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }
 
  onChangeSize(e) {
    this.setState({
      size: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const new_party = {
      name: this.state.name,
      phone: this.state.phone,
      size: parseInt(this.state.size),
      total: 0
    };
 
    axios
      .post("http://localhost:5000/party", new_party)
      .then((res) => console.log(res.data));

    this.setState({
      name: "",
      phone: "",
      size: ""
    });
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create New Party</h3>
        <form onSubmit={this.onSubmit}>
        <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Phone Number: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.phone}
              onChange={this.onChangePhone}
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
            <input
              type="submit"
              value="Create party"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}