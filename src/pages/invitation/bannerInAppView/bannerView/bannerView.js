/**
 * @author wuaixiaoyao
 * @date 2018/6/5
 * @Description: banner 展示页
*/
import React, {Component} from 'react';
import "./bannerView.scss"
import moment from 'moment'
let answerPng = require('../../../../styles/imgs/bannerView/answer.png')
export default class BannerView extends Component{
    constructor(props){
        super(props)
        this.bannerType = this.props.match.params.bannerType||"";
        this.answerPng =  undefined
    }
    componentWillMount(){
        console.log(this.bannerType)

    }
    componentDidMount(){
        //

    }
    switchImg(type){
        console.log(moment('2018-06-09 06:00:00'),Date.parse(moment()),Date.parse(moment('2018-06-09 06:00:00')))
        let now = Date.parse(new Date());
        let twentytwo = Date.parse(moment("2018-10-22 06:00:00"))
        let twentythree = Date.parse(moment("2018-10-23 06:00:00"))
        let twentyfour = Date.parse(moment("2018-10-24 06:00:00"))
        let twentyfive = Date.parse(moment("2018-10-25 06:00:00"))
        let twentysix = Date.parse(moment("2018-10-26 06:00:00"))
        let twentyseven = Date.parse(moment("2018-10-27 06:00:00"))
        let twentyeight = Date.parse(moment("2018-10-28 06:00:00"))
        let twentynine = Date.parse(moment("2018-10-29 06:00:00"))
        let thirty = Date.parse(moment("2018-10-30 06:00:00"))
        let thirtyone = Date.parse(moment("2018-10-31 06:00:00"))
        let one = Date.parse(moment("2018-11-01 06:00:00"))
        let two = Date.parse(moment("2018-11-02 06:00:00"))
        let three = Date.parse(moment("2018-11-03 06:00:00"))
        let four = Date.parse(moment("2018-11-04 06:00:00"))
        let five = Date.parse(moment("2018-11-05 06:00:00"))
        let six = Date.parse(moment("2018-11-06 06:00:00"))
        let seven = Date.parse(moment("2018-11-07 06:00:00"))
        let eight = Date.parse(moment("2018-11-08 06:00:00"))
        let nine = Date.parse(moment("2018-11-09 06:00:00"))
        let ten = Date.parse(moment("2018-11-10 06:00:00"))
        let eleven = Date.parse(moment("2018-11-11 06:00:00"))
        let twelf = Date.parse(moment("2018-11-12 06:00:00"))
        let thirteen = Date.parse(moment("2018-11-13 06:00:00"))
        let fourteen = Date.parse(moment("2018-11-14 06:00:00"))
        let fifteen = Date.parse(moment("2018-11-15 06:00:00"))
        let sixteen = Date.parse(moment("2018-11-16 06:00:00"))
        if(now >twentytwo&&now <= twentythree){
            this.answerPng = require('../../../../styles/imgs/bannerView/1022.jpg')
        }else if(now >twentythree&&now <= twentyfour){
            this.answerPng = require('../../../../styles/imgs/bannerView/1023.jpg')
        }else if(now >twentyfour&&now <= twentyfive){
            this.answerPng = require('../../../../styles/imgs/bannerView/1024.jpg')
        }else if(now >twentyfive&&now <= twentysix){
            this.answerPng = require('../../../../styles/imgs/bannerView/1025.jpg')
        }else if(now >twentysix&&now <= twentyseven){
            this.answerPng = require('../../../../styles/imgs/bannerView/1026.jpg')
        }else if(now >twentyseven&&now <= twentyeight){
            this.answerPng = require('../../../../styles/imgs/bannerView/1027.jpg')
        }else if(now >twentyeight&&now <= twentynine){
            this.answerPng = require('../../../../styles/imgs/bannerView/1028.jpg')
        }else if(now >twentynine&&now <= thirty){
            this.answerPng = require('../../../../styles/imgs/bannerView/1029.jpg')
        }else if(now >thirty&&now <= thirtyone){
            this.answerPng = require('../../../../styles/imgs/bannerView/1030.jpg')
        }else if(now >thirtyone&&now <= one){
            this.answerPng = require('../../../../styles/imgs/bannerView/1031.jpg')
        }else if(now >one&&now <= two){
            this.answerPng = require('../../../../styles/imgs/bannerView/1101.jpg')
        }else if(now >two&&now <= three){
            this.answerPng = require('../../../../styles/imgs/bannerView/1102.jpg')
        }else if(now >three&&now <= four){
            this.answerPng = require('../../../../styles/imgs/bannerView/1103.jpg')
        }else if(now >four&&now <= five){
            this.answerPng = require('../../../../styles/imgs/bannerView/1104.jpg')
        }else if(now >five&&now <= six){
            this.answerPng = require('../../../../styles/imgs/bannerView/1105.jpg')
        }else if(now >six&&now <= seven){
            this.answerPng = require('../../../../styles/imgs/bannerView/1106.jpg')
        }else if(now >seven&&now <= eight){
            this.answerPng = require('../../../../styles/imgs/bannerView/1107.jpg')
        }else if(now >eight&&now <= nine){
            this.answerPng = require('../../../../styles/imgs/bannerView/1108.jpg')
        }else if(now >nine&&now <= ten){
            this.answerPng = require('../../../../styles/imgs/bannerView/1109.jpg')
        }else if(now >ten&&now <= eleven){
            this.answerPng = require('../../../../styles/imgs/bannerView/1110.jpg')
        }else if(now >eleven&&now <= twelf){
            this.answerPng = require('../../../../styles/imgs/bannerView/1111.jpg')
        }else if(now >twelf&&now <= thirteen){
            this.answerPng = require('../../../../styles/imgs/bannerView/1112.jpg')
        }else if(now >thirteen&&now <= fourteen){
            this.answerPng = require('../../../../styles/imgs/bannerView/1113.jpg')
        }else if(now >fourteen&&now <= fifteen){
            this.answerPng = require('../../../../styles/imgs/bannerView/1114.jpg')
        }else if(now >fifteen&&now <= sixteen){
            this.answerPng = require('../../../../styles/imgs/bannerView/1115.jpg')
        }else{
            this.answerPng = answerPng
        }
        switch(type){
            case "answer":
                //答题上分
                return this.answerPng
            case "intelligence":
                //情报局
                return require('../../../../styles/imgs/bannerView/intelligence.jpg')
            case "worldCup":
                //世界杯
                return require('../../../../styles/imgs/bannerView/world-cup.png')
            case "worldCupDriver":
                //老司机
                return require('../../../../styles/imgs/bannerView/world-cup-rules.png')
            case "world-cup-reward":
                return require("../../../../styles/imgs/bannerView/world-cup-reward.jpg")
            case "punishment-notice":
                //惩罚公告
                return require("../../../../styles/imgs/bannerView/punishment-notice.jpg")
            case "reward":
                //悬赏
                return require("../../../../styles/imgs/bannerView/reward.jpg")
            case "battle":
                //  101 测试
                return require("../../../../styles/imgs/bannerView/battle-detail.png")
            case "drawMoney":
                //提现
                return require("../../../../styles/imgs/bannerView/draw.jpg")
            case "cashReward":
                //现金悬赏
                return require("../../../../styles/imgs/bannerView/cash-reward.jpg")
            case "newVersion":
                //2.1版本更新
                return require("../../../../styles/imgs/bannerView/2.1notice.png")
            default:
                return this.answerPng

        }
    }
    render(){
        let inviteBg =  this.switchImg(this.bannerType)
        return(
            <div className="bannerWrap" style={{  "minHeight": window.innerHeight}}>
                <img src={inviteBg} alt="背景图" className="bannerBg"/>
            </div>
        )

    }
}
