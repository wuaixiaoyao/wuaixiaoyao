/**
 * @author wuaixiaoyao
 * @date 2018/5/14
 * @Description: 竞赛邀请
 */
import React, {Component} from 'react'
import {Toast,Modal} from 'antd-mobile'
import BaseComponent from '../../../components/BaseComponent'
import RuleModal from "../../../components/caimiModal/ruleModal/ruleModal"
import inviteBg from '../../../styles/imgs/invite/invite_illustrator.png'
import inviteBtnBg from '../../../styles/imgs/invite/invite_button.png'
import dotLine from '../../../styles/imgs/invite/dot_line.png'
import defaultAvatar from '../../../styles/imgs/default-avator.png'
import "./invitationInApp.scss"
import {SHAREHOST,searchInviteInfo,searchInviteRecord,searchInviteRewardList,sendRemindMsg} from '@/api/api'
import {phoneUtil,timeUtil} from '@/utils/index'
import Avatar from '../../../components/avatar/avatar'
import Remind from "../../../components/invitation/remind/remind"
import {INVITE_STATUS} from '../../../constant'
import Scroll from 'react-bscroll'
import 'react-bscroll/lib/react-scroll.css'
import ReactIScroll from 'react-iscroll';
let  iScroll =require('iscroll/build/iscroll-probe');
var options = {
    mouseWheel:false,
    scrollbars: true,
    freeScroll: false,
    invertWheelDirection: true,
    momentum: false,
    pullUp:false
}

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}
export default class Invitation extends BaseComponent{
    constructor(props){
        super(props)
        this.state = {
            userId:"",
            inviteInfo:{
                sendReword:0,
                additionReward:0,
                inviteUser:0,
                sendReward:0,
                weekReward:0
            },
            recordList:[],
            matchRecordList:[],
            showInvitationDetail:false,
            showRewordDetail:false,
            modal1:false,
            modalVisible:false
        }
        this.params = {
            userId:"",
            currentPage:1,
            pageSize:2000
        }
    }
    componentWillMount(){
        this.getUserId()
    }
    componentDidMount(){

    }
    getUserId(){
        window.document.addEventListener('message',(e)=>{
             const message =JSON.parse(e.data);
            let userId = message.userId;
            if(userId){
                //存在
                this.setState({
                    userId
                })
                this.getInviteUserInfo(userId);
                this.params.userId = userId;
                this.searchInviteRecord(this.params);
                this.searchInviteRewardList(this.params)
            }

        })
    }
    getInviteUserInfo(userId){
        let params = {
            userId
        }
        searchInviteInfo(params).then(res=>{
            if(res.code == 0&&res.bean){
                this.setState({
                    inviteInfo:res.bean
                })
            }
        })
    }
    searchInviteRecord(params){
        searchInviteRecord(params).then(res=>{
            if(res&&res.code == 0&&res.data.length){
                let recordList = res.data.map(record=>({
                    userId:record.phoneNo,
                    avatar:record.picPath,
                    inviteDate:record.inviteTime,
                    status:record.inviteStatus,
                    sendMsgFlag:record.sendMsgFlag,
                    dayCount:record.dayCount
                }))
               this.setState({recordList})

            }
        })
    }
    searchInviteRewardList(params){
        //邀请奖金
        searchInviteRewardList(params).then(res=>{
            if(res&&res.code == 0&&res.data.length){
                let matchRecordList = res.data.map(record=>({
                    userId:record.phoneNo,
                    avatar:record.picPath,
                    dayCount:record.dayCount,
                    yesterdayReward:record.yesterdayReward,
                    totalReward:record.totalReward
                }))
                this.setState({matchRecordList})
            }
        })
    }
    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    goToInvite(){
        //与app 通信 调用app 分享
        let imageUrl = "https://file.caimionline.com/download/2018/0605/1528181490460_6621.jpg";
        let message = {
            type:"share",
            content: {
                title:"￥100新人红包，免费领取",
                description:"￥100财富学习红包，送给永不止步的你",
                imageUrl,
                type:5,//链接
                link:`${SHAREHOST}#/app/invitation/index/${this.state.userId}`
            }
        }
        window.postMessage(JSON.stringify(message))
        this.buryToApp()
    }
    buryToApp(){
        //与app 通信
        let message = {
            type:"invited",
            content: {
                type:1
            }
        }
        window.postMessage(JSON.stringify(message))
    }
    renderCaimiModal(){
        return (
            <RuleModal visible={this.state.modalVisible} title={"邀请规则"} showFooter={true} footerText = {"我知道了"}
                       onClose={this.onClose('modalVisible').bind(this)}>
                <div style={{ height:280, overflowY: 'scroll',overflowX:'hidden' }}>
                    <p className="ruleText">
                        1.邀请好友成为采蜜新用户，好友在接受邀请的7天内下单购买任意付费课程，你和好友各获得采蜜5元奖励,每周最多获得50元。好友在7天内参与竞赛并获得奖金，你可获得好友20%金额的奖金作为赏金。
                    </p>
                    <p className="ruleText">
                        2.你的好友必须是从未使用采蜜的新用户。拥有相同手机号、采蜜账号和硬件设备的用户，均视为同一个用户。
                    </p>
                    <p className="ruleText">
                        3.在好友完成知识变现后的1个工作日后5元奖励会发放至你的钱包余额中。竞赛赏金将在次日结算时发放至你的钱包余额中。
                    </p>
                    <p className="ruleText">
                        4.如发现任何违规套现取现奖励行为将视情节严重程度进行判罚:不予发放奖励、封停邀请有奖功能、
                        冻结所有通过邀请有奖渠道获得的奖励、依法追究其法律责任。
                    </p>
                    <p className="ruleText">
                        5.邀请记录最多保持6个月。
                    </p>
                    <p className="ruleText">
                        6.如有其它疑问请咨询采蜜官方客服。
                    </p>
                </div>
            </RuleModal>
        )
    }
    formatStatus(statusNo){
        switch (statusNo){
            case INVITE_STATUS.NOORDER:
                return '未下单'
            case INVITE_STATUS.FINISH:
                return '已完成'
            case INVITE_STATUS.LEARNING:
                return '学习中'
            case INVITE_STATUS.INVALID:
                return '已失效'
            default:
                break
        }

    }
    pullDownFreshAction = ()=>{
        return new Promise( resolve => {
            this.params.currentPage--;
            this.searchInviteRecord(this.params);
            resolve()

        })
    }
    loadMoreData = ()=>{
        // 更新数据
        return new Promise( resolve => {
            this.params.currentPage++;
            this.searchInviteRecord(this.params);
            resolve()

        })
    }
    goToRemind(phoneNo){
        //去提醒
        this.sendRemindCode(phoneNo)
    }
    sendRemindCode(phoneNo){
        //发送提醒消息
        let params = {phoneNo}
        sendRemindMsg(params).then(res => {
            if(res.code == 0){
                Toast.info("您已成功短信提醒好友")
                let {recordList} = this.state;
                recordList.forEach(record=>{
                    if(record.userId == phoneNo){
                        record.sendMsgFlag = 1
                    }
                })
                this.setState({recordList})
            }
        })

    }
    renderInviteRecordList(recordList){
        //渲染邀请记录
        return recordList.map((record,index)=> <li key={index} className={`recordItem flexCenter ${(index==(recordList.length -1))?"lastItem":""}`}>
            <div className="personInfo">
                <Avatar avatarUrl = {record.avatar||defaultAvatar} style={{width:32}}></Avatar>
                <div className="phoneAndTime">
                    <p className={`userAccount`}>{phoneUtil.encodePhone(record.userId)}</p>
                    <p className={`detail`}>
                        {record.status!==INVITE_STATUS.FINISH?record.status==INVITE_STATUS.INVALID?"已失效":`剩余${record.dayCount}天`:""}
                    </p>
                </div>
            </div>
            {<span className={`inviteStatus`}> {this.formatStatus(record.status)}</span>}
            <Remind  showRemindBtn = {record.status === INVITE_STATUS.NOORDER || record.status === INVITE_STATUS.LEARNING }
                     ifReminded = {record.sendMsgFlag} remind={()=>{this.goToRemind(record.userId)}}></Remind>

        </li>)
    }
    renderMatchRecordList(recordList){
        //渲染邀请记录
        return recordList.map((record,index)=>
            <li key={index} className={`recordItem flexCenter ${(index==(recordList.length -1))?"lastItem":""}`}>
                <div className="personInfo">
                    <Avatar avatarUrl = {record.avatar||defaultAvatar}
                            widthAndHeight={{width:32}}></Avatar>
                    <div className="phoneAndTime">
                        <p className={`userAccount`}>{phoneUtil.encodePhone(record.userId)}</p>
                        <p className={`detail`}>
                            {`剩余${record.dayCount}天`}
                        </p>
                    </div>
                </div>
                <div className="typeAndReword">
                    <p className={`type`}>昨日赏金</p>
                    <p className={`reword`}>￥{record.yesterdayReward}</p>
                </div>
                <div className="typeAndReword">
                    <p className={`type`}>总赏金</p>
                    <p className={`reword`}>￥{record.totalReward}</p>
                </div>
          </li>)
    }
    renderInviteContainer(recordList){
        let record = recordList
        if(record.length>3){
            record = recordList.slice(0,3)
        }
        let {inviteInfo} = this.state;
        return(
            <div className="inviteContainer  mar-top-10" >
                <p className={`inviteHeader`}>
                    <span className="inviteDetailTitle">详细邀请记录</span>
                    <span className="week-reward">本周{inviteInfo.weekReward}/50</span>
                    {recordList.length>3&&<span className={"detailBtn"} onClick={()=>{this.setState({showInvitationDetail:true})}}>查看全部</span>}
                </p>
                <div className="recordWrap" style={{height:record.length == 3?"186px":"auto"}}>
                    <ul className="recordContent">
                        {this.renderInviteRecordList(record)}
                    </ul>
                </div>
            </div>
        )
    }
    renderMatchRecordContainer(recordList){
        let record = recordList
        if(record.length>3){
            record = recordList.slice(0,3)
        }
        return(
            <div className="inviteContainer  mar-top-10" >
                <p className={`inviteHeader`}>
                    <span className="inviteDetailTitle">竞赛赏金</span>
                    {recordList.length>3&&<span className={"detailBtn"} onClick={()=>{this.setState({showRewordDetail:true})}}>查看全部</span>}
                </p>
                <div className="recordWrap" style={{height:record.length == 3?"186px":"auto"}}>
                    <ul className="recordContent">
                        {this.renderMatchRecordList(record)}
                    </ul>
                </div>
            </div>
        )
    }
    renderInvitationDetail(recordList){
        let {inviteInfo} = this.state;
        return(
            <div className="invitationDetailWrapper">
                <div className="inviteContainer" >
                    <p className={`inviteHeader`}>
                        <span className="inviteDetailTitle">详细邀请记录</span>
                        <span className="week-reward">本周{inviteInfo.weekReward}/50</span>
                        <span className={"detailBtn"} onClick={()=>{this.setState({showInvitationDetail:false})}}>返回</span>
                    </p>
                    <div className="recordWrap" style={{maxHeight:window.innerHeight-75,overflowY:"scroll"}}>
                        <ul className="recordContent">
                            {this.renderInviteRecordList(recordList)}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
    renderRecordDetail(recordList){
        //赏金详情
        return(
            <div className="invitationDetailWrapper">
                <div className="inviteContainer">
                    <p className={`inviteHeader`}>
                        <span className="inviteDetailTitle">竞赛赏金</span>
                        <span className={"detailBtn"} onClick={()=>{this.setState({showRewordDetail:false})}}>返回</span>
                    </p>
                    <div className="recordWrap" style={{maxHeight:window.innerHeight-75,overflowY:"scroll"}}>
                        <ul className="recordContent">
                            {this.renderMatchRecordList(recordList)}
                        </ul>
                    </div>
                </div>
            </div>

        )


    }
    renderInvitationContainer(){
        let {inviteInfo,recordList,matchRecordList} = this.state;
        return(
            <div>
                <img src={inviteBg} alt="背景图" className="inviteBg"/>
                <div className="ruleBtn" onClick={this.showModal('modalVisible')}>
                    规则
                </div>
                <div className="inviteWrap" >
                    <div className={"inviteBtnWrap"}>
                        <img src={inviteBtnBg} className={"inviteBtn"} alt="立即邀请"/>
                        <div className="inviteText" onClick={this.goToInvite.bind(this)}>立即邀请</div>
                    </div>
                    <div className="inviteContainer mar-top-20">
                        <p className={`inviteTitle`}>邀请记录</p>
                        <div className="inviteProgress">
                            <div className="inviteProItem flexCenter flexClumn">
                                <p className={`inviteNum`}>{inviteInfo.sendReword||0}元</p>
                                <p className={`inviteType`}>累计获得</p>
                            </div>
                            <img src={dotLine} className={`dotLine`} alt="虚线"/>
                            <div className="inviteProItem flexCenter flexClumn">
                                <p className={`inviteNum`}>{inviteInfo.inviteUser||0}人</p>
                                <p className={`inviteType`}>成功邀请</p>
                            </div>
                            <img src={dotLine} className="dotLine" alt="虚线"/>
                            <div className="inviteProItem flexCenter flexClumn">
                                <p className={`inviteNum`}>{inviteInfo.additionReward||0}元  </p>
                                <p className={`inviteType`}>竞赛赏金</p>
                            </div>
                        </div>
                    </div>
                    {recordList.length>0&&this.renderInviteContainer(recordList)}
                    {matchRecordList.length>0&&this.renderMatchRecordContainer(matchRecordList)}
                </div>
            </div>
        )
    }
    render(){
        let {recordList,matchRecordList,showInvitationDetail,showRewordDetail} = this.state;
        return(
            <div className="shareWrap" style={{  "minHeight": window.innerHeight}}>
                {!showInvitationDetail&&!showRewordDetail&&this.renderInvitationContainer()}
                {showInvitationDetail&&!showRewordDetail&&this.renderInvitationDetail(recordList)}
                {!showInvitationDetail&&showRewordDetail&&this.renderRecordDetail(matchRecordList)}
                {this.renderCaimiModal()}
            </div>
        )
    }

}