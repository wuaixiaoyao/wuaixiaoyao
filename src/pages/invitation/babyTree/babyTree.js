/**
 * @author wuaixiaoyao
 * @date 2018/7/31
 * @Description: 宝宝树落地页
*/
import React,{Component} from "react";
import BaseComponent from "../../../components/BaseComponent"
import bgImg from "../../../styles/imgs/baby/baby-bg.png"
import "./babyTree.scss"
export default class BabyTree extends BaseComponent{
    constructor(props){
        super(props)
        this.state = {
            isAndroid:false,
            isiOS:false
        }
    }
    componentWillMount(){
        let params = {
            pageName:"babyTree",
            eventName:"loading",
        }
        this.buryPoint(params)
        this.judgeIsAndroid();
    }
    judgeIsAndroid() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        this.setState({
            isAndroid,
            isiOS
        })
        console.log({
            isAndroid,
            isiOS
        })
    }
    goToDownload(){
        let {isAndroid,isiOS} = this.state;
        let linkUrl;
        if(isiOS){
            //ios 友盟地址
            linkUrl = "https://at.umeng.com/WTXrmu"
        }else{
            //android 友盟
            linkUrl = "https://at.umeng.com/OfGjaC"
        }
        setTimeout(()=>{
            window.location.href = linkUrl
        },0)
    }
    clickBtn(){
        let params = {
            pageName:"babyTree",
            eventName:"download",
        }
        this.buryPoint(params).then(res=>{
            this.goToDownload()
        })
    }
    receiveReward(){
        let params = {
            pageName:"babyTree",
            eventName:"receiveReward",
        }
        this.buryPoint(params).then(res=>{
            this.goToDownload()
        })
    }
    render(){

        let btnTop = (window.innerWidth/375)*276,rewardTop =  (window.innerWidth/375)*128,
            rewardHeight = (window.innerWidth/375)*348 ,phoneHeight = (window.innerHeight/667)*320;
        let rewardContent = {
            width:window.innerWidth/375*250,
            height:window.innerWidth/375*170
        }
        return(
           <div className="baby-wrap" style={{"minHeight": window.innerHeight}}>
               <img className={"bg-img"} src={bgImg} alt="背景图"/>
               <div className="download-wrapper" style={{top:btnTop}} onClick={this.clickBtn.bind(this)}>
                   <div className="download-btn">
                       立即下载
                   </div>
               </div>
               <div className="phone-wrapper" style={{top:rewardHeight}}>
                   <div className="phone">
                       <div className="receive-reward-wrapper" style={{top:rewardTop}}>
                           <div className="reward" style={rewardContent} onClick={this.receiveReward.bind(this)}>
                           </div>
                       </div>
                   </div>

               </div>
           </div>
       )

    }

}

