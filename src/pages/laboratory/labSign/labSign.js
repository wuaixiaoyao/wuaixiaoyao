/**
 * @author wuaixiaoyao
 * @date 2018/9/4
 * @Description: 注册页
*/
import React ,{Component}from "react";
import BaseComponent from "../../../components/BaseComponent"
import { bindActionCreators } from 'redux'
import * as caimiAction from '../../../redux/action/Index'
import {connect} from "react-redux";
import {LabLogin,checkReward} from "../../../api/api"
import "./labSign.scss"
import SignIn from  "../../../components/signIn/signIn"
import {CreateRandom} from "../../../utils";
class LabSign extends BaseComponent{
    constructor(props){
        super(props)
        this.state = {
            userId:this.props.userId,
            randomId:this.props.randomId,
            uniqueId:this.props.uniqueId,
            inviteUserId:this.props.inviteUserId,
        }
    }
    componentWillMount(){
        this.initLogin()
    }
    initLogin(){
        let {userId,from,uniqueId} = this.state;
        let randomId = this.state.randomId||CreateRandom();
        this.props.changeUserInfoActions.changeRandomId({randomId});
        let params = {
            pageName:"LabSignIn",
            eventName:"loading",
            userId,
            uniqueId,
            from,
            randomId
        }
        this.bury(params)
    }
    bury(params){
        this.buryPoint(params)
    }
    async receiveReward(){
        //领取奖励
        let params = this.signView.getFieldsValue()
        let {phone:phoneNo,code:smsCode} = params;
        let loginParams = {
            phoneNo,
            smsCode,
            uniqueId:this.props.uniqueId,
            inviteUserId:this.props.inviteUserId
        }
        let res = await LabLogin(loginParams);
        if(res.code === 0||res.code === 1){
            let userInfo = res.bean;
            console.log(userInfo)
            let {uniqueId,inviteUserId} = this.state;
            let {id:userId} = userInfo;
            let checkParams = {
                uniqueId,
                userId,
                inviteUserId
            };
            checkReward(checkParams).then(res=>{
                if(res.code == 0){
                    this.props.history.replace("/app/laboratory/guide")
                }
            })

        }


    }
    render(){
        return <div className="lab-sign-wrapper" style={{"minHeight": window.innerHeight}}>
              <div className="lab-sign-content">
                    <h3 className={"sign-title lab-font"}>领取5元科研赏金</h3>
                    <div>
                        <SignIn ref={view => this.signView = view} getCodeColor={"transparent"}>
                        </SignIn>
                        <div className="receive-btn font-bolder" onClick={()=>{this.receiveReward()}}>立即领取</div>
                    </div>

                </div>
        </div>
    }

}
function mapStateToProps(state) {
    return {
        userId: state.userInfo.userId,
        randomId: state.userInfo.randomId,
        fromApp: state.userInfo.fromApp,
        inviteUserId:state.userInfo.inviteUserId,
        uniqueId:state.userInfo.uniqueId
    }
}
function mapDispatchToProps(dispatch) {
    return {
        changeUserInfoActions: bindActionCreators(caimiAction,dispatch)
    }
}
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(LabSign)