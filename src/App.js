import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import shoes1 from './img/shoes1.jpg';
import shoes2 from './img/shoes2.jpg';
import shoes3 from './img/shoes3.jpg';

import { Container, Nav, Navbar } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState} from "react";
import DetailPage from "./DetailPage";

import data from './data.js'
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

function App() {

    let [shoes] = useState(data);
    const shoeImages = [shoes1, shoes2, shoes3];
    let navigate = useNavigate();

    return (
      <div className="App">
          <Navbar bg="dark" data-bs-theme="dark">
              <Container>
                  <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
                  <Nav className="me-auto">
                      <Nav.Link onClick={() => {navigate('/')}}>
                          Home
                      </Nav.Link>
                      <Nav.Link onClick={() => {navigate('/detail/0')}}>
                          Detail
                      </Nav.Link>
                  </Nav>
              </Container>
          </Navbar>

          <Routes>
              <Route path="/" element={
                  <>
                      <div className="main-bg"></div>
                      <Container>
                          <Row>
                              {
                                  shoes.map(function(a, i) {
                                      return (
                                          <Product shoeImages={shoeImages[i]} i={i} shoes={shoes}/>
                                      )
                                  })
                              }

                          </Row>
                      </Container>
                  </>
              } component={App} />
              <Route path="/detail/:id" element={ <DetailPage shoes={shoes}/> }/>
              <Route path="/about" element={<div>어바웃페이지임</div>} />
              <Route path="/event" element={<Event />}>
                  <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
                  <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
              </Route>
          </Routes>


      </div>
  );
}
function Event() {
    return (
        <div>
            <h4>오늘의 이벤트</h4>
            <Outlet></Outlet>
        </div>
    )
}

function Product(props) {
    return (
        <Col sm>
            <Link to={`/detail/${props.i}`}>
                <img src={props.shoeImages} width="80%"/>
            </Link>
            <h4>{props.shoes[props.i].title}</h4>
            <p>{props.shoes[props.i].price}</p>
        </Col>
    )
}


export default App;