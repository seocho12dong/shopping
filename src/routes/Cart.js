import {Table} from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import {changeAge, changeCount, changeName} from "../store";

function Cart() {

    let state = useSelector((state)=>{ return state })
    let dispatch = useDispatch();

    return (
        <div>
            <h6>{state.user.name} {state.user.age}의 장바구니</h6>
            <button onClick={()=>{
                dispatch(changeAge(10))
            }}>
                버튼
            </button>

            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
                </thead>
                <tbody>
                    {state.cartData.map((a, i) =>
                        <tr>
                            <td>{i+1}</td>
                            <td>{state.cartData[i].name}</td>
                            <td>{state.cartData[i].count}</td>
                            <td>
                                <button onClick={()=>{
                                    dispatch(changeCount(i))
                                }}>+</button>
                            </td>
                            <td>
                                <button onClick={()=>{
                                    dispatch(changeName())

                                }}>+</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default Cart