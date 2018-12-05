/**
 * @author wuaixiaoyao
 * @date 2018/9/7
 * @Description: 微信工具
*/

// import Fetch from './FetchIt';
// import API_URL from './url';
import {WeChatShare} from "../../api/api"
import Share from './WeChatShare';

let wxUtils = {};
let WeixinJSBridge = window.WeixinJSBridge
//////////////////////////////////////////////////////////////////////////////////////
//
// 分享
//
//////////////////////////////////////////////////////////////////////////////////////

function share2wx(config, shareInfo) {
    const share = new Share({
        appid: config.appid, // 必填，公众号的唯一标识
        timestamp: config.timestamp, // 必填，生成签名的时间戳
        noncestr: config.noncestr, // 必填，生成签名的随机串
        signature: config.signature, // 必填，签名
    });
    console.log(config,share)
    share.init(Object.assign({}, shareInfo));
}

function getConfig(shareInfo) {
    let href = window.location.href.split('#')[0];
    const url = encodeURIComponent(href);
    let params = {
        url
    }
    WeChatShare(params).then(res=>{
        if(res.code == 0){
            let config = {
                appid: res.bean.appid,
                timestamp: res.bean.timestamp, // 必填，生成签名的时间戳
                noncestr: res.bean.nonceStr, // 必填，生成签名的随机串
                signature:res.bean.signature, // 必填，签名，见附录1
            }
            share2wx(config, shareInfo)

        }
    })
}
// function wxUtils(){
//
// }
wxUtils.share = function (shareInfo) {
    getConfig(shareInfo);
};



//////////////////////////////////////////////////////////////////////////////////////
//
// 分享结束
//
//////////////////////////////////////////////////////////////////////////////////////

/**
 * 是否开启右上角Menu
 * @param open
 */
//
// wxUtils.optionMenu = function (open = true) {
//     if (open) {
//         openOptionMenu();
//     } else {
//         disabledOptionMenu();
//     }
// };
//
// /**
//  * 是否禁用右上角
//  */
//
// function disabledOptionMenu() {
//     if (typeof WeixinJSBridge === "undefined") {
//         if (document.addEventListener) {
//             document.addEventListener('WeixinJSBridgeReady', onBridgeReady(true), false);
//         } else if (document.attachEvent) {
//             document.attachEvent('WeixinJSBridgeReady', onBridgeReady(true));
//             document.attachEvent('onWeixinJSBridgeReady', onBridgeReady(true));
//         }
//     } else {
//         onBridgeReady(true);
//     }
// }
//
// /**
//  * 开启menu
//  */
//
// function openOptionMenu() {
//     if (typeof WeixinJSBridge === "undefined") {
//         if (document.addEventListener) {
//             document.addEventListener('WeixinJSBridgeReady', onBridgeReady(false), false);
//         } else if (document.attachEvent) {
//             document.attachEvent('WeixinJSBridgeReady', onBridgeReady(false));
//             document.attachEvent('onWeixinJSBridgeReady', onBridgeReady(false));
//         }
//     } else {
//         onBridgeReady(false);
//     }
// }
//
// function onBridgeReady(disable = true) {
//     if (typeof WeixinJSBridge !== "undefined") {WeixinJSBridge.call(disable ? 'hideOptionMenu' : 'showOptionMenu')};
// }
// /**
//  * 隐藏微信网页底部的导航栏
//  * @param disable
//  */
//
// wxUtils.disabledToolbar = function (disable = true) {
//     document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
//         // 通过下面这个API隐藏底部导航栏
//         WeixinJSBridge.call(disable ? 'hideToolbar' : 'showToolbar');
//     });
// };

export default wxUtils;