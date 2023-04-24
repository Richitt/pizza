import React, { useState, useEffect } from "react";
import axios from 'axios';
import PizzaForm from "./PizzaForm";

const CreatePizza = () =>{
    const[formValues, setFormValues] = useState({person:'', 'meat-type':'', date:''})
    const[name, setName] = useState('');
    const[meatType, setMeat] = useState('');
    const[date, setDate] = useState('');

    //this will submit and create a new pizza order
    //hardcoding ports for now
    const handleSubmit = (event) =>{
        event.preventDefault();
        axios.post(
            'http://localhost:4000/pizzas/createPizza', 
                {person: name, 'meat-type': meatType, date: date})
                  .then(res => {
                    if (res.status === 200)
                      alert('Pizza successfully created')
                    else
                      Promise.reject()
                  })
                  .catch(err => {
                    console.log("aa " + err);
                    alert('Something went wrong');
                })
    };
    //will return completion of form
    return(
        <div>
        <form onSubmit={handleSubmit}>
            <label>Enter your name:
                <input
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>Enter your meat type:
                <input
                type="text" 
                value={meatType}
                onChange={(e) => setMeat(e.target.value)}
                />
            </label>
            <label>Enter your date:
                <input
                type="text" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                />
            </label>
            <input type ="submit"/>
        </form>
        </div>
        

    )
}


//export
export default CreatePizza