/**
 * @author wuaixiaoyao
 * @date 2018/6/8
 * @Description: 新手红包
*/
import React,{Component} from 'react';
import "./newUserPacket.scss"
import {SHAREHOST} from "../../../../api/api"
import {H5Util} from "../../../../utils";
let inviteBg = require('../../../../styles/imgs/bannerView/newUserPacket.png');
const  inviteBtnBg  = require('@/styles/imgs/invite/invite_button.png');
export default class NewUserPacket extends Component{
    constructor(props){
        super(props)
        this.state = {
            userId:""
        }
    }
    componentWillMount(){
        this.initPage()
        this.getUserId()
    }
    initPage(){
        //
        let {search} = this.props.location;
        if(search){
            let message = H5Util.serilizeURL(search);
            if(message&&message.userId){
                //
                this.setState({
                    userId:message.userId

                })
            }
        }

    }
    componentDidMount(){
        //


    }

    getUserId(){
        window.document.addEventListener('message',(e)=>{
            const message =JSON.parse(e.data);
            let userId = message.userId;
            this.setState({
                userId
            })
        })
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
                type:2
            }
        }
        window.postMessage(JSON.stringify(message))
    }
    render(){
        let btnTop = (window.innerWidth/375)*300;
        return(
            <div className="newUserWrap" style={{  "minHeight": window.innerHeight}}>
                <img src={inviteBg} alt="背景图" className="newUserBg"/>
                <p className="inviteBtnWrap btnWrapPosition" style={{top:btnTop}}>
                    <img src={inviteBtnBg} className={"inviteBtn"} alt="立即邀请"/>
                    <div className="inviteText" onClick={this.goToInvite.bind(this)}>立即邀请</div>
                </p>
            </div>
        )
    }

}

