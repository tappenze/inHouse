import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import axios from 'axios';
import inhouse from './InHouse.png';
import { Link } from "react-router-dom";

export default class EditWaiter extends Component {
    constructor(props) {
        super(props);
     
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeTips = this.onChangeTips.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        console.log("in edit waiter");

        console.log(props.location.state)

        var curr_name = props.location.state.name;
        var curr_tips = props.location.state.tips;

        console.log(curr_name);
        console.log(curr_tips);
     
        this.state = {
          name: curr_name,
          tips: curr_tips
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
    
        const updated_waiter = {
          name: this.state.name,
          tips: parseFloat(this.state.tips)
        };
     
        console.log("updated waiter name: " + updated_waiter.name)
        console.log("updated waiter tips: " + updated_waiter.tips)

        axios
          .put("http://localhost:5000/waiters/" + this.props.location.state._id, updated_waiter)
          .then((res) => console.log(res.data));

          console.log("updated waiter: " + updated_waiter.name)
    
        this.setState({
            name: updated_waiter.name,
            tips: updated_waiter.tips
        });
        
      }
    
      render() {

        return (
          <div style={{ marginTop: 20 }}>
            <a href="/"><img className="logo" alt="" src={inhouse}></img></a>
            <br></br>
            <br></br>
            <div style={{textAlign: "center"}}>
              <h2>Edit Waiter</h2>
              <br></br>
              <div style={{display: "inline-block", textAlign: "left"}}>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Name: </label>
                    <input
                      type="text"
                      placeholder={this.props.location.state.name}
                      className="form-control"
                      //value={this.state.name}
                      onChange={this.onChangeName}
                    />
                  </div>
                  <div className="form-group">
                    <label>Tips: </label>
                    <input
                      type="text"
                      placeholder={this.props.location.state.tips}
                      className="form-control"
                      //value={this.state.tips}
                      onChange={this.onChangeTips}
                    />
                  </div>
                  <br></br>
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Edit waiter"
                      className="btn btn-primary"
                    />
                  </div>
                  <Link to={{
                    pathname: "/waiters"
                    }}>
                    <Button variant="secondary" size="sm">
                      Go back
                    </Button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        );
      }
}