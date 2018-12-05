/**
 * @author wuaixiaoyao
 * @date 2018/9/7
 * @Description: 微信分享封装
*/
import {Toast} from "antd-mobile"
const wx = window.wx;
function Share(config,successCallback) {
    wx.config({
        debug: false, // 开启调试模式
        appId: config.appid, // 必填，公众号的唯一标识
        timestamp: config.timestamp, // 必填，生成签名的时间戳
        nonceStr: config.noncestr, // 必填，生成签名的随机串
        signature: config.signature, // 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareWeibo'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    this.successCallback = successCallback

}

Share.prototype = {
    constructor: Share,
    init(config) {
        this.imgUrl = config.imgUrl;
        this.link = config.link;
        this.description = config.description;
        this.title = config.title;
        wx.ready(()=>{
            console.log("wexin ready")
            // this.toFriend();
            // this.toTimeline();
            wx.onMenuShareAppMessage({
                imgUrl: this.imgUrl,
                link: this.link,
                title: this.title,
                desc: this.description,
                success () {
                    // 用户确认分享后执行的回调函数
                    //Toast.success("分享成功！")
                    // if(this.successCallback){
                    //     this.successCallback()
                    // }
                },
                fail(){
                    alert("朋友会话失败！")
                },
                cancel(){
                    //

                }
            });
            wx.onMenuShareTimeline({
                imgUrl: this.imgUrl,
                link: this.link,
                title: this.title,
                desc: this.description,
                success: function () {
                    // 用户确认分享后执行的回调函数
                    //Toast.success("分享成功！")
                    // if(this.successCallback){
                    //     this.successCallback()
                    // }
                },
                fail(){

                }
            });

        });

        wx.error(res => {
            console.log(`${res}`);
        });
    },

    toFriend() {
        wx.onMenuShareAppMessage({
            imgUrl: this.imgUrl,
            link: this.link,
            title: this.title,
            desc: this.description,
            success () {
                // 用户确认分享后执行的回调函数
                Toast.success("分享成功！")
                if(this.successCallback){
                    this.successCallback()
                }
            },
            fail(){
                alert("朋友会话失败！")
            },
            cancel(){
                //

            }
        });
    },

    toTimeline() {
        wx.onMenuShareTimeline({
            imgUrl: this.imgUrl,
            link: this.link,
            title: this.title,
            desc: this.description,
            success: function () {
                // 用户确认分享后执行的回调函数
                Toast.success("分享成功！")
                if(this.successCallback){
                    this.successCallback()
                }
            },
            fail(){

            }
        });
    },
};

export default Share;