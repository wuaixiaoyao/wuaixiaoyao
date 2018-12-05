/**
 * @author wuaixiaoyao
 * @date 2018/5/14
 * @Description: 竞赛分享
*/
import React, {Component} from 'react'
// import CopyToClipboard from 'react-copy-to-clipboard'
import {Toast} from 'antd-mobile'
import inviteBg from '../../styles/imgs/invite/invite_bg.png'
import "./share.scss"
export default class CompetitionShare extends React.Component{
    constructor(props){
        super(props)
        this.invitationCode = 'abdjfajl'
    }
    onCopy(){
        console.log('复制')
        Toast.success('复制成功！',2)
    }
    render(){
        return(
            <div className="shareWrap">
                <img src={inviteBg} alt="背景图" className="inviteBg"/>
                <div className="inviteWrap">
                    <div className="inviteContent">

                    </div>
                </div>

            </div>
        )
    }

}