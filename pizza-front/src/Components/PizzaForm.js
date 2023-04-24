import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormControl, Button } from "react-bootstrap";
  
const PizzaForm = (props) => {
  const validationSchema = Yup.object().shape({
    person: Yup.string().required("Required"),
    'meat-type': Yup.string().required("Required"),
    orderDate: Yup.date().required("Required"),
  });
  console.log("came in here");
  console.log(props);
  console.log(props.children);
  return (
    <div className="form-wrapper">
      <Formik {...props} validationSchema={validationSchema}>
        <Form  onSubmit = {props.onSubmit}>
          <FormGroup>
            Name: 
            <Field name="person" type="text" 
                className="form-control" />
            <ErrorMessage
              name="person"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            MeatType: 
            <Field name='meat-type' type="text" 
                className="form-control" />
            <ErrorMessage
              name='meat-type'
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            Date:
            <Field name="date" type="number" 
                className="form-control" />
            <ErrorMessage
              name="date"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <Button variant="danger" size="lg"
            block="block" type="submit">
            {props.children}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};
  
export default PizzaForm;