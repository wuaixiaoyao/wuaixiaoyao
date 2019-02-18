/**
 * @author wuaixiaoyao
 * @date 2018/5/15
 * @Description: 路由组件
*/
import React, { Component } from 'react';
import { HashRouter as Router,Route, Redirect, Switch ,BrowserRouter} from 'react-router-dom';
import asyncComponent from "../components/asyncComponent/asyncComponent"
import '../styles/css/common.scss'
import ProtectedRoute from './protectedRoute'
import {H5Util} from "../utils";

const InvitationInApp = asyncComponent(() => import("@/pages/invitation/invitationInApp/invitationInApp"));
const GotRedPacket =  asyncComponent(()=>import("@/pages/invitation/gotRedPacket/gotRedPacket"))
//分享
const Course = asyncComponent(()=>import("@/pages/appShare/course/course"))
const ShareAnswer = asyncComponent(()=>import("@/pages/appShare/answer/answer"))
const WorldCupInvitation = asyncComponent(()=>import("@/pages/invitation/worldCupInvitation/worldCupInvitation"))
const  BabyTree = asyncComponent(()=>import("@/pages/invitation/babyTree/babyTree"))
const WakeUpApp = asyncComponent(()=>import("@/pages/invitation/wakeUpApp/wakeUpApp"))
/*
  in app
 */
//新闻详情页
const NewsInfo = asyncComponent(()=>import("@/pages/inApp/newsInfo/newsInfo"))
const NoticeInfo = asyncComponent(()=>import("@/pages/inApp/newsInfo/notice"))
//股票通知
const StockRedirectPage = asyncComponent(()=>import("@/pages/inApp/toStockPage"))
//文章详情页
const ArticleInfo =  asyncComponent(()=>import("@/pages/inApp/article/article"))
// 回复详情页
const AnswerDetail = asyncComponent(()=>import("@/pages/inApp/answer/answerDetail"))

/*
 活动
 */
// 实验室
const Index = asyncComponent(()=>import("@/pages/laboratory/index/index"))
const Loading = asyncComponent(()=>import("@/pages/laboratory/loading/loading"))
const Question = asyncComponent(()=>import("@/pages/laboratory/questions/question"))
const LabResult = asyncComponent(()=>import("@/pages/laboratory/labResult/labResult"))
const LabSign = asyncComponent(()=>import("@/pages/laboratory/labSign/labSign"))
const Invite = asyncComponent(()=>import("@/pages/laboratory/invite/invite"))
const Guide = asyncComponent(()=>import("@/pages/laboratory/guide/guide"))
const WXRedirect = asyncComponent(()=>import("@/pages/laboratory/wxRedirect/wxRedirect"))
//home 页
//404 页面
const NotFound = asyncComponent(()=>import("@/pages/404.js"))
const styles = {
    wrap:{
       width:'100%',
       overflowY:"scroll"
    }
}
const requireAuth = (nextState, replace) => {
    console.log("enter")
}
export default class Routers extends Component {

    constructor(props){
        super(props)
    }

    onRouterEnter=(nextState, replace)=>{
        let  isInWeiXin = H5Util.judgeBrowser().weixin;
        if(isInWeiXin){
            console.log("router 进入了微信页")

        }else{
            console.log("router 进入了 权限")
        }

    }
    onRouterChange(prevState,nextState,replace){
        //
    }
    initWeChat(){
        let devUrl = "https://caimi.we.com/activity/#/app/laboratory/index";
        let proUrl = window.location.href;
        var Jumpurl = encodeURIComponent(devUrl);
        var appId = "wx68da448306df15e3";
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
            appId + '&redirect_uri=' + Jumpurl +
            '&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect'
    }
    render() {
        return (
            <div style = {styles.wrap}>
                <div style={{height:'100%'}}>
                    <Router >
                        <Switch>
                            <Route exact path="/app/invitation/invitationInApp" component = {InvitationInApp}/>}/>
                            <Route exact path="/" render={() => <Redirect to="/app/invitation/invitationInApp"/>}/>
                            <Route exact path="/app/invitation/gotRedPacket" component = {GotRedPacket} />
                            <Route exact path="/app/appShare/course" component = {Course} />
                            <Route exact path="/app/appShare/answer" component = {ShareAnswer} />
                            {/*
                            */}
                            <Route exact path="/app/wakeup" component = {WakeUpApp} />
                            <Route ecact path = "/app/worldCupInvitation/:channel" component = {WorldCupInvitation}></Route>
                            <Route ecact path = "/app/invitation/babyTree" component = {BabyTree}></Route>
                            /*
                              app 内嵌页面
                             */
                            <Route exact path ="/app/news" component = {NewsInfo}></Route>
                            <Route exact path ="/app/notice" component = {NoticeInfo}></Route>
                            <Route exact path ="/app/article" component = {ArticleInfo}></Route>
                            <Route exact path ="/app/answer-detail" component = {AnswerDetail}></Route>
                            <Route exact path ="/app/common/stockRedirect" component = {StockRedirectPage}></Route>
                            {/*实验室活动*/}
                            <Route exact path ="/app/laboratory/index" onEnter={this.onRouterEnter()} component = {Index}></Route>
                            <Route exact path ="/app/laboratory/lab" component = {Loading}></Route>
                            <Route exact onEnter={requireAuth} path ="/app/laboratory/questions" component = {Question}></Route>
                            <Route exact path ="/app/laboratory/result" component = {LabResult}></Route>
                            <Route exact path ="/app/laboratory/signIn" component = {LabSign}></Route>
                            <Route exact path ="/app/laboratory/invite" component = {Invite}></Route>
                            <Route exact path ="/app/laboratory/guide" component = {Guide}></Route>
                            <Route exact path ="/app/laboratory/wx-redirect" component = {WXRedirect}></Route>
                            <Route exact path="/404" component={NotFound} />
                            <Route render={() => <Redirect to="/404"/> } />
                        </Switch>
                    </Router>
                </div>
                <style>
                       {`
                            #root{
                                height: auto;
                            }
                        `}
                </style>
            </div>


        )
    }
}