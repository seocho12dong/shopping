import {useParams} from "react-router-dom";
import styled from 'styled-components'


function DetailPage(props) {

    let { id } = useParams();
    let 찾은상품 = props.shoes.find(function(x){
        return x.id == id
    });

    let YellowBtn = styled.button`
        background: yellow;
        color : black;
        padding : 10px;
    `

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    {/*<img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%"/>*/}
                    <img src={`https://codingapple1.github.io/shop/shoes${parseInt(id)+1}.jpg`} width="100%"/>
                </div>
                <div className="col-md-6 mt-4">
                    <YellowBtn>버튼</YellowBtn>
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}원</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    )
};

export default DetailPage