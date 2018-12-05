
/**
 * @author wuaixiaoyao
 * @date 2018/5/8
 * @Description: 权限路由
*/
import React, { Component } from 'react';
import { Route, Redirect, Switch} from 'react-router-dom';
export default  class ProtectedRoute extends React.Component {
    //
    render(){
        const role = "admin";
        const expired = false;
        if (expired){
            return <Redirect to='/login' push={true}/>
        }
        const requiredRole = this.props.requiredRole;
        const children = this.props.children;
        return(
            <Route exact={this.props.exact} path={this.props.path} render={(props) => {
                //requiredRole.indexOf(role) >= 0||
                return children
                // if(localStorage.getItem('ifLogin')){
                //     return children
                // } else {
                //     return <Redirect to='/login' push={true}/>
                // }
            }}/>
        );
    }
}