import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import "lib-flexible"
import './styles/css/common.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import configureStore from './redux/store/Index'
import VConsole from 'vconsole/dist/vconsole.min.js' //vconsole 微信的开源 日志工具
if(process.env.NODE_ENV != "production" ){
    //非生产环境开启
    //let vConsole = new VConsole() // 初始化
}
const store = configureStore()
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();

