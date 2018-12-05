/**
 * @author wuaixiaoyao
 * @date 2018/5/16
 * @Description:
*/
import dayJs from 'dayjs'
import {Host} from "@/config/host.js"
import {Toast} from "antd-mobile"
import Base64 from "./base64"
import {ConvertPinyin} from "./convertPinyin"
export class Storage {
    constructor(){

    }
    setStorage(key,value){
      //设置数据
        if(key&&value){
            if(typeof  value == 'string'){
                localStorage.setItem(key,value)
            }else{
                localStorage.setItem(key,JSON.stringify(value))
            }
        }
    }
    getStorage(key){
        if(key){
           return localStorage.getItem(key)
        }
    }

}
export function deepCopy(obj,ifDeep){
    /*
      复杂数据类型深拷贝
      param: obj 对象或数组
      param: ifDeep 浅拷贝或深拷贝
     */

    let newObj = obj instanceof Array?[]:{};
    for(let key in obj){
        if(ifDeep&&obj[key]  instanceof Array || obj[key]  instanceof Object ){
            newObj[key] = deepCopy(obj[key])
        }else{
            newObj[key] = obj[key]
        }
    }
    return newObj


}
function GetSlideAngle(dx,dy) {
    return Math.atan2(dy,dx) * 180 / Math.PI;

}

//根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动

export function GetSlideDirection(startX,startY, endX, endY) {
    var dy = startY - endY;
    var dx = endX - startX;
    var result = 0;
    //如果滑动距离太短
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return result;
    }
    var angle = GetSlideAngle(dx, dy);
    if (angle >= -45 && angle < 45) {
        result = 4;
    }else if (angle >= 45 && angle < 135) {
        result = 1;
    }else if (angle >= -135 && angle < -45) {
        result = 2;
    }else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
    }
    return result;
}
export class phoneUtil {
    constructor(){

    }
    static encodePhone(phone){
        return  phone.substring(0,3)+'****'+phone.substring(7)
    }
    static isPhoneAvailable(str){
        let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(str)) {
            return false;
        } else {
            return true;
        }
    }
}
export class H5Util {
    constructor(){

    }
    // 获取当前滚动条的位置
    getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }

    // 获取当前可视范围的高度
    getClientHeight() {
        var clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
        }
        else {
            clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        }
        return clientHeight;
    }

    // 获取文档完整的高度
    getScrollHeight() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }
    static judgeBrowser(){
        //判断运行环境
        let  browser  =   {
            getVersions(){
                var  u  =  window.navigator.userAgent;
                return  {
                    trident:  u.indexOf('Trident')  >  -1, //IE内核
                    presto:  u.indexOf('Presto')  >  -1, //opera内核
                    Alipay:  u.indexOf('Alipay')  >  -1, //支付宝
                    webKit:  u.indexOf('AppleWebKit')  >  -1, //苹果、谷歌内核
                    gecko:  u.indexOf('Gecko')  >  -1  &&  u.indexOf('KHTML')  ==  -1, //火狐内核
                    mobile:  !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios:  !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android:  u.indexOf('Android')  >  -1  ||  u.indexOf('Linux')  >  -1, //android终端或者uc浏览器
                    iPhone:  u.indexOf('iPhone')  >  -1  ||  u.indexOf('Mac')  >  -1, //是否为iPhone或者安卓QQ浏览器
                    //iPhone: u.match(/iphone|ipod|ipad/),//
                    iPad:  u.indexOf('iPad')  >  -1, //是否为iPad
                    webApp:  u.indexOf('Safari')  ==  -1, //是否为web应用程序，没有头部与底部
                    weixin:  u.indexOf('MicroMessenger')  >  -1, //是否为微信浏览器
                    qq: u.match(/\sQQ/i) !== null, //是否QQ
                    Safari:  u.indexOf('Safari')  >  -1,
                    ///Safari浏览器,
                };
            }
        };
        return  browser.getVersions();

    }
    static isJSON(str) {
        if (typeof str == 'string') {
            try {
                var obj=JSON.parse(str);
                if(typeof obj == 'object' && obj ){
                    return true;
                }else{
                    return false;
                }

            } catch(e) {
                return false;
            }
        }
        console.log('It is not a string!')
    }
    static serilizeURL(url){
        var rs=url.split("?")[1];
        var arr=rs.split("&");
        var param={};
        for(var i=0;i<arr.length;i++){
            if(arr[i].indexOf("=")!=-1){
                param[arr[i].split("=")[0]]=arr[i].split("=")[1];
            }
            else{
                param[arr[i]]="undefined";
            }
        }
        let fromApp = param.fromApp;
        if(!localStorage.getItem("fromApp")&&fromApp){
            //
            localStorage.setItem("fromApp",1)
        }
        let token = param.appToken
        if(token){
            if(token == "undefined"){
                //app 未登录
                localStorage.setItem("caimiH5token","")
            }else{
                localStorage.setItem("caimiH5token",token)
            }
        }

        let caimiParam = param["param"];
        if((!localStorage.getItem("param")&&caimiParam)||(localStorage.getItem("param")!= caimiParam)){
            localStorage.setItem("param",caimiParam)
        }

        return param
    }
}
export function GetIP(){
    //
    var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
    if (RTCPeerConnection) (function () {
        var rtc = new RTCPeerConnection({iceServers:[]});
        if (1 || window.mozRTCPeerConnection) {
            rtc.createDataChannel('', {reliable:false});
        };

        rtc.onicecandidate = function (evt) {
            if (evt.candidate) grepSDP("a="+evt.candidate.candidate);
        };
        rtc.createOffer(function (offerDesc) {
            grepSDP(offerDesc.sdp);
            rtc.setLocalDescription(offerDesc);
        }, function (e) { console.warn("offer failed", e); });

        var addrs = Object.create(null);
        addrs["0.0.0.0"] = false;
        function updateDisplay(newAddr) {
            if (newAddr in addrs) return;
            else addrs[newAddr] = true;
            var displayAddrs = Object.keys(addrs).filter(function (k) { return addrs[k]; });
            for(var i = 0; i < displayAddrs.length; i++){
                if(displayAddrs[i].length > 16){
                    displayAddrs.splice(i, 1);
                    i--;
                }
            }
            console.log(displayAddrs[0])
        }

        function grepSDP(sdp) {
            var hosts = [];
            sdp.split('\r\n').forEach(function (line, index, arr) {
                if (~line.indexOf("a=candidate")) {
                    var parts = line.split(' '),
                        addr = parts[4],
                        type = parts[7];
                    if (type === 'host') updateDisplay(addr);
                } else if (~line.indexOf("c=")) {
                    var parts = line.split(' '),
                        addr = parts[2];
                    updateDisplay(addr);
                }
            });
        }
    })();
    else{
        console.log("请使用主流浏览器：chrome,firefox,opera,safari")
    }
}
export class timeUtil {
    constructor(){

    }
    static formatYMDHMS(stamp){
        return dayJs(stamp).format("YYYY-MM-DD HH:mm:ss")
    }
    static formatYMD(stamp){
        return dayJs(stamp).format("YYYY年MM月DD日")
    }
}
export const  isPhoneAvailable=(str) =>{
    let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(str)) {
        return false;
    } else {
        return true;
    }
}
export function CreateRandom(){
    let randomNum = Date.parse(new Date())+parseInt(Math.random()*10000000)
    return randomNum
}
export function createParam() {
    // 请求头参数
    let randomId = CreateRandom()
    return {
        city:ConvertPinyin(window.returnCitySN.cname),
        systemVersion:navigator.appVersion.replace(/_/ig,"."),
        uniqueId:Base64.encode(navigator.userAgent)+randomId,
        userAgent:navigator.userAgent.replace(/_/ig,"."),
        planet:navigator.platform,
        ip:window.returnCitySN.cip

    }
}
export class CreateAntInfo {
    constructor(){
        //
        this.userAgent = window.navigator.userAgent
        this.ip = window.returnCitySN.cip||""
    }
    // static userAgent = window.navigator.userAgent;
    // static ip = window.returnCitySN.cip||"";
    static getAntInfo(){
        let userAgent  = this.userAgent;
        let ip = this.ip;
        return {
            //经度
            longitude:window.longitude||"",
            //纬度
            latitude:window.latitude||"",
            // 城市
            from:window.from,//渠道来源
            city:window.returnCitySN.cname,
            systemVersion:navigator.appVersion,
            uniqueId:"",
            userAgent,
            planet:navigator.platform,
            userId:"",
            randomId:"",
            inviteUserId:"",//邀请人ID
            phoneNo:window.phoneNo||"",
            ip
        }
    }
    
    static getUserAgent(){
        let userAgent  =  this.userAgent;
        let ip = this.ip;
        return{
            ip,
            userAgent,
            userAgentEncrypt:Base64.encode(userAgent),
        }
    }
}
export function FormatResourceUrl(resourceUrl){
    if(resourceUrl&&resourceUrl!==null){
        let heaerStr = resourceUrl.substr(0, 4);
        if (heaerStr !== 'http') {
            return Host.download+resourceUrl;
        }
        return resourceUrl;
    }
    return "";
}

