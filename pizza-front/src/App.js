// Import React
import React from "react";
// Import Bootstrap
import { Nav, Navbar, Container, Row, Col } 
        from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
// Import Custom CSS
import "./App.css";
// Import from react-router-dom
import { BrowserRouter as Router, Routes,
    Route, Link } from "react-router-dom";
// Import other React Component
import CreatePizza from 
    "./Components/createPizza.component";
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
      
                  <Nav className="justify-content-end">
                    <Nav>
                      <Link to={"/createPizza"} 
                        className="nav-link">
                        Create Pizza
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
                        element={CreatePizza} />
                      <Route path="/createPizza" 
                        element={CreatePizza} />
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
