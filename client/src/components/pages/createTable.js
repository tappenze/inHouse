import React, { Component } from "react";
import axios from 'axios';
import inhouse from './InHouse.png';
 
export default class CreateTable extends Component {
  constructor(props) {
    super(props);
 
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeWaiter = this.onChangeWaiter.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      name: "",
      waiter_id: "",
      size: "",
      waiters: []
    };
  }

  componentWillMount() {
    axios
      .get("http://localhost:5000/waiters/")
      .then((res) => {
        this.setState({ waiters: res.data, waiter_id: res.data[0]._id })
      })
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
 
  onChangeWaiter(value) {
    this.setState({
      waiter_id: value,
    });
  }
 
  onChangeSize(e) {
    this.setState({
      size: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const new_table = {
      name: this.state.name,
      waiter_id: this.state.waiter_id,
      size: parseInt(this.state.size),
      status: "Open"
    };
    console.log(this.state.status)
 
    axios
      .post("http://localhost:5000/table", new_table)
      .then((res) => console.log(res.data));

    this.setState({
      name: "",
      party_id: "",
      table_id: "",
      size: ""
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
                <label>Waiter: </label>
                <select className="form-control" onChange={({ target: { value } }) => this.onChangeWaiter(value)}>
                  {this.state.waiters.map((waiter) => (
                    <option value={waiter._id}>{waiter.name}</option>
                  ))}
                </select>
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