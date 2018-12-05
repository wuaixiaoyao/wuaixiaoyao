/**
 * @author wuaixiaoyao
 * @date 2018/4/11
 * @Description:api.js
*/

import axios from 'axios';
import {Host,ShareHost} from "../config/host";
import {ApiStore} from "./apiStore";
import { Toast } from 'antd-mobile';
import {createParam} from "../utils/index"
console.log(process.env.NODE_ENV,'环境')
let host ,shareHost;
switch (process.env.NODE_ENV){
    case 'production':
        host = Host.production;
        shareHost = ShareHost.pro;
        break
    case 'pre':
        host = Host.pre;
        shareHost = ShareHost.pre
        break
    case 'development':
        host = "activity/";
        shareHost = ShareHost.dev;
        break
    default:
        host = Host.develop;
        shareHost = ShareHost.dev;
        break

}
export {shareHost as SHAREHOST}
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
//// 添加请求拦截器
axios.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    console.log(config)
    let token = localStorage.getItem("caimiH5token");
    let param = localStorage.getItem("param");
    if(!param){
        let objParam = createParam();
        let arrParam = []
        Object.keys(objParam).forEach((key,index)=>{
            arrParam.push(objParam[key])
        })
        param = arrParam.join("_");
    }
    if(!token){
        config.headers['token'] = "";
    }else{
        config.headers['token'] = token;
    }
    config.headers['param'] = param;
    config.timeout = 1000*60;
    return config
}, (error) => {
    console.log(error,'请求超时')
    Toast.offline("请求超时")
    return Promise.reject(error);
});


// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    console.log(response,'响应成功')
    if(response.data&&response.data.code){
        switch (response.data.code){
            case -5:
                Toast.show('服务器错误！')
                break;
            case -1:
                Toast.show('请求失败！')
                break;
            case 18001:
                break;
            case 1:
                break;
            case 12:
                Toast.info("验证码不存在或错误!")
                break;
            case -6:
                // 未登录或者token 过期 与App通信 跳转登录页
                let token = localStorage.getItem("caimiH5token");
                let fromApp = localStorage.getItem("fromApp");
                if(fromApp == 1){
                    let message = {
                        type:"hasToken",
                        content:{
                            hasToken:fromApp
                        }
                    }
                    window.postMessage(JSON.stringify(message),"*")
                }
                break
            default:
                Toast.show(response.data.msg)
                break

        }
    }
    return response;
}, function(error) {
    // 对响应错误做点什么
    console.log(error)
    console.log(error && error.response);
    if(error&&error.response) {
        let status = error.response.status;
        let toastInfo = '请检查您的的网络！'
        switch (status){
            case 404 :
                toastInfo = '未找到资源';
                break
            case 405:
                toastInfo = '请求方法不支持';
                break
            case 403:
                toastInfo = '禁止访问';
                break
            case 401:
                toastInfo = '未授权';
                break
            case 400:
                toastInfo = '请求错误';
                break
            case 500:
                toastInfo = '服务端错误'
            case 502:
                toastInfo = '网关错误'


        }
        Toast.show(toastInfo,3)
    }
    return Promise.reject(error);
});
class  Http {
    constructor(){

    }
    static get(api,params){
        return axios.get(`${host}${api}`, {params}).then(res => res.data)
    }
    static post(api,params){
        return axios.post(`${host}${api}`,params).then(res => res.data)
    }
    static put(api,params){
        return axios.put(`${host}${api}`, params).then(res => res.data)
    }
    static delete(api,params){
        return axios.delete(`${host}${api}`,params).then(res => res.data);
    }
}

export const requestLogin = params => {
    return Http.post(ApiStore.Login,params)
};
//


export const saveShareRecord = params =>{
    return Http.post(ApiStore.Share.saveShareRecord,params)
}
//查询邀请信息
export const searchInviteInfo = params =>{
    return Http.get(ApiStore.Share.searchInviteInfo,params)
}
//邀请记录
export const searchInviteRecord = params =>{
    return Http.get(ApiStore.Share.searchInviteRecord,params)
}
//查询用户信息
export const getInviteUserInfo = params =>{
    return Http.get(ApiStore.Share.getInviteUserInfo,params)
}
//邀请奖金列表
export const searchInviteRewardList = params =>{
   return Http.get(ApiStore.Share.searchInviteRewardList,params)
}
//提醒验证码
export const sendRemindMsg = params =>{
    return Http.get(ApiStore.Share.sendRemindMsg,params)
}
//校验是否是新用户
export const checkUserAccount = params =>{
    return Http.post(ApiStore.Share.checkUserAccount,params)
}
//发送手机验证码
export const sendVerificationCode = params =>{
    return Http.post(ApiStore.Share.sendVerificationCode,params)
}
//注册
export  const checkUserAndRegister = params =>{
    return Http.post(ApiStore.Share.checkUserAndRegister,params)
}
//获取分享课程
export const getCourseByCourseId = params =>{
    return Http.get(ApiStore.Share.getCourseByCourseId,params)

}
// 问答分享
export const getAnswerInfo = params =>{
    return Http.get(ApiStore.Share.getAnswerInfo,params)
}

// 巴菲特 活动
//抽奖
export const lottery = params =>{
    return Http.post(ApiStore.buffettActivity.lottery,params)
}
//验证是否抽奖
export const validIsLuckyDraw = params =>{
    //
    return Http.get(ApiStore.buffettActivity.validIsLuckyDraw,params)

}
//验证码
export const sendBuffettVerificationCode = params =>{
    return Http.post(ApiStore.buffettActivity.sendBuffettVerificationCode,params)
}
//buffete注册
export const buffeteSignIn = params =>{
    return Http.post(ApiStore.buffettActivity.checkUserAndRegister_v2,params)
}
//判断是否绑定手机号
export const isBindingPhone = params =>{
    return Http.get(ApiStore.buffettActivity.isBingPhone,params)
}

//巴菲特活动埋点
export const buffettAnt = params=>{
    return Http.post(ApiStore.buffettActivity.buffettAnt,params)
}
//答题
export const saveQuestionRecord = params =>{
    return Http.post(ApiStore.buffettActivity.saveQuestionRecord,params)
}
//结果
export const getBuffettTestResult = params =>{
    return Http.get(ApiStore.buffettActivity.getBuffettTestResult,params)
}
//我的奖品列表
export const getUserVoucherList = params =>{
    return Http.get(ApiStore.buffettActivity.getMyBuffettVoucherList,params)
}
//获取收货地址
export const getUserAddress = params=>{
    return Http.get(ApiStore.buffettActivity.getUserAddress,params)
}
//保存收货地址
export const saveUserAddress = params =>{
    return Http.post(ApiStore.buffettActivity.saveUserAddress,params)
}

//领取(订阅)课程
export const saveCourseSubscribe = params =>{
    return Http.get(ApiStore.buffettActivity.saveCourseSubscribe,params)
}
//保存分享记录





/*
  微信ticket
 */
export const WeChatShare = params=>{
    return Http.get(ApiStore.WeChat.WeChatShare,params)
}

/*
   炼成实验室
 */

export const getLabResult = params=>{
    return Http.post(ApiStore.labActivity.answer,params)

}
export const LabLogin = params =>{//登录
    return Http.post(ApiStore.labActivity.login,params)
}
export const inviteUserInfo = params=>{
    //邀请人信息
    return Http.get(ApiStore.labActivity.inviteUserInfo,params)
}
export const  checkReward = params =>{//验证是否答题、领奖 同时也是领奖接口
    return Http.post(ApiStore.labActivity.checkReward,params)
}
//
export const getInviteList = params =>{//获取邀请列表
    return Http.get(ApiStore.labActivity.getInviteList,params)
}
export const inviteDetail =params=>{
    //获取详情
    return Http.get(ApiStore.labActivity.inviteDetail,params)
}



/*
   WEb IN app
  */
//新闻
export const getNewsInfo = params =>{
    return Http.get(ApiStore.WebInApp.getNewsInfo,params)
}
//公告
export const getAnnouncementsInfo = params =>{
    return Http.get(ApiStore.WebInApp.getAnnouncementsInfo,params)
}
//文章详情页
export const getArticleInfo = params =>{
    return Http.get(ApiStore.WebInApp.getUserArticleInfo,params)
}
//收藏
export const collection = params =>{
    return Http.post(ApiStore.WebInApp.collection,params)

}
// 获取评论列表
export const getCommentList = params=>{
    return Http.get(ApiStore.WebInApp.getCommentList,params)
}
// 获取回复详情
export const getReplyDetail = params=>{
    return Http.get(ApiStore.WebInApp.getReplyDetail,params)
}
// 评论点赞
export const like = params=>{
    return Http.post(ApiStore.WebInApp.like,params)
}



