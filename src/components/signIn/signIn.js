/**
 * @author wuaixiaoyao
 * @date 2018/7/10
 * @Description: 注册组件
*/
import React, {Component} from "react";
import {Toast} from "antd-mobile"
import "./signIn.scss"
import {checkUserAccount,sendBuffettVerificationCode,checkUserAndRegister} from '@/api/api'
import {phoneUtil} from "../.././utils/index"
export default class SignIn extends Component{
    constructor(props){
        super(props)
        this.state = {
            phone:"",
            code:"",
            gettingCode:false,
            codeTime:60,
        }
    }
    static defaultProps = {
        inputBgColor:"",
        getCodeColor:""
    }
    componentWillMount(){
        //

    }
    getFieldsValue(){
         let {phone,code} = this.state;
        if(!phone.length){
            Toast.info('请输入手机号！',2)
            return null
        }else{
            if(!phoneUtil.isPhoneAvailable(phone)){
                Toast.info('手机号格式错误！',2)
                return null
            }else{

                if(this.state.code.length !== 6){
                    Toast.info('验证码格式错误！',2)
                    return null
                }
            }
        }
         return {
             phone,
             code
         }
    }
    getCode=()=>{
        let {gettingCode,phone} = this.state;
        if(this.state.gettingCode){
            return
        }
        if(!phoneUtil.isPhoneAvailable(phone)){
            Toast.info('手机号格式错误！',2)
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
        if(this.state.phone){
            let params = {
                phoneNo:this.state.phone,
                verType:5
            }
            sendBuffettVerificationCode(params).then(res=>{
                if(res.code == 0 ){
                    Toast.info('验证码已发送，请注意查收！')
                }
            })
        }

    }
    handlePhoneChange(event){
        let phone = event.target.value;
        if(phone.length >11){
            let validateAccount = phone.substring(0,11)
            this.setState({phone:validateAccount});
            return
        }
        this.setState({phone});
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
        return (
            <div className={"signIn-wrapper"}>
                <div className={"input-wrapper"}>
                    <input type="number" className={"shareInput"} placeholder={"请输入手机号"} style={{width:"100%"}}
                           ref={view =>this.phoneRef = view}
                           value={this.state.phone}
                           onChange={this.handlePhoneChange.bind(this)} onFocus={this.focusPhoneInput.bind(this)}
                    />
                </div>
                <div className="input-wrapper">
                    <input type="number" className={"shareInput"} style={{width:"100%"}} placeholder={"请输入验证码"}
                           value={this.state.code} ref={view =>this.verifyCodeRef = view}
                           onChange={this.handleCodeChange.bind(this)} onFocus={this.focusCodeInput.bind(this)}
                    />
                    <button className={`mar-left-10 ${codeBtn}`} style={{backgroundColor:this.props.getCodeColor||"#fff"}}
                            onClick={this.getCode}>
                        {
                            this.state.gettingCode?`已发送${this.state.codeTime}`:`获取验证码`
                        }
                    </button>
                </div>
            </div>
        )
    }
}