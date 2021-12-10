import React, { Component } from "react";
import axios from 'axios';
 
export default class CreateMenu extends Component {
  constructor(props) {
    super(props);
 
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      name: "",
      price: ""
    };
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
        <h3>Create New Menu Item</h3>
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
          <div className="form-group">
            <input
              type="submit"
              value="Create menu item"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}