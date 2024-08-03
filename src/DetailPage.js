import {useParams} from "react-router-dom";
import styled from 'styled-components'
import {useEffect, useState} from "react";


function DetailPage(props) {
    useEffect(()=> {
        setInterval(()=>{
            setShow(false)
        },2000)
    }, [])


    let { id } = useParams();
    let 찾은상품 = props.shoes.find(function(x){
        return x.id == id
    });
    const [show, setShow] = useState(true)

    const [idValue, setIdValue] = useState(0)
    const handleInputChange = (event) => {
        setIdValue(event.target.value);
    };


    let YellowBtn = styled.button`
        background: yellow;
        color : black;
        padding : 10px;
    `

    return (
        <div className="container">
            {show && (
                <div className="alert alert-warning">
                    2초 이내 구입시 할인
                </div>
            )}
            <div className="row">
                <div className="col-md-6">
                    <img src={`https://codingapple1.github.io/shop/shoes${parseInt(id)+1}.jpg`} width="100%"/>
                </div>
                <div className="col-md-6 mt-4">
                    <YellowBtn>버튼</YellowBtn>
                    <InputTest setIdValue={setIdValue} IdValue={idValue} handleInputChange={handleInputChange}></InputTest>
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}원</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    )
};

function InputTest(props) {
    useEffect(()=> {
        if (isNaN(props.IdValue) === true) {
            alert('숫자를 입력해주세요')
            props.setIdValue(0)
        }
        else console.log('숫자를 입력했네요')
        return() => {
            props.setIdValue(0)
        }
    },  [props.IdValue])
    return (
        <input value={ props.setIdValue(props.IdValue) } onChange={ props.handleInputChange }/>
    )
}

export default DetailPage