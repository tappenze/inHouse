import React, { Component } from "react";
import axios from 'axios';
import inhouse from './InHouse.png';
 
export default class EditMenu extends Component {  
  constructor(props) {
    super(props);
 
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      name: props.location.state.name,
      price: props.location.state.price
    };
    
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

    const updated_menu_item = {
      name: this.state.name,
      price: parseFloat(this.state.price)
    };

    console.log(this.props.location.state._id)
    console.log(this.props.location.state.name)
    console.log(this.props.location.state.price)
    console.log(updated_menu_item.name)
    console.log(updated_menu_item.price)
 
    axios
      .put("http://localhost:5000/menu/" + this.props.location.state._id, updated_menu_item)
      .then((res) => console.log(res.data));
      console.log("axios menu item")

    this.setState({
      name: updated_menu_item.name,
      price: updated_menu_item.price
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
                  placeholder={this.props.location.state.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label>Price: </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={this.props.location.state.price}
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