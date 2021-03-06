import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import inhouse from './InHouse.png';
 
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
        <a href="/"><img className="logo" alt="" src={inhouse}></img></a>
        <br></br>
        <br></br>
        <div style={{textAlign: "center"}}>
          <h2>Create New Waiter</h2>
          <br></br>
          <div style={{display: "inline-block", textAlign: "left"}}>
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
              <br></br>
              <div className="form-group">
                <input
                  type="submit"
                  value="Create waiter"
                  className="btn btn-primary"
                />
              <Link to={{
                pathname: "/waiters"
                }}>
                <Button variant="secondary" size="md">
                  Go back
                </Button>
              </Link>                 
              </div>             
            </form>
          </div>
        </div>
      </div>
    );
  }
}