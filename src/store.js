    import {configureStore, createSlice} from '@reduxjs/toolkit'
    import data from './data.js'

    let user = createSlice({
        name : 'user',
        initialState : { name : 'kim', age : 20 },
        reducers : {
            changeName(state) {
                state.name = 'park'
            },
            changeAge(state, a) {
                state.age += a.payload;
            }
        }
    })

    export let { changeName } = user.actions

    export let {changeAge,  } = user.actions

    let cartData = createSlice({
        name : 'cartData',
        initialState : [
            {id : 0, name : 'White and Black', count : 2},
            {id : 2, name : 'Grey Yordan', count : 1},
        ],
        reducers : {
            changeCount(state, action) {
                state[action.payload].count += 1
            },
            pushCart(state, action) {
                let a = state.find(item => item.id === action.payload)

                if (a) {
                    a.count += 1
                }
                else
                {
                    state.push({
                        id : action.payload,
                        name : `${data[action.payload].title}`,
                        count : 1
                    })

                }
            }
        }
    })

    export let { changeCount, pushCart } = cartData.actions

    export default configureStore({
        reducer: {
            cartData : cartData.reducer,
            user : user.reducer
        }
    })