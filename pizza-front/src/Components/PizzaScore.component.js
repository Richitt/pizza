import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import DayRow from "./DayRow";

const PizzaScore = () => {
    //pizzas will be updated with this state
    const [days, setDays] = useState([]);
    const [day, setDay] = useState('');
    const [recordDate, setDate] = useState('');
    const [recordDate2, setDate2] = useState('');

    //grab pizzas
    const handleSubmit = (event) =>{
        event.preventDefault();
        axios.get("http://localhost:4000/pizzas/pizzaMonthStreak", {params: {month:recordDate}})
            .then(({ data }) => {
                setDays(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const DayTable = () => {
        return days.map((res, i) => {
            //create a pizza row to display
            return <DayRow obj={res} key={i} />;
          });
    }

    const handleSubmit2 = (event) =>{
        event.preventDefault();
        axios.get("http://localhost:4000/pizzas/pizzaMonth", {params: {month:recordDate2}})
            .then(({ data }) => {
                setDay(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };



      //return all the pizzas we fetched tablewise
      return(
        <div className="view-wrapper">
            <div className="view-wrapper">
            <form onSubmit={handleSubmit2}>
                    <label>Enter your month to check to find the day with most pizzas ordered:
                        <input
                        type="text" 
                        value={recordDate2}
                        onChange={(e) => setDate2(e.target.value)}
                        />
                    </label>
                    <input type ="submit"/>
                    <label>
                        {day}
                    </label>
                </form>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>Enter your month to check to find the longest streak of days:
                        <input
                        type="text" 
                        value={recordDate}
                        onChange={(e) => setDate(e.target.value)}
                        />
                    </label>
                    <input type ="submit"/>
                </form>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Pizzas Consumed on This Day</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>{DayTable()}</tbody>
            </Table>
            </div>
      );
    }

    export default PizzaScore