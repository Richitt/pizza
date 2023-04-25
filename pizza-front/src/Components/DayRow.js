import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const DayRow = (props) =>{
    var streak = props.obj["pizzaStreak"];
    var date = props.obj["day"];

    return (
        <tr>
          <td>{streak}</td>
          <td>{date}</td>
        </tr>
      );
};

export default DayRow
