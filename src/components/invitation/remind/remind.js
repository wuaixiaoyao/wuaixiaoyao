/**
 * @author wuaixiaoyao
 * @date 2018/6/12
 * @Description: 提醒组件
*/
import React ,{Component} from 'react';
import {Toast} from 'antd-mobile'
import "./remind.scss"
export  default class Remind extends Component{
    constructor(props){
        super(props)
        this.state = {
            ifReminded:this.props.ifReminded,
            showRemindBtn:this.props.showRemindBtn
        }
    }
    componentWillMount(){

    }
    componentWillReceiveProps(nextProps){
         //
        if(nextProps.ifReminded !== this.state.ifRemind||nextProps.showRemindBtn !== this.state.showRemindBtn){
            this.setState({
                ifReminded:nextProps.ifReminded,
                showRemindBtn:nextProps.showRemindBtn
            })
        }
    }
    shouldComponentUpdate(nextProps){
        return nextProps.ifReminded !== this.state.ifRemind||nextProps.showRemindBtn !== this.state.showRemindBtn
    }
    remind(){
        if(!this.state.ifReminded){
            if(this.props.remind){
                this.props.remind()
            }
        }else {
            Toast.info('您今日已提醒过该好友')
        }

    }
    render(){
        let {ifReminded,showRemindBtn} = this.state;
        if(showRemindBtn){
            return (
                <div className={`remindBtn ${ifReminded?"alreadyRemind":""}`} onClick={this.remind.bind(this)}>
                    {ifReminded?"已提醒":"去提醒"}
                </div>)
        }else{
            return <div className={"hideBtn"}></div>
        }

    }

}
