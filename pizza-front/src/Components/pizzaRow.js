import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const PizzaRow = (props) =>{
    const {_id, name, meatType, date} = props.obj;

    return (
        <tr>
          <td>{name}</td>
          <td>{meatType}</td>
          <td>{date}</td>
        </tr>
      );
};

export default PizzaRow
