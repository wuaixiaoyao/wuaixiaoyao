/**
 * @author wuaixiaoyao
 * @date 2018/8/16
 * @Description: 分享页App 下载头部
*/
import React,{Component} from "react"
import shareLogo from "../../styles/imgs/appDownload/logo-share.png"
import "./app-share-header.scss"
export default class AppDownloadHeader extends Component{
    constructor(props){
        super(props)
        this.state = {
            //

        }
    }
    downloadApp(){
        if(this.props.downloadApp){
            this.props.downloadApp()
        }
    }
    render(){
        return (
            <div class="app-share-header">
                <div className="share-logo-wrapper">
                    <img src={shareLogo} alt="logo" className="share-logo"/>
                </div>
                <p className="slogan">好学的理财人在采蜜</p>
                <div className="open-app-btn" onClick={()=>{this.downloadApp()}}>打开APP</div>
            </div>

        )
    }
}
