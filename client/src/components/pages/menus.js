import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import trash from './delete.png';
import inhouse from './InHouse.png';

const Menu = (props) => (
    <tr>
      <td>{props.menu._id}</td>
      <td>{props.menu.name}</td>
      <td>{props.menu.price}</td>
      <td>
        <Link to={{
          pathname: "/editMenu",
          state: {_id: props.menu._id, name: props.menu.name, price: props.menu.price}}
        }>
          <Button variant="primary" size="sm">
            Update
          </Button>
        </Link>
        <a
          href="/menu"
          onClick={() => {
            props.deleteMenu(props.menu._id);
          }}
        >
          <img className="trash" alt="Delete" src={trash}></img>
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
        <div style={{ marginTop: 20 }}>
          <a href="/"><img className="logo" alt="" src={inhouse}></img></a>
            <br></br>
            <br></br>
            <div style={{textAlign: "center"}}>
              <h2>Menu</h2>
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
              <br></br>
              <a href="/createMenu">
                <Button variant="primary" size="lg">
                    Add Menu Item
                </Button>
              </a>
            </div>
        </div>
      );
    }
  }