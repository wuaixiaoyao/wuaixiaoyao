/**
 * @author wuaixiaoyao
 * @date 2018/5/14
 * @Description: 竞赛邀请
 */
import React, {Component} from 'react'
import {Toast,Modal} from 'antd-mobile'
import BaseComponent from "../../components/BaseComponent"
import RuleModal from "../../components/caimiModal/ruleModal/ruleModal"
import Avatar from "../../components/avatar/avatar"
import inviteBg from '@/styles/imgs/invite/invite_bg.png'
import "./invitation.scss"
import {getInviteUserInfo,saveShareRecord,checkUserAccount,sendVerificationCode,checkUserAndRegister} from '@/api/api'
import {isPhoneAvailable} from '@/utils/index'
const userId = 110;
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
            userInfo:{
                picPath:'',
                nickname:""
            },
            account:"",
            code:"",
            ifNewUser:false,
            gettingCode:false,
            codeTime:60,
            modal1:false,
            modalVisible:false
        }
        this.userId = this.props.match.params.userId;

    }
    componentWillMount(){
        this.saveShareRecord()
        this.getInviteUserInfo()
    }
    componentWillUnMount(){
        this.getCodeTimer&&clearInterval(this.getCodeTimer)
    }
    saveShareRecord(){
        let params = {
            userId:this.userId,
            sharePageCode:'shareReward'
        }
        saveShareRecord(params).then(res=>{
            if(res.code == 0){
                console.log('保存')
            }
        })
    }
    getInviteUserInfo(){
        let params = {
            userId:this.userId
        }
        getInviteUserInfo(params).then(res=>{
            if(res.code == 0&&res.bean){
                this.setState({
                    userInfo:res.bean
                })
            }
        })
    }
    getCode=()=>{
        if(this.state.gettingCode){
            return
        }
        this.setState({
            gettingCode:true
        })
        this.getCodeTimer = setInterval(()=>{
            let oldTime = this.state.codeTime
            if(oldTime == 0 ){
                clearInterval(this.getCodeTimer)
                this.setState({
                    gettingCode:false,
                    codeTime:60
                })
                return
            }
            this.setState({
                codeTime:oldTime -1
            })
        },1000)
        this.getVerificationCode()
    }
    getVerificationCode(){
        //获取code
        if(this.state.account){
            let params = {
                phoneNo:this.state.account,
                verType:5
            }
            sendVerificationCode(params).then(res=>{
                if(res.code == 0 ){
                    Toast.info('验证码已发送，请注意查收！')
                }
            })
        }

    }
    register(){
        let params = {
            phoneNo:this.state.account,
            verCode:this.state.code,
            inviteUserId:this.userId
        }
        checkUserAndRegister(params).then(res=>{
            if(res.code == 0&&res.bean){
                let voucherList = res.bean.map(voucher=>({
                    voucherType:voucher.voucherType,
                    voucherName:voucher.voucherName,
                    value:voucher.value
                }))
                let state = {
                    userId:this.state.account,
                    voucherList
                }
                setTimeout(()=>{
                    this.props.history.push({pathname:'/app/invitation/gotRedPacket',state})
                },0)
            }else{

            }
        })
    }

    getRedPacket(){
        //判断是否是新客户
        if(!this.state.account.length){
            Toast.info('请输入手机号！',2)
            return
        }else{
            if(!isPhoneAvailable(this.state.account)){
                Toast.info('手机号格式错误！',2)
                return
            }
        }
        if(!this.state.ifNewUser){
            //老用户
            let params = {
                phoneNo:this.state.account
            }
            checkUserAccount(params).then(res=>{
                if(res.code == 18001){
                    this.setState({
                        ifNewUser:true
                    })
                }else{
                    this.setState({
                        ifNewUser:false
                    })
                }
            })
        }else{
            if(this.state.code.length !== 6){
                Toast.info('请输入验证码！',2)
                return
            }else{
                this.register()
            }
        }

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
        console.log(key)
    }
    onClose = key => ( ) => {
        this.setState({
            [key]: false,
        });
    }

    handlePhoneChange(event){
        let account = event.target.value;
        if(account.length >11){
            console.log(account.length)
            let validateAccount = account.substring(0,11)
            this.setState({account:validateAccount});
            return
        }
        this.setState({account});
    }
    handleCodeChange(event){
        let code = event.target.value;
        if(code.length >6){
            let validateCode = code.substring(0,6)
            this.setState({code:validateCode});
            return
        }
        this.setState({code})
    }
    renderCaimiModal(){
        return (
            <RuleModal visible={this.state.modalVisible} title={"邀请规则"} showFooter={true} footerText = {"我知道了"}
                       onClose={this.onClose('modalVisible').bind(this)}>
                <div className={"rule-content"}>
                    <p className="ruleText">
                        1. 红包仅限新用户领取
                    </p>
                    <p className="ruleText">
                        2. 同一手机号、同一设备视为同一用户
                    </p>
                    <p className="ruleText">
                        3. 新用户现金券在完成任务后可领取
                    </p>
                    <p className="ruleText">
                        4. 如有疑问请致电采蜜客服：4001608030
                    </p>
                </div>
            </RuleModal>
        )
    }
    renderModal(){
        return  (
            <Modal
                visible={this.state.modal1}
                transparent
                maskClosable={false}
                onClose={this.onClose('modal1')}
                title="邀请规则"
                footer={[{ text: '我知道了', onPress: () => {this.onClose('modal1')(); } }]}
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
            >
                <div className={"rule-content"}>
                    <p className="ruleText">
                    1. 红包仅限新用户领取
                    </p>
                    <p className="ruleText">
                    2. 同一手机号、同一设备视为同一用户
                    </p>
                    <p className="ruleText">
                    3. 新用户现金券在完成任务后可领取
                    </p>
                    <p className="ruleText">
                    4. 如有疑问请致电采蜜客服：4001608030
                    </p>
                </div>
        </Modal>
        )
    }
    focusPhoneInput(){
        this.focusInput(this.phoneRef)
    }
    focusCodeInput(){
        this.focusInput(this.verifyCodeRef)
    }
    focusInput(domRef){
        setTimeout(()=>{
            domRef.scrollIntoView(true);
            domRef.scrollIntoViewIfNeeded();
        },250)
    }
    render(){
        let codeBtn = this.state.gettingCode?'disableCodeBtn':'codeBtn';
        let picPath = this.state.userInfo.picPath||require('../../styles/imgs/default-avator.png');
        return(
            <div className="shareWrap" style={{"minHeight": window.innerHeight }}>
                <div className="imgWrap">
                      <img src={inviteBg} alt="背景图" className="inviteBg"/>
                </div>
                <div className="ruleBtn" onClick={this.showModal('modalVisible')}>
                    规则
                </div>
                <div className="inviteWrap" >
                    <div className="inviteContent flexClumn">
                            <Avatar avatarUrl={picPath}></Avatar>
                            <p className="userId text-center">{this.state.userInfo.nickname}</p>
                            <p className="inviteDescription text-center">
                                hi,送你一个采蜜现金大红包，一起知识变现，实现财富自由，快来领取吧~
                            </p>
                            <div className="shareBtnWrap">
                                <input type="number" className="shareInput"  ref={view =>this.phoneRef = view}
                                       value={this.state.account}
                                       onChange={this.handlePhoneChange.bind(this)} onFocus={this.focusPhoneInput.bind(this)} placeholder="请输入手机号"/>
                            </div>
                            {this.state.ifNewUser&&<div className="shareBtnWrap mar-top-10">
                                <input type="number"  className="shareInput"  value={this.state.code} ref={view =>this.verifyCodeRef = view}
                                       onChange={this.handleCodeChange.bind(this)} onFocus={this.focusCodeInput.bind(this)}
                                       placeholder="请输入验证码"/>
                                <button className={`mar-left-10 ${codeBtn}`} onClick={this.getCode}>
                                   {
                                       this.state.gettingCode?`已发送 ${this.state.codeTime}`:` 获取验证码`
                                    }
                                </button>
                            </div>}
                             <button className={`goToBtn mar-top-10`} onClick={()=>{this.getRedPacket()}}>立即领取</button>

                    </div>
                </div>
                <div className="flex-div">
                    
                </div>
                {this.renderCaimiModal()}
            </div>
        )
    }

}