import React, { Component } from "react";
import axios from 'axios';
 
export default class CreateWaiter extends Component {
  constructor(props) {
    super(props);
 
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeTips = this.onChangeTips.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

 
    this.state = {
      name: "",
      tips: ""
    };
  }

  onChangeName(e) {
    this.setState({
        name: e.target.value,
    });
  }

  onChangeTips(e) {
    this.setState({
        tips: e.target.value,
    });
  }


  onSubmit(e) {
    e.preventDefault();

    const new_waiter = {
      name: this.state.name,
      tips: parseFloat(this.state.tips)
    };
 
    axios
      .post("http://localhost:5000/waiters", new_waiter)
      .then((res) => console.log(res.data));

    this.setState({
        name: "",
        tips: ""
    });
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create New Waiter</h3>
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
            <label>Tips: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.tips}
              onChange={this.onChangeTips}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create waiter"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}