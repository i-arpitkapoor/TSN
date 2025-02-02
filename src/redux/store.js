import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'
import dataReducer from './reducers/dataReducer'
import uiReducer from './reducers/uiReducer'


const initialState = {};

const middleware = [thunk]    //array of middleware with one element as of now

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: uiReducer

})


//spreading all middlwares to apply all middlewares
const store = createStore(reducers, initialState, compose(applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))


export default store;
