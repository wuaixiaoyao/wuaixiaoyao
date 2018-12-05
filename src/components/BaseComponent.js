/**
 * @author wuaixiaoyao
 * @date 2018/6/5
 * @Description: 基础组件
*/

import React,{Component}  from 'react';
import PropTypes from "prop-types";
import {buffettAnt} from "../api/api"
import {CreateAntInfo} from "../utils/index"
import {Toast} from "antd-mobile";
import axios from "axios"
import {changeAppMessage} from "../redux/action/Index";
export default class BaseComponent extends Component{
    constructor(props,context){
        super(props,context)
        this.state = {
            latitude:"",
            longitude:""
        }
    }
    static  contextTypes =  {
        store: PropTypes.object.isRequired,
    }
    componentWillMount(){
        //
    }
    componentDidMount(){
        console.log(this.context.store.getState())
        window.document.addEventListener('message',(e)=>{
            const message = JSON.parse(e.data);
            if(message.appToken){
                // Toast.info(message.appToken)
                localStorage.setItem("caimiH5token",message.appToken);
            }else{
               // localStorage.removeItem("caimiH5token")
            }
            if(message.userId){
                localStorage.setItem("userId",message.userId);
            }
        })

    }
    componentWillUnmount(){
        //
        if(this.gotoLinkTimeOut){
            clearTimeout(this.this.gotoLinkTimeOut)
            this.gotoLinkTimeOut = null;
        }
    }
    sendMessageToApp(message){
        //给App 发送消息
        console.log(this.context.store.getState().userInfo.fromApp,"fromApp")
        if(this.context.store.getState().userInfo.fromApp||localStorage.getItem("fromApp") == 1){
            //Toast.info("发消息给App",1)
            window.postMessage(JSON.stringify(message),"*")
        }

    }
    handleMultipleRequest(requestList){
        // 处理并行请
        // Toast.loading("加载中")
        axios.all(requestList).then(axios.spread(function (res1, res2) {
            // 两个请求现在都执行完成
            console.log(res1,res2)
            //Toast.hide()
        }))


    }
     addListenerBack(callback){
         window.addEventListener("popstate", (e)=>{
             callback()
         }, false);
     }
     // 监听url 参数 redux 修改 userId inviteUserId
    async buryPoint(params){
        let initParams = CreateAntInfo.getAntInfo();
        let antParams = {
            //埋点参数
            ...initParams,
            ...params
        }
        return await buffettAnt(antParams)
    }
    goToLink(time = 300){
        this.gotoLinkTimeOut = setTimeout(()=>{
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.caimi.miser'
        },time)
    }
}

