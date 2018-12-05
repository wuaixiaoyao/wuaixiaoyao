/**
 * @author wuaixiaoyao
 * @date 2018/5/17
 * @Description:领取红包
*/
import React ,{Component} from 'react';
import BaseComponent from '../../../components/BaseComponent'
import './redPacket.scss'
import redPacketImg from '../../../styles/imgs/invite/red_bag.png'
import inviteBtnBg from '../../../styles/imgs/invite/invite_button.png'
import {phoneUtil} from '@/utils/index'
export default class GotRedPacket extends BaseComponent{
    constructor(props){
        super(props)
        this.redPackets = [
            {redName:"课程红包",value:"96",voucherType:"102"},
            {redName:"现金红包",value:"4",voucherType:"101"}
        ]
        this.userId = "13888888888"
    }
    judgeIsAndroid(){
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        return isAndroid
    }
    goToLink(){
        setTimeout(()=>{
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.caimi.miser'
        })
    }
    renderPacket(redPackets){
        //红包组件
        return(
            redPackets.map((redPacket,index)=><div key={index} className={`redPacketContent mar-top-12`}>
                <div className="redCash">
                    <span className={"symbol"}>￥</span>{redPacket.value}
                </div>
                <div className="redType">
                    <p className={"redName"}>
                        {redPacket.voucherType == '102'?"课程红包":(redPacket.voucherType == '101'?"现金红包":"课程现金红包")}
                    </p>
                    <button className={"redBtn"} onClick={this.goToLink}>
                        {redPacket.voucherType == '101'?"去领取":"去使用"}
                    </button>
                </div>
            </div>)
        )


    }
    render(){
        let redPackets = this.redPackets;
        let userId = this.userId;
        if(this.props.location&&this.props.location.state){
            redPackets = this.props.location.state.voucherList;
            userId = this.props.location.state.userId;
        }
        return(
            <div className="redPackWrap" style={{"min-height": window.innerHeight  }}>
                <p className="redArrive"><span className="money">100</span>元现金红包已到账</p>
                <p className="account mar-top-3">已放入帐户：{phoneUtil.encodePhone(userId)}</p>
                <p className={`redPacketWrapper`}>
                    {this.renderPacket(redPackets)}
                </p>
                <p className={"inviteBtnWrap mar-top-20 "}>
                    <img src={inviteBtnBg} className={"inviteBtn"} alt="下载"/>
                    <div className="inviteText" onClick={this.goToLink}>下载采蜜APP</div>
                </p>
            </div>
        )
    }
}