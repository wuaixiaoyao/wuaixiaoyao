import React, { Component } from 'react';
import './App.css';
import 'antd-mobile/dist/antd-mobile.css';
import Routers from './routes/index'
class App extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div className="App">
          {/*首页*/}
          <Routers/>
      </div>
    );
  }
}

export default App;
