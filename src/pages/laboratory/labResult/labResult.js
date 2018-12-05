/**
 * @author wuaixiaoyao
 * @date 2018/8/31
 * @Description: 结果页
*/
import React ,{Component} from "react";
import html2canvas from "html2canvas"
import BaseComponent from "../../../components/BaseComponent"
import "./labResult.scss"
import {H5Util} from "../../../utils/index"
import { bindActionCreators } from 'redux'
import * as caimiAction from '../../../redux/action/Index'
import {connect} from "react-redux";
import {SHAREHOST, WeChatShare, inviteDetail, checkReward} from "../../../api/api"
import resultBg from  "../../../styles/imgs/laboratory/result-bg.png"
import resultBgCanvas from "../../../styles/imgs/laboratory/Background5@3x.png"
import personImg from "../../../styles/imgs/laboratory/result/inviter-body.png"
import mineAvatar from "../../../styles/imgs/laboratory/result/mineAvatar.png"
import twoReward from "../../../styles/imgs/laboratory/result/two-reward.png"
import WeChatShareModal from "../../../components/caimiModal/weChatShareModal/weChatShareModal";
import wxUtils from "../../../utils/WeChat/WeChatUtil";
import QRCode from 'qrcodejs2'
const wx = window.wx;
var Pressure = require('pressure');
const Result = [
    {
        id:1,
        title:"傻白甜",
        text:"xxx是个傻白甜，他/她一直在思考自己的豆腐脑到底是甜的还是咸的"
    },
    {
        id:2,
        title:"纤细",
        text:"房价来说发链接；啊发顺丰；按房间数量；案件防范发觉； 发；就；阿发发觉；阿附加费；阿发；发发漏发"
    },
    {
        id:3,
        title:"傻白甜",
        text:"罚款了解放垃圾分类进；了；了发觉； 发；发发发 发"
    }
]
const titleImgs = [
    require("../../../styles/imgs/laboratory/result/1.png"),
    require("../../../styles/imgs/laboratory/result/2.png"),
    require("../../../styles/imgs/laboratory/result/3.png"),
]
class LabResult extends BaseComponent{
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            fromInvitePage:false,//来自邀请页
            searchUserId:"",//受邀请ID
            searchUserName:"XXX",//受邀人用户名
            searchUserAvatar:"",// 受邀人头像
            userId:this.props.userId,
            inviteUserId:this.props.inviteUserId,
            isNewUser:this.props.isNewUser,
            isInWeiXin:this.props.isInWeiXin,
            userInfo:this.props.userInfo,
            inviteUserInfo:this.props.inviteUserInfo,
            nickName:"",
            result:this.props.answerResult,
            alreadyHelp:false, //默认未阻力过
        }
        this.dataUrl = ""// base64 链接
    }
    componentWillMount(){
        //

        let {userId,inviteUserId} = this.state;
        let {search} = this.props.location;
        if(search){
            let message = H5Util.serilizeURL(search);
            console.log(message,"结果页")
            if(message.fromPage == "invitePage"){
                this.setState({
                    fromInvitePage:true,
                    searchUserId: message.searchUserId
                })
                let params = {
                    userId:message.searchUserId,
                    inviteUserId:userId
                }
                this.getInviteDetail(params)
            }else if(message.fromPage == "questionPage"){
                //已经阻力过
                let params = {
                    userId,
                    inviteUserId
                }
                this.setState({
                    alreadyHelp:true//助力过
                },()=>{
                    this.getInviteDetail(params);
                    //alert(this.state.alreadyHelp?"阻力过":"没住里")
                })

            }else if(message.fromPage == "indexPage"){
                //来自首页
                this.checkReward()
            }
        }else{
            let result =  this.formatResult(this.props.answerResult)
            this.setState({
                result
            })
        }
        this.WeShare()

    }
    WeShare(){
        let shareUrl = `${SHAREHOST}#/app/laboratory/questions?inviteUserId=${this.state.userId}`
        let shareInfo = {
            title:"嗨！点击炼成真正的自己",
            description:"炼成你内心深处的真我",
            imgUrl:"https://file.caimionline.com/download/2018/0907/1536310815091_3028.png",
            link:shareUrl
        }
        wxUtils.share(shareInfo,this.buryWeShare())
    }

    componentDidMount(){
        this.addListenerBack(()=>{
            let path = `/app/laboratory/index`;
            this.props.history.replace({pathname:path});
        })
        this.qrcode();
        this.shutQrcode();
        this.initLabResult();
        setTimeout(()=>{
            this.getCanvasImg();
        },1300)
        // Pressure.set('#real-wrapper', {
        //     change: function(force){
        //         var a = document.createElement('a')
        //         var event = new MouseEvent('click')
        //         // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
        //         a.download = "分享炼成结果" || '下载图片名称'
        //         // 将生成的URL设置为a.href属性
        //         a.href = _this.dataUrl
        //         // 触发a的单击事件
        //         a.dispatchEvent(event)
        //     }
        // });
    }
    async initLabResult(){
        let {userId,from,uniqueId,inviteUserId} = this.state;
        let params = {
            pageName:"LabResult",
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
    buryWeShare(){
        let {userId,from,uniqueId,inviteUserId} = this.state;
        let params = {
            pageName:"LabResult",
            eventName:"WeChatShare",
            uniqueId,
            userId,
            from,
            inviteUserId:this.props.inviteUserId
        }
        this.bury(params)
    }
    qrcode() {
        let qrcodeUrl = `${SHAREHOST}#/app/laboratory/lab`
        let {userId} = this.state;
        if(userId){
            qrcodeUrl = `${SHAREHOST}#/app/laboratory/questions?inviteUserId=${userId}`
        }
        let qrcode = new QRCode('qrcode',{
            width:93, // 设置宽度，单位像素
            height:93, // 设置高度，单位像素
            text:qrcodeUrl
            // 设置二维码内容或跳转地址
        })
    }
    shutQrcode(){
        //
        let qrcodeUrl = `${SHAREHOST}#/app/laboratory/lab`
        let {userId} = this.state;
        if(userId){
            qrcodeUrl = `${SHAREHOST}#/app/laboratory/questions?inviteUserId=${userId}`
        }
        let qrcode = new QRCode('shut-qrcode', {
            width:93, // 设置宽度，单位像素
            height:93, // 设置高度，单位像素
            text: qrcodeUrl
            // 设置二维码内容或跳转地址
        })
    }
    getCanvasImg(){
        // 转换canvas 为图片
        let doc = window.document;
        let dom = document.getElementById("canvas-div");
        let _this = this;
        html2canvas(dom,{
            useCORS: true,
            scale: window.devicePixelRatio*2, // 默认值是window.devicePixelRatio
            backgroundColor: null,
            logging: false
        }).then(function(canvas) {
            var dataUrl = canvas.toDataURL();
            _this.dataUrl = dataUrl;
            var newImg = doc.createElement("img");
            newImg.src =  dataUrl;
            newImg.id =  "canvasImg";
            newImg.style.width = canvas.width/2 + 'px';
            newImg.style.height = canvas.height/2 + 'px';
            document.getElementById("canvas-img-wrapper").appendChild(newImg);

        });
    }
    getInviteDetail(params){
        inviteDetail(params).then(res=>{
            if(res.code == 0&&res.bean){
                let {result,userName,avatar} = res.bean;
                this.setState({
                    result:this.formatResult(result),
                    searchUserName:userName.slice(0,4),
                    searchUserAvatar:avatar
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
            //检查结果
            if(res.bean){
                let {result} = res.bean;
                if(res.bean.result){
                    this.setState({
                        result:this.formatResult(result),
                    })
                }
            }
        })
    }
    formatResult(returnResult){
        //
        let resultMap = returnResult.split(";")
        return   resultMap.map((item,index)=>{
            return {
                id:index+1,
                title:item.split("_")[0],
                text:item.split("_")[1]
            }
        })
    }
    formatName(text){
        if(text){
            let {userInfo,inviteUserInfo,inviteUserId,userId,alreadyHelp} = this.state;        //
            let name = "";
            if(alreadyHelp){
                //阻力过别人
                if(inviteUserId&&inviteUserInfo&&inviteUserInfo.nickName){
                    //
                    name = inviteUserInfo.nickName
                }
            }else{
                //炼成自己
                if(!userId){
                    name="你"
                }else{
                    name = userInfo.nickName;
                }
            }
            return text.replace(/XXX/ig,name)
        }

    }

    renderQRCode(){
        return <div className="code-wrapper">
            <div className="code-content" id="qrcode" ref="qrcode">
            </div>
        </div>
    }
    renderShutCode(){
        return <div className="code-wrapper">
                <div className="code-content" id="shut-qrcode" ref="qrcode">
                </div>
            </div>
    }
    renderPerson(){
        let {userId,fromInvitePage,searchUserName,inviteUserInfo,userInfo,searchUserAvatar,inviteUserId,alreadyHelp} = this.state;
        let {nickName:inviteUserName,avatar:inviteAvatar} = this.props.inviteUserInfo;
        let {nickName:userName,avatar:userAvatar} = this.props.userInfo;
        let avatar = !userId?mineAvatar:personImg;
        let name = "XXX";
        if(alreadyHelp){
            //阻力别人
            if(inviteUserId&&inviteUserInfo&&inviteUserInfo.nickName){
                //
                name = inviteUserInfo.nickName.slice(0,6)
            }
        }else{
            //炼成自己
            if(!userId){
                name="自己"
            }else{
                name = userName.slice(0,6);
            }
        }
        return <div className="result-person">
            <div className="result-text-wrapper">
                <p className="common-text lab-font">
                    {fromInvitePage?searchUserName:"恭喜你"}炼成了</p>
                <p className=" common-text lab-font">一个崭新的</p>
                <p className=" username lab-font">{name}</p>
            </div>
        </div>
    }
    renderResultTitle(item,index){
        let words = [];
        if(item.title.length){
            words = item.title.split("")
        }
        if(index == 1){
            return <div className="result-title-content" >
                <img className="title-img" src={titleImgs[index]} alt="图片"/>
                <div className="title-word flex-end" >
                    {words.map((word,index)=>{
                        return <div className="word-wrapper">
                            <div className="word-content lab-font">{word}</div>
                        </div>
                    })}
                </div>
            </div>
        }
        return <div className="result-title-content" >
            <div className="title-word">
                {words.map((word,index)=>{
                    return <div className="word-wrapper">
                        <div className="word-content lab-font">{word}</div>
                    </div>
                })}
            </div>
            <img className="title-img" src={titleImgs[index]} alt="图片"/>
        </div>
    }
    renderResult(){
        //
        let {result} = this.state;
        if(typeof result !== "string" &&result.length){
            return result.map((item,index)=>{
                return <div className="result-item-wrapper" key={index}>
                    <div className="result-item">
                        <div className="result-title">
                            {this.renderResultTitle(item,index)}
                        </div>
                        <div className="result-content-bg">
                            <div className="content">{this.formatName(item.text)}</div>
                            <div className="result-content">
                                {this.formatName(item.text)}
                            </div>
                        </div>
                    </div>
                </div>
            })
        }else{
            return <div>

            </div>
        }
    }
    goToReceive(){
        let {userId,isNewUser,isInWeiXin} = this.state;
        if(!userId){
            this.props.history.push("/app/laboratory/signIn")
        }else{
            this.props.history.push("/app/laboratory/guide")
        }
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
                visible:true
            })
        }

    }
    goBack(){
        this.props.history.goBack()
    }
    renderShareModal(){
        let {visible} = this.state;
        return <WeChatShareModal visible={visible}>
        </WeChatShareModal>
    }
    renderBottomOpe(){
        let {userId,isNewUser,isInWeiXin,fromApp} = this.state;
        return <div className="bottom-ope-wrapper">
               {/*其他H5页面 跳转登录页 正常为引导页*/}
               {(!userId||(isNewUser&&isInWeiXin))&&<div className="receive-reward" onClick={()=>{this.goToReceive()}}>
                    <p className="five-dollar font-bolder">恭喜获得5元现金</p>
                    <p className="receive-money font-bolder">领取赏金</p>
               </div>}
              {(userId||fromApp)&&<div className="invite-exercise" onClick={()=>{this.goToShare()}}>
                    <div className="two-reward-wrapper">
                        <img className="reward-img" src={twoReward} alt="赚2元奖金"/>
                    </div>
                   <p className={"font-bolder"}>邀请好友炼成自己</p>
                </div>}
        </div>
    }
    render(){
        return <div className="lab-result-wrapper"
                    style={{"minHeight": window.innerHeight}}>
                <div id="real-wrapper">
                    <img src={resultBg}  className="bg-img" alt="背景图"/>
                    <div className="lab-result-content">
                        <div className="result-person-wrapper">
                            {this.renderPerson()}
                            {this.renderQRCode()}
                        </div>
                        <p className="save-img-text">长按保存截图</p>
                        {this.renderResult()}
                        {this.renderBottomOpe()}
                    </div>
                </div>
                <div id="canvas-div">
                    <div className="lab-result-wrapper"
                         style={{"minHeight": window.innerHeight}}>
                        <img src={resultBgCanvas}  className="bg-img" alt="背景图"/>
                        <div className="lab-result-content" style={{paddingTop:40}}>
                            <div className="result-person-wrapper" >
                                {this.renderPerson()}
                                {this.renderShutCode()}
                            </div>
                            {this.renderResult()}
                        </div>
                    </div>
                </div>
                <div id="canvas-img-wrapper"></div>
                <div className={"font-bolder back-btn"} onClick={()=>{this.goBack()}}>
                    返回
                </div>
                {this.renderShareModal()}
        </div>

    }
}
function mapStateToProps(state) {
    return {
        userId: state.userInfo.userId,
        inviteUserId: state.userInfo.inviteUserId,
        isNewUser:state.userInfo.isNewUser,
        fromApp: state.userInfo.fromApp,
        isInWeiXin:state.userInfo.isInWeiXin,
        userInfo:state.userInfo.userInfo,
        inviteUserInfo:state.userInfo.inviteUserInfo,
        answerResult:state.labInfo.answerResult
    }
}
function mapDispatchToProps(dispatch) {
    return {
        //通过bindActionCreators把dispath注入进action中，调用action，则会自动触发dispath，修改store
        changeUserInfoActions: bindActionCreators(caimiAction,dispatch)
    }
}

export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(LabResult)
