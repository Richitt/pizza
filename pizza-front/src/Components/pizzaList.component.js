import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import pizzaRow from "./pizzaRow";

const pizzaList = () => {
    //pizzas will be updated with this state
    const [pizzas, setPizzas] = useState([]);

    //grab pizzas
    useEffect(() => {
        axios
          .get("http://localhost:4000/pizzas/")
          .then(({ data }) => {
            setPizzas(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

      const PizzaTable = () => {
        return pizzas.map((res, i) => {
            //create a pizza row to display
            return <pizzaRow obj={res} key={i} />;
          });
      }

      //return all the pizzas we fetched tablewise
      return(
        <div className="table-wrapper">
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>MeatType</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>{PizzaTable()}</tbody>
            </Table>
            </div>
      );
    }

    export default pizzaList