import React, { Component } from "react";
import { useLocation } from "react-router"
import axios from 'axios';
import inhouse from './InHouse.png';
 
export default class EditMenu extends Component {  
  constructor(props) {
    super(props);
 
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      name: "",
      price: ""
    };
    
    console.log(props)
    console.log(props.location.state)
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
 
  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const new_menu_item = {
      name: this.state.name,
      price: parseFloat(this.state.price)
    };
 
    axios
      .post("http://localhost:5000/menu", new_menu_item)
      .then((res) => console.log(res.data));
      console.log("axios menu item")

    this.setState({
      name: "",
      price: ""
    });
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <a href="/"><img className="logo" alt="" src={inhouse}></img></a>
        <br></br>
        <br></br>
        <div style={{textAlign: "center"}}>
          <h2>Update Menu Item</h2>
          <br></br>
          <div style={{display: "inline-block", textAlign: "left"}}>
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label>Menu Item Name: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label>Price: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.price}
                  onChange={this.onChangePrice}
                />
              </div>
              <br></br>
              <div className="form-group">
                <input
                  type="submit"
                  value="Update menu item"
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