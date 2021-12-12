import React, { Component } from "react";
import axios from 'axios';
import inhouse from './InHouse.png';
 
// for a given party, they should be able to place an order for foods from among the listed menu

export default class CreateOrder extends Component {
  constructor(props) {
    super(props);
 
    this.onChangeTable = this.onChangeTable.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      tables: [],
      chosenTable: "",
      menu: [],
      choices: [],
    };
  }
 
  handleOnChange(position) {
    let tempchoices = this.state.choices;
    tempchoices[position] = tempchoices[position] ? false : true;
    console.log(tempchoices)
    this.setState({choices: tempchoices})
  }

  onChangeTable(e) {
    console.log(e.target.value)
    this.setState({
      chosenTable: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    var items = [];
    for(let i=0; i < this.state.menu.length; i++) {
      if (this.state.choices[i]) {
        items.push(this.state.menu[i]._id)
      }
    }

    const order = {
      table_id: this.state.chosenTable,
      items: items
    };
 
    console.log(order)

    axios
      .post("http://localhost:5000/order", order)
      .then((res) => console.log(res.data));

    // this.setState({
    //   party_id: "",
    //   table_id: "",
    //   size: "",
    //   status: ""
    // });
  }

  componentDidMount() {
    console.log("mounting")
    axios
      .get("http://localhost:5000/table/occupied")
      .then((response) => {
        console.log(response.data);
        this.setState({ tables: response.data });
        this.setState({ chosenTable: response.data[0]._id})
      })
      .catch(function (error) {
        console.log(error);
      });

      axios
      .get("http://localhost:5000/menu/")
      .then((response) => {
        console.log(response.data);
        this.setState({ menu: response.data });
        this.setState({ choices: new Array(response.data.length).fill(false)});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    
    const { tables } = this.state;
    const { menu } = this.state;
    let tablesList = tables.length > 0
    	&& tables.map((item, i) => {
      return (
        <option key={i} value={item._id}>{item.name}</option>
      )
    }, this);

    let menuitems = menu.length > 0
      && menu.map((item, i) => {
        return (
          <div className="item">
              <input type="checkbox" key={i} id={item._id} value={item.name} checked={this.state.choices[i]} onChange={() => this.handleOnChange(i)}/>{item.name}
            </div>
        )
      }, this);

    return (
      <div style={{ marginTop: 20 }}>
        <a href="/"><img className="logo" alt="" src={inhouse}></img></a>
        <br></br>
        <br></br>
        <div style={{textAlign: "center"}}>
          <h2>Create New Order</h2>
          <br></br>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Select an occupied table: </label>
              <select onChange={this.onChangeTable}> 
                {tablesList}
              </select>
            </div>
            <div className="App" style={{display: "inline-block", textAlign: "left"}}>
              Select your menu items:
              {menuitems}
            </div>
            <br></br>
            <br></br>
            <div className="form-group">
              <input
                type="submit"
                value="Submit order"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}