// Import React
import React from "react";
import pizza from './images/pizza.png';
// Import Bootstrap for UI
import { Nav, Navbar, Container, Row, Col } 
        from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

//importing the routes and implementing them
import { BrowserRouter as Router, Routes,
    Route, Link } from "react-router-dom";
import CreatePizza from 
    "./Components/createPizza.component";
import PizzaList from 
    "./Components/PizzaList.component";
import PizzaScore from 
    "./Components/PizzaScore.component";
import PizzaPerson from 
    "./Components/PizzaPerson.component";

const App = () => {
      return (
        <Router>
          <div className="App">
            <header className="App-header">
              <Navbar bg="dark" variant="dark">
                <Container>
                  <Navbar.Brand>
                    <Link to={"/createPizza"} 
                      className="nav-link">
                      Pizza App
                    </Link>
                  </Navbar.Brand>
                  
                  <img src={pizza} />
      
                  <Nav className="justify-content-end">
                    <Nav>
                      <Link to={"/createPizza"} 
                        className="nav-link">
                        Create Pizza
                      </Link>
                    </Nav>
                    <Nav>
                        <Link to={"/PizzaList"} 
                          className="nav-link">
                          Pizza List
                        </Link>
                        <Link to={"/PizzaScore"} 
                          className="nav-link">
                          Pizza Scores
                        </Link>
                        <Link to={"/PizzaPerson"} 
                          className="nav-link">
                          Pizza Persons
                        </Link>
                    </Nav>
                  </Nav>
                </Container>
              </Navbar>
            </header>
      
            <Container>
              <Row>
                <Col md={12}>
                  <div className="wrapper">
                    <Routes>
                      <Route exact path="/" 
                        element={CreatePizza()} />
                      <Route path="/createPizza" 
                        element={CreatePizza()} />
                      <Route path="/pizzaList" 
                        element={PizzaList()} />
                      <Route path="/pizzaScore" 
                        element={PizzaScore()} />
                      <Route path="/pizzaPerson" 
                        element={PizzaPerson()} />
                    </Routes>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Router>
      );
    };
      
export default App;
