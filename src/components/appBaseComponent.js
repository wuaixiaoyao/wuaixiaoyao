/**
 * @author wuaixiaoyao
 * @date 2018/8/16
 * @Description: app内嵌H5 页面
*/
import React from "react";
import BaseComponent from "./BaseComponent"
import AppDownloadHeader from "./appDownload/appDownloadHeader"
import "./appBase.scss"
export default class AppBaseComponent extends BaseComponent{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    componentWillMount(){
        //
        console.log('appBase')
    }
    bury(params){
        this.buryPoint(params)
    }
    downloadApp(){
        let params = {
            eventName:"download",
            pageName:"appShare"
        }
        this.buryPoint(params).then(res=>{
            if(res.code == 0){
                this.goToLink(300)
            }
        })
    }
    render(){
        return(
            <div className="app-share-content" style={{"minHeight": window.innerHeight}}>
                <AppDownloadHeader downloadApp={()=>{this.downloadApp()}}/>
                <div className="app-share-body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}