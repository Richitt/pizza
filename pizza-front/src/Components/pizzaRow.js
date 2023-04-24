import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const PizzaRow = (props) =>{
    var meatType = props.obj["meat-type"];
    var person = props.obj["person"];
    var date = props.obj["date"];

    return (
        <tr>
          <td>{person}</td>
          <td>{meatType}</td>
          <td>{date}</td>
        </tr>
      );
};

export default PizzaRow
