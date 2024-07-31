import {useParams} from "react-router-dom";
import data from "./data";

function DetailPage(props) {

    let {id} = useParams();
    let temp;

    data.map(function (a, i){
        if (props.shoes[i].id === id) {
            temp = props.shoes[i].id;
        }
    })

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%"/>
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{props.shoes[temp].title}</h4>
                    <p>{props.shoes[temp].content}</p>
                    <p>{props.shoes[temp].price}</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    )
}

export default DetailPage;