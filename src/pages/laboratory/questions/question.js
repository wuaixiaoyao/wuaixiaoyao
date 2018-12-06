import React ,{Component} from "react";
import BaseComponent from "../../../components/BaseComponent"
import {H5Util} from "../../../utils/index"
import {getLabResult, checkReward, LabLogin, inviteUserInfo, inviteDetail} from "../../../api/api"
import "./question.scss"
import "./question-c.css"
import { bindActionCreators } from 'redux'
import * as caimiAction from '../../../redux/action/Index';
import {connect} from "react-redux";
import Avatar from "../../../components/avatar/avatar";
import {CreateRandom,FormatResourceUrl} from "../../../utils";
const QuestionAnswerType = {
    // 图片答案
    Image: '0',
    // 文字答案
    Text: '1'
}
const BgImages = {
    answer: require('../../../styles/imgs/laboratory/Background2@3x.png'),
}
const QuestionsList = [
    {
        id: 1,
        title: '以下哪个是',
        qustion: '的大脑',
        type: QuestionAnswerType.Image,
        answers: [
            {
                answerId: 1,
                source: require('../../../styles/imgs/laboratory/Option11.png')
            }, {
                answerId: 2,
                source: require('../../../styles/imgs/laboratory/Option12.png')
            }
        ]
    }, {
        id: 2,
        title: '以下哪个是',
        qustion: '的持久力',
        type: QuestionAnswerType.Text,
        answers: [
            {
                answerId: 1,
                text: '3分钟'
            }, {
                answerId: 2,
                text: '半年'
            }, {
                answerId: 3,
                text: '兴致高可以很持久'
            }, {
                answerId: 4,
                text: '不确定是否持久'
            },
        ]
    }, {
        id: 3,
        title: '以下哪个是',
        qustion: '的心脏',
        type: QuestionAnswerType.Image,
        answers: [
            {
                answerId: 1,
                source: require('../../../styles/imgs/laboratory/Option31.png')
            }, {
                answerId: 2,
                source: require('../../../styles/imgs/laboratory/Option32.png')
            }
        ]
    }, {
        id: 4,
        title: '以下哪个是',
        qustion: '的梦想',
        type: QuestionAnswerType.Text,
        answers: [
            {
                answerId: 1,
                text: '平平淡淡的生活'
            }, {
                answerId: 2,
                text: '有房有车'
            }, {
                answerId: 3,
                text: '野心家'
            }
        ]
    }, {
        id: 5,
        title: '面对厄运',
        qustion: '的反映是？',
        type: QuestionAnswerType.Text,
        answers: [
            {
                answerId: 1,
                text: '受不了，逃避'
            }, {
                answerId: 2,
                text: '塞翁失马，焉知非福'
            }, {
                answerId: 3,
                text: '逆风的方向，更适合飞翔'
            }, {
                answerId: 4,
                text: '不安，无所适从'
            },
        ]
    }, 
]

 class Question extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            userId:this.props.userId,
            inviteUserId:this.props.inviteUserId,
            uniqueId:this.props.uniqueId,
            userInfo:this.props.userInfo,
            inviteUserInfo:this.props.inviteUserInfo,
            questionIndex: 0,
            helpAnswer:false,// 自己答题
        }
        this.answers = [];
    }
    componentWillMount(){
        localStorage.setItem("currentPage","invite");
        let {search} = this.props.location;
        let  isInWeiXin = H5Util.judgeBrowser().weixin;
        this.setState({
            isInWeiXin
        })
        this.props.changeUserInfoActions.changeIsInWeiXin({
            isInWeiXin:isInWeiXin
        })
        if(search){
            let message = H5Util.serilizeURL(search);
            if(message&&message.inviteUserId){
                let {inviteUserId,code} = message;
                this.setState({
                    inviteUserId,
                    helpAnswer:true,// 阻力答题
                })
                localStorage.setItem("inviteUserId",inviteUserId);
                this.changeInviteUserId(inviteUserId);
                this.getInviteUserInfo(inviteUserId);

                if(isInWeiXin){
                    if(!this.state.userId){
                        if(code){
                            this.weChatLogin(code)
                        }else{
                            this.initWeChat()
                        }
                    }
                    window.from = "WeChat"
                }else{
                    //

                }
            }else{
                //自己答题
                if(message.testSelf){
                    //
                    this.setState({
                        helpAnswer:false
                    })
                }
            }
        }else{
            if(isInWeiXin&&!this.state.userId){
                this.initWeChat()
            }
        }

    }
    componentDidMount(){
        this.initTest()
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
     weChatLogin(code){
         //微信登录
         let {uniqueId,inviteUserId} = this.state;
         let loginParams = {
             uniqueId,
             inviteUserId:inviteUserId||localStorage.getItem("inviteUserId"),
             code
         }
         LabLogin(loginParams).then(res=> {
                 let {id: userId, avatar, nickName} = res.bean;
                 this.props.changeUserInfoActions.changeUserId({userId})
                 let inviteUserId =  inviteUserId||localStorage.getItem("inviteUserId");
                 if(userId == inviteUserId){
                     //同一人
                     this.props.history.replace("/app/laboratory/index")
                 }else{
                     this.setState({
                         helpAnswer:true
                     })
                 }
                 //
                 this.props.changeUserInfoActions.changeUserInfo({
                     userInfo: {
                         avatar,
                         nickName
                     }
                 })
                 this.setState({
                     userId
                 })
                this.getInviteDetail()
                 if(res.code == 1){
                     this.props.changeUserInfoActions.changeIsNewUser({isNewUser:true})
                 }else if(res.code == 0){
                     this.props.changeUserInfoActions.changeIsNewUser({isNewUser:false})

                 }
             }
         )
     }

    getInviteUserInfo(inviteUserId){
        //获取邀请人信息
        let {uniqueId} = this.state;
        let params = {
            uniqueId,
            userId:"",
            inviteUserId
        }
        inviteUserInfo(params).then(res=>{
            if(res.code == 0&&res.bean){
                let {nickName,avatar} = res.bean;
                let inviteUserInfo = {
                    avatar,
                    nickName
                }
                this.props.changeUserInfoActions.changeInviteUserInfo({inviteUserInfo});
                this.setState({
                    inviteUserInfo
                })
            }
        })

    }
     getInviteDetail(){
         let {userId,inviteUserId} = this.state;
         let params = {
             userId,
             inviteUserId
         }
         inviteDetail(params).then(res=>{
             if(res.code == 0&&res.bean){
                 let {result} = res.bean;
                 if(result){
                     //已经助力过
                     this.props.history.push(`/app/laboratory/result?fromPage=questionPage&searchUserId=${inviteUserId}`)
                 }else{
                     //未阻力过 阻力答题
                     this.setState({
                         helpAnswer:true
                     })

                 }
             }
         })
     }
    async initTest(){
         let {userId,from,uniqueId,inviteUserId} = this.state;
         let params = {
             pageName:"LabTest",
             eventName:"loading",
             uniqueId,
             userId,
             from,
             inviteUserId:this.props.inviteUserId
         }
         await this.bury(params);

     }
     bury(params){
        //埋点
         this.buryPoint(params)
     }
     async buryAnswerEvent(){
         let {userId,from,uniqueId,inviteUserId} = this.state;
         let params = {
             pageName:"LabTest",
             eventName:"answer",
             uniqueId,
             userId,
             from,
             inviteUserId:this.props.inviteUserId
         }
         await this.bury(params);
     }
     checkUserReward(checkParams){
         checkReward(checkParams).then(res=>{
             if(res.code == 0&&res.bean){
                 if(res.bean.result){
                     this.props.changeUserInfoActions.changeAnswerResult({answerResult:res.bean.result})
                     this.props.history.push("/app/laboratory/result")
                 }
             }
         })
     }
    changeInviteUserId(inviteUserId){
        this.props.changeUserInfoActions.changeInviteUserId({inviteUserId})
    }
    answer(item) {
        if (item === undefined) {
            return
        }
        let {helpAnswer} = this.state;
        this.answers.push(item.answerId);
        if (this.state.questionIndex < QuestionsList.length - 1) {
            let index = this.state.questionIndex + 1;
            this.setState({
                questionIndex: index
            })
        } else {
            // todo: api 请求答题结果
            let questionNum = "1,2,3,4,5";
            let optionNum = this.answers.join(",");
            let params = {
                uniqueId:this.props.uniqueId,
                inviteUserId:helpAnswer?this.state.inviteUserId:"",
                userId:this.props.userId,
                questionNum,
                optionNum
            }
            getLabResult(params).then(res=>{
                if(res.code == 0&&res.bean){
                    let {result} = res.bean;
                    this.props.changeUserInfoActions.changeUserId({userId:this.state.userId})
                    this.props.changeUserInfoActions.changeAnswerResult({answerResult:result})
                    this.buryAnswerEvent()
                    setTimeout(()=>{
                        if(this.state.helpAnswer){
                            //阻力答题
                            this.props.history.push("/app/laboratory/lab?loadResult=1&helpAnswer=true")//

                        }else{//自己答题
                            this.props.history.push("/app/laboratory/lab?loadResult=1")//
                        }
                    },100)

                }
            })
        }
    }
    renderShareTitle(){
        let {inviteUserInfo} = this.state;
        return <div className="share-title-wrapper">
            <p className="share-title lab-font">助力炼成{inviteUserInfo.nickName.slice(0,4)}</p>
            <div className="get-money-btn">获取2元现金</div>
        </div>

    }
    renderQuestion(questionItem) {
        let {inviteUserInfo,userId,userInfo,inviteUserId,helpAnswer} = this.state;
        let nickName ="自己", avatar="";
        if(helpAnswer){
            //阻力答题
            if(inviteUserId&&inviteUserInfo){
                //
                nickName = inviteUserInfo.nickName.slice(0,4);
                avatar = inviteUserInfo.avatar;
            }

        }else{
            //自己答题
            if(userId&&userInfo.nickName){
                nickName = userInfo.nickName.slice(0,4);
                avatar = userInfo.avatar
            }

        }
        return (
            <div style={{
                width: 254,
            }} >
                <div className="title lab-font">
                    {questionItem.title}
                </div>
                <div className={"title lab-font"} style={{textAlign: "right", justifyContent: 'flex-end'}} >
                    <Avatar
                        avatarUrl={FormatResourceUrl(avatar)}
                            style={{width:"28px",height:"28px"}}></Avatar>
                    {nickName.slice(0,4)}
                </div>
                <p className={"title lab-font"} >
                    {questionItem.qustion}
                </p>
            </div>
        )
    }

    renderAnswer(questionItem) {
        const imageAnswer = (answerItem,index)=>{
            return (
                <div className={'img-answer'} key={index} onClick={()=>{
                    this.answer(answerItem);
                }} >
                    <img className={"bg-img"} src={answerItem.source}  alt="答案"/>
                </div>
            )
        }

        const textAnser = (answerItem,index)=>{
            return (
                <div className={'txt-answer'} key={index} onClick={()=>{
                    this.answer(answerItem);
                }} >
                    <img className={"bg-img"} src={require('../../../styles/imgs/laboratory/Options2@3x.png')}  alt="背景"/>
                    <div className={'txt-answer-txt'} >
                        <div className={"font-bolder"} style={{
                            textAlign: 'center'
                        }} >
                            {answerItem.text}
                        </div>
                    </div>
                </div>
            )
        }
        
        return questionItem.answers.map((item, index)=>{
            if (questionItem.type === QuestionAnswerType.Image) {
                return imageAnswer(item,index);
            } else if (questionItem.type === QuestionAnswerType.Text) {
                return textAnser(item,index);
            }
        })
    }

    render() {
        let {inviteUserId,helpAnswer} = this.state;
        let questionItem = QuestionsList[this.state.questionIndex];
        let showTitle = true;
        if(!helpAnswer){
            //
            showTitle = false
        }else{
            showTitle = true
        }
        return (
            <div className={"question-wrapper"} style={{"minHeight": window.innerHeight}} >
                <img className={"bg-img"} src={BgImages.answer} style={{"minHeight": window.innerHeight}} alt="背景"/>
                <div className={"dollars"} >
                    {showTitle&&inviteUserId&&this.renderShareTitle()}
                    {this.renderQuestion(questionItem)}
                    {this.renderAnswer(questionItem)}
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        userId: state.userInfo.userId,
        randomId: state.userInfo.randomId,
        fromApp: state.userInfo.fromApp,
        inviteUserId:state.userInfo.inviteUserId,
        uniqueId:state.userInfo.uniqueId,
        userInfo:state.userInfo.userInfo,
        inviteUserInfo:state.userInfo.inviteUserInfo,
        answerResult:state.labInfo.answerResult,
        goToTest:state.labInfo.goToTest,

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
)(Question)