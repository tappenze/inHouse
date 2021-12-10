import React, { Component } from "react";
import axios from 'axios';

const Menu = (props) => (
    <tr>
      <td>{props.menu._id}</td>
      <td>{props.menu.name}</td>
      <td>{props.menu.price}</td>
      <td>
        <a
          href="/"
          onClick={() => {
            props.deleteMenu(props.menu._id);
          }}
        >
          Delete
        </a>
      </td>
    </tr>
  );

export default class Menus extends Component {
    constructor(props) {
      super(props);
      this.state = { menu: [] };
    }

    componentDidMount() {
      axios
        .get("http://localhost:5000/menu/")
        .then((response) => {
          console.log(response.data);
          this.setState({ menu: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    deleteMenu(id) {
      axios.delete("http://localhost:5000/menu/" + id).then((response) => {
        console.log(response.data);
      });
  
      this.setState({
        menu: this.state.menu.filter((el) => el._id !== id),
      });
    }

    menuList() {
      return this.state.menu.map((currentmenu) => {
        return (
          <Menu
            menu={currentmenu}
            deleteMenu={this.deleteMenu}
            key={currentmenu._id}
          />
        );
      });
    }

    render() {
      return (
        <div>
          <h3>Menu</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Menu Item</th>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>{this.menuList()}</tbody>
          </table>
        </div>
      );
    }
  }