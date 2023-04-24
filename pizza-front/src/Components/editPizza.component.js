// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import PizzaForm from "./PizzaForm";
  
// EditPizza Component
const EditPizza = (props) => {
  const [formValues, setFormValues] = useState({
    name: "",
    meatType: "",
    date: "",
  });
    
  //onSubmit handler
  const onSubmit = (pizzaObject) => {
    axios
      .put(
        "http://localhost:4000/pizzas/updatePizza" +
          props.match.params.id,
        pizzaObject
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Student successfully updated");
          props.history.push("/pizzaList");
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };
  
  useEffect(() => {
    axios
      .get(
        "http://localhost:4000/pizzas/updatePizza" 
        + props.match.params.id
      )
      .then((res) => {
        const { name, meatType, date } = res.data;
        setFormValues({ name, meatType, date });
      })
      .catch((err) => console.log(err));
  }, []);
  
  return (
    <PizzaForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Edit Pizza
    </PizzaForm>
  );
};
  
export default EditPizza;