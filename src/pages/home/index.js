/**
 * @author wuaixiaoyao
 * @date 2018/11/27
 * @Description: 移动端官网
*/
import React from "react";
import "./home.scss"
import {WEI_BO_LINK,TOU_TIAO_LINK} from "../../constant/index"
import logoImg from "../../styles/imgs/home/logo.png"
import wechatIcon from "../../styles/imgs/home/weChat.png"
import weiboIcon from "../../styles/imgs/home/weibo.jpg"
import toutiaoIcon from "../../styles/imgs/home/toutaio.jpg"
import qrCode from "../../styles/imgs/qr-code.jpg"
import BaseComponent from "../../components/BaseComponent";
import HorseRaceLamp from "../../components/horseRaceLamp/horseRaceLamp";
import news from "../../styles/imgs/home/pro/news.png"
import questionAndAnswer from "../../styles/imgs/home/pro/questionAndAnswer.png"
import competition from "../../styles/imgs/home/pro/competition2@2x.png"
import course from "../../styles/imgs/home/pro/curriculum@2x.png"
import murcielago from "../../styles/imgs/home/caimiPer/murcielago.png"
import newPerson from "../../styles/imgs/home/caimiPer/new@2x.png"
import ded from "../../styles/imgs/home/caimiPer/ded@2x.png"
const advantageList = [
    {
      title:"背靠人人贷，强大资金后盾",
      desc:"线上、线下联合，权威营销活动",
      advantageImg:require("../../styles/imgs/home/backing@2x.png")
    },{
        title:"0成本、高回报",
        desc:"书中自有黄金屋，专业=名利",
        advantageImg:require("../../styles/imgs/home/return@2x.png")
    },{
        title:"五百万精准理财用户",
        desc:"让您坐拥粉丝O成本",
        advantageImg:require("../../styles/imgs/home/user@2x.png")
    },{
        title:"1对1专家服务",
        desc:"专业团队，打造投资界网红",
        advantageImg:require("../../styles/imgs/home/service@2x.png")
    }
]
const proList = [
    //
    {
        title:"竞赛",
        desc:"个人知识竞赛机制，验证理财学习成果，打造投资信心",
        imgUrl:competition
    },
    {
        title:"课程",
        desc:"自定义课程学习，每日跟踪及练习，获取理财经验",
        imgUrl:course
    },{
        title:"资讯",
        desc:"精选理财资讯，剖析行业动态，拆解资金本质",
        imgUrl:news
    },
    {
        title:"问答",
        desc:"互动问答找到可以信赖的理财达人，一同学习成长",
        imgUrl:questionAndAnswer

    }
]
const caimiPerList = [
    {
        title:"理财大牛",
        imgUrl:murcielago

    },
    {
        title:"职场新手",
        imgUrl:newPerson
    },{
        title:"新晋爸爸",
        imgUrl:ded
    }
]
export default class Home extends BaseComponent{
    constructor(props){
        super(props)
        this.state = {
            showProper:false,
            
        }
    }
    componentWillMount(){
        //

    }
    componentWillUnMount(){
        //

    }
    goToApp=()=>{
        //打开APP
        this.props.history.push("/app/wakeup")

    }
    goToTouTiao=()=>{
        window.location.href = TOU_TIAO_LINK
    }
    goToWeiBo=()=>{
        window.location.href = WEI_BO_LINK
    }
    renderProIntroduce(){
        return <div className="pro-introduce">
            <h3 className={"item-title"}>产品介绍</h3>
            <h5>采蜜：尝尝财富自由的甜头</h5>
            <HorseRaceLamp  swiperList={proList} transitionDuration={300}/>

        </div>
    }
    renderCaimiPerson(){
        return <div className={"caimi-person-wrapper"}>
                <h3 className={"item-title"}>采蜜人</h3>
                <div style={{marginTop:12}}>
                    <HorseRaceLamp swiperList={caimiPerList} initActiveIndex={1} transitionDuration={400}/>
                </div>
        </div>
    }
    renderAboutCaimi(){
        //
        return <div className={"about-caimi-wrapper"}>
            <h3 className="item-title">关于采蜜</h3>
            <h4 className="about-caimi-title">我们是谁？</h4>
            <p className={"who-are-im-desc"}>
                采蜜APP，是人人友信集团旗下，聚焦财商提升，倾力打造的独立第三方财富管理平台。
            </p>
            <p className={"who-are-im-desc"} >
                专注为年轻用户提供移动端财富管理的竞赛交流。通过一对一知识竞赛的“韭菜荣耀”、实时财富问答以及行业知名大V课程等栏目，
                采蜜想要帮助不具备足够理财能力的用户，掌握投资理财知识，快速成为投资高手。
            </p>
            <h4 className="about-caimi-title">媒体报道</h4>
            <p className={"news"}>“采蜜”APP上线：聚焦财商提升打造独立第三方财富管理交流平台。</p>
            <p className="cite">央广网 2018-04-24[引用日期2018-04-25]</p>
            <p className={"news"} style={{marginTop:40}}>“采蜜”APP推出财富知识竞赛：撒百万现金，助力年轻人财商提升。</p>
            <p className="cite">中华网 2018-04-25[引用日期2018-04-25]</p>

        </div>
    }
    renderCollaborativeAdvantage(){
        //
        return <div className={"advantage-wrapper"}>
                <h3 className="item-title">大V合作优势</h3>
                <h4 className={"business-phone"}>商务电话:4001608030</h4>
               {this.renderAdvantageList()}
        </div>
    }
    renderAdvantageList(){
        return advantageList.map((advantage,index)=>{
            if(index%2 == 0){
                return <div key={index} className={"advantage-item-wrapper"} >
                    <img src={advantage.advantageImg} alt="优势" style={{marginRight:index==0?11:16}}/>
                    <div className="advantage-content">
                        <p className={"advantage-title"}>{advantage.title}</p>
                        <p className={"advantage-desc"}>{advantage.desc}</p>
                    </div>
                </div>
            }else{
                //
                return <div className="advantage-item-wrapper" key={index}>
                    <div className="advantage-content">
                        <p className={"advantage-title text-right"}>{advantage.title}</p>
                        <p className={"advantage-desc text-right"}>{advantage.desc}</p>
                    </div>
                    <img src={advantage.advantageImg} alt="优势" style={{marginLeft:10}}/>

                </div>
            }

        })
    }
    renderCompanyDetail(){
        //
        let {showProper} = this.state;
        return <div className="company-wrapper">
                <p className="company">
                    人人贷商务顾问（北京）有限公司<br/>
                    深圳市南山区深南大道9680号大冲商务中心A座27楼 联系电话:021-4001608030
                </p>
                <p className="copyright">
                    Copyright @2010-2018 人人贷商务顾问（北京）有限公司, All Rights Reserved.
                </p>
                <div className="download-btn" onClick={this.goToApp}>
                    点击下载app
                </div>
                <div className="channel-wrapper">
                    <div className="icon-wrapper mar-right-32" onClick={()=>{
                        this.setState(preState=>{
                            return {
                                showProper:!preState.showProper
                            }
                          }
                        )
                    }}>
                        <img src={wechatIcon}  alt="channel"/>
                        {showProper&&<div className="qr-code-wrapper">
                            <img src={qrCode} alt="二维码"/>
                            <div className="angle"></div>
                        </div>}
                    </div>
                    <div className="icon-wrapper mar-right-32" onClick={this.goToWeiBo}>
                        <img src={weiboIcon}  alt="channel"/>
                    </div>
                    <div className="icon-wrapper" onClick={this.goToTouTiao}>
                        <img src={toutiaoIcon} alt="channel"/>
                    </div>

                </div>

        </div>
    }
    render(){
        return <div className={"home-wrapper"}>
            <div className="home-header">
                <img src={logoImg} alt="logo" className={"logo-img"}/>
            </div>
            <div className="main-introduce">
                <h2>采蜜云享派</h2>
                <h3>尝尝财富自由的甜头</h3>
                <p className="introduce">
                    采蜜Caimi ——<br/>
                    聚焦财商提升 打造独立第三方财富管理交流平台
                </p>
                <div className="go-to-app-btn" onClick={this.goToApp}>
                    立即提升财商
                </div>
                <img className={"main-introduce-img"} src={require("../../styles/imgs/home/main-introduce.png")} alt=""/>
                <div className="opacity"></div>
            </div>
            {/*产品介绍模块*/}
            {this.renderProIntroduce()}
            <div className="hr-div"></div>
            {/*采蜜人模块*/}
            {this.renderCaimiPerson()}
            {/*关于采蜜*/}
            {this.renderAboutCaimi()}
            {/*合作优势*/}
            {this.renderCollaborativeAdvantage()}
            {/*公司信息*/}
            {this.renderCompanyDetail()}
        </div>
    }
}