/**
 * @author wuaixiaoyao
 * @date 2018/6/14
 * @Description: 唤醒 app
*/

import React, {Component} from 'react'
import {H5Util} from "../../../utils";
import appDownload from '../../../styles/imgs/appDownload.png'
import openInWeb from '../../../styles/imgs/invite/openinweb.png'
import heightLight from '../../../styles/imgs/invite/highlight.png'
import "./appWakeUp.scss"
import BaseComponent from "../../../components/BaseComponent";
export default class WakeUpApp extends BaseComponent{
    constructor(props){
        super(props)
        this.state = {
            renderOpenInBrowser:false,
            renderDownloadView:true
        }
    }
    componentWillMount(){
        this.openApp()
    }
    judgeBrowser(){
        //判断运行环境
        return  H5Util.judgeBrowser();

    }
    jump(myurl) {
        let timeout = 3300, timer = null;
        const BrowserDetail = this.judgeBrowser();
        console.log(BrowserDetail)
        if(BrowserDetail.weixin) {
            this.setState({
                renderOpenInBrowser:true,
                renderDownloadView:false
            })
        } else {
            let startTime = Date.now();
            if(BrowserDetail.android) {
                let ifr = document.createElement('iframe');
                ifr.src = myurl;
                ifr.style.display = 'none';
                document.body.appendChild(ifr);
                timer = setTimeout(()=>{
                    var endTime = Date.now();
                    if(!startTime || endTime - startTime < timeout + 300) {
                        document.body.removeChild(ifr);
                        // window.open("唤起失败跳转的链接");
                        this.goToLink()
                    }
                }, timeout);
            }
            if(BrowserDetail.ios || BrowserDetail.iPhone || BrowserDetail.iPad) {
                if(BrowserDetail.qq) {
                    this.setState({
                        renderOpenInBrowser:true,
                        renderDownloadView:false
                    })

                } else {
                   // iOS9+不支持iframe唤起app
                    window.location.href = myurl;
                    timer = setTimeout(function() {
                        window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.caimi.miser";

                    }, timeout);
                };
            }
        }
    }
    openApp() {
        console.log(this.judgeBrowser(),'环境')
        const nativeUrl = 'caimi://caimi.com/caimi';
        this.jump(nativeUrl)
        // var isrefresh = getUrlParam('refresh'); // 获得refresh参数
        // if(isrefresh == 1) {
        //     return
        // }
        //window.location.href = nativeUrl;
        // window.setTimeout(function () {
        //     window.location.href += '&refresh=1' // 附加一个特殊参数，用来标识这次刷新不要再调用myapp:// 了
        // }, 500);

    }
    goToLink(){
        this.goToLink(100)
    }
    renderOpenInBrowser(){
        //微信浏览器展示蒙版
        return(
            <div className={"openInWebWrapper"}>
                <img className={"openInWebImg"} src={openInWeb} alt=""/>
                <img src={heightLight} alt="" className="heightLightImg"/>
            </div>
        )
    }
    renderDownloadView(){
        return (
           <div>
               <img className={"wakeImg"} src={appDownload} alt="下载App"/>
               <div className="downLoadWrapper">
                   <div className="downLoadBtn" onClick={()=>{this.goToLink()}}>
                       下载采蜜
                   </div>
               </div>
           </div>
        )
    }
    render(){
        let {renderOpenInBrowser,renderDownloadView} = this.state;
       return(
           <div className={"wakeWrapper"} style={{height:window.innerHeight,backgroundColor:renderOpenInBrowser?"#F7F7F7":"#fff"}}>
              {renderDownloadView&&!renderOpenInBrowser&&this.renderDownloadView()}
               {!renderDownloadView&&renderOpenInBrowser&&this.renderOpenInBrowser()}
           </div>
       )
    }
}