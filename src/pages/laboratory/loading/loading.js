import React ,{Component} from "react";
import BaseComponent from "../../../components/BaseComponent"
import {Toast} from "antd-mobile"
import { bindActionCreators } from 'redux'
import * as caimiAction from '../../../redux/action/Index'
import {connect} from "react-redux";
import {LabLogin,checkReward} from "../../../api/api"

import "./loading.scss"
import {CreateRandom, H5Util} from "../../../utils";
const BgImages = {
    answer: require('../../../styles/imgs/laboratory/Background3@3x.png'),
}
class Loading extends BaseComponent {
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
            helpAnswer:false,//阻力答题
        }
    }

    componentWillMount(){
        this.initLabLoading();
        let {search} = this.props.location;
        localStorage.setItem("currentPage","lab")
        let  isInWeiXin = H5Util.judgeBrowser().weixin;
        this.setState({
            isInWeiXin
        })
        this.props.changeUserInfoActions.changeIsInWeiXin({
            isInWeiXin:isInWeiXin
        })
        if(search){
            let message = H5Util.serilizeURL(search);
            if(message){
                let {userId,fromApp,loadResult,code,helpAnswer} = message
                if(userId){
                   // Toast.info(userId);
                }
                let id = userId||this.props.userId;
                this.setState({
                    userId:id,
                    fromApp:fromApp,
                    loadResult:Number(loadResult),
                    code:code,
                    helpAnswer:helpAnswer
                })
                this.props.changeUserInfoActions.changeUserId({userId:id})
                if(fromApp){
                    this.props.changeUserInfoActions.changeFromApp({fromApp})
                }
                if(isInWeiXin){
                    if(!this.state.userId&&!loadResult){
                        if(code){
                            this.weChatLogin(code)
                        }else{
                            this.initWeChat()
                        }
                    }
                    window.from = "WeChat"
                }
            }
        }else{
            this.getUserFrom();//兼容老版本 传参方式
            if(isInWeiXin&&!this.state.userId){
                this.initWeChat()
            }
        }

    }
    getUserFrom(){
        window.document.addEventListener('message',(e)=>{
            const message =JSON.parse(e.data);
            let {userId,from} = message;
            this.props.changeUserInfoActions.changeUserId({userId});
            if(from == "app"){
                this.props.changeUserInfoActions.changeFromApp({fromApp:true})
            }
            this.setState({
                userId,
                fromApp:true
            })
            //Toast.info(`userId: ${userId} fromApp:${from}`)
        })
    }
    componentDidMount() {
        this.timeout()
    }
    initWeChat(){
        let devUrl = "https://caimi.we.com/activity/#/app/laboratory/wx-redirect";
        var Jumpurl = encodeURIComponent(devUrl);
        var appId = "wx68da448306df15e3";
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
            appId + '&redirect_uri=' + Jumpurl +
            '&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect'
    }
    weChatLogin(code){
        //微信登录
        let {uniqueId,inviteUserId} = this.state;
        let loginParams = {
            uniqueId,
            inviteUserId,
            code
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
            this.setState({
                userId
            })
            if(res.code == 1){
                this.props.changeUserInfoActions.changeIsNewUser({isNewUser:true})
            }else if(res.code == 0){
                this.props.changeUserInfoActions.changeIsNewUser({isNewUser:false})

            }
            this.props.history.push("/app/laboratory/index")

        })
    }

    componentWillUnmount() {
        this.time && clearInterval(this.time);
    }
    initLabLoading(){
        let {userId,from} = this.state;
        let randomId = this.state.randomId||CreateRandom();
        this.props.changeUserInfoActions.changeRandomId({randomId});
        let params = {
            pageName:"LabLoading",
            eventName:"loading",
            userId,
            from,
            randomId
        }
        this.bury(params)
    }
    bury(params){
        this.buryPoint(params)
    }
    timeout() {
        let {loadResult} = this.state;
        this.time = setInterval(()=>{
            let progress = this.state.progress + parseInt(Math.random() * 10+10);
            if (progress > 100) {
                progress = 100;
                this.time && clearInterval(this.time);
                if(loadResult){
                    console.log(this.state.helpAnswer?"yes":"no")
                    if(this.state.helpAnswer){
                        //阻力答题 跳转
                        this.props.history.push(`/app/laboratory/result?fromPage=questionPage`)
                    }else{
                        this.props.history.push("/app/laboratory/result")
                    }
                }else{
                    this.props.history.push("/app/laboratory/index")
                }
            }
            this.setState({
                progress
            });
        }, 500);
    }

    renderLoadingImg() {
        return (
            <img className="lab-loader" style={{
                width: '312px',
                height: '312px',
                marginTop: '106px',
            }} src={require('../../../styles/imgs/laboratory/lab-loading.png')} alt={'icon'} />
        )
    }

    renderLoadingTxt() {
        let {userId,loadResult,inviteUserId,inviteUserInfo,userInfo,helpAnswer} = this.state;
        let nickName = "XXX";
        if(helpAnswer){
            //阻力答题
            if(Number(inviteUserId)&&inviteUserInfo&&inviteUserInfo.nickName){
                //
                nickName = inviteUserInfo.nickName.slice(0,4)
            }
        }else{
            //自己答题
            if(!userId){
                nickName="你"
            }else if(userInfo.nickName){
                nickName = userInfo.nickName.slice(0,4);
            }
        }
        let loadingTxt1 = `正在将${nickName}的DNA与灵魂搅拌…`;
        let loadingProgress1 = `炼成中${this.state.progress}%`;
        let loadingTxt2 = '正在招募科学家和炼金术师…';
        let loadingProgress2 = `加载中${this.state.progress}%`;
        return (
            <div style={{
                alignItems: 'center'
            }} >
                <div  style={{
                    fontSize: '16px',
                    color: '#FFFFFF'
                }} >
                     {nickName&&loadResult?loadingTxt1:loadingTxt2}
                    </div>
                <div className="lab-font" style={{
                    fontSize: '36px',
                    color: '#FFCE01'
                }} >
                    {nickName&&loadResult?loadingProgress1:loadingProgress2}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className={"loading-wrapper"} style={{height: window.innerHeight, position: 'relative'}} >
                <img className={"bg-img"} src={BgImages.answer} style={{"minHeight": window.innerHeight}} alt="背景"/>
                <div className={"dollars"} style={{
                    alignItems: 'center'
                }} >
                    {this.renderLoadingImg()}
                    {this.renderLoadingTxt()}
                </div>
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
)(Loading)