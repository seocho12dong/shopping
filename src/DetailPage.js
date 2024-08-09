import {Link, useParams} from "react-router-dom";
import styled from 'styled-components';
import { useEffect, useState } from "react";
import {Nav} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import { pushCart } from "./store";

function DetailPage(props) {

    let state = useSelector((state)=>{ return state })
    let dispatch = useDispatch();


    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    let { id } = useParams();
    let 찾은상품 = props.shoes.find(function (x) {
        return x.id == id;
    });
    let [탭, 탭변경] = useState(0)
    const [show, setShow] = useState(true);
    const [idValue, setIdValue] = useState('');

    const handleInputChange = (event) => {
        setIdValue(event.target.value);
    };

    let YellowBtn = styled.button`
        background: yellow;
        color : black;
        padding : 10px;
    `;

    return (
        <div className="container">
            {show && (
                <AlertFade>
                </AlertFade>
            )}
            <div className="row">
                <div className="col-md-6">
                    <img src={`https://codingapple1.github.io/shop/shoes${parseInt(id) + 1}.jpg`} width="100%"/>
                </div>
                <div className="col-md-6 mt-4">
                    <YellowBtn>버튼</YellowBtn>
                    <InputTest setIdValue={setIdValue} idValue={idValue}
                               handleInputChange={handleInputChange}></InputTest>
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}원</p>
                    <button className="btn btn-danger" onClick={() => {
                        dispatch(pushCart(찾은상품.id))
                    }}>주문하기
                    </button>
                </div>
                <Link to={`/cart`}>
                    장바구니 버튼
                </Link>
            </div>

            <Nav variant="tabs" defaultActiveKey="link-1">
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={()=>{탭변경(0)}}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={()=>{탭변경(1)}}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3" onClick={()=>{탭변경(2)}}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent 탭={탭}></TabContent>
        </div>
    );
}

function AlertFade(props) {
    let [fade, setFade] = useState('')

    useEffect(()=>{
        setTimeout(()=>{ setFade('end' )}, 100)

        return () => {
            setFade('')
        }
    }, [props.show])

    return (<div className={`start ${fade}`}>
                <div className="alert alert-warning">
                    2초 이내 구입시 할인
                </div>
            </div>)
}

function TabContent(props) {

    let [fade, setFade] = useState('')

    useEffect(()=>{
        setTimeout(()=>{ setFade('end' )}, 100)

        return () => {
            setFade('')
        }
    }, [props.탭])

    return (<div className={`start ${fade}`}>
        {
            [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.탭]
        }
    </div>)
}

function InputTest(props) {
    useEffect(() => {
        if (isNaN(props.idValue)) {
            alert('숫자를 입력해주세요');
            props.setIdValue('');
        }
    }, [props.idValue]); // props.idValue가 변경될 때만 실행

    return (
        <input value={props.idValue} onChange={props.handleInputChange} />
    );
}

export default DetailPage;
