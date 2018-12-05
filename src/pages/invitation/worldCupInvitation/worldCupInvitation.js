/**
 * @author wuaixiaoyao
 * @date 2018/6/26
 * @Description: 世界杯分享
*/

import React,{Component} from 'react';
import "./worldCupInvitation.scss"
import worldCupImg from "../../../styles/imgs/invite/world-cup.jpg"
export default class WorldCupInvitation extends Component{
    constructor(props){
        super(props)
        this.state = {
            showBottomBtn:false,
            isAndroid:false,
            isiOS:false
        }
        this.channel = this.props.match.params.channel||""
    }
    componentWillMount(){
        this.watchScroll()
        this.judgeIsAndroid()
        //this.getDeviceInfo()
        console.log(window.returnCitySN,'世界杯页面')

    }
    componentDidMount(){

    }
    componentWillUnmount(){
        let _this = this;
        window.removeEventListener('scroll',()=>{
            _this.changeBtnStatus()
        })
    }
    changeBtnStatus(){
        //变量t是滚动条滚动时，距离顶部的距离
        var t = document.documentElement.scrollTop||document.body.scrollTop;
        //当滚动到距离顶部200px时，返回顶部的锚点显示
        if(t>=260){
            this.setState({
                showBottomBtn:true
            })
        }else{          //恢复正常
            this.setState({
                showBottomBtn:false
            })
        }
    }
    watchScroll(){
        let _this = this;
        window.addEventListener('scroll',()=>{
            _this.changeBtnStatus()
        })
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
    goToLink(){
        let {isAndroid,isiOS} = this.state;
        let linkUrl = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.caimi.miser';
        switch(this.channel){
            case "headline":
                //头条
                if(window._taq){
                    window._taq.push({convert_id: "1604576497820734", event_type: "download_start"})
                }
                if(isiOS){
                    //ios 友盟地址
                    linkUrl = "https://at.umeng.com/Kr0b4b"
                }else{
                    //android 友盟
                    linkUrl = "https://at.umeng.com/TjKbmm"
                }
                break
            case "key":
                //万能钥匙
                if(isiOS){
                    //ios 友盟地址
                    linkUrl = "https://at.umeng.com/r4rOnu"
                }else{
                    //android 友盟
                    linkUrl = "https://at.umeng.com/9zGHfy"
                }
            default:
                break

        }
        setTimeout(()=>{
            window.location.href = linkUrl
        },30)
    }
    getDeviceInfo(){

    }
    render(){
        return(
            <div className="world-cup-wrap" style={{  "minHeight": window.innerHeight}}>
                <img src={worldCupImg} alt="背景图" className="world-cup-img"/>
                <p className="world-cup-btn-wrap"  onClick={this.goToLink.bind(this)}>
                </p>
                <div className="bottom-download-wrap" style={{display:this.state.showBottomBtn?"block":"none"}}>
                    <div className="bottom-download-btn" onClick={this.goToLink.bind(this)} >
                        下载采蜜APP瓜分百万现金
                    </div>
                </div>
            </div>
        )
    }

}

