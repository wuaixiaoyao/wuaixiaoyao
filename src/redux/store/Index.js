import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
//redux 中间件
import reducer from '../reducer/Index'
import {createLogger} from "redux-logger"
const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}
export default function configureStore(initState) {
    const store = createStore(reducer,initState,applyMiddleware(...middleware));
    return store;
}
