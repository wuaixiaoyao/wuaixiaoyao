/**
 * @author wuaixiaoyao
 * @date 2018/9/6
 * @Description: 邀请页
*/
import React ,{Component} from "react";
import {Toast} from "antd-mobile"
import BaseComponent from "../../../components/BaseComponent"
import RuleModal from "../../../components/caimiModal/ruleModal/ruleModal"
import "./invite.scss"
import WeChatShareModal from "../../../components/caimiModal/weChatShareModal/weChatShareModal";
import { bindActionCreators } from 'redux'
import * as caimiAction from '../../../redux/action/Index'
import {connect} from "react-redux";
import Avatar from "../../../components/avatar/avatar";
import {getInviteList, LabLogin, SHAREHOST,WeChatShare} from "../../../api/api";
import {CreateRandom, H5Util} from "../../../utils";
import wxUtils from "../../../utils/WeChat/WeChatUtil";
const wx = window.wx;
const BgImages = {
    answer: require('../../../styles/imgs/laboratory/Background2@3x.png'),
}
 class Invite extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            shareModalVisible:false,
            reward:0,
            userId:this.props.userId,
            randomId:this.props.randomId,
            labReward:this.props.labReward,
            from:"",
            browserType:this.props.browserType,
            isInWeiXin:this.props.isInWeiXin,
            alreadyAnswer:false,//已经测试过
            inviteUserId:this.props.inviteUserId,
            pageSize:5,
            page:1,
            totalPage:1,
            totalRecord:0,
            inviteList:[],

        }
    }
    componentWillMount(){
        this.getInviteList();
        this.initInvite();
        this.WeShare();
        // this.wxConfig()
    }
     WeShare(){
         //
         let shareUrl = `${SHAREHOST}#/app/laboratory/questions?inviteUserId=${this.state.userId}`
         let shareInfo = {
             title:"嗨！点击炼成真正的自己",
             description:"炼成你内心深处的真我",
             imgUrl:"https://file.caimionline.com/download/2018/0907/1536310815091_3028.png",
             link:shareUrl
         }
        wxUtils.share(shareInfo,this.buryWeShare())

     }
     buryWeShare(){
         let {userId,from,uniqueId,inviteUserId} = this.state;
         let params = {
             pageName:"LabInvite",
             eventName:"WeChatShare",
             uniqueId,
             userId,
             from,
             inviteUserId:this.props.inviteUserId
         }
         this.bury(params)
     }
     initInvite(){
         let {userId,from} = this.state;
         let randomId = this.state.randomId||CreateRandom();
         this.props.changeUserInfoActions.changeRandomId({randomId});
         let params = {
             pageName:"LabInvite",
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
    getInviteList(page=1){
        let {userId:inviteUserId,pageSize} = this.state;
        let params = {
            inviteUserId,
            page,
            pageSize
        };
        getInviteList(params).then(res=>{
            if(res.code == 0){
                if(res.data){
                    let {totalPage,currentPage,totalRecord} = res
                    this.setState({
                        inviteList:res.data,
                        totalPage,
                        page:currentPage,
                        totalRecord
                    })
                }else{
                    this.setState({
                        inviteList:[]
                    })
                }

            }
        })
    }
    goToDrawMoney(){
        this.props.history.push("/app/laboratory/guide")
    }
    goToShare(){
        if(this.props.fromApp){
            //与app 通信 调用app 分享
            let imageUrl = "https://file.caimionline.com/download/2018/0907/1536310815091_3028.png";
            let message = {
                type:"share",
                content: {
                    title:"嗨！点击炼成真正的自己",
                    description:"炼成你内心深处的真我",
                    imageUrl,
                    type:5,//链接
                    link:`${SHAREHOST}#/app/laboratory/questions?inviteUserId=${this.state.userId}`
                }
            }
            window.postMessage(JSON.stringify(message))
        }else{
            this.setState({
                shareModalVisible:true,
                visible:false
            })
        }

    }
    goBack(){
        this.props.history.goBack()
    }
    renderHeader() {
        const btn = (title, onClick)=>{
            return (
                <div style={{
                    width: '68px',
                    height: '30px',
                    borderRadius: '4px',
                    border: '2px solid #000000',
                    backgroundColor: '#FF7900',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '12px',
                    color: '#000000',
                }} className={"font-bolder"} onClick={onClick} >
                    {title}
                </div>
            )
        }

        return (
            <div style={{
                flexDirection: 'row',
                paddingLeft: '20px',
                paddingRight: '20px',
                marginTop: '20px',
                marginBottom: '1px',
            }} >
                {btn('返回首页',()=>{
                    this.goBack()
                })}
                <div style={{flex: 1}} />
                {btn('详细规则', ()=>{
                    this.setState({
                        visible:true,
                        shareModalVisible:false
                    })
                })}
            </div>
        )
    }

    renderTopView() {
        let {totalRecord} = this.state;
        return (
            <div style={{
                alignItems: 'center'
            }} >
                <div className="invite-title" >
                    <p>邀请好友助力炼成</p>
                    <p>获取2元现金</p>
                </div>
                <div>
                    <div style={{
                        position: 'relative',
                        marginTop: '5px'
                    }}  onClick={()=>{this.goToShare()}}>
                        <div style={{
                            width: '181px',
                            height: '40px',
                            borderRadius: '20px',
                            backgroundColor: '#FF7900',
                            marginTop: '7px',
                            border: '2px solid #000000',
                        }} />
                        <div style={{
                            position: 'absolute',
                            top:0,
                            width: '181px',
                            height: '40px',
                            backgroundColor: '#FFCE01',
                            border: '2px solid #000000',
                            borderRadius: '20px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '16px',
                            color: '#000000'
                        }} className={"font-bolder"}>
                            立即邀请
                        </div>
                    </div>
                </div>
                <div className="total-wrapper">
                    <img style={{width: '38px', height: '76px'}} src={require('../../../styles/imgs/laboratory/Illustration1@3x.png')} alt={'icon'} />
                    <div style={{
                        marginLeft: '7px'
                    }} >
                        <div style={{
                            fontFamily: 'labFont',
                            fontSize: '20px',
                            color: '#FFFFFF',
                        }} >累计获得赏金:{totalRecord||0}元</div>
                        <div style={{
                            position: 'relative',
                            marginTop: '5px'
                        }}  onClick={()=>{this.goToDrawMoney()}}>
                            <div style={{
                                width: '181px',
                                height: '40px',
                                borderRadius: '20px',
                                backgroundColor: '#FF7900',
                                marginTop: '7px',
                                border: '2px solid #000000',
                            }} />
                            <div style={{
                                position: 'absolute',
                                top:0,
                                width: '181px',
                                height: '40px',
                                backgroundColor: '#FFCE01',
                                border: '2px solid #000000',
                                borderRadius: '20px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '16px',
                                color: '#000000'
                            }} className={"font-bolder"}>
                                立即提现
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderTitle() {
        return (
            <div className="lab-font" style={{
                fontSize: '30px',
                color: '#FFFFFF',
                marginTop: '13px'
            }} >
                好友默契榜  
            </div>
        )
    }
    goToResult(userId){
        //查看结果
        this.props.history.push(`/app/laboratory/result?fromPage=invitePage&searchUserId=${userId}`)
    }
    renderList(lists) {
        const btn = (userId)=>{
            return (
                <div style={{
                    width: '90px',
                    height: '30px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#000000',
                    border: '2px solid #000000',
                    borderRadius: '18px',
                    backgroundColor: '#ffffff',
                    marginRight: '14px',
                    fontSize:"16px"
                }} className={"font-bolder"} onClick={()=>{
                    this.goToResult(userId)
                }} >
                    查看结果
                </div>
            )
        }
        const txt = ()=>{
            return (
                <div className={"font-bolder"} style={{
                    width: '90px',
                    height: '30px',
                    fontSize:"16px",
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#000000',
                    marginRight: '14px'
                }} >
                    等待炼成
                </div>
            )
        }
        const nillItem = ()=>{
            return (
                <div style={{
                    width: '100%',
                    height: '180px',
                    justifyContent: 'center',
                    alignItems: 'center',
                }} >
                    <img style={{
                        width: '131px',
                        height: '99px'
                    }} src={require('../../../styles/imgs/laboratory/Illustration3@3x.png')} alt={'icon'} />
                    <div style={{
                        fontSize: '12px',
                        color: '#4A4A4A',
                        marginTop: '3px',
                    }} className={"font-bolder"} >
                        还未有好友助力，快去邀请吧~
                    </div>
                </div>
            )
        }
        const listItem = (item, index)=>{
            let {avatar,userId,userName:nickName,likeNum:percent,rewardStatus,reward} = item;
            let isLast = lists.length - 1 === index;
            let showReward = false;
            if(reward == 2&&rewardStatus==0){
                showReward = true
            }
            let seeResult = true;
            if(rewardStatus == 1){
                seeResult = false
            }
            return (
                <div style={{
                    position: 'relative'
                }} >
                    <div style={{
                        height: '57px',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }} >
                        <div style={{
                             marginLeft:7,
                        }}>
                            <Avatar avatarUrl={avatar} style={{
                                width: '40px',
                                height: '40px',
                                border: '2px solid #000000'
                            }} ></Avatar>
                        </div>
                        <div style={{
                            fontSize: '14px',
                            color: '#000000',
                            marginLeft: '9px',
                            flexDirection:"row",
                            flex:1,
                            justifyContent:"space-between",
                            paddingRight:"8px"
                        }} className={"font-bolder"} >
                           <p style={{width:"64px"}} className="text-overflow font-bolder">{nickName}</p>
                            {percent}%
                        </div>
                        {!Boolean(seeResult)&&txt()}
                        {Boolean(seeResult)&&btn(userId)}
                    </div>
                    {!isLast && <div style={{
                        height: '2px',
                        backgroundColor: '#4A4A4A',
                        borderRadius: '1px',
                        marginLeft: '9px',
                        marginRight: '13px',
                    }} />}
                    {Boolean(showReward)&&<div style={{
                        position: 'absolute',
                        right: '-18px',
                        top: '-18px'
                    }} >
                        <img style={{
                            width: '30px',
                            height: '31px',
                        }} src={require('../../../styles/imgs/laboratory/Illustration2@3x.png')} alt="头像" />
                    </div>}
                </div>
            )
        }

        return (
            <div style={{
                width: '300px',
                border: '2px solid #000000',
                backgroundColor: '#FFCE01',
                marginTop: '13px',
            }} >
                {!Boolean(lists.length)&&nillItem()}
                {lists&&Boolean(lists.length)&&lists.map((item, index)=>{
                    return listItem(item, index);
                })}
            </div>
        )
    }

    renderPage(count) {
        let {page,totalPage} = this.state;
        return (
            <div style={{
                flexDirection: 'row',
                marginTop: '13px'
            }} >
                <div className={page-1?"page-control":"disable-page-control"} onClick={()=>{
                    let prePage = page-1;
                    if(prePage>0){
                        this.getInviteList(prePage)
                    }
                }} >
                    上一页
                </div>
                <div style={{
                    width: '80px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '14px',
                    color: '#FFCE01',
                }} >
                    {count}
                </div>
                <div className={page+1<=totalPage?"page-control":"disable-page-control"} onClick={()=>{
                    let nextPage = page+1;
                    if(nextPage<=totalPage){
                        this.getInviteList(nextPage)
                    }

                }} >
                    下一页
                </div>
            </div>
        )
    }
    renderRuleModal(){
        let {visible} = this.state;
        return <RuleModal visible={visible} showHeader={false} style={{
            backgroundColor: '#FFCE01',
            border: '2px solid #000000',
            borderRadius: '8px',
           }}>
            {this.renderRule()}

        </RuleModal>
    }
    renderRule() {
        const rule = [
            '1.邀请好友需为采蜜新用户，且使用微信授权登录。',
            '2.好友必须在微信内打开您的链接并完成测试。',
            '3.二元奖励放入“采蜜-我的-我的钱包”中，可提现至储蓄卡。',
            '4.此次活动最多累计奖励为50元，超过50元后邀请将不发放奖励。',
            '5.如发现任何违规套取奖励行为将视情节严重程度进行判罚：不予发放奖励、依法追究其法律责任。',
            '6.如有其它疑问请咨询采蜜官方客服。',
        ]
        const ruleTxt = (text, index)=>{
            return (
                <div style={{
                    whiteSpace: 'normal',
                    lineHeight: '20px',
                    marginTop: index===0?'0px':'20px',
                }} >
                    {text}
                </div>
            )
        }
        return (
            <div >
                <h4 className="rule-title lab-font" >
                    详细规则
                </h4>
                <div style={{
                    border: '2px solid #000000',
                    width: '100%',
                    marginBottom: '9px',
                }} />
                <div style={{
                    alignItems: 'flex-start'
                }} >
                    {rule.map((item, index)=>{
                        return ruleTxt(item, index);
                    })}
                </div>
            </div>
        )
    }
    renderShareModal(){
        let {shareModalVisible} = this.state;
        return <WeChatShareModal visible={shareModalVisible}>
        </WeChatShareModal>
    }
    render() {
        let {inviteList,page} = this.state;
        return (
            <div className={"invite-wrapper"} style={{"minHeight": window.innerHeight, position: 'relative'}} >
                <img className={"bg-img"} src={BgImages.answer} style={{"minHeight": window.innerHeight}} alt="背景"/>
                <div className={"dollars"} >
                    {this.renderHeader()}
                    <div style={{
                        alignItems: 'center'
                    }} >
                        {this.renderTopView()}
                        {this.renderTitle()}
                        {this.renderList(inviteList)}
                        {inviteList&&Boolean(inviteList.length)&&this.renderPage(page)}
                    </div>
                     {this.renderRuleModal()}
                    {this.renderShareModal()}
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
        location:state.userInfo.location,
        browserType:state.BrowserInfo.browserType,
        isInWeiXin:state.BrowserInfo.isInWeiXin,
        labReward:state.labInfo.labReward
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
)(Invite)
