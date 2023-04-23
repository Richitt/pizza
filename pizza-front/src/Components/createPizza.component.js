import React, { useState, useEffect } from "react";
import axios from 'axios';
import PizzaForm from "./PizzaForm";

const CreatePizza = () =>{
    const[formValues, setFormValues] = useState({name:'', meatType:'', orderDate:''})

    //this will submit and create a new pizza order
    //hardcoding ports for now
    const onSubmit = pizzaObject =>{
        axios.post(
            'http://localhost:4000/pizzas/create-pizza', 
                pizzaObject)
                  .then(res => {
                    if (res.status === 200)
                      alert('Pizza successfully created')
                    else
                      Promise.reject()
                  })
                  .catch(err => alert('Something went wrong'))
    }
    //will return completion of form
    return(
        <PizzaForm initialValues={formValues} 
            onSubmit={onSubmit} 
            enableReinitialize>
            Create Pizza
        </PizzaForm>
    )
}


//export
export default CreatePizza