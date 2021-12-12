import React, { Component } from "react";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import trash from './delete.png';
import inhouse from './InHouse.png';

const Order = (props) => (
    <tr>
      <td>{props.order._id}</td>
      <td>{props.order.table_name}</td>
      <td>{props.order.item_names.map((item, i) => {
          return <tr key={i} value={item}>{item}</tr>
      })}</td>
      <td>
        <a
          href="/orders"
          onClick={() => {
            props.deleteOrder(props.order._id);
          }}
        >
          <img className="trash" alt="Delete" src={trash}></img>
        </a>
      </td>
    </tr>
  );

export default class Orders extends Component {
    constructor(props) {
      super(props);
      this.state = { orders: [] };
    }

    componentDidMount() {
      let menu = [];
      let tables = [];
      axios.get("http://localhost:5000/menu/").then((response) => {
        menu = response.data
        axios.get("http://localhost:5000/table/").then((response) => {
          tables = response.data
          console.log("menu:")
          console.log(menu)
          console.log("tables:")
          console.log(tables)
          axios
        .get("http://localhost:5000/order/")
        .then((response) => {
          console.log(response.data);
          let temporders = response.data;
          console.log("before")
          console.log(temporders)
          temporders.map(temporder=> ({ ...temporder, table_name: "", item_names: [] }))
          for (let i = 0; i < temporders.length; i++) {
            for (let j = 0; j < tables.length; j++) {
              if (tables[j]._id == temporders[i].table_id) {
                temporders[i].table_name = tables[j].name
                break
              }
            }
          }
          for (let i = 0; i < temporders.length; i++) {
            for (let j = 0; j < temporders[i].items.length; j++) {
              for (let k = 0; k < menu.length; k++) {
                if (temporders[i].items[j] == menu[k]._id) {
                  console.log(menu[k].name)
                  console.log(temporders[i])
                  // temporders[i].item_names.push(menu[k].name)
                  if (temporders[i].item_names == undefined) {
                    temporders[i].item_names = [menu[k].name]
                  } else {
                    temporders[i].item_names.push(menu[k].name)
                  }
                }
              }
            }
          }
          console.log("after:")
          console.log(temporders)
          this.setState({ orders: temporders});
        })
        .catch(function (error) {
          console.log(error);
        });
        });
      });
      
      

    }

    deleteOrder(id) {
      console.log("deleting")
      console.log(id)
      axios.delete("http://localhost:5000/order/" + id).then((response) => {
        console.log(response.data);
      });
  
      this.setState({
        orders: this.state.orders.filter((el) => el._id !== id),
      });
    }

    getTableName(id) {
      axios.get("http://localhost:5000/table/" + id).then((response) => {
        return response.data.name
      });
    }

    getItemName(id) {

    }

    orderList() {
      console.log("orderlist is")
      console.log(this.state.orders)
      return this.state.orders.map((currentorder) => {
        console.log("order")
        console.log(currentorder)
        console.log(currentorder.table_name)
        console.log(currentorder.item_names)
        return (
          <Order
            order={currentorder}
            deleteTable={this.deleteOrder}
            key={currentorder._id}
          />
        );
      });
    }

    render() {
      return (
        <div style={{ marginTop: 20 }}>
          <a href="/"><img className="logo" alt="" src={inhouse}></img></a>
            <br></br>
            <br></br>
            <div style={{textAlign: "center"}}>
              <h2>Orders</h2>
              <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Table Name</th>
                    <th>Items</th>
                  </tr>
                </thead>
                <tbody>{this.orderList()}</tbody>
              </table>
              <br></br>
              <a href="/createOrders">
                <Button variant="primary" size="lg">
                    Place Order
                </Button>
              </a>
            </div>
        </div>
      );
    }
  }