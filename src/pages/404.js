/**
 * @author wuaixiaoyao
 * @date 2018/5/15
 * @Description: 404页面
*/

import React from 'react';
import img from '../styles/imgs/404.png';
import "@/styles/css/lib/animate.css"
import "../styles/css/common.scss"
class NotFound extends React.Component {
    state = {
        animated: ''
    };
    enter = () => {
        this.setState({animated: 'hinge'})
    };
    render() {
        return (
            <div className="center flexClumn flexCenter" style={{"minHeight": window.innerHeight, background: '#ececec', overflow: 'hidden'}}>
                <img src={img} alt="404" className={`animated swing ${this.state.animated}`} onMouseEnter={this.enter} />
            </div>
        )
    }
}

export default NotFound;