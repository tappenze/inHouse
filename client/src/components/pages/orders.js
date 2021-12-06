import React, { Component } from "react";
import axios from 'axios';

const Order = (props) => (
    <tr>
      <td>{props.table._id}</td>
      <td>{props.table.table_id}</td>
      <td>{props.table.items.map((item, i) => {
          return <tr key={i} value={item}>{item}</tr>
      })}</td>
      <td>
        <a
          href="/"
          onClick={() => {
            props.deleteOrder(props.order._id);
          }}
        >
          Delete
        </a>
      </td>
    </tr>
  );

export default class Tables extends Component {
    constructor(props) {
      super(props);
      this.state = { orders: [] };
    }

    componentDidMount() {
      axios
        .get("http://localhost:5000/order/")
        .then((response) => {
          this.setState({ orders: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    // not working 
    deleteOrder(id) {
        console.log("deleting")
        console.log(id)
      axios.delete("http://localhost:5000/order/" + id).then((response) => {
        console.log(response.data);
      });
  
      this.setState({
        tables: this.state.tables.filter((el) => el._id !== id),
      });
    }

    orderList() {
      return this.state.orders.map((currentorder) => {
        return (
          <Order
            table={currentorder}
            deleteTable={this.deleteOrder}
            key={currentorder._id}
          />
        );
      });
    }

    render() {
      return (
        <div>
          <h3>Orders</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Table ID</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>{this.orderList()}</tbody>
          </table>
        </div>
      );
    }
  }