/**
 * @author wuaixiaoyao
 * @date 2018/9/12
 * @Description: 微信重定向页面
*/
import React ,{Component} from "react";
import BaseComponent from "../../../components/BaseComponent"
import {Toast} from "antd-mobile"
import { bindActionCreators } from 'redux'
import * as caimiAction from '../../../redux/action/Index'
import {connect} from "react-redux";
import {LabLogin,checkReward,SHAREHOST} from "../../../api/api"
import {CreateRandom, H5Util} from "../../../utils";
import "./wx-redirect.scss"
class WXRedirect extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            nickName:"XXX",
            userId:this.props.userId,
            userInfo:this.props.userInfo,
            inviteUserInfo:this.props.inviteUserInfo,
            inviteUserId:this.props.inviteUserId,
            randomId:this.props.randomId,
            uniqueId:this.props.uniqueId,
            fromApp:this.props.fromApp,
            browserType:this.props.browserType,
            isInWeiXin:this.props.isInWeiXin,
            alreadyAnswer:false,//已经测试过
            loadResult:0,//是否生成结果，
            code:'',//微信code

        }
    }

    componentWillMount(){
        let currentPage = localStorage.getItem("currentPage");
        let inviteUserId = localStorage.getItem("inviteUserId");
        let search = window.location.search;
        if(search){
            let message = H5Util.serilizeURL(search);
            if(message){
                let {code} = message;
                this.setState({
                    code
                })
                let jumpUrl = "";
                if(currentPage == "invite"){                    //
                     jumpUrl = `https://caimi.we.com/activity/#/app/laboratory/questions?code=${code}&inviteUserId=${inviteUserId}`

                }else if(currentPage == "lab"){
                    jumpUrl = `https://caimi.we.com/activity/#/app/laboratory/lab?code=${code}`
                }
                window.location.href = jumpUrl;

            }
        }

        // let {search} = window.location.search;
        // if(search){
        //     let message = H5Util.serilizeURL(search);
        //     if(message){
        //         let {userId,fromApp,loadResult,code} = message
        //         this.setState({
        //             userId:Number(userId),
        //             fromApp:fromApp,
        //             loadResult:Number(loadResult),
        //             code
        //         })
        //         this.props.changeUserInfoActions.changeUserId({userId:Number(userId)})
        //         if(fromApp){
        //             this.props.changeUserInfoActions.changeFromApp({fromApp})
        //         }
        //         if(code){
        //             //
        //             this.weChatLogin()
        //
        //         }
        //     }
        // }
        // this.initPage()

    }
    initPage(){
        let  isInWeiXin = H5Util.judgeBrowser().weixin;
        this.setState({
            isInWeiXin
        })
        this.props.changeUserInfoActions.changeIsInWeiXin({
            isInWeiXin:isInWeiXin
        })
        if(isInWeiXin){
            if(!this.state.userId){
                this.weChatLogin(isInWeiXin)
            }
            window.from = "WeChat"
        }
    }
    initWeChat(){
        let devUrl = "https://caimi.we.com/activity/#/app/laboratory/wx-redirect";
        let proUrl = window.location.href;
        var Jumpurl = encodeURIComponent(devUrl);
        var appId = "wx68da448306df15e3";
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
            appId + '&redirect_uri=' + Jumpurl +
            '&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect'
    }
    weChatLogin(isInWeiXin){
        //微信登录
        if(isInWeiXin){
            let {uniqueId,code,inviteUserId} = this.state;
            let loginParams = {
                uniqueId,
                inviteUserId,
                code
            }
            if(!code){
                this.initWeChat();
                return
            }
            LabLogin(loginParams).then(res=>{
                let {id:userId,avatar,nickName} = res.bean;
                this.props.changeUserInfoActions.changeUserId({userId})
                this.props.changeUserInfoActions.changeUserInfo({
                    userInfo:{
                        avatar,
                        nickName
                    }
                })
                let currentPage = sessionStorage.getItem("currentPage")
            })
        }
    }

    render() {
        let {code} = this.state;
        return (
            <div className="wx-wrapper" style={{height: window.innerHeight, position: 'relative'}} >
                {/*重定向 {code}*/}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        userId: state.userInfo.userId,
        userInfo:state.userInfo.userInfo,
        inviteUserInfo:state.userInfo.inviteUserInfo,
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
)(WXRedirect)