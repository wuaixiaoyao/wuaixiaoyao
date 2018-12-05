import React ,{Component} from "react";
import BaseComponent from "../../../components/BaseComponent"
import { bindActionCreators } from 'redux'
import * as caimiAction from '../../../redux/action/Index'
import {connect} from "react-redux";
import "./guide.scss"
import {CreateRandom} from "../../../utils";

const BgImages = {
    answer: require('../../../styles/imgs/laboratory/Background2@3x.png'),
}

class Guide extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            userId:this.props.userId,
            randomId:this.props.randomId,
            isInWeiXin:this.props.isInWeiXin
        }
    }
    componentWillMount(){
        console.log(this.state);
        this.initGuide();
    }
    static defaultProps = {
        isInWeiXin: true
    }
    initGuide(){
        let {userId,from} = this.state;
        let randomId = this.state.randomId||CreateRandom();
        this.props.changeUserInfoActions.changeRandomId({randomId});
        let params = {
            pageName:"LabGuide",
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
    renderSetp1() {
        return (
            <div>
                <div style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }} >
                    <img style={{
                        width: '54px',
                        height: '61px'
                    }} src={require('../../../styles/imgs/laboratory/Illustration8@3x.png')} alt={'icon'} />
                    <div className="lab-font" style={{
                        fontSize: '36px',
                        color: '#FFFFFF',
                        alignItems: 'center'
                    }} >
                        第一步
                        <div style={{
                            fontFamily: 'PingFangSC-Semibold',
                            fontSize: '14px',
                            color: '#000000',
                            backgroundColor: '#FFCE01',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '5px',
                            width: '128px',
                            height: '27px',
                            cursor:"pointer"
                        }}  >
                            下载APP
                        </div>
                    </div>
                </div>
                <div style={{
                    position: 'relative',
                    marginTop: '15px'
                }} onClick={()=>{
                    this.goToLink(300)
                }} >
                    <div style={{
                        width: '181px',
                        height: '40px',
                        borderRadius: '20px',
                        backgroundColor: '#FF7900',
                        marginTop: '6px',
                        border: '2px solid #000000',
                    }} />
                    <div style={{
                        position: 'absolute',
                        bottom: '6px',
                        width: '181px',
                        height: '40px',
                        backgroundColor: '#FFCE01',
                        border: '2px solid #000000',
                        borderRadius: '20px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '16px',
                        color: '#000000'
                    }} >
                        点击下载
                    </div>
                </div>
            </div>
        )
    }

    renderSetp2() {
        let title = '使用注册手机登录APP';
        if (this.props.isInWeiXin) {
            title = '使用测试微信登录APP'
        }
        return (
            <div className="lab-font" style={{
                fontSize: '36px',
                color: '#FFFFFF',
                alignItems: 'center',
                marginTop: '30px',
            }} >
                第二步
                <div style={{
                    fontSize: '14px',
                    color: '#000000',
                    backgroundColor: '#FFCE01',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '5px',
                    width: '172px',
                    height: '27px',
                }} >
                    {title}
                </div>
            </div>
        )
    }

    renderSetp3() {
        return (
            <div>
                <div className="lab-font"  style={{
                    fontSize: '36px',
                    color: '#FFFFFF',
                    alignItems: 'center',
                    marginTop: '30px',
                }} >
                    第三步
                    <div style={{
                        fontSize: '14px',
                        color: '#000000',
                        backgroundColor: '#FFCE01',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '5px',
                        width: '305px',
                        height: '27px',
                    }} >
                        点击左上方用户头像-进入我的钱包，即可提现
                    </div>
                </div>
                <div style={{
                    flexDirection: 'row',
                    marginTop: '12px'
                }} >
                    <img style={{
                        width: '139px',
                        height: '159px'
                    }} src={require('../../../styles/imgs/laboratory/Illustration9@3x.png')} alt={'icon'} />
                    <img style={{
                        width: '139px',
                        height: '159px',
                        marginLeft: '28px'
                    }} src={require('../../../styles/imgs/laboratory/Illustration10@3x.png')} alt={'icon'} />
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className={"guide-wrapper"} style={{"minHeight": window.innerHeight, position: 'relative'}} >
                <img src={BgImages.answer} alt="背景图" className="bg-img"/>
                <div className={"dollars"} style={{
                    alignItems: 'center'
                }} >
                    {this.renderSetp1()}
                    {this.renderSetp2()}
                    {this.renderSetp3()}
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
        isInWeiXin:state.BrowserInfo.isInWeiXin

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
)(Guide)