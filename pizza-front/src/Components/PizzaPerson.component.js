import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import PizzaRow from "./PizzaRow";

const PizzaPerson = () => {
    //pizzas will be updated with this state
    const [person, setPerson] = useState('');
    const [pizzas, setPizzas] = useState([]);

    //grab pizzas
    const handleSubmit = (event) =>{
        event.preventDefault();
        axios.get("http://localhost:4000/pizzas/pizzaPerson", {params: {name: person}})
            .then(({ data }) => {
                console.log("aaa");
                console.log(data);
                setPizzas(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const PizzaTable = () => {
        return pizzas.map((res, i) => {
            //create a pizza row to display
            return <PizzaRow obj={res} key={i} />;
          });
    }


      //return all the pizzas we fetched tablewise
      return(
        <div className="view-wrapper">
                <form onSubmit={handleSubmit}>
                    <label>Enter a name to find all the pizzas ordered by them:
                        <input
                        type="text" 
                        value={person}
                        onChange={(e) => setPerson(e.target.value)}
                        />
                    </label>
                    <input type ="submit"/>
                </form>
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

    export default PizzaPerson