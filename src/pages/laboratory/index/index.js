import React ,{Component} from "react";
import BaseComponent from "../../../components/BaseComponent"
import "./labIndex.scss"
import {H5Util,CreateRandom} from "../../../utils/index"
import {checkReward,LabLogin,inviteUserInfo} from "../../../api/api";
import { bindActionCreators } from 'redux'
import * as caimiAction from '../../../redux/action/Index';
import {connect} from "react-redux";
const BgImages = {
    answer: require('../../../styles/imgs/laboratory/Background1@3x.png'),
}
class LabIndex extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            userId:this.props.userId,
            uniqueId:this.props.uniqueId,
            inviteUserId:this.props.inviteUserId,
            browserType:this.props.browserType,
            from:"",
            isInWeiXin:this.props.isInWeiXin,
            alreadyAnswer:false,//已经测试过
            pageSize:5,
            page:1,
        }
    }
    componentWillMount(){
        //
        console.log(this.state)
        this.judgeBrowser();
        this.getUserInfo();
    }
    initLab(){
        let {userId,from} = this.state;
        let randomId = this.state.randomId||CreateRandom();
        this.props.changeUserInfoActions.changeRandomId({randomId});
        let params = {
            pageName:"LabIndex",
            eventName:"loading",
            userId,
            randomId
        }
        this.bury(params)
        this.checkReward()
    }
    bury(params){
        this.buryPoint(params)
    }
    judgeBrowser(){
       console.log(H5Util.judgeBrowser())
       let  isInWeiXin = H5Util.judgeBrowser().weixin;
       this.setState({
           isInWeiXin
       })
       this.props.changeUserInfoActions.changeIsInWeiXin({
           isInWeiXin:isInWeiXin
       })
        if(isInWeiXin){
           window.from = "WeChat"
        }
        this.initLab()
    }
    getUserInfo(){
        let {userId} = this.state;
        let params = {
            inviteUserId:userId
        }
        inviteUserInfo(params).then(res=>{
            if(res.code == 0&&res.bean){
                let {avatar,nickName} = res.bean;
                this.props.changeUserInfoActions.changeUserInfo({
                    userInfo:{
                        avatar,
                        nickName
                    }
                })
            }
        })
    }
    checkReward(){
        let {uniqueId,userId} = this.state;
        let params = {
            uniqueId,
            userId,
            inviteUserId:""
        }
        checkReward(params).then(res=>{
            //
            if(res.bean){
                let {result,reward} = res.bean;
                if(res.bean.result){
                    this.setState({
                        alreadyAnswer:true
                    })
                    this.props.changeUserInfoActions.changeAnswerResult({answerResult:result})
                }else{
                    this.setState({
                        alreadyAnswer:false
                    })
                    this.props.changeUserInfoActions.changeAnswerResult({answerResult:[]})
                }
                this.props.changeUserInfoActions.changeLabReward({labReward:reward})
            }
        })
    }
    static defaultProps = {
        isInWeiXin: false
    }

    goToTest(){
        if(this.state.alreadyAnswer){
            this.props.history.push('/app/laboratory/result?fromPage=indexPage')
        }else{
            this.props.changeUserInfoActions.changeGoToTest({goToTest:true})
            //自我炼成
            this.props.history.push('/app/laboratory/questions?testSelf=true')
        }
    }
    goToInvite(){
        this.props.history.push('/app/laboratory/invite')
    }
    renderTitle() {
        return (
            <img style={{
                width: '151px',
                height: '102px',
                marginTop: '27vw'
            }} src={require('../../../styles/imgs/laboratory/Title1@3x.png')} alt={'icon'} />
        )
    }

    renderBtns() {
        let {alreadyAnswer} = this.state;
        const btn1 = ()=>{
            return (
                <div style={{
                    position: 'relative',
                    width: window.innerWidth,
                    justifyContent: 'center',
                    alignItems: 'center'
                }} >
                    <img style={{
                        width: '532px',
                        height: '163px'
                    }} src={require('../../../styles/imgs/laboratory/button2@3x.png')} alt={'icon'} />
                    <div style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: '55px',
                        top: 0,
                        fontSize: '16px',
                        color: '#000000',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign:"center"
                    }} className={"font-bolder"} onClick={()=>{
                        this.goToTest()
                    }} >
                        {alreadyAnswer?"查看炼成报告":"自我炼成"}
                    </div>
                </div>
            )
        }

        const btn2 = ()=>{
            return (
                <div style={{
                    position: 'relative',
                    width: window.innerWidth,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // top:"40px"
                }} >
                    <img style={{
                        width: '532px',
                        height: '165px',
                    }} src={require('../../../styles/imgs/laboratory/Button1@3x.png')} alt={'icon'} />
                    <div style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: '55px',
                        top: 0,
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }} >
                        <div style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                        }} onClick={()=>{
                            this.goToTest()
                        }} >
                            <div className={"result-btn font-bolder"}>
                                {alreadyAnswer?"查看炼成报告":"自我炼成"}
                            </div>
                        </div>
                        <div style={{
                            flex: 1,
                            justifyContent: 'center',
                        }} onClick={()=>{
                               this.goToInvite()
                        }} >
                            <div style={{
                                marginLeft: '20px',
                                fontSize: '16px',
                            }} className={"font-bolder"}>
                                邀请好友炼成自己
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        
        return (
            <div style={{
                flex: 1,
                justifyContent: 'flex-end'
            }} >
                {this.state.userId ? btn2() : btn1() }
            </div>
        )
    }

    render() {
        return (
            <div className={"index-wrapper"} style={{height: window.innerHeight, position: 'relative'}} >
                <div className={"dollars"} style={{
                    alignItems: 'center'
                }} >
                    {this.renderTitle()}
                    {this.renderBtns()}
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        userId: state.userInfo.userId,
        uniqueId: state.userInfo.uniqueId,
        fromApp: state.userInfo.fromApp,
        location:state.userInfo.location,
        browserType:state.BrowserInfo.browserType,
        isInWeiXin:state.BrowserInfo.isInWeiXin
    }
}
function mapDispatchToProps(dispatch) {
    return {
        changeUserInfoActions: bindActionCreators(caimiAction,dispatch),

    }
}

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(LabIndex)

