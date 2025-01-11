import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import shoes1 from './img/shoes1.jpg';
import shoes2 from './img/shoes2.jpg';
import shoes3 from './img/shoes3.jpg';

import { Container, Nav, Navbar } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from "react";
import DetailPage from "./DetailPage";
import axios from "axios";
import Cart from "./routes/Cart.js";

import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

function App() {

    useEffect(() => {
        !localStorage.getItem('watched') && localStorage.setItem('watched', JSON.stringify([]));
    }, []);

    let [shoes, setShoes] = useState(data);
    const shoeImages = [shoes1, shoes2, shoes3];
    let navigate = useNavigate();

    // 버튼 클릭 상태 관리
    const [buttonClicked, setButtonClicked] = useState(false);

    const handleClick = () => {
        axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((추가데이터) => {
                setShoes([...shoes, ...추가데이터.data]);
                setButtonClicked(true); // 버튼 클릭 시 상태 변경
            });
    };

    return (
        <div className="App">
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#">ShoeShop</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => { navigate('/') }}>
                            Home
                        </Nav.Link>
                        <Nav.Link onClick={() => { navigate('/detail/0') }}>
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
                                {shoes.map((a, i) => {
                                    return (
                                        <Product i={i} shoes={shoes} key={i} />
                                    )
                                })}
                            </Row>
                        </Container>

                        {/* 버튼 클릭 시 버튼이 사라지도록 조건 추가 */}
                        {!buttonClicked && (
                            <button onClick={handleClick}>버튼</button>
                        )}
                    </>
                } />
                <Route path="/detail/:id" element={<DetailPage shoes={shoes} />} />
                <Route path="/cart" element={<Cart />} />
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
    );
}

function Product(props) {
    return (
        <Col sm>
            <Link to={`/detail/${props.i}`} onClick={() => {
                let 꺼낸거 = localStorage.getItem('watched');
                let 어레이 = JSON.parse(꺼낸거);
                if (!어레이.includes(`${props.i}`)) {
                    어레이.push(`${props.i}`);
                }

                console.log(어레이);
                localStorage.setItem('watched', JSON.stringify(어레이));
            }}>
                <img src={props.shoeImages} width="80%" />
                <img src={`https://codingapple1.github.io/shop/shoes${parseInt(props.i) + 1}.jpg`} width="80%" />
            </Link>
            <h4>{props.shoes[props.i].title}</h4>
            <p>{props.shoes[props.i].price}</p>
        </Col>
    );
}

export default App;
